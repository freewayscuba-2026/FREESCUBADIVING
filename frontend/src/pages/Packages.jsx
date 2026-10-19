import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { waLink } from "@/data/content";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";
import { WaIcon } from "@/components/icons";
import { PageHeader } from "@/components/sections/PageHeader";
import { IMAGES } from "@/data/content";
import { ArrowRight, Clock, BarChart2, MapPin, Anchor, CheckCircle2, Users, XCircle, Play, Sunrise, Mail } from "lucide-react";

// Map a package/tour to the booking form's interest index (order shared EN/ES)
function bookIndex(item) {
  const type = (item.type || "").toLowerCase();
  const name = (item.name || "").toLowerCase();
  if (name.includes("whale") || name.includes("tiburón") || type.includes("snorkel")) return 4;
  if (type.includes("wreck") || type.includes("naufragio")) return 2;
  if (type.includes("drift") || type.includes("deriva") || name.includes("cozumel")) return 3;
  if (type.includes("reef") || type.includes("arrecife")) return 1;
  if (type.includes("package") || type.includes("paquete") || type.includes("retreat") || type.includes("retiro")) return 6;
  if (item.cenote) return 0;
  return 6;
}
import { Reveal } from "@/components/Reveal";
import { useCalendar } from "@/lib/useCalendar";

function SeasonBadge({ item, s }) {
  const { month } = useCalendar();
  if (!item.seasonMonths) return null;
  const inSeason = item.seasonMonths.includes(month);
  return (
    <div className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold ${inSeason ? "bg-green-500/15 text-green-400 border-b border-green-500/20" : "bg-white/5 text-white/40 border-b border-white/10"}`}>
      <span className={`w-2 h-2 rounded-full shrink-0 ${inSeason ? "bg-green-400 animate-pulse" : "bg-white/20"}`} />
      {inSeason ? s.inSeasonNow : s.outOfSeason}
    </div>
  );
}

function TourCard({ item, index, s }) {
  return (
    <Reveal delay={(index % 3) * 0.07}>
      <div className={`group h-full flex flex-col bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-2xl transition-colors hover:border-[#00B4D8]/40 ${item.highlight ? "border-[#00B4D8]/50 ring-1 ring-[#00B4D8]/30" : "border-white/10"}`}>
      <SeasonBadge item={item} s={s} />
        {/* Image */}
        <div className="relative h-52 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061A2B]/80 to-transparent" />
          <span className="absolute top-3 left-3 text-[11px] font-bold tracking-wide uppercase bg-[#00B4D8] text-[#061A2B] px-2.5 py-1 rounded-full">
            {item.level}
          </span>
          {item.highlight && (
            <span className="absolute top-3 right-3 text-[11px] font-bold tracking-wide uppercase bg-white/90 text-[#061A2B] px-2.5 py-1 rounded-full">
              {s.topPick}
            </span>
          )}
          {item.cenote && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#061A2B]/70 backdrop-blur-sm text-white/90 text-xs px-2.5 py-1 rounded-full">
              <Anchor className="w-3 h-3 text-[#00B4D8]" /> {item.cenote}
            </div>
          )}
          {item.reelUrl && (
            <a href={item.reelUrl} target="_blank" rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform hover:scale-110 shadow-xl">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </span>
            </a>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          {item.type && (
            <span className="text-[10px] uppercase tracking-widest text-[#00B4D8]/80 font-semibold mb-1">{item.type}</span>
          )}
          <h3 className="font-serif text-xl text-white leading-snug">{item.name}</h3>
          <p className="mt-2 text-sm text-white/65 leading-relaxed flex-1">{item.desc}</p>

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
            {item.duration && (
              <div className="flex items-center gap-1.5 text-white/60">
                <Clock className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.duration}
              </div>
            )}
            {item.depth && (
              <div className="flex items-center gap-1.5 text-white/60">
                <BarChart2 className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.depth}
              </div>
            )}
            {item.distance && (
              <div className="flex items-center gap-1.5 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.distance}
              </div>
            )}
            {item.groupSize && (
              <div className="flex items-center gap-1.5 text-white/60">
                <Users className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.groupSize}
              </div>
            )}
          </div>

          {/* Itinerary (multi-day packages) */}
          {item.itinerary && (
            <ul className="mt-4 space-y-1 border-t border-white/10 pt-4">
              {item.itinerary.map((day) => (
                <li key={day} className="flex items-start gap-2 text-xs text-white/65">
                  <Sunrise className="w-3 h-3 text-[#00B4D8] shrink-0 mt-0.5" /> {day}
                </li>
              ))}
            </ul>
          )}

          {/* Highlights */}
          {item.highlights && (
            <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
              {item.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs text-white/70">
                  <span className="text-[#00B4D8] mt-0.5">✦</span> {h}
                </li>
              ))}
            </ul>
          )}

          {/* Included */}
          {item.included && (
            <div className="mt-3">
              <div className="text-[10px] uppercase tracking-wide text-white/40 mb-1.5">{s.included}</div>
              <div className="flex flex-wrap gap-1.5">
                {item.included.map((inc) => (
                  <span key={inc} className="inline-flex items-center gap-1 text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#00B4D8]" /> {inc}
                  </span>
                ))}
              </div>
            </div>
          )}
          {item.notIncluded && (
            <div className="mt-2">
              <div className="text-[10px] uppercase tracking-wide text-white/30 mb-1.5">{s.notIncluded}</div>
              <div className="flex flex-wrap gap-1.5">
                {item.notIncluded.map((ni) => (
                  <span key={ni} className="inline-flex items-center gap-1 text-[10px] border border-white/8 text-white/35 px-2 py-0.5 rounded-full">
                    <XCircle className="w-2.5 h-2.5 text-white/30 shrink-0" /> {ni}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price + CTA */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-white/50">{s.from}</div>
              <div className="font-serif text-2xl text-[#00B4D8]">{item.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={waLink(item.waMsg || `Hi Freeway Scuba Diving, I'd like to book the ${item.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <WaIcon className="w-4 h-4" /> {s.book}
              </a>
              <Link
                to={`/book?i=${bookIndex(item)}`}
                className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Mail className="w-4 h-4" /> {s.book}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Packages() {
  const { t } = useLanguage();
  const p = t.packages;
  const ui = t.ui.packages;
  const s = t.ui.shared;

  const packageItems = p.items.filter((i) => i.tag === "Best Value" || i.tag === "Full Experience" || i.tag === "Mejor Valor" || i.tag === "Experiencia Completa");
  const snorkelItems = p.items.filter((i) => i.tag === "Snorkeling" || i.tag === "Seasonal" || i.tag === "Snorkel" || i.tag === "Temporada");
  const otherItems = p.items.filter((i) => !packageItems.includes(i) && !snorkelItems.includes(i));

  return (
    <>
      <Helmet>
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/Pit-dos-ojos-cenote-scaled.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/Pit-dos-ojos-cenote-scaled.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" }, { "@type": "ListItem", position: 2, name: "Packages", item: "https://freewayscubadiving.com/packages" }] })}</script>
      </Helmet>

      <PageHeader
        image={IMAGES.cenoteLight}
        badge="Tulum · Playa del Carmen"
        title={p.title}
        subtitle={p.subtitle}
        imgAlt={t.ui.alt.packagesPage}
      />

      {/* Diving Packages */}
      <section className="py-20 lg:py-28 bg-[#061A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{ui.pkgEyebrow}</span>
            <h2 className="mt-3 font-serif text-white text-3xl sm:text-4xl tracking-tight">{ui.pkgH2}</h2>
            <p className="mt-3 text-white/60 max-w-xl">{p.subtitle}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {packageItems.map((item, i) => (
              <TourCard key={item.name} item={item} index={i} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Snorkeling Tours */}
      <section className="py-20 bg-[#020B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{ui.snorkelEyebrow}</span>
            <h2 className="mt-3 font-serif text-white text-3xl sm:text-4xl tracking-tight">{ui.snorkelH2}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {snorkelItems.map((item, i) => (
              <TourCard key={item.name} item={item} index={i} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Other (fallback) */}
      {otherItems.length > 0 && (
        <section className="py-20 bg-[#061A2B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherItems.map((item, i) => (
                <TourCard key={item.name} item={item} index={i} s={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#061A2B] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl sm:text-4xl mb-4">{p.cta}</h2>
          <p className="text-white/60 mb-8">{ui.ctaP}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waLink("Hi Freeway Scuba Diving, I'd like to check availability for a diving package in Tulum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
            >
              <WaIcon className="w-5 h-5" /> {ui.ctaBtn1}
            </a>
            <Link
              to="/cenote-diving"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 font-semibold px-8 py-4 rounded-full transition-colors"
            >
              {ui.ctaBtn2} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <ReviewCarousel topic="package" />
    </>
  );
}
