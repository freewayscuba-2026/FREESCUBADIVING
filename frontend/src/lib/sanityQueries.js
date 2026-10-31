// GROQ query + mappers that rebuild the exact content shape the existing
// components already use (t.cenoteTours.items, t.packages.items, t.courses.items,
// t.faq.items, t.testimonials.items) — split per language (en / es).
import { sanityClient, sanityEnabled, urlFor } from "./sanity";

const img = (image, w = 1200) => (image ? urlFor(image).width(w).url() : undefined);
const pick = (field, lang) => field?.[lang] || field?.en || field?.es || "";
const arr = (a, lang) => (a || []).map((x) => pick(x, lang));

const CAT_LABEL = {
  reef: { en: "Reef Diving", es: "Buceo en Arrecife" },
  wreck: { en: "Wreck Diving", es: "Buceo en Naufragio" },
  cozumel: { en: "Drift Diving", es: "Buceo a la Deriva" },
  snorkel: { en: "Snorkeling", es: "Snorkel" },
};

// One GROQ fetch for everything.
const GROQ = `{
  "diveTours": *[_type == "diveTour"] | order(order asc){ _id, category, name, desc, price, duration, level, depth, distance, groupSize, image, highlight, seasonMonths, highlights, included, notIncluded, waMsg },
  "packages": *[_type == "divePackage"] | order(order asc){ _id, name, type, tag, desc, price, duration, level, depth, distance, groupSize, image, highlight, seasonMonths, itinerary, highlights, included, notIncluded, waMsg },
  "courses": *[_type == "course"] | order(order asc){ _id, name, tag, desc, price, duration, sessions, level, image, highlights, included },
  "faq": *[_type == "faqItem"] | order(order asc){ _id, question, answer },
  "reviews": *[_type == "review"] | order(order asc){ _id, quote, name, location, topics, rating },
  "siteText": *[_id == "siteText"][0],
  "pageTexts": *[_type == "pageText"]{ path, en, es },
  "pageSeos": *[_type == "pageSeo"]{ page, metaTitle, metaDescription }
}`;

// --- per-item mappers (lang-specific plain objects) ---
function cenoteItem(d, lang) {
  const isCombo = /combo/i.test(d.name?.en || d.name?.es || "");
  return {
    name: pick(d.name, lang),
    type: isCombo ? (lang === "es" ? "Combo Cenote y Océano" : "Cenote & Ocean Combo") : lang === "es" ? "Buceo en Cenote" : "Cenote Diving",
    cenote: pick(d.name, lang),
    desc: pick(d.desc, lang),
    price: d.price,
    duration: pick(d.duration, lang),
    level: pick(d.level, lang),
    depth: d.depth,
    distance: pick(d.distance, lang),
    groupSize: pick(d.groupSize, lang),
    image: img(d.image),
    highlight: !!d.highlight,
    highlights: arr(d.highlights, lang),
    included: arr(d.included, lang),
    notIncluded: arr(d.notIncluded, lang),
    waMsg: pick(d.waMsg, lang),
  };
}

function reefItem(d, lang) {
  return {
    source: "tour", // single-day dive tour: shown on Reef Diving, not on Packages
    id: d._id,
    name: pick(d.name, lang),
    type: CAT_LABEL[d.category]?.[lang] || (lang === "es" ? "Buceo en Arrecife" : "Reef Diving"),
    cenote: null,
    desc: pick(d.desc, lang),
    price: d.price,
    duration: pick(d.duration, lang),
    level: pick(d.level, lang),
    depth: d.depth,
    distance: pick(d.distance, lang),
    groupSize: pick(d.groupSize, lang),
    image: img(d.image),
    highlight: !!d.highlight,
    seasonMonths: d.seasonMonths || undefined,
    highlights: arr(d.highlights, lang),
    included: arr(d.included, lang),
    notIncluded: arr(d.notIncluded, lang),
    waMsg: pick(d.waMsg, lang),
  };
}

function packageItem(d, lang) {
  return {
    name: pick(d.name, lang),
    type: pick(d.type, lang),
    tag: pick(d.tag, lang),
    desc: pick(d.desc, lang),
    price: d.price,
    duration: pick(d.duration, lang),
    level: pick(d.level, lang),
    depth: d.depth,
    distance: pick(d.distance, lang),
    groupSize: pick(d.groupSize, lang),
    image: img(d.image),
    highlight: !!d.highlight,
    seasonMonths: d.seasonMonths || undefined,
    itinerary: arr(d.itinerary, lang),
    highlights: arr(d.highlights, lang),
    included: arr(d.included, lang),
    notIncluded: arr(d.notIncluded, lang),
    waMsg: pick(d.waMsg, lang),
  };
}

const courseItem = (d, lang) => ({
  name: pick(d.name, lang),
  tag: pick(d.tag, lang),
  desc: pick(d.desc, lang),
  price: d.price,
  duration: pick(d.duration, lang),
  sessions: pick(d.sessions, lang),
  level: pick(d.level, lang),
  image: img(d.image),
  highlights: arr(d.highlights, lang),
  included: arr(d.included, lang),
});

const faqI = (d, lang) => ({ q: pick(d.question, lang), a: pick(d.answer, lang) });
const reviewI = (d, lang) => ({ quote: pick(d.quote, lang), name: d.name, location: pick(d.location, lang), topics: d.topics || [], rating: d.rating || 5 });

// siteText now only supplies the page-header titles that are NOT in content.js
// (Cenote and Reef page hero). Everything else is handled by pageText overrides.
function textOverrides(st, lang) {
  if (!st) return {};
  const P = (f) => pick(f, lang);
  const out = {};
  const pt = {};
  if (st.cenoteTitle || st.cenoteSubtitle) pt.cenote = { title: P(st.cenoteTitle), subtitle: P(st.cenoteSubtitle) };
  if (st.reefTitle || st.reefSubtitle) pt.reef = { title: P(st.reefTitle), subtitle: P(st.reefSubtitle) };
  if (Object.keys(pt).length) out.pageTitles = pt;
  return out;
}

function seoForLang(raw, lang) {
  const out = {};
  for (const d of raw.pageSeos || []) {
    if (!d.page) continue;
    out[d.page] = { title: pick(d.metaTitle, lang), description: pick(d.metaDescription, lang) };
  }
  return out;
}

function buildForLang(raw, lang) {
  const cenote = raw.diveTours.filter((d) => d.category === "cenote").map((d) => cenoteItem(d, lang));
  const reef = raw.diveTours.filter((d) => d.category !== "cenote").map((d) => reefItem(d, lang));
  const packages = raw.packages.map((d) => packageItem(d, lang));
  const txt = textOverrides(raw.siteText, lang);
  return {
    cenoteTours: { items: cenote },
    packages: { items: [...reef, ...packages], ...(txt.packages || {}) },
    courses: { items: raw.courses.map((d) => courseItem(d, lang)), ...(txt.courses || {}) },
    faq: { items: raw.faq.map((d) => faqI(d, lang)), ...(txt.faq || {}) },
    testimonials: { items: raw.reviews.map((d) => reviewI(d, lang)) },
    hero: txt.hero,
    homeIntro: txt.homeIntro,
    about: txt.about,
    booking: txt.booking,
    pageTitles: txt.pageTitles,
    seo: seoForLang(raw, lang),
  };
}

// Returns { en, es, overrides } or null if Sanity is off / empty.
export async function fetchSanityContent() {
  if (!sanityEnabled) return null;
  try {
    const raw = await sanityClient.fetch(GROQ);
    if (!raw || !raw.diveTours || raw.diveTours.length === 0) return null;
    const pt = raw.pageTexts || [];
    const overrides = {
      en: pt.filter((p) => p.path && p.en != null && p.en !== "").map((p) => ({ path: p.path, value: p.en })),
      es: pt.filter((p) => p.path && (p.es || p.en)).map((p) => ({ path: p.path, value: p.es || p.en })),
    };
    return { en: buildForLang(raw, "en"), es: buildForLang(raw, "es"), overrides };
  } catch (e) {
    console.warn("Sanity content fetch failed, using built-in content:", e?.message);
    return null;
  }
}
