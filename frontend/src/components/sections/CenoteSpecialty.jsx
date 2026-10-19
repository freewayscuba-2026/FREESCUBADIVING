import { Link } from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { iconMap } from "@/components/icons";

export const CenoteSpecialty = () => {
  const { t } = useLanguage();
  const s = t.cenoteSpecialty;

  return (
    <section className="py-20 lg:py-28 bg-[#061A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">
            {s.label}
          </span>
          <h2 className="mt-4 font-serif text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-balance">
            {s.title}
          </h2>
          <p className="mt-6 text-white/70 text-base sm:text-lg leading-relaxed">
            {s.text}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.points.map((point) => {
            const Icon = iconMap[point.icon];
            return (
              <div key={point.title} className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/20 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-[#00B4D8]" />
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">{point.title}</p>
                  <p className="text-white/60 text-sm mt-1 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/cenote-diving"
            className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#00B4D8]/20"
          >
            Explore Cenote Diving
          </Link>
        </div>
      </div>
    </section>
  );
};
