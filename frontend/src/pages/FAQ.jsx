import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { IMAGES } from "@/data/content";
import { PageHeader } from "@/components/sections/PageHeader";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Do I need to be certified for cenote diving in Tulum?", acceptedAnswer: { "@type": "Answer", text: "For scuba cenote diving, Open Water certification (or equivalent) is required. We also offer cavern snorkeling for non-certified guests. Our guides will help you choose the right option for your level." } },
    { "@type": "Question", name: "Is cenote diving in Tulum safe?", acceptedAnswer: { "@type": "Answer", text: "Yes — cenote diving is safe when done with certified, experienced guides. Every cenote dive starts with a thorough safety briefing, and we use professional equipment throughout. We keep groups to a maximum of 4 divers per guide." } },
    { "@type": "Question", name: "What is included in a cenote diving tour in Tulum?", acceptedAnswer: { "@type": "Answer", text: "Your cenote dive includes certified guide, full diving equipment, tanks and weights, and safety briefing. Cenote entrance fees (~$400 MXN) are paid separately in cash at the cenote." } },
    { "@type": "Question", name: "What makes cenote diving different from reef diving?", acceptedAnswer: { "@type": "Answer", text: "Cenotes are natural freshwater sinkholes with 30–60m visibility, dramatic cave formations and ethereal light beams. The experience is completely different from ocean diving — many divers say it is the most magical dive of their lives." } },
    { "@type": "Question", name: "Can beginners go cenote diving in Tulum?", acceptedAnswer: { "@type": "Answer", text: "Yes. With Open Water certification, beginners can enjoy cenote diving. We also offer Discover Scuba Diving experiences for those without any certification." } },
    { "@type": "Question", name: "How long does a cenote diving experience take?", acceptedAnswer: { "@type": "Answer", text: "A typical cenote dive tour takes around 4–5 hours, including transport to the cenote, safety briefing, the dive and return. Full-day packages combining cenote and reef are also available (8 hours)." } },
    { "@type": "Question", name: "What should I bring for cenote diving?", acceptedAnswer: { "@type": "Answer", text: "Bring swimwear, a towel, reef-safe sunscreen, water and cash for the cenote entrance fee (~$400 MXN). We provide all diving equipment." } },
    { "@type": "Question", name: "How do I book a cenote dive in Tulum?", acceptedAnswer: { "@type": "Answer", text: "Simply tap any 'Book Cenote Diving' button on our website. This opens WhatsApp with a pre-filled message — we confirm availability and organize everything from there." } },
    { "@type": "Question", name: "Which cenotes can I dive near Tulum?", acceptedAnswer: { "@type": "Answer", text: "We dive Gran Cenote, Dos Ojos, Calavera (Temple of Doom), Tajma Ha and Cristal & Escondido — all within 25km of Tulum. Each offers a different underwater landscape and experience level." } },
    { "@type": "Question", name: "Do you offer reef diving in addition to cenote diving?", acceptedAnswer: { "@type": "Answer", text: "Yes — we offer reef diving in Playa del Carmen and Cozumel, including drift dives, bull shark encounters (November–March) and whale shark snorkeling (May–September)." } },
  ],
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://freewayscubadiving.com/faq" },
  ],
};

export default function FAQ() {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/dos-ojos-cenote-2.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <PageHeader badge={t.faq.label} title={t.faq.title} subtitle={t.faq.subtitle} image={IMAGES.diverBubbles} />
      <FaqSection />
      <section className="py-14 bg-[#020B14] text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </section>
      <ReviewCarousel topic="general" />
      <ContactSection />
    </>
  );
}
