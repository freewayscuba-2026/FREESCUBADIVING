// Run with: node --test scripts/i18n-routes.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// src/lib/i18nRoutes.js is an ES module inside a CommonJS package: load a .mjs copy.
const here = path.dirname(fileURLToPath(import.meta.url));
const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "i18n-")), "i18nRoutes.mjs");
fs.copyFileSync(path.join(here, "..", "src", "lib", "i18nRoutes.js"), tmp);
const r = await import(tmp);

test("langFromPath / stripLang", () => {
  assert.equal(r.langFromPath("/"), "en");
  assert.equal(r.langFromPath("/es"), "es");
  assert.equal(r.langFromPath("/es/"), "es");
  assert.equal(r.langFromPath("/es/buceo-en-cenotes"), "es");
  assert.equal(r.langFromPath("/essay"), "en");
  assert.equal(r.stripLang("/es"), "/");
  assert.equal(r.stripLang("/es/buceo-en-cenotes/"), "/cenote-diving");
  assert.equal(r.stripLang("/es/cenote-diving"), "/cenote-diving");
  assert.equal(r.stripLang("/cenote-diving"), "/cenote-diving");
});

test("localizedPath keeps the blog in English", () => {
  assert.equal(r.localizedPath("/", "es"), "/es");
  assert.equal(r.localizedPath("/cenote-diving", "es"), "/es/buceo-en-cenotes");
  assert.equal(r.localizedPath("/es/buceo-en-cenotes", "en"), "/cenote-diving");
  assert.equal(r.localizedPath("/es", "en"), "/");
  assert.equal(r.localizedPath("/blog", "es"), "/blog");
  assert.equal(r.localizedPath("/blog/best-cenotes-tulum", "es"), "/blog/best-cenotes-tulum");
});

test("localizeTo keeps query and hash and ignores external or non-string targets", () => {
  assert.equal(r.localizeTo("/book?i=2", "es"), "/es/reservar?i=2");
  assert.equal(r.localizeTo("/packages#top", "es"), "/es/paquetes-y-tours#top");
  assert.equal(r.localizeTo("/book?i=2", "en"), "/book?i=2");
  assert.equal(r.localizeTo("https://example.com", "es"), "https://example.com");
  assert.equal(r.localizeTo("//cdn.example.com/x", "es"), "//cdn.example.com/x");
  const obj = { pathname: "/book" };
  assert.equal(r.localizeTo(obj, "es"), obj);
});

test("absoluteUrl", () => {
  assert.equal(r.absoluteUrl("/"), "https://freewayscubadiving.com/");
  assert.equal(r.absoluteUrl("/es"), "https://freewayscubadiving.com/es");
  assert.equal(r.absoluteUrl("/es/preguntas-frecuentes"), "https://freewayscubadiving.com/es/preguntas-frecuentes");
});

test("every SEO key page is either bilingual or a blog page, and sitemap matches", () => {
  const sitemap = fs.readFileSync(path.join(here, "..", "public", "sitemap.xml"), "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/+$/, "") || "/");
  for (const p of r.BILINGUAL_PATHS) {
    assert.ok(locs.includes(p), `sitemap lacks ${p}`);
    assert.ok(locs.includes(r.spanishPath(p)), `sitemap lacks Spanish ${p}`);
  }
  assert.equal(locs.length, r.BILINGUAL_PATHS.length * 2 + 3);
  assert.ok(!locs.some((p) => p.startsWith("/es/blog")));
});
