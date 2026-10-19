import { waLink } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/lib/useCalendar";

const SEASONS = {
  bullShark: { months: [11, 12, 1, 2, 3] },
  whaleShark: { months: [5, 6, 7, 8, 9] },
};

const BANNERS = {
  en: {
    bullShark: {
      emoji: "🦈",
      label: "IN SEASON NOW",
      title: "Bull Shark Diving — Available November to March",
      desc: "One of the world's most legendary dives. Face-to-face with bull sharks off Playa del Carmen. Limited spots.",
      cta: "Book Your Spot on WhatsApp",
      msg: "Hi Freeway Scuba Diving, I'm interested in the Bull Shark Dive — is it still available?",
      color: "from-red-900/80 to-[#061A2B]",
      border: "border-red-500/30",
      badge: "bg-red-500",
    },
    whaleShark: {
      emoji: "🐋",
      label: "IN SEASON NOW",
      title: "Whale Shark Snorkel — Available May to September",
      desc: "Swim alongside the world's largest fish in the warm Caribbean. No diving certification needed. Life-changing.",
      cta: "Book Your Spot on WhatsApp",
      msg: "Hi Freeway Scuba Diving, I'm interested in the Whale Shark Snorkel — is it still available?",
      color: "from-teal-900/80 to-[#061A2B]",
      border: "border-teal-400/30",
      badge: "bg-teal-500",
    },
  },
  es: {
    bullShark: {
      emoji: "🦈",
      label: "EN TEMPORADA",
      title: "Buceo con Tiburón Toro — Disponible de Noviembre a Marzo",
      desc: "Una de las inmersiones más legendarias del mundo. Cara a cara con tiburones toro en Playa del Carmen. Plazas limitadas.",
      cta: "Reservar por WhatsApp",
      msg: "Hola Freeway Scuba Diving, me interesa el buceo con tiburón toro — ¿hay disponibilidad?",
      color: "from-red-900/80 to-[#061A2B]",
      border: "border-red-500/30",
      badge: "bg-red-500",
    },
    whaleShark: {
      emoji: "🐋",
      label: "EN TEMPORADA",
      title: "Snorkel con Tiburón Ballena — Disponible de Mayo a Septiembre",
      desc: "Nada junto al pez más grande del mundo en el Caribe. Sin certificación de buceo necesaria. Una experiencia única.",
      cta: "Reservar por WhatsApp",
      msg: "Hola Freeway Scuba Diving, me interesa el snorkel con tiburón ballena — ¿hay disponibilidad?",
      color: "from-teal-900/80 to-[#061A2B]",
      border: "border-teal-400/30",
      badge: "bg-teal-500",
    },
  },
};

export function SeasonalBanner() {
  const { t } = useLanguage();
  const lang = t.code || "en";
  const { month } = useCalendar();

  const activeSeason = SEASONS.bullShark.months.includes(month)
    ? "bullShark"
    : SEASONS.whaleShark.months.includes(month)
    ? "whaleShark"
    : null;

  if (!activeSeason) return null;

  const b = (BANNERS[lang] || BANNERS.en)[activeSeason];

  return (
    <div className={`w-full bg-gradient-to-r ${b.color} border-b ${b.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`${b.badge} text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shrink-0`}>
            {b.label}
          </span>
          <div>
            <span className="text-white font-semibold text-sm">{b.emoji} {b.title}</span>
            <span className="hidden lg:inline text-white/60 text-sm ml-2">— {b.desc}</span>
          </div>
        </div>
        <a
          href={waLink(b.msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-4 py-2 rounded-full text-xs whitespace-nowrap transition-transform hover:-translate-y-0.5 shrink-0"
        >
          <WaIcon className="w-3.5 h-3.5" /> {b.cta}
        </a>
      </div>
    </div>
  );
}
