import { Link } from "@/components/LocalizedLink";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, IMAGES } from "@/data/content";
import { WaIcon, iconMap } from "@/components/icons";

export const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroCenote}
          alt={t.ui.alt.hero}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B14] via-[#061A2B]/70 to-[#061A2B]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020B14]/85 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="hidden items-center gap-2 text-[#00B4D8] text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold"
          >
            <span className="w-8 h-px bg-[#00B4D8]" /> {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}
            className="mt-5 font-serif text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-balance leading-[1.05]"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6 text-white/80 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="hidden mt-3 text-white/60 text-sm sm:text-base max-w-xl leading-relaxed"
          >
            {t.hero.support}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 flex-wrap"
          >
            <Link
              to="/cenote-diving"
              data-testid="hero-cenote-btn"
              className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#00B4D8]/30"
            >
              {t.hero.ctaBook}
            </Link>
            <Link
              to="/packages"
              data-testid="hero-explore-btn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white backdrop-blur-md border border-white/25 hover:bg-white/20 font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              {t.hero.ctaExplore}
            </Link>
            <a
              href={waLink("Hi Freeway Scuba Diving, I'd like to check availability for cenote diving in Tulum.")}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-btn"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
            >
              <WaIcon className="w-5 h-5" /> {t.hero.ctaWhatsapp}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-12 hidden grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {t.hero.trust.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.label} className="flex items-center gap-2.5 text-white/85">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/15 shrink-0">
                    <Icon className="w-4 h-4 text-[#00B4D8]" />
                  </span>
                  <span className="text-xs sm:text-sm leading-tight">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
