import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { Hero } from "@/components/sections/Hero";
import { CenoteSpecialty } from "@/components/sections/CenoteSpecialty";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import { useLanguage } from "@/context/LanguageContext";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";
import { ArrowRight } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "SportsActivityLocation"],
      "@id": "https://freewayscubadiving.com/#business",
      name: "Freeway Scuba Diving",
      alternateName: "Freeway Scuba Diving Tulum",
      description: "Cenote diving specialists in Tulum. Certified local guides, small groups of max 4 divers, safety-first approach. Also offering reef diving, PADI courses and seasonal shark experiences across Tulum & Playa del Carmen.",
      url: "https://freewayscubadiving.com",
      telephone: "+529841361212",
      email: "freewayscuba@gmail.com",
      image: "https://freewayscubadiving.com/wp-content/uploads/2023/07/dos-ojos-cenote-2.jpg",
      logo: "https://freewayscubadiving.com/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tulum",
        addressLocality: "Tulum",
        addressRegion: "Quintana Roo",
        postalCode: "77760",
        addressCountry: "MX",
      },
      geo: { "@type": "GeoCoordinates", latitude: 20.2114, longitude: -87.4654 },
      areaServed: [
        { "@type": "City", name: "Tulum" },
        { "@type": "City", name: "Playa del Carmen" },
        { "@type": "City", name: "Cozumel" },
      ],
      priceRange: "$$",
      currenciesAccepted: "MXN, USD",
      paymentAccepted: "Cash, Credit Card",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "300",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://www.instagram.com/freewayscuba",
        "https://www.facebook.com/freewayscuba",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Diving Experiences in Tulum",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cenote Diving Tours", url: "https://freewayscubadiving.com/cenote-diving" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reef Diving", url: "https://freewayscubadiving.com/reef-diving" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PADI Diving Courses", url: "https://freewayscubadiving.com/diving-courses" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://freewayscubadiving.com/#website",
      url: "https://freewayscubadiving.com",
      name: "Freeway Scuba Diving",
      description: "Cenote diving specialists in Tulum & Playa del Carmen, Mexico.",
      publisher: { "@id": "https://freewayscubadiving.com/#business" },
      inLanguage: ["en", "es"],
    },
    {
      "@type": "Organization",
      "@id": "https://freewayscubadiving.com/#organization",
      name: "Freeway Scuba Diving",
      url: "https://freewayscubadiving.com",
      logo: "https://freewayscubadiving.com/logo.png",
      foundingLocation: { "@type": "Place", name: "Tulum, Mexico" },
      knowsAbout: ["Cenote Diving", "Scuba Diving", "Cave Diving", "Reef Diving", "PADI Courses", "Tulum & Playa del Carmen", "Tulum Cenotes"],
      award: "PADI Certified Dive Center",
    },
  ],
};

function HomeIntro() {
  const { t } = useLanguage();
  const i = t.homeIntro;
  return (
    <section className="py-16 lg:py-20 bg-[#F4F1EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-5 text-[#061A2B]/80 text-base sm:text-lg leading-relaxed">
          <p className="font-medium text-[#061A2B]">{i.p1}</p>
          <p>{i.p2}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/packages" className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3 rounded-full transition-transform hover:-translate-y-0.5 shadow-md shadow-[#00B4D8]/20">
            {t.ui.shared.viewAllTours} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/diving-courses" className="inline-flex items-center gap-2 border border-[#061A2B]/20 text-[#061A2B] hover:bg-[#061A2B]/5 font-semibold px-6 py-3 rounded-full transition-colors">
            {t.ui.shared.padiCourses} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ReefPassion() {
  const { t } = useLanguage();
  const r = t.reefPassion;
  return (
    <section className="py-20 lg:py-28 bg-[#020B14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{r.eyebrow}</span>
          <p className="mt-5 text-white/70 text-base sm:text-lg leading-relaxed">{r.intro}</p>
          <h2 className="mt-8 font-serif text-white text-3xl sm:text-4xl tracking-tight leading-tight text-balance">{r.h2}</h2>
          <p className="mt-6 text-white/70 text-base leading-relaxed">{r.body}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {r.points.map((p) => (
            <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-semibold text-base">{p.title}</p>
              <p className="text-white/60 text-sm mt-2 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link to="/reef-diving" className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#00B4D8]/20">
            {r.ctaBtn} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Hero />
      <HomeIntro />
      <ServicesGrid />
      <CenoteSpecialty />
      <ReefPassion />
      <WhyChooseUs />
      <ReviewCarousel topic="general" />
      <ContactSection />
    </>
  );
}
