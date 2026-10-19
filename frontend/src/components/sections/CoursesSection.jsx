import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, waFor } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

export const CoursesSection = () => {
  const { t } = useLanguage();
  const c = t.courses;
  return (
    <section className="py-20 sm:py-28 bg-[#F4F1EB]" data-testid="courses-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#00B4D8]">{c.label}</span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl tracking-tight text-balance">{c.title}</h2>
          <p className="mt-5 text-[#4B5563] leading-relaxed">{c.subtitle}</p>
          <div className="mt-6 overflow-hidden rounded-2xl shadow-xl">
            <img src={c.image} alt={t.ui.alt.course} className="w-full h-56 object-cover" />
          </div>
        </Reveal>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
          {c.items.map((course, i) => {
            const msg = waFor(t.code).course(course.name);
            return (
              <Reveal key={course.name} delay={(i % 2) * 0.08}>
                <div className="h-full flex flex-col bg-white border border-black/5 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow" data-testid={`course-card-${i}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#061A2B] text-[#00B4D8]">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#00B4D8] bg-[#00B4D8]/10 px-2.5 py-1 rounded-full">{course.tag}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl">{course.name}</h3>
                  <p className="mt-2 text-sm text-[#4B5563] leading-relaxed flex-1">{course.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-serif text-2xl text-[#061A2B]">{course.price}</span>
                    <a
                      href={waLink(msg)} target="_blank" rel="noopener noreferrer" data-testid={`course-book-btn-${i}`}
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-transform hover:-translate-y-0.5"
                    >
                      <WaIcon className="w-4 h-4" /> {c.cta}
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
