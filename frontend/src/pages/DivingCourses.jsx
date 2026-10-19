import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, IMAGES } from "@/data/content";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";
import { WaIcon, iconMap } from "@/components/icons";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Clock, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import padiLogo from "@/assets/padi-logo.svg";

const tagColors = {
  Beginner:      "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Principiante:  "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Certification: "bg-[#00B4D8]/20 text-[#00B4D8] border-[#00B4D8]/30",
  Certificación: "bg-[#00B4D8]/20 text-[#00B4D8] border-[#00B4D8]/30",
  Specialty:     "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Especialidad:  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Refresh:       "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Repaso:        "bg-amber-500/20 text-amber-300 border-amber-500/30",
};


function CourseCard({ item, index }) {
  const { t } = useLanguage();
  const s = t.ui.shared;
  return (
    <Reveal delay={(index % 3) * 0.07}>
      <div className="group h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-colors hover:border-[#00B4D8]/40">
        {/* Image */}
        <div className="relative h-48 overflow-hidden shrink-0">
          <img
            src={item.image || IMAGES.course}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061A2B]/85 to-transparent" />
          <span className={`absolute top-3 left-3 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full border ${tagColors[item.tag] || "bg-white/10 text-white/70 border-white/10"}`}>
            {item.tag}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-serif text-xl text-white leading-snug">{item.name}</h3>
          <p className="mt-2 text-sm text-white/65 leading-relaxed flex-1">{item.desc}</p>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {item.duration && (
              <div className="flex items-center gap-1.5 text-white/60">
                <Clock className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.duration}
              </div>
            )}
            {item.level && (
              <div className="flex items-center gap-1.5 text-white/60">
                <BookOpen className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.level}
              </div>
            )}
            {item.sessions && (
              <div className="flex items-center gap-1.5 text-white/60 col-span-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" /> {item.sessions}
              </div>
            )}
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
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.included.map((inc) => (
                <span key={inc} className="inline-flex items-center gap-1 text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-2.5 h-2.5 text-[#00B4D8]" /> {inc}
                </span>
              ))}
            </div>
          )}

          {/* Price + CTA */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-white/50">{s.from}</div>
              <div className="font-serif text-2xl text-[#00B4D8]">{item.price}</div>
            </div>
            <a
              href={waLink(`Hi Freeway Scuba Diving, I'd like information about the ${item.name} course in Tulum.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-4 py-2.5 rounded-full text-sm transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <WaIcon className="w-4 h-4" /> {s.ask}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function DivingCourses() {
  const { t } = useLanguage();
  const c = t.courses;
  const ui = t.ui.courses;

  return (
    <>
      <Helmet>
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/open-water-course-scaled.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/open-water-course-scaled.jpg" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" }, { "@type": "ListItem", position: 2, name: "Diving Courses", item: "https://freewayscubadiving.com/diving-courses" }] })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Diving Courses in Tulum",
          "description": "PADI diving courses in Tulum: Discover Scuba, Open Water, Advanced Open Water, Nitrox Specialty and Scuba Refresher.",
          "provider": { "@type": "LocalBusiness", "name": "Freeway Scuba Diving" },
          "areaServed": "Tulum, Quintana Roo, Mexico",
          "serviceType": "Diving Course",
          "offers": [
            { "@type": "Offer", "name": "Discover Scuba Diving", "price": "2500", "priceCurrency": "MXN" },
            { "@type": "Offer", "name": "Open Water Diver Certification", "price": "8900", "priceCurrency": "MXN" },
            { "@type": "Offer", "name": "Advanced Open Water", "price": "8500", "priceCurrency": "MXN" }
          ]
        })}</script>
      </Helmet>

      <PageHeader
        image={IMAGES.course}
        badge={t.ui.coursesBadge}
        title={t.courses.title}
        subtitle={t.courses.subtitle}
        imgAlt={t.ui.alt.coursesPage}
      />

      {/* PADI Badge */}
      <section className="py-8 bg-[#020B14] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <img src={padiLogo} alt="PADI" className="h-12 w-auto shrink-0" />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">{ui.padiLabel}</p>
              <p className="text-white/55 text-xs mt-0.5">{ui.padiDesc}</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div className="text-sm text-white/60 max-w-xs">
            <span className="text-white font-medium">{ui.pickupLabel}</span> {ui.pickupText}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{c.label}</span>
          <h2 className="mt-4 font-serif text-white text-3xl sm:text-4xl tracking-tight">{ui.introH2}</h2>
          <p className="mt-5 text-white/65 text-base leading-relaxed max-w-2xl mx-auto">{c.subtitle}</p>
          <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-2xl mx-auto">
            {ui.introP}
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="pb-20 bg-[#061A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.items.map((item, i) => (
              <CourseCard key={item.name} item={item} index={i} />
            ))}
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

      {/* Cenote upsell */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#00B4D8]/10 border border-[#00B4D8]/20 rounded-2xl p-8">
            <p className="text-[#00B4D8] text-xs font-semibold tracking-widest uppercase mb-2">{ui.afterEyebrow}</p>
            <h3 className="font-serif text-white text-2xl mb-3">{ui.afterH3}</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-6">
              {ui.afterP}
            </p>
            <Link
              to="/cenote-diving"
              className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3 rounded-full transition-transform hover:-translate-y-0.5"
            >
              {ui.afterCta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#020B14] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-white text-3xl sm:text-4xl mb-4">{ui.ctaH2}</h2>
          <p className="text-white/60 mb-8">{ui.ctaP}</p>
          <a
            href={waLink("Hi Freeway Scuba Diving, I'd like information about diving courses in Tulum.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
          >
            <WaIcon className="w-5 h-5" /> {ui.ctaBtn}
          </a>
        </div>
      </section>
      <ReviewCarousel topic="course" />
    </>
  );
}
