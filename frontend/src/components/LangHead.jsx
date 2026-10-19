import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getSeo } from "@/data/seoText";
import {
  SEO_KEYS,
  absoluteUrl,
  isBilingual,
  localizedPath,
  stripLang,
} from "@/lib/i18nRoutes";

// One place that writes the language-dependent <head> tags for every page:
// <html lang>, title, description, canonical, hreflang (English <-> Spanish),
// og:url / og:locale and the social titles. Pages keep only their images and JSON-LD.
export function LangHead() {
  const { pathname } = useLocation();
  const { lang, t } = useLanguage();
  const base = stripLang(pathname);
  const key = SEO_KEYS[base];
  const seo = key ? getSeo(key, lang, t.seo) : null;

  // Unknown URL (404 page): it sets its own title and noindex.
  if (!seo) {
    return (
      <Helmet>
        <html lang="en" />
      </Helmet>
    );
  }

  const bilingual = isBilingual(base);
  const pageLang = bilingual ? lang : "en";
  const url = absoluteUrl(localizedPath(base, pageLang));
  const ogLocale = pageLang === "es" ? "es_MX" : "en_US";
  const ogAlternate = pageLang === "es" ? "en_US" : "es_MX";

  return (
    <Helmet>
      <html lang={pageLang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={url} />
      {bilingual && <link rel="alternate" hrefLang="en" href={absoluteUrl(localizedPath(base, "en"))} />}
      {bilingual && <link rel="alternate" hrefLang="es" href={absoluteUrl(localizedPath(base, "es"))} />}
      {bilingual && <link rel="alternate" hrefLang="x-default" href={absoluteUrl(localizedPath(base, "en"))} />}
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={ogLocale} />
      {bilingual && <meta property="og:locale:alternate" content={ogAlternate} />}
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta name="twitter:title" content={seo.ogTitle} />
      <meta name="twitter:description" content={seo.ogDescription} />
    </Helmet>
  );
}
