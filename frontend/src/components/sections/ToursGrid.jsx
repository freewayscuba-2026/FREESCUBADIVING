import { Clock, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, waFor } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

export const ToursGrid = ({ showHeader = true }) => {
  const { t } = useLanguage();
  const s = t.toursSection;
  return (
    <section className="py-20 sm:py-28 bg-[#061A2B] text-white" data-testid="tours-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <Reveal className="max-w-2xl">
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#00B4D8]">{s.label}</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">{s.title}</h2>
            <p className="mt-5 text-white/70 leading-relaxed">{s.subtitle}</p>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((tour, i) => {
            const msg = waFor(t.code).tour(tour.name);
            return (
              <Reveal key={tour.name} delay={(i % 3) * 0.08}>
                <div className="group h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-colors hover:border-[#00B4D8]/40" data-testid={`tour-card-${i}`}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={tour.image} alt={tour.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061A2B]/70 to-transparent" />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide uppercase bg-[#00B4D8] text-[#061A2B] px-2.5 py-1 rounded-full">{tour.level}</span>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-serif text-xl">{tour.name}</h3>
                    <p className="mt-2 text-sm text-white/65 leading-relaxed flex-1">{tour.desc}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-white/60">
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#00B4D8]" /> {tour.duration}</span>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-white/50">{s.from}</div>
                        <div className="font-serif text-2xl text-[#00B4D8]">{tour.price}</div>
                      </div>
                    </div>
                    <a
                      href={waLink(msg)} target="_blank" rel="noopener noreferrer" data-testid={`tour-book-btn-${i}`}
                      className="mt-5 inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 rounded-full transition-transform hover:-translate-y-0.5"
                    >
                      <WaIcon className="w-4 h-4" /> {s.cta}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
