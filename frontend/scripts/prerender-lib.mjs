// Pure helpers for scripts/prerender.mjs (no I/O, so they can be unit-tested).

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Routes to prerender = every <loc> in the sitemap, so public/sitemap.xml stays the
// single list of pages. Returns normalized paths like "/" or "/cenote-diving".
export function routesFromSitemap(xml) {
  const routes = new Set();
  for (const match of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    let pathname;
    try {
      pathname = new URL(match[1]).pathname;
    } catch {
      continue;
    }
    pathname = pathname.replace(/\/+$/, "") || "/";
    if (/\.[a-z0-9]+$/i.test(pathname)) continue; // skip files such as /foo.pdf
    routes.add(pathname);
  }
  return [...routes];
}

// Output file for a route, relative to the build folder.
export function outputFileForRoute(route) {
  return route === "/" ? "index.html" : `${route.replace(/^\/+/, "")}/index.html`;
}

// JSON that is safe to place inside a <script> tag.
const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);

export function safeJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .split(LINE_SEPARATOR).join('\\u2028')
    .split(PARAGRAPH_SEPARATOR).join('\\u2029');
}

// Remove <meta>/<link> tags from the template that a page overrides through Helmet,
// so the final HTML has one title, one description, one canonical, etc.
function removeTemplateDuplicates(html, helmet) {
  let out = html;

  if (/<title[\s>]/i.test(helmet.title || "")) {
    out = out.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "");
  }

  for (const tag of (helmet.meta || "").match(/<meta\b[^>]*>/gi) || []) {
    const key = tag.match(/\b(name|property|http-equiv)\s*=\s*["']([^"']+)["']/i);
    if (!key) continue;
    const re = new RegExp(
      `<meta\\b[^>]*\\b${key[1]}\\s*=\\s*["']${escapeRegExp(key[2])}["'][^>]*>`,
      "gi",
    );
    out = out.replace(re, "");
  }

  for (const tag of (helmet.link || "").match(/<link\b[^>]*>/gi) || []) {
    const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i);
    if (!rel) continue;
    if (rel[1].toLowerCase() === "canonical") {
      out = out.replace(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/gi, "");
    } else if (rel[1].toLowerCase() === "alternate") {
      const lang = tag.match(/\bhreflang\s*=\s*["']([^"']+)["']/i);
      if (lang) {
        const re = new RegExp(
          `<link\\b[^>]*\\bhreflang\\s*=\\s*["']${escapeRegExp(lang[1])}["'][^>]*>`,
          "gi",
        );
        out = out.replace(re, "");
      }
    }
  }
  return out;
}

// Build the final HTML for one route from the CRA template (build/index.html).
export function assemblePage(template, { route, bodyHtml, helmet = {}, cms = null, calendar }) {
  const rootTag = '<div id="root"></div>';
  if (!template.includes(rootTag)) {
    throw new Error('build/index.html has no empty <div id="root"></div> to fill');
  }
  if (!template.includes("</head>")) {
    throw new Error("build/index.html has no </head>");
  }

  let html = removeTemplateDuplicates(template, helmet);

  const headTags = [
    helmet.title,
    helmet.priority,
    helmet.base,
    helmet.meta,
    helmet.link,
    helmet.style,
    helmet.script,
    helmet.noscript,
    // Month/year the page was built in: the first client render must use the same
    // values as this HTML (see src/lib/useCalendar.js).
    `<script>window.__PRERENDER__=${safeJson(calendar)}</script>`,
    cms ? `<script id="__CMS__" type="application/json">${safeJson(cms)}</script>` : "",
  ]
    .filter(Boolean)
    .join("");

  html = html.replace("</head>", () => `${headTags}</head>`);
  html = html.replace(
    rootTag,
    () => `<div id="root" data-prerendered="${route}">${bodyHtml}</div>`,
  );
  return html;
}
