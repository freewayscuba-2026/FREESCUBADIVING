// Language lives in the URL: English pages are at /cenote-diving, Spanish pages at
// /es/cenote-diving (home: / and /es). This gives search engines two separate,
// linkable pages (hreflang) instead of one page that changes language in the browser.

export const SITE_URL = "https://freewayscubadiving.com";

// Pages that exist in both languages. The blog is English-only for now, so it has
// no /es version (and the language button on it sends people to the Spanish home).
export const BILINGUAL_PATHS = [
  "/",
  "/cenote-diving",
  "/reef-diving",
  "/diving-courses",
  "/packages",
  "/about",
  "/faq",
  "/contact",
  "/book",
];
const BILINGUAL = new Set(BILINGUAL_PATHS);
export const isBilingual = (basePath) => BILINGUAL.has(basePath);

// Which SEO text block (src/data/seoText.js) belongs to each page.
export const SEO_KEYS = {
  "/": "home",
  "/cenote-diving": "cenote",
  "/reef-diving": "reef",
  "/diving-courses": "courses",
  "/packages": "packages",
  "/about": "about",
  "/faq": "faq",
  "/contact": "contact",
  "/book": "book",
  "/blog": "blog",
  "/blog/best-cenotes-tulum": "blogCenote",
  "/blog/certification-guide-cenote-diving": "blogCert",
};

export function normalizePath(pathname) {
  const p = String(pathname || "/").replace(/\/+$/, "");
  return p || "/";
}

export function langFromPath(pathname) {
  const p = normalizePath(pathname);
  return p === "/es" || p.startsWith("/es/") ? "es" : "en";
}

// "/es/cenote-diving" -> "/cenote-diving", "/es" -> "/"
export function stripLang(pathname) {
  const p = normalizePath(pathname);
  if (p === "/es") return "/";
  if (p.startsWith("/es/")) return p.slice(3);
  return p;
}

// Path of the same page in the given language. Pages without a Spanish version
// always stay on their English path.
export function localizedPath(pathname, lang) {
  const base = stripLang(pathname);
  if (lang !== "es" || !BILINGUAL.has(base)) return base;
  return base === "/" ? "/es" : `/es${base}`;
}

// Same idea for a link target such as "/book?i=2" (query and hash are kept).
export function localizeTo(to, lang) {
  if (typeof to !== "string" || !to.startsWith("/") || to.startsWith("//")) return to;
  const match = to.match(/^([^?#]*)(.*)$/);
  return localizedPath(match[1], lang) + match[2];
}

export function absoluteUrl(pathname) {
  return pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
}

// Language the visitor probably wants: their saved choice, else the browser language.
// Only used to send people who open the English home page to the Spanish one.
function preferredLang() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("fws-lang");
    if (saved === "es" || saved === "en") return saved;
  } catch (e) { /* storage blocked: use the browser language */ }
  const browser = navigator.language || navigator.userLanguage || "";
  return browser.toLowerCase().startsWith("es") ? "es" : "en";
}

// True when the visitor opened the English home page but prefers Spanish.
// Search engines (English browsers, no saved choice) are never redirected.
export function shouldRedirectHomeToSpanish() {
  if (typeof window === "undefined") return false;
  return normalizePath(window.location.pathname) === "/" && preferredLang() === "es";
}
