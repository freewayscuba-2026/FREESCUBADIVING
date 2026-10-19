import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, IMAGES } from "@/data/content";
import { WaIcon, iconMap } from "@/components/icons";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal } from "@/components/Reveal";
import { useCalendar } from "@/lib/useCalendar";
import { Clock, BarChart2, MapPin, Anchor, CheckCircle2, ArrowRight, Users, XCircle, Mail } from "lucide-react";

// Map a reef/wreck tour to the booking form's interest index (order shared EN/ES)
function bookIndex(item) {
  const type = (item.type || "").toLowerCase();
  if (type.includes("wreck") || type.includes("naufragio")) return 2;
  if (type.includes("drift") || type.includes("deriva") || item.name?.toLowerCase().includes("cozumel")) return 3;
  return 1; // reef diving
}

function SeasonBadge({ item }) {
  const { month } = useCalendar();
  const { t } = useLanguage();
  const s = t.ui.shared;
  if (!item.seasonMonths) return null;
  const inSeason = item.seasonMonths.includes(month);
  return (
    <div className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold ${inSeason ? "bg-green-500/15 text-green-400 border-b border-green-500/20" : "bg-white/5 text-white/40 border-b border-white/10"}`}>
      <span className={`w-2 h-2 rounded-full shrink-0 ${inSeason ? "bg-green-400 animate-pulse" : "bg-white/20"}`} />
      {inSeason ? s.inSeasonNow : s.outOfSeason}
    </div>
  );
}

function TourCard({ item, index }) {
  const { t } = useLanguage();
  const s = t.ui.shared;
  return (
    <Reveal delay={(index % 3) * 0.07}>
      <div className="group h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-colors hover:border-[#00B4D8]/40">
      <SeasonBadge item={item} />
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
          {item.cenote === null && item.type && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#061A2B]/70 backdrop-blur-sm text-white/90 text-xs px-2.5 py-1 rounded-full">
              <Anchor className="w-3 h-3 text-[#00B4D8]" /> {item.type}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5">
          {item.type && (
            <span className="text-[10px] uppercase tracking-widest text-[#00B4D8]/80 font-semibold mb-1">{item.type}</span>
          )}
          <h3 className="font-serif text-xl text-white leading-snug">{item.name}</h3>
          <p className="mt-2 text-sm text-white/65 leading-relaxed flex-1">{item.desc}</p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-white/60">
              <Clock className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.duration}
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <BarChart2 className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.depth}
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <MapPin className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.distance}
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <Users className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.groupSize || s.maxDivers6}
            </div>
          </div>

          {item.highlights && (
            <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
              {item.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs text-white/70">
                  <span className="text-[#00B4D8] mt-0.5">✦</span> {h}
                </li>
              ))}
            </ul>
          )}

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

export default function ReefDiving() {
  const { t } = useLanguage();
  const r = t.ui.reef;

  const reefItems = t.packages.items.filter(
    (i) => i.cenote === null && i.type && !i.type.toLowerCase().includes("snorkel")
  );
  const snorkelItem = t.packages.items.find(
    (i) => i.type && i.type.toLowerCase().includes("snorkel")
  );
  const comboItem = t.packages.items.find(
    (i) => i.type && i.type.toLowerCase().includes("combo")
  );

  return (
    <>
      <Helmet>
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/diving-in-tulum-scaled.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/diving-in-tulum-scaled.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" }, { "@type": "ListItem", position: 2, name: "Reef Diving", item: "https://freewayscubadiving.com/reef-diving" }] })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Reef Diving in Tulum & Playa del Carmen",
          "description": "Guided reef diving in Cozumel, Playa del Carmen and Tulum. Bull shark diving, whale shark snorkel and Caribbean drift dives.",
          "provider": { "@type": "LocalBusiness", "name": "Freeway Scuba Diving" },
          "areaServed": ["Cozumel", "Playa del Carmen", "Tulum"],
          "serviceType": "Reef Diving Tour",
          "offers": [
            { "@type": "Offer", "name": "Cozumel Marine Park Drift Dive", "price": "4000", "priceCurrency": "MXN" },
            { "@type": "Offer", "name": "Bull Shark Dive Playa del Carmen", "price": "3500", "priceCurrency": "MXN" },
            { "@type": "Offer", "name": "Whale Shark Snorkel", "price": "3900", "priceCurrency": "MXN" }
          ]
        })}</script>
      </Helmet>

      <PageHeader
        image={IMAGES.reef}
        badge="Tulum · Playa del Carmen · Cozumel"
        title={t.pageTitles?.reef?.title}
        subtitle={t.pageTitles?.reef?.subtitle}
        imgAlt={t.ui.alt.reefPage}
      />

      {/* Intro */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{r.eyebrow}</span>
          <h2 className="mt-4 font-serif text-white text-3xl sm:text-4xl tracking-tight">
            {r.h2}
          </h2>
          <p className="mt-5 text-white/65 text-base leading-relaxed max-w-2xl mx-auto">
            {r.intro}
          </p>
        </div>
      </section>

      {/* Reef Cards */}
      <section className="pb-20 bg-[#061A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reefItems.map((item, i) => (
              <TourCard key={item.name} item={item} index={i} />
            ))}
            {snorkelItem && <TourCard key={snorkelItem.name} item={snorkelItem} index={reefItems.length} />}
          </div>
        </div>
      </section>

      {/* Combo upsell */}
      {comboItem && (
        <section className="py-16 bg-[#020B14]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-10">
              <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{r.comboEyebrow}</span>
              <h2 className="mt-3 font-serif text-white text-2xl sm:text-3xl">{r.comboH2}</h2>
            </Reveal>
            <div className="max-w-sm mx-auto">
              <TourCard item={comboItem} index={0} />
            </div>
          </div>
        </section>
      )}

      {/* Why us */}
      <section className="py-20 bg-[#061A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{r.whyEyebrow}</span>
            <h2 className="mt-3 font-serif text-white text-3xl sm:text-4xl tracking-tight">
              {r.whyH2}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {r.whyPoints.map((p) => {
              const Icon = iconMap[p.icon];
              return (
                <div key={p.title} className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/20 shrink-0">
                    <Icon className="w-4 h-4 text-[#00B4D8]" />
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{p.title}</p>
                    <p className="text-white/60 text-sm mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cenote upsell */}
      <section className="py-16 bg-[#020B14]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#00B4D8]/10 border border-[#00B4D8]/20 rounded-2xl p-8">
            <p className="text-[#00B4D8] text-xs font-semibold tracking-widest uppercase mb-2">{r.cenoteEyebrow}</p>
            <h3 className="font-serif text-white text-2xl mb-3">{r.cenoteH3}</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              {r.cenoteP}
            </p>
            <Link
              to="/cenote-diving"
              className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3 rounded-full transition-transform hover:-translate-y-0.5"
            >
              {r.cenoteCta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Open Water CTA */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-[#00B4D8] text-xs font-semibold tracking-widest uppercase mb-2">{r.courseEyebrow}</p>
            <h3 className="font-serif text-white text-2xl mb-3">{r.courseH3}</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              {r.courseP}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/diving-courses"
                className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3 rounded-full transition-transform hover:-translate-y-0.5"
              >
                {r.courseCta} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/diving-courses"
                className="inline-flex items-center justify-center gap-2 border border-[#00B4D8]/40 text-[#00B4D8] hover:bg-[#00B4D8]/10 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                {r.advancedCta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#061A2B] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl sm:text-4xl mb-4">{r.ctaH2}</h2>
          <p className="text-white/60 mb-8">{r.ctaP}</p>
          <a
            href={waLink("Hi Freeway Scuba Diving, I'd like to book a reef diving experience in Tulum & Playa del Carmen.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
          >
            <WaIcon className="w-5 h-5" /> {r.ctaBtn}
          </a>
        </div>
      </section>
      <ReviewCarousel topic="reef" />
    </>
  );
}
