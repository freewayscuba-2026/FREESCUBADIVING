import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/data/content";
import { PageHeader } from "@/components/sections/PageHeader";
import { BookingForm } from "@/components/BookingForm";
import { ContactSection } from "@/components/sections/ContactSection";
import { Reveal } from "@/components/Reveal";

export default function BookNow() {
  const { t } = useLanguage();
  const b = t.booking;
  const c = t.contact;
  return (
    <>
      <Helmet>
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/diving-in-tulum-scaled.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" }, { "@type": "ListItem", position: 2, name: "Book", item: "https://freewayscubadiving.com/book" }] })}</script>
      </Helmet>

      <PageHeader badge={b.label} title={b.title} subtitle={b.subtitle} image={IMAGES.tulum} />

      <section className="py-16 lg:py-24 bg-[#061A2B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <BookingForm />
          </Reveal>

          {(c.whyTitle || c.planTitle) && (
            <Reveal delay={0.15} className="mt-14 grid md:grid-cols-2 gap-8">
              {c.planTitle && (
                <div>
                  <h3 className="font-serif text-white text-2xl tracking-tight">{c.planTitle}</h3>
                  <p className="mt-3 text-white/70 text-sm leading-relaxed">{c.planText}</p>
                </div>
              )}
              {c.whyTitle && (
                <div>
                  <h3 className="font-serif text-white text-2xl tracking-tight">{c.whyTitle}</h3>
                  <ul className="mt-3 space-y-2">
                    {c.whyPoints.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-white/75 text-sm leading-relaxed">
                        <span className="text-[#00B4D8] mt-0.5">✔</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          )}
        </div>
      </section>
      <ContactSection />
    </>
  );
}
