import { useLanguage } from "@/context/LanguageContext";
import { waLink, waFor } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const FaqSection = ({ background = "light" }) => {
  const { t } = useLanguage();
  const f = t.faq;
  const dark = background === "dark";
  return (
    <section className={`py-20 sm:py-28 ${dark ? "bg-[#020B14] text-white" : "bg-[#F4F1EB]"}`} data-testid="faq-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#00B4D8]">{f.label}</span>
          <h2 className={`mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance ${dark ? "text-white" : ""}`}>{f.title}</h2>
          <p className={`mt-5 ${dark ? "text-white/65" : "text-[#4B5563]"}`}>{f.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-10 w-full space-y-3">
            {f.items.map((item, i) => (
              <AccordionItem
                key={i} value={`faq-${i}`} data-testid={`faq-item-${i}`}
                className={`rounded-xl border px-5 ${dark ? "bg-white/5 border-white/10" : "bg-white border-black/5"}`}
              >
                <AccordionTrigger className={`text-left text-base font-semibold hover:no-underline ${dark ? "text-white" : "text-[#061A2B]"}`}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className={`text-sm leading-relaxed ${dark ? "text-white/65" : "text-[#4B5563]"}`}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <a
            href={waLink(undefined, t.code)} target="_blank" rel="noopener noreferrer" data-testid="faq-whatsapp-btn"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/20"
          >
            <WaIcon className="w-5 h-5" /> {t.nav.book}
          </a>
        </Reveal>
      </div>
    </section>
  );
};
