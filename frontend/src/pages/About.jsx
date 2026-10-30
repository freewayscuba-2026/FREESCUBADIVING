import { useRef, useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { Link } from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { waLink } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { PageHeader } from "@/components/sections/PageHeader";
import { CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "@/data/content";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";

const WP = "https://freewayscubadiving.com/wp-content/uploads";

const carouselSlides = [
  { src: "https://lh3.googleusercontent.com/d/1XP_ZJChtntUfjli_ZV4MNpjDFwE44GDj", labelEn: "Freeway Scuba Team", labelEs: "Equipo Freeway Scuba" },
  { src: "https://lh3.googleusercontent.com/d/1cyrlS4-vGnBCMKSGUhUSEP-RNfEaFNap", labelEn: "Our Divers",         labelEs: "Nuestros Buzos" },
  { src: "https://lh3.googleusercontent.com/d/1mitjgMGBt3EcMF8xntVC2d6yB2L9bSve", labelEn: "Group Experience",   labelEs: "Experiencia Grupal" },
  { src: `${WP}/2023/07/dos-ojos-cenote-2.jpg`,               labelEn: "Cenote Dos Ojos",        labelEs: "Cenote Dos Ojos" },
  { src: `${WP}/2023/07/Pit-dos-ojos-cenote-scaled.jpg`,       labelEn: "The Pit",                labelEs: "The Pit" },
  { src: `${WP}/2023/07/casa-cenote-scaled.jpg`,               labelEn: "Casa Cenote",            labelEs: "Casa Cenote" },
  { src: `${WP}/2023/07/Angelita-cenote-scaled.jpg`,           labelEn: "Cenote Angelita",        labelEs: "Cenote Angelita" },
  { src: `${WP}/2023/07/diving-in-tulum-scaled.jpg`,           labelEn: "Reef Tulum",             labelEs: "Arrecife Tulum" },
  { src: `${WP}/2023/07/divinginplayaweb-scaled.jpg`,          labelEn: "Playa del Carmen",       labelEs: "Playa del Carmen" },
  { src: `${WP}/2023/07/Discovery-scuba-diving-3-scaled.jpg`,  labelEn: "Discover Scuba",         labelEs: "Descubre el Buceo" },
  { src: `${WP}/2023/07/open-water-course-scaled.jpg`,         labelEn: "Open Water Course",      labelEs: "Curso Open Water" },
  { src: `${WP}/2023/06/Advanced-course-scaled.jpg`,           labelEn: "Advanced Diver",         labelEs: "Buceador Avanzado" },
];

const VISIBLE = 3;
const INTERVAL_MS = 3500;

function ExperienceCarousel({ lang }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const total = carouselSlides.length;

  const advance = useCallback((dir) => {
    setIndex((i) => (i + dir + total) % total);
  }, [total]);

  useEffect(() => {
    timerRef.current = setInterval(() => advance(1), INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, [advance]);

  const resetTimer = (dir) => {
    clearInterval(timerRef.current);
    advance(dir);
    timerRef.current = setInterval(() => advance(1), INTERVAL_MS);
  };

  const visibleSlides = Array.from({ length: VISIBLE }, (_, i) =>
    carouselSlides[(index + i) % total]
  );

  return (
    <div className="relative">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleSlides.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            className={`relative overflow-hidden rounded-2xl aspect-[4/3] transition-all duration-500 ${
              i === 1 ? "lg:scale-105 lg:z-10 shadow-2xl shadow-black/40" : "opacity-80 shadow-lg"
            }`}
          >
            <img
              src={slide.src}
              alt={lang === "es" ? slide.labelEs : slide.labelEn}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold text-sm sm:text-base">
              {lang === "es" ? slide.labelEs : slide.labelEn}
            </span>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => resetTimer(-1)}
        aria-label={lang === "es" ? "Anterior" : "Previous"}
        className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#061A2B]/80 border border-white/20 text-white hover:bg-[#00B4D8] transition-colors shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => resetTimer(1)}
        aria-label={lang === "es" ? "Siguiente" : "Next"}
        className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#061A2B]/80 border border-white/20 text-white hover:bg-[#00B4D8] transition-colors shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {carouselSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(timerRef.current); setIndex(i); timerRef.current = setInterval(() => advance(1), INTERVAL_MS); }}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index ? "bg-[#00B4D8] w-5 h-2" : "bg-white/30 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const { t, lang } = useLanguage();
  const a = t.about;

  return (
    <>
      <Helmet>
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/Discovery-scuba-diving-3-scaled.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Freeway Scuba Diving",
          url: "https://freewayscubadiving.com/about",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" },
              { "@type": "ListItem", position: 2, name: "About Us", item: "https://freewayscubadiving.com/about" },
            ],
          },
          mainEntity: {
            "@type": "LocalBusiness",
            name: "Freeway Scuba Diving",
            description: "PADI Instructor Diego, Full Cave Diver, cenote diving specialists in Tulum.",
            foundingLocation: { "@type": "Place", name: "Tulum, Quintana Roo, Mexico" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "300", bestRating: "5" },
          },
        })}</script>
      </Helmet>

      <PageHeader
        image={IMAGES.aboutDiver}
        badge="Tulum · Playa del Carmen"
        title={t.ui.about.pageTitle}
        subtitle={t.ui.about.pageSubtitle}
        imgAlt={t.ui.alt.aboutPage}
      />

      {/* Diego quote */}
      <section className="py-12 bg-[#020B14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif text-white text-xl sm:text-2xl leading-relaxed italic">
            {lang === "es"
              ? "“Explora los cenotes de Tulum y Playa del Carmen con un especialista local que guía personalmente tu aventura.”"
              : "“Explore the Cenotes of Tulum and Playa del Carmen with a local specialist who personally guides your adventure.”"}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[#00B4D8] text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <span>Diego Tenaglia</span>
            <span className="text-white/30">|</span>
            <span>{t.ui.about.role}</span>
            <span className="text-white/30">|</span>
            <span>Full Cave Diver</span>
          </div>
        </div>
      </section>

      {/* Bio section */}
      <section className="py-20 lg:py-28 bg-[#061A2B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{a.label}</span>
            <h2 className="mt-4 font-serif text-white text-3xl sm:text-4xl tracking-tight leading-tight">{a.title}</h2>
            <p className="mt-6 text-white/75 text-base leading-relaxed">{a.p1}</p>
            <p className="mt-4 text-white/65 text-base leading-relaxed">{a.p3}</p>
            <p className="mt-4 text-white/65 text-base leading-relaxed">{a.p4}</p>
            <p className="mt-4 text-white/60 text-base leading-relaxed">{a.p5}</p>
            <ul className="mt-8 space-y-3">
              {a.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-white/80 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" /> {pt}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/cenote-diving"
                className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3.5 rounded-full transition-transform hover:-translate-y-1"
              >
                {lang === "es" ? "Explorar Buceo en Cenotes" : "Explore Cenote Diving"} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={waLink(lang === "es"
                  ? "¡Hola Freeway Scuba Diving! Me gustaría saber más sobre sus experiencias de buceo."
                  : "Hi Freeway Scuba Diving! I'd like to learn more about your cenote diving experiences."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3.5 rounded-full transition-transform hover:-translate-y-1"
              >
                <WaIcon className="w-5 h-5" /> {lang === "es" ? "Escríbenos" : "Message Us"}
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {a.stats.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="font-serif text-[#00B4D8] text-3xl font-bold">{s.value}</p>
                <p className="text-white/60 text-xs mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience photo carousel */}
      <section className="py-20 lg:py-28 bg-[#020B14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">
              {lang === "es" ? "Nuestras Experiencias" : "Our Experiences"}
            </span>
            <h2 className="mt-4 font-serif text-white text-3xl sm:text-4xl tracking-tight">
              {lang === "es" ? "El mundo que te espera bajo el agua" : "The world waiting for you underwater"}
            </h2>
          </div>
          <div className="px-8 sm:px-10">
            <ExperienceCarousel lang={lang} />
          </div>
        </div>
      </section>

      {/* Review CTA */}
      <section className="py-14 bg-[#061A2B] text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </section>
      <ReviewCarousel topic="general" />
    </>
  );
}
