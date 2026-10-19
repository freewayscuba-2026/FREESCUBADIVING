import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, IMAGES } from "@/data/content";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";
import { WaIcon, iconMap } from "@/components/icons";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { Reveal } from "@/components/Reveal";
import { useCalendar } from "@/lib/useCalendar";
import { Clock, BarChart2, MapPin, Anchor, CheckCircle2, ArrowRight, Users, XCircle, Play, Mail } from "lucide-react";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Do I need to be certified for cenote diving in Tulum?", acceptedAnswer: { "@type": "Answer", text: "For scuba cenote diving, Open Water certification is required. We also offer cavern snorkeling for non-certified guests." } },
    { "@type": "Question", name: "Is cenote diving safe?", acceptedAnswer: { "@type": "Answer", text: "Yes — with certified guides, professional equipment and thorough safety briefings, cenote diving is a safe and controlled experience." } },
    { "@type": "Question", name: "What makes cenote diving different from reef diving?", acceptedAnswer: { "@type": "Answer", text: "Cenotes are freshwater sinkholes with extraordinary clarity, dramatic cave formations and ethereal light beams — completely different from ocean diving." } },
  ],
};


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
      <div className={`group h-full flex flex-col bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden shadow-2xl transition-colors hover:border-[#00B4D8]/40 ${item.highlight ? "border-[#00B4D8]/50 ring-1 ring-[#00B4D8]/30" : "border-white/10"}`}>
      <SeasonBadge item={item} />
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
              <Users className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.groupSize || s.maxDivers4}
            </div>
          </div>

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
                to="/book?i=0"
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

export default function CenoteDiving() {
  const { t, lang } = useLanguage();
  const ui = t.ui.cenote;

  const cenoteItems = t.cenoteTours.items.filter(
    (i) => !i.type.toLowerCase().includes("combo")
  );

  const comboItem = t.cenoteTours.items.find((i) => i.type.toLowerCase().includes("combo"));

  return (
    <>
      <Helmet>
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/dos-ojos-cenote-2.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/dos-ojos-cenote-2.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" }, { "@type": "ListItem", position: 2, name: "Cenote Diving", item: "https://freewayscubadiving.com/cenote-diving" }] })}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Cenote Diving in Tulum",
          "description": "Guided cenote diving experiences in Tulum's freshwater cave systems. Small groups, certified guides, professional equipment.",
          "provider": { "@type": "LocalBusiness", "name": "Freeway Scuba Diving" },
          "areaServed": "Tulum, Quintana Roo, Mexico",
          "serviceType": "Cenote Diving Tour",
          "offers": [
            { "@type": "Offer", "name": "Gran Cenote Dive", "price": "2900", "priceCurrency": "MXN" },
            { "@type": "Offer", "name": "Dos Ojos Cave System", "price": "3200", "priceCurrency": "MXN" },
            { "@type": "Offer", "name": "Calavera Temple of Doom", "price": "3000", "priceCurrency": "MXN" }
          ]
        })}</script>
      </Helmet>

      <PageHeader
        image={IMAGES.heroCenote}
        badge={t.ui.cenoteBadge}
        title={t.pageTitles?.cenote?.title}
        subtitle={t.pageTitles?.cenote?.subtitle}
        imgAlt={t.ui.alt.cenotePage}
      />

      {/* Intro */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{ui.eyebrow}</span>
          <h2 className="mt-4 font-serif text-white text-3xl sm:text-4xl tracking-tight">
            {ui.h2}
          </h2>
          <p className="mt-5 text-white/65 text-base leading-relaxed max-w-2xl mx-auto">
            {ui.intro}
          </p>
        </div>
      </section>

      {/* What is a cenote */}
      <section className="py-14 bg-[#020B14]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{ui.whatToExpectEyebrow}</span>
              <h2 className="mt-3 font-serif text-white text-3xl sm:text-4xl tracking-tight">
                {ui.whatIsCenoteH2}
              </h2>
              <p className="mt-4 text-white/60 text-base leading-relaxed">
                {ui.cenoteDef}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ui.features.map((f) => (
                <div key={f.label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                  <span className="text-2xl">{f.icon}</span>
                  <p className="text-white/80 font-medium text-xs leading-snug">{f.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cenote Tour Cards */}
      <section className="pb-20 bg-[#061A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cenoteItems.map((item, i) => (
              <TourCard key={item.name} item={item} index={i} />
            ))}
            {comboItem && <TourCard key={comboItem.name} item={comboItem} index={cenoteItems.length} />}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-[#020B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{ui.whyEyebrow}</span>
            <h2 className="mt-3 font-serif text-white text-3xl sm:text-4xl tracking-tight">
              {ui.whyH2}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ui.whyPoints.map((p) => {
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

      {/* Sidemount upsell */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-[#00B4D8] text-xs font-semibold tracking-widest uppercase mb-2">{ui.sidemountEyebrow}</p>
            <h3 className="font-serif text-white text-2xl mb-3">{ui.sidemountH3}</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              {ui.sidemountText}
            </p>
            <Link
              to="/diving-courses"
              className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3 rounded-full transition-transform hover:-translate-y-0.5"
            >
              {ui.sidemountCta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* CTA */}
      <section className="py-20 bg-[#061A2B] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl sm:text-4xl mb-4">{ui.ctaH2}</h2>
          <p className="text-white/60 mb-8">{ui.ctaP}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waLink("Hi Freeway Scuba Diving, I'd like to book a cenote diving experience in Tulum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
            >
              <WaIcon className="w-5 h-5" /> {ui.ctaBtn}
            </a>
            <Link
              to="/packages"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 hover:bg-white/20 font-semibold px-8 py-4 rounded-full transition-colors"
            >
              {ui.ctaBtn2} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <ReviewCarousel topic="cenote" />
    </>
  );
}
