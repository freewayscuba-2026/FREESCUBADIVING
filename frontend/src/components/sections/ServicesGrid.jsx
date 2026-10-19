import { Link } from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { IMAGES } from "@/data/content";
import { ArrowRight } from "lucide-react";

const serviceImages = {
  cenote: IMAGES.cenote,
  reef: IMAGES.reef,
  courses: IMAGES.course,
};

export const ServicesGrid = () => {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section className="py-20 lg:py-28 bg-[#020B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">{s.label}</span>
          <h2 className="mt-3 font-serif text-white text-3xl sm:text-4xl tracking-tight">{s.title}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cenote — highlighted */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group min-h-[420px] flex flex-col justify-end">
            <img
              src={serviceImages.cenote}
              alt="PADI diving instructor guiding a small group of divers in Tulum"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020B14]/90 via-[#020B14]/40 to-transparent" />
            <div className="relative p-8">
              <span className="inline-block bg-[#00B4D8] text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                {s.cenote.tag}
              </span>
              <h3 className="font-serif text-white text-3xl sm:text-4xl mb-3">{s.cenote.name}</h3>
              <p className="text-white/75 text-base max-w-lg leading-relaxed mb-6">{s.cenote.desc}</p>
              <Link
                to={s.cenote.link}
                className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
              >
                {s.cenote.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Reef + Courses stacked */}
          <div className="flex flex-col gap-6">
            {[
              { key: "reef", img: serviceImages.reef, alt: "Diver swimming over coral reef in Cozumel, Mexico" },
              { key: "courses", img: serviceImages.courses, alt: "PADI Open Water certification course in Playa del Carmen" },
            ].map(({ key, img, alt }) => {
              const svc = s[key];
              return (
                <div key={key} className="relative rounded-2xl overflow-hidden group flex-1 min-h-[190px] flex flex-col justify-end">
                  <img
                    src={img}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020B14]/85 via-[#020B14]/30 to-transparent" />
                  <div className="relative p-6">
                    <h3 className="font-serif text-white text-xl mb-2">{svc.name}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{svc.desc}</p>
                    <Link
                      to={svc.link}
                      className="inline-flex items-center gap-1.5 text-[#00B4D8] font-semibold text-sm hover:gap-2.5 transition-all"
                    >
                      {svc.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Packages link */}
        <div className="mt-8 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            View Packages & Tours <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
