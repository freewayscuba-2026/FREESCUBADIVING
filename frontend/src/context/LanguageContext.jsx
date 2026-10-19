import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { content } from "@/data/content";
import { fetchSanityContent } from "@/lib/sanityQueries";

const LanguageContext = createContext(null);

// Sections with editable card lists (arrays).
const LIST_SECTIONS = ["cenoteTours", "packages", "courses", "faq", "testimonials"];
// Sections that are only page texts (objects, no items).
const TEXT_SECTIONS = ["hero", "homeIntro", "about", "booking", "pageTitles", "seo"];

// Merge text objects, keeping built-in values for any field left empty in the CMS.
function mergeText(baseObj, ov) {
  const clean = {};
  for (const [k, v] of Object.entries(ov || {})) {
    if (v && typeof v === "object") { const m = mergeText(baseObj?.[k], v); if (Object.keys(m).length) clean[k] = m; }
    else if (v !== undefined && v !== null && v !== "") clean[k] = v;
  }
  return { ...(baseObj || {}), ...clean };
}

// Apply per-path text overrides (from the "Site Text" documents) over the content.
// Each override is { path: "hero.title" | "ui.cenote.h2" | "why.items.0.title", value }.
function applyOverrides(base, list) {
  if (!list || !list.length) return base;
  // shallow-clone lazily along each edited path so we never mutate the source content
  const root = Array.isArray(base) ? base.slice() : { ...base };
  const cloneAt = (obj, key) => {
    const child = obj[key];
    obj[key] = Array.isArray(child) ? child.slice() : child && typeof child === "object" ? { ...child } : child;
    return obj[key];
  };
  for (const { path, value } of list) {
    const parts = path.split(".");
    let node = root;
    let ok = true;
    for (let i = 0; i < parts.length - 1; i++) {
      if (node == null || typeof node !== "object") { ok = false; break; }
      node = cloneAt(node, parts[i]);
    }
    const last = parts[parts.length - 1];
    if (ok && node && typeof node === "object" && last in node) node[last] = value;
  }
  return root;
}

function mergeContent(base, overrideForLang) {
  if (!overrideForLang) return base;
  const merged = { ...base };
  // list sections: replace items only when the CMS actually returned some
  for (const key of LIST_SECTIONS) {
    const ov = overrideForLang[key];
    if (ov && Array.isArray(ov.items) && ov.items.length > 0) {
      merged[key] = { ...base[key], ...ov };
    } else if (ov) {
      // no items but maybe title/subtitle text overrides
      const { items, ...txt } = ov;
      if (Object.keys(txt).length) merged[key] = mergeText(base[key], txt);
    }
  }
  // pure text sections
  for (const key of TEXT_SECTIONS) {
    if (overrideForLang[key]) merged[key] = mergeText(base[key], overrideForLang[key]);
  }
  return merged;
}

// Language the visitor should see: saved choice first, then the browser language.
// On the server (prerender) there is no visitor, so pages are generated in English.
// The same rule is used by src/index.js to decide whether the prerendered HTML can
// be hydrated (English) or must be replaced by a client render (Spanish).
export function getPreferredLang() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("fws-lang");
    if (saved) return saved;
  } catch (e) { /* storage blocked: fall through to the browser language */ }
  const browser = navigator.language || navigator.userLanguage || "";
  return browser.toLowerCase().startsWith("es") ? "es" : "en";
}

// `initialCms` is the Sanity content that was baked into the prerendered page, so the
// first client render is identical to the server HTML. The mount effect below still
// refetches, so edits published in Sanity show up without waiting for a rebuild.
export function LanguageProvider({ children, initialCms = null }) {
  const [lang, setLang] = useState(getPreferredLang);

  // CMS content loaded from Sanity (null until fetched / if unavailable).
  const [cms, setCms] = useState(initialCms);

  useEffect(() => {
    let alive = true;
    fetchSanityContent()
      .then((data) => { if (alive && data) setCms(data); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const apply = useCallback((value) => {
    setLang(value);
    if (typeof window !== "undefined") {
      try { localStorage.setItem("fws-lang", value); } catch (e) { /* storage blocked */ }
    }
  }, []);
  const toggle = useCallback(() => apply(lang === "en" ? "es" : "en"), [lang, apply]);

  const t = useMemo(() => {
    let merged = mergeContent(content[lang], cms ? cms[lang] : null);
    if (cms && cms.overrides && cms.overrides[lang]) merged = applyOverrides(merged, cms.overrides[lang]);
    return merged;
  }, [lang, cms]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: apply, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
