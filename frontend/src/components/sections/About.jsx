import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/data/content";
import { Reveal } from "@/components/Reveal";

export const About = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 sm:py-28 bg-[#F4F1EB]" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <img src={IMAGES.aboutDiver} alt={t.ui.alt.aboutDiver} className="w-full h-[420px] sm:h-[520px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:-right-6 w-40 sm:w-52 overflow-hidden rounded-2xl shadow-xl border-4 border-[#F4F1EB] hidden xs:block">
              <img src={IMAGES.reef} alt={t.ui.alt.aboutReef} className="w-full h-32 sm:h-40 object-cover" />
            </div>
            <div className="absolute -top-5 -left-3 sm:-left-5 bg-[#061A2B] text-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="grid grid-cols-3 gap-4">
                {t.about.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-serif text-xl sm:text-2xl text-[#00B4D8]">{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-white/70 leading-tight mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#00B4D8]">{t.about.label}</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">{t.about.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[#4B5563] text-base sm:text-lg leading-relaxed">{t.about.p1}</p>
            <p className="mt-4 text-[#4B5563] leading-relaxed">{t.about.p2}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {t.about.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00B4D8]/15 text-[#00B4D8] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-sm text-[#061A2B]">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
