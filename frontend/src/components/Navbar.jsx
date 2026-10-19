import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "@/components/LocalizedLink";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, waFor } from "@/data/content";
import { WaIcon } from "@/components/icons";
import logoSvg from "@/assets/Logo_principal.svg";

const links = [
  { to: "/", key: "home" },
  { to: "/cenote-diving", key: "cenote" },
  { to: "/reef-diving", key: "reef" },
  { to: "/diving-courses", key: "courses" },
  { to: "/packages", key: "packages" },
  { to: "/about", key: "about" },
  { to: "/faq", key: "faq" },
  { to: "/contact", key: "contact" },
  { to: "/book", key: "bookNow" },
  { to: "/blog", key: "blog" },
];

export const Navbar = () => {
  const { t, toggle, other } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#061A2B]/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
      data-testid="main-navbar"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center gap-4">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group shrink-0">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white shrink-0 overflow-hidden">
            <img src={logoSvg} alt="" className="w-8 h-8 object-contain" />
          </span>
          <span className="font-serif text-white text-base sm:text-lg xl:text-sm 2xl:text-base tracking-tight whitespace-nowrap leading-none">
            Freeway Scuba Diving
          </span>
        </Link>

        <div className="flex-1 flex items-center justify-end gap-4 xl:gap-6">
          <div className="hidden xl:flex items-center gap-3">
            {links.map((l) => (
              <NavLink
                key={l.key}
                to={l.to}
                end={l.to === "/"}
                data-testid={`nav-link-${l.key}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors whitespace-nowrap ${
                    l.key === "cenote"
                      ? isActive
                        ? "text-[#00B4D8]"
                        : "text-[#00B4D8]/90 hover:text-[#00B4D8]"
                      : isActive
                      ? "text-[#00B4D8]"
                      : "text-white/80 hover:text-white"
                  }`
                }
              >
                {t.nav[l.key]}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            data-testid="lang-toggle-btn"
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium px-3 py-2 rounded-full border border-white/15 hover:border-white/30 transition-colors"
          >
            <Languages className="w-4 h-4" />
            {other}
          </button>
          <a
            href={waLink(waFor(t.code).cenote, t.code)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-whatsapp-btn"
            className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-transform hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/20 whitespace-nowrap"
          >
            <WaIcon className="w-4 h-4" />
            {t.nav.book}
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            data-testid="mobile-menu-toggle"
            aria-label={t.ui.shared.menu}
            className="xl:hidden text-white p-2"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        </div>
      </nav>

      {open && (
        <div className="xl:hidden bg-[#061A2B]/98 backdrop-blur-xl border-t border-white/10" data-testid="mobile-menu">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.key}
                to={l.to}
                end={l.to === "/"}
                data-testid={`mobile-nav-link-${l.key}`}
                className={({ isActive }) =>
                  `py-3 px-2 rounded-lg text-base font-medium ${
                    l.key === "cenote"
                      ? isActive
                        ? "text-[#00B4D8] bg-white/5"
                        : "text-[#00B4D8]/90"
                      : isActive
                      ? "text-[#00B4D8] bg-white/5"
                      : "text-white/85"
                  }`
                }
              >
                {t.nav[l.key]}
              </NavLink>
            ))}
            <button
              onClick={toggle}
              data-testid="mobile-lang-toggle"
              className="flex items-center gap-2 mt-2 py-3 px-2 text-white/85 text-base font-medium"
            >
              <Languages className="w-5 h-5" /> {other}
            </button>
            <a
              href={waLink(waFor(t.code).cenote, t.code)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="mobile-whatsapp-btn"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-full"
            >
              <WaIcon className="w-5 h-5" /> {t.nav.book}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

