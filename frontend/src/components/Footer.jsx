import { Link } from "@/components/LocalizedLink";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCalendar } from "@/lib/useCalendar";
import { waLink, EMAIL, PHONE } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { WaveDivider } from "@/components/WaveDivider";

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/freewayscuba/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/freewayscuba/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "TripAdvisor",
    href: "https://www.tripadvisor.com/Attraction_Review-g150812-d10005236-Reviews-Freeway_Scuba_Diving-Playa_del_Carmen_Yucatan_Peninsula.html",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.63 1.688a5.822 5.822 0 0 0-.762 2.866 5.9 5.9 0 0 0 5.9 5.9 5.864 5.864 0 0 0 3.96-1.53l1.278 1.322 1.278-1.322a5.864 5.864 0 0 0 3.96 1.53 5.9 5.9 0 0 0 5.9-5.9 5.822 5.822 0 0 0-.762-2.866L24 6.648h-4.361c-2.307-1.57-4.975-2.353-7.633-2.353zM6.769 8.5a3.702 3.702 0 0 1 3.702 3.702 3.702 3.702 0 0 1-3.702 3.702A3.702 3.702 0 0 1 3.067 12.2 3.702 3.702 0 0 1 6.77 8.5zm10.474 0a3.702 3.702 0 0 1 3.702 3.702 3.702 3.702 0 0 1-3.702 3.702 3.702 3.702 0 0 1-3.702-3.702A3.702 3.702 0 0 1 17.243 8.5zM6.77 10.13a2.07 2.07 0 0 0-2.072 2.07 2.07 2.07 0 0 0 2.072 2.072 2.07 2.07 0 0 0 2.07-2.071A2.07 2.07 0 0 0 6.77 10.13zm10.474 0a2.07 2.07 0 0 0-2.07 2.07 2.07 2.07 0 0 0 2.07 2.072 2.07 2.07 0 0 0 2.072-2.071 2.07 2.07 0 0 0-2.072-2.071zm-10.474.87a1.2 1.2 0 0 1 1.2 1.2 1.2 1.2 0 0 1-1.2 1.2 1.2 1.2 0 0 1-1.2-1.2 1.2 1.2 0 0 1 1.2-1.2zm10.474 0a1.2 1.2 0 0 1 1.2 1.2 1.2 1.2 0 0 1-1.2 1.2 1.2 1.2 0 0 1-1.2-1.2 1.2 1.2 0 0 1 1.2-1.2z"/>
      </svg>
    ),
  },
];

const links = [
  { to: "/cenote-diving", key: "cenote" },
  { to: "/reef-diving", key: "reef" },
  { to: "/diving-courses", key: "courses" },
  { to: "/packages", key: "packages" },
  { to: "/about", key: "about" },
  { to: "/faq", key: "faq" },
  { to: "/contact", key: "contact" },
];

export const Footer = () => {
  const { t } = useLanguage();
  const { year } = useCalendar();
  return (
    <footer className="relative bg-[#061A2B] text-white" data-testid="main-footer">
      <WaveDivider color="#061A2B" flip className="bg-transparent -mt-1" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-serif text-2xl tracking-tight">
            Freeway <span className="text-[#00B4D8]">Scuba Diving</span>
          </div>
          <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
          <span className="inline-block mt-4 text-xs tracking-[0.15em] uppercase text-[#00B4D8]/90">
            {t.footer.spanish}
          </span>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-white/50 font-semibold mb-4">{t.footer.explore}</h4>
          <ul className="space-y-2.5">
            {links.map((l) => (
              <li key={l.key}>
                <Link to={l.to} data-testid={`footer-link-${l.key}`} className="text-white/75 hover:text-[#00B4D8] text-sm transition-colors">
                  {t.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-white/50 font-semibold mb-4">{t.footer.contactTitle}</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className="flex items-center gap-3 text-white/75 hover:text-[#25D366] transition-colors">
                <WaIcon className="w-4 h-4 text-[#25D366]" /> {PHONE}
              </a>
            </li>
            <li>
              <a href={`tel:+${PHONE.replace(/[^0-9]/g, "")}`} className="flex items-center gap-3 text-white/75 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#00B4D8]" /> {PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} data-testid="footer-email" className="flex items-center gap-3 text-white/75 hover:text-white transition-colors break-all">
                <Mail className="w-4 h-4 text-[#00B4D8]" /> {EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/75">
              <MapPin className="w-4 h-4 text-[#00B4D8] mt-0.5 shrink-0" />
              <span>
                <span className="block">Calle Polar Pte. s/n, Tulum Centro, 77760 Tulum, Q.R.</span>
                <span className="block text-white/50 text-xs mt-0.5">{t.footer.addressNote}</span>
              </span>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-6">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/55 hover:text-white hover:border-white/30 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">
          <p className="text-white/45 text-xs">© {year} Freeway Scuba Diving. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};
