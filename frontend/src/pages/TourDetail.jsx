import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, waFor } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal } from "@/components/Reveal";
import { useCalendar } from "@/lib/useCalendar";
import { localizedPath, absoluteUrl } from "@/lib/i18nRoutes";
import { TOUR_PAGES, RELATED_LABELS, SITE } from "@/data/tourPages";
import { CheckCircle2, XCircle, ArrowRight, Mail, Calendar, Award, ArrowDownToLine, Clock, Waves, Ship } from "lucide-react";

const FACT_ICONS = { season: Calendar, schedule: Clock, level: Award, depth: ArrowDownToLine, duration: Clock, dives: Waves, boat: Ship };
const NAME_MATCH = {
  bullShark: /bull shark|tibur[oó]n(es)? toro/i,
  cozumel: /cozumel diving trip|viaje de buceo a cozumel/i,
};

// The Sanity tour this page sells (price, inclusions, WhatsApp text stay editable there).
function useTourItem(pageKey) {
  const { t } = useLanguage();
  const page = TOUR_PAGES[pageKey];
  const items = t.packages?.items || [];
  return items.find((i) => i.id === page.sanityId) || items.find((i) => NAME_MATCH[pageKey].test(i.name || "")) || {};
}

function SeasonStatus({ months, lang }) {
  const { month } = useCalendar();
  if (!months) return null;
  const inSeason = months.includes(month);
  const label = lang === "es"
    ? (inSeason ? "En temporada ahora" : "Fuera de temporada — reserva para noviembre")
    : (inSeason ? "In season now" : "Out of season — book ahead for November");
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${inSeason ? "bg-green-500/15 text-green-400" : "bg-white/10 text-white/60"}`}>
      <span className={`w-2 h-2 rounded-full ${inSeason ? "bg-green-400 animate-pulse" : "bg-white/30"}`} />
      {label}
    </span>
  );
}

export default function TourDetail({ pageKey }) {
  const { t, lang } = useLanguage();
  const page = TOUR_PAGES[pageKey];
  const c = page[lang] || page.en;
  const item = useTourItem(pageKey);
  const s = t.ui.shared;
  const url = absoluteUrl(localizedPath(page.path, lang));
  const heroAbs = `${SITE}${page.hero}`;
  const reefUrl = absoluteUrl(localizedPath("/reef-diving", lang));
  // First amount in the price text, e.g. "$3,500 MXN (around $200 USD)" -> "3500"
  const priceNumber = ((item.price || "").match(/[\d][\d,]*/) || [""])[0].replace(/,/g, "");
  const waText = item.waMsg || waFor(t.code).book(c.h1);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: absoluteUrl(localizedPath("/", lang)) },
      { "@type": "ListItem", position: 2, name: lang === "es" ? "Buceo en Arrecifes" : "Reef Diving", item: reefUrl },
      { "@type": "ListItem", position: 3, name: c.breadcrumb, item: url },
    ],
  };
  const trip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: c.h1,
    description: c.subtitle,
    url,
    image: [heroAbs, ...page.gallery.map((g) => `${SITE}${g.src}`)],
    touristType: lang === "es" ? "Buzos certificados" : "Certified scuba divers",
    provider: {
      "@type": "LocalBusiness",
      name: "Freeway Scuba Diving",
      url: SITE,
      address: { "@type": "PostalAddress", addressLocality: "Tulum", addressRegion: "Quintana Roo", addressCountry: "MX" },
    },
    ...(priceNumber && {
      offers: {
        "@type": "Offer",
        price: priceNumber,
        priceCurrency: "MXN",
        availability: "https://schema.org/InStock",
        url,
      },
    }),
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <>
      <Helmet>
        <meta property="og:image" content={heroAbs} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={heroAbs} />
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(trip)}</script>
        <script type="application/ld+json">{JSON.stringify(faq)}</script>
      </Helmet>

      <PageHeader badge={c.badge} title={c.h1} subtitle={c.subtitle} image={page.hero} imgAlt={c.heroAlt} />

      {/* Breadcrumb (visible) */}
      <nav aria-label="Breadcrumb" className="bg-[#061A2B]">
        <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 flex flex-wrap items-center gap-2 text-xs text-white/50">
          <li><Link to="/" className="hover:text-white">{lang === "es" ? "Inicio" : "Home"}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/reef-diving" className="hover:text-white">{lang === "es" ? "Buceo en Arrecifes" : "Reef Diving"}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-white/80" aria-current="page">{c.breadcrumb}</li>
        </ol>
      </nav>

      {/* Key facts + price */}
      <section className="bg-[#061A2B] pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {Object.entries(c.facts).map(([key, [label, value]]) => {
                const Icon = FACT_ICONS[key] || CheckCircle2;
                return (
                  <div key={key} className="flex gap-3">
                    <Icon className="w-5 h-5 text-[#00B4D8] shrink-0 mt-0.5" />
                    <div>
                      <dt className="text-[11px] uppercase tracking-wide text-white/50">{label}</dt>
                      <dd className="text-white text-sm font-medium leading-snug">{value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
            <div className="flex flex-col gap-2 lg:items-end lg:border-l lg:border-white/10 lg:pl-6">
              {page.seasonMonths && <SeasonStatus months={page.seasonMonths} lang={lang} />}
              {item.price && (
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-white/50">{s.from}</div>
                  <div className="font-serif text-2xl text-[#00B4D8] whitespace-nowrap">{item.price}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 bg-[#061A2B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl sm:text-4xl tracking-tight">{c.introH2}</h2>
          {c.intro.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 text-white/70 text-base leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-[#020B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-2xl sm:text-3xl tracking-tight mb-8">{c.galleryH2}</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {page.gallery.map((g) => (
              <figure key={g.src} className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10">
                <img
                  src={g.src}
                  alt={c.galleryAlt[g.key]}
                  width={g.w}
                  height={g.h}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl tracking-tight mb-8">{c.stepsH2}</h2>
          <ol className="grid gap-4 sm:grid-cols-2">
            {c.steps.map(([title, text], i) => (
              <li key={title} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#00B4D8]/15 text-[#00B4D8] font-semibold shrink-0">{i + 1}</span>
                <div>
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="mt-1 text-white/65 text-sm leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements + included */}
      <section className="py-16 bg-[#020B14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-white text-2xl tracking-tight mb-5">{c.requirementsH2}</h2>
            <ul className="space-y-3">
              {c.requirements.map((r) => (
                <li key={r} className="flex gap-3 text-white/75 text-sm leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" /> {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {item.included?.length > 0 && (
              <>
                <h2 className="font-serif text-white text-2xl tracking-tight mb-5">{c.includedH2}</h2>
                <ul className="space-y-3">
                  {item.included.map((r) => (
                    <li key={r} className="flex gap-3 text-white/75 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> {r}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {item.notIncluded?.length > 0 && (
              <>
                <h3 className="text-white font-semibold mt-6 mb-3">{c.notIncludedH2}</h3>
                <ul className="space-y-2">
                  {item.notIncluded.map((r) => (
                    <li key={r} className="flex gap-3 text-white/50 text-sm">
                      <XCircle className="w-4 h-4 shrink-0 mt-0.5" /> {r}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl tracking-tight mb-8">{c.faqH2}</h2>
          <div className="space-y-3">
            {c.faq.map(([q, a]) => (
              <details key={q} className="group bg-white/5 border border-white/10 rounded-xl p-5">
                <summary className="cursor-pointer list-none flex justify-between gap-4 text-white font-medium">
                  <h3 className="text-base">{q}</h3>
                  <span className="text-[#00B4D8] transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#020B14] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl sm:text-4xl mb-4">{c.ctaH2}</h2>
          <p className="text-white/60 mb-8">{c.ctaP}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waLink(waText, t.code)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
            >
              <WaIcon className="w-5 h-5" /> WhatsApp
            </a>
            <Link
              to={`/book?i=${page.bookIndex}`}
              className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-1"
            >
              <Mail className="w-5 h-5" /> {t.nav.bookNow}
            </Link>
          </div>
        </div>
      </section>

      {/* Related tours (internal links) */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-2xl tracking-tight mb-6">{c.relatedH2}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {page.related.map((p) => (
              <Link
                key={p}
                to={p}
                className="group flex items-center justify-between gap-3 bg-white/5 border border-white/10 hover:border-[#00B4D8]/40 rounded-xl p-5 text-white text-sm font-medium transition-colors"
              >
                {(RELATED_LABELS[lang] || RELATED_LABELS.en)[p]}
                <ArrowRight className="w-4 h-4 text-[#00B4D8] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReviewCarousel topic="reef" />
    </>
  );
}
