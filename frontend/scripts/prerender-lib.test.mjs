// Run with: node --test scripts/
import test from "node:test";
import assert from "node:assert/strict";
import { assemblePage, isPrerendered, outputFileForRoute, routesFromSitemap, safeJson } from "./prerender-lib.mjs";

const TEMPLATE =
  '<!doctype html><html lang="en"><head><meta charset="utf-8"/>' +
  '<meta name="description" content="OLD description"/>' +
  '<meta property="og:title" content="OLD og title"/>' +
  '<meta property="og:type" content="website"/>' +
  '<meta name="viewport" content="width=device-width,initial-scale=1"/>' +
  "<title>OLD title</title>" +
  '<script defer="defer" src="/static/js/main.abc.js"></script></head>' +
  '<body><noscript>You need to enable JavaScript.</noscript><div id="root"></div></body></html>';

const HELMET = {
  title: '<title data-rh="true">Cenote Diving in Tulum</title>',
  meta:
    '<meta data-rh="true" name="description" content="NEW description"/>' +
    '<meta data-rh="true" property="og:title" content="NEW og title"/>',
  link: '<link data-rh="true" rel="canonical" href="https://freewayscubadiving.com/cenote-diving"/>',
  script: '<script data-rh="true" type="application/ld+json">{"@type":"BreadcrumbList"}</script>',
};

test("routesFromSitemap reads every page path", () => {
  const xml = `<urlset>
    <url><loc>https://freewayscubadiving.com/</loc></url>
    <url><loc>https://freewayscubadiving.com/cenote-diving</loc></url>
    <url><loc>https://freewayscubadiving.com/blog/best-cenotes-tulum/</loc></url>
    <url><loc>https://freewayscubadiving.com/menu.pdf</loc></url>
    <url><loc>https://freewayscubadiving.com/cenote-diving</loc></url>
  </urlset>`;
  assert.deepEqual(routesFromSitemap(xml), ["/", "/cenote-diving", "/blog/best-cenotes-tulum"]);
});

test("outputFileForRoute", () => {
  assert.equal(outputFileForRoute("/"), "index.html");
  assert.equal(outputFileForRoute("/cenote-diving"), "cenote-diving/index.html");
  assert.equal(outputFileForRoute("/blog/best-cenotes-tulum"), "blog/best-cenotes-tulum/index.html");
});

test("assemblePage fills the root and replaces duplicated head tags", () => {
  const out = assemblePage(TEMPLATE, {
    route: "/cenote-diving",
    bodyHtml: "<h1>Cenote Diving</h1>",
    helmet: HELMET,
    cms: { en: { note: "</script><b>x</b>" } },
    calendar: { month: 10, year: 2026 },
  });

  assert.match(out, /<div id="root" data-prerendered="\/cenote-diving"><h1>Cenote Diving<\/h1><\/div>/);
  assert.equal((out.match(/<title/g) || []).length, 1);
  assert.ok(out.includes("Cenote Diving in Tulum</title>"));
  assert.ok(!out.includes("OLD title"));
  assert.equal((out.match(/name="description"/g) || []).length, 1);
  assert.ok(out.includes("NEW description") && !out.includes("OLD description"));
  assert.equal((out.match(/property="og:title"/g) || []).length, 1);
  assert.ok(out.includes("NEW og title") && !out.includes("OLD og title"));
  // untouched template tags survive
  assert.ok(out.includes('property="og:type" content="website"'));
  assert.ok(out.includes('name="viewport"'));
  assert.ok(out.includes('rel="canonical"') && out.includes("application/ld+json"));
  assert.ok(out.includes('window.__PRERENDER__={"month":10,"year":2026}'));
  // everything lands inside <head>, and CMS JSON cannot close its own <script>
  const head = out.slice(0, out.indexOf("</head>"));
  assert.ok(head.includes('id="__CMS__"') && head.includes("Cenote Diving in Tulum"));
  assert.ok(!out.includes("</script><b>"));
  assert.ok(out.includes("\\u003c/script>\\u003cb>x\\u003c/b>"));
});

test("assemblePage keeps the template title when the page sets none", () => {
  const out = assemblePage(TEMPLATE, {
    route: "/",
    bodyHtml: "<h1>Home</h1>",
    helmet: { title: "", meta: "" },
    cms: null,
    calendar: { month: 1, year: 2027 },
  });
  assert.ok(out.includes("<title>OLD title</title>"));
  assert.ok(!out.includes("__CMS__"));
});

test("assemblePage fails loudly on an unexpected template", () => {
  assert.throws(
    () => assemblePage("<html><head></head><body></body></html>", { route: "/", bodyHtml: "x", calendar: {} }),
    /no empty <div id="root">/,
  );
});

test("safeJson escapes characters that could break out of a script tag", () => {
  const s = safeJson({ a: "</script>", b: String.fromCharCode(0x2028) });
  assert.ok(!s.includes("</script>"));
  assert.ok(!s.includes(String.fromCharCode(0x2028)));
});

test("isPrerendered ignores the CSS/comment in the template and detects real output", () => {
  // The real build/index.html contains the word data-prerendered in a <style> block.
  const withCss = TEMPLATE.replace(
    "</head>",
    "<style>html.fws-es #root[data-prerendered]{visibility:hidden}</style></head>",
  );
  assert.equal(isPrerendered(withCss), false);
  assert.equal(isPrerendered(TEMPLATE), false);

  const page = assemblePage(withCss, {
    route: "/",
    bodyHtml: "<h1>Home</h1>",
    helmet: {},
    calendar: { month: 1, year: 2027 },
  });
  assert.equal(isPrerendered(page), true);
});

test("assemblePage sets <html lang> from Helmet and keeps the page language", () => {
  const out = assemblePage(TEMPLATE, {
    route: "/es/cenote-diving",
    bodyHtml: "<h1>Buceo</h1>",
    helmet: { htmlAttributes: 'lang="es"', title: "<title>Buceo en Cenotes</title>", meta: "", link: "" },
    calendar: { month: 1, year: 2027 },
  });
  assert.ok(out.startsWith('<!doctype html><html lang="es">'));
  assert.equal((out.match(/<html/g) || []).length, 1);
  assert.match(out, /<div id="root" data-prerendered="\/es\/cenote-diving">/);
});

test("routesFromSitemap and outputFileForRoute handle /es pages", () => {
  const xml = `<urlset>
    <url><loc>https://freewayscubadiving.com/es</loc><xhtml:link rel="alternate" hreflang="en" href="https://freewayscubadiving.com/"/></url>
    <url><loc>https://freewayscubadiving.com/es/cenote-diving</loc></url>
  </urlset>`;
  assert.deepEqual(routesFromSitemap(xml), ["/es", "/es/cenote-diving"]);
  assert.equal(outputFileForRoute("/es"), "es/index.html");
  assert.equal(outputFileForRoute("/es/cenote-diving"), "es/cenote-diving/index.html");
});

import { splitHoistedTags, langForRoute } from "./prerender-lib.mjs";

test("hoisted tags move from the page body into <head>", () => {
  const template =
    '<html lang="en"><head><title>Home</title><meta name="description" content="old"/></head><body><div id="root"></div></body></html>';
  const body =
    '<title>Buceo</title><meta name="description" content="nueva"/><link rel="alternate" hrefLang="es" href="https://x/es"/><div>hola</div>';
  const out = assemblePage(template, { route: "/es/cenote-diving", bodyHtml: body, calendar: { month: 1, year: 2026 } });
  assert.match(out, /<html lang="es">/);
  const head = out.slice(0, out.indexOf("</head>"));
  assert.match(head, /<title>Buceo<\/title>/);
  assert.match(head, /hreflang="es"/);
  assert.doesNotMatch(head, /<title>Home/);
  assert.doesNotMatch(head, /content="old"/);
  assert.match(out, /data-prerendered="\/es\/cenote-diving"><div>hola<\/div>/);
});

test("splitHoistedTags and langForRoute", () => {
  assert.equal(splitHoistedTags("<div>x</div>").body, "<div>x</div>");
  assert.equal(langForRoute("/es"), "es");
  assert.equal(langForRoute("/es/faq"), "es");
  assert.equal(langForRoute("/espresso"), "en");
});
