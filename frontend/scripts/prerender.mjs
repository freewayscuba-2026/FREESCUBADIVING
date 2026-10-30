// Prerender step: runs right after `craco build` (see the "build" script in package.json).
//
// For every page listed in public/sitemap.xml it renders the real React app to HTML
// and writes build/<route>/index.html, so crawlers and visitors get the full page
// (text, links, titles, canonical, JSON-LD) before any JavaScript runs. The browser
// then hydrates that HTML and everything behaves exactly as before.
//
// Safety: if anything goes wrong the build keeps the plain Create React App output
// and exits 0, so a prerender problem can never take the site down. Set
// PRERENDER_STRICT=1 to make failures stop the build instead.

import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import {
  assemblePage,
  isPrerendered,
  outputFileForRoute,
  routesFromSitemap,
} from "./prerender-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const buildDir = path.join(root, "build");
const strict = process.env.PRERENDER_STRICT === "1";

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// esbuild plugin: `import logo from "./logo.svg"` must resolve to the same hashed URL
// that the webpack build emitted (read from build/asset-manifest.json).
function assetUrlPlugin(manifestFiles) {
  const urls = Object.values(manifestFiles).filter((v) => typeof v === "string");
  return {
    name: "asset-urls",
    setup(b) {
      b.onLoad({ filter: /\.svg$/ }, (args) => {
        const base = path.basename(args.path, ".svg");
        const re = new RegExp(`^/?static/media/${escapeRegExp(base)}\\.[0-9a-zA-Z]+\\.svg$`);
        const hit = urls.find((u) => re.test(u));
        if (!hit) throw new Error(`No built file found for ${args.path} in asset-manifest.json`);
        const url = hit.startsWith("/") ? hit : `/${hit}`;
        return { contents: `module.exports = ${JSON.stringify(url)};`, loader: "js" };
      });
    },
  };
}

async function bundleServerEntry(manifestFiles) {
  const { build } = await import("esbuild");
  const outfile = path.join(root, "node_modules", ".cache", "prerender", "entry-server.cjs");
  await build({
    entryPoints: [path.join(root, "scripts", "ssr", "entry-server.jsx")],
    outfile,
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node20",
    jsx: "automatic",
    loader: {
      ".js": "jsx",
      ".css": "empty",
      ".png": "dataurl",
      ".jpg": "dataurl",
      ".jpeg": "dataurl",
      ".gif": "dataurl",
      ".webp": "dataurl",
    },
    alias: { "@": path.join(root, "src") },
    define: { "process.env.NODE_ENV": '"production"' },
    plugins: [assetUrlPlugin(manifestFiles)],
    logLevel: "error",
  });
  return outfile;
}

async function main() {
  const templatePath = path.join(buildDir, "index.html");
  const template = await fs.readFile(templatePath, "utf8").catch(() => null);
  if (!template) {
    throw new Error("build/index.html not found: run `craco build` first");
  }
  if (isPrerendered(template)) {
    console.log("[prerender] build/index.html is already prerendered, nothing to do");
    return;
  }

  const sitemap = await fs.readFile(path.join(buildDir, "sitemap.xml"), "utf8");
  const routes = routesFromSitemap(sitemap);
  if (routes.length === 0) throw new Error("No routes found in build/sitemap.xml");

  const manifest = JSON.parse(
    await fs.readFile(path.join(buildDir, "asset-manifest.json"), "utf8"),
  );

  console.log(`[prerender] bundling the app for the server (${routes.length} routes)…`);
  const bundlePath = await bundleServerEntry(manifest.files || {});
  const entry = createRequire(import.meta.url)(bundlePath);

  // Sanity content is fetched once and baked into every page. If Sanity is not
  // reachable the pages are generated from the built-in content in src/data/content.js.
  const cms = (await entry.loadCms().catch(() => null)) || null;
  console.log(
    cms
      ? "[prerender] Sanity content loaded and will be baked into the pages"
      : "[prerender] WARNING: Sanity content unavailable, using built-in content",
  );

  // Month/year the HTML is built for; read by src/lib/useCalendar.js during rendering.
  const now = new Date();
  const calendar = { month: now.getUTCMonth() + 1, year: now.getUTCFullYear() };
  globalThis.__PRERENDER__ = calendar;

  const pages = [];
  const failed = [];
  for (const route of routes) {
    try {
      const { html, helmet, errors } = await entry.render(route, cms);
      if (errors.length) throw new Error(errors.slice(0, 2).join(" | "));
      if (html.length < 1500) throw new Error(`rendered HTML is suspiciously short (${html.length} bytes)`);
      if (!/<h1[\s>]/.test(html)) console.warn(`[prerender] note: ${route} has no <h1>`);
      pages.push({
        route,
        file: outputFileForRoute(route),
        content: assemblePage(template, { route, bodyHtml: html, helmet, cms, calendar }),
      });
    } catch (error) {
      failed.push(route);
      console.warn(`[prerender] FAILED ${route}: ${error.message}`);
    }
  }

  if (pages.length === 0) throw new Error("No page could be prerendered");

  for (const page of pages) {
    const target = path.join(buildDir, page.file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, page.content);
  }

  // build/404.html: the page Vercel returns, with a real 404 status, for any address that
  // is not a page of the site. It is the React "not found" page (noindex), rendered once.
  try {
    const notFoundRoute = "/__not-found__";
    const { html, helmet, errors } = await entry.render(notFoundRoute, cms);
    if (errors.length) throw new Error(errors.slice(0, 2).join(" | "));
    await fs.writeFile(
      path.join(buildDir, "404.html"),
      assemblePage(template, { route: notFoundRoute, bodyHtml: html, helmet, cms, calendar }),
    );
    console.log("[prerender] 404.html written");
  } catch (error) {
    console.warn(`[prerender] WARNING: 404.html not written: ${error.message}`);
    if (strict) process.exitCode = 1;
  }

  console.log(`[prerender] done: ${pages.length}/${routes.length} pages written`);
  for (const page of pages) {
    console.log(`  ${page.route.padEnd(48)} ${(page.content.length / 1024).toFixed(0)} KB`);
  }
  if (failed.length) {
    console.warn(`[prerender] WARNING: not prerendered (served as a normal React page): ${failed.join(", ")}`);
    if (strict) process.exitCode = 1;
  }
}

main().catch((error) => {
  console.warn("\n[prerender] WARNING: prerender failed, keeping the regular React build.");
  console.warn(`[prerender] ${error?.stack || error}\n`);
  if (strict) process.exit(1);
});
