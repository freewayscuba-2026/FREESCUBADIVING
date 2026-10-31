import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "@/components/LocalizedLink";
import { Menu, X, Languages, ChevronDown, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { stripLang } from "@/lib/i18nRoutes";
import logoSvg from "@/assets/Logo_principal.svg";

// "Scuba Diving Tours" is only a menu group (not a page of its own), so it does not
// compete in search with the home page, which already targets that phrase.
const tourLinks = [
  { to: "/cenote-diving", key: "cenote" },
  { to: "/reef-diving", key: "reef" },
  { to: "/bull-shark-diving-playa-del-carmen", key: "bullShark" },
  { to: "/cozumel-diving-trips", key: "cozumelTrips" },
];

const links = [
  { to: "/", key: "home" },
  { key: "tours", children: tourLinks },
  { to: "/diving-courses", key: "courses" },
  { to: "/packages", key: "packages" },
  { to: "/about", key: "about" },
  { to: "/faq", key: "faq" },
  { to: "/blog", key: "blog" },
];

const desktopLinkClass = (isActive) =>
  `text-sm font-medium transition-colors whitespace-nowrap ${
    isActive ? "text-[#00B4D8]" : "text-white/80 hover:text-white"
  }`;

function ToursDropdown({ t, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        data-testid="nav-link-tours"
        className={`flex items-center gap-1 ${desktopLinkClass(active)}`}
      >
        {t.nav.tours}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
          <div className="min-w-[220px] rounded-xl border border-white/10 bg-[#061A2B]/98 backdrop-blur-xl shadow-2xl py-2">
            {tourLinks.map((c) => (
              <NavLink
                key={c.key}
                to={c.to}
                data-testid={`nav-link-${c.key}`}
                className={({ isActive }) =>
                  `block px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? "text-[#00B4D8] bg-white/5" : "text-white/85 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {t.nav[c.key]}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const Navbar = () => {
  const { t, toggle, other } = useLanguage();
  const [open, setOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const basePath = stripLang(location.pathname);
  const toursActive = tourLinks.some((c) => basePath === c.to);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
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
          <div className="hidden xl:flex items-center gap-5">
            {links.map((l) =>
              l.children ? (
                <ToursDropdown key={l.key} t={t} active={toursActive} />
              ) : (
                <NavLink
                  key={l.key}
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`nav-link-${l.key}`}
                  className={({ isActive }) => desktopLinkClass(isActive)}
                >
                  {t.nav[l.key]}
                </NavLink>
              )
            )}
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
            <Link
              to="/book"
              data-testid="nav-book-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-[#061A2B] text-sm font-semibold px-4 py-2.5 rounded-full transition-transform hover:-translate-y-0.5 shadow-lg shadow-[#00B4D8]/20 whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              {t.nav.bookNow}
            </Link>
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
        <div className="xl:hidden bg-[#061A2B]/98 backdrop-blur-xl border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto" data-testid="mobile-menu">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) =>
              l.children ? (
                <div key={l.key}>
                  <button
                    type="button"
                    onClick={() => setToursOpen((o) => !o)}
                    aria-expanded={toursOpen || toursActive}
                    data-testid="mobile-nav-link-tours"
                    className={`w-full flex items-center justify-between py-3 px-2 rounded-lg text-base font-medium ${
                      toursActive ? "text-[#00B4D8]" : "text-white/85"
                    }`}
                  >
                    {t.nav.tours}
                    <ChevronDown className={`w-5 h-5 transition-transform ${toursOpen || toursActive ? "rotate-180" : ""}`} />
                  </button>
                  {(toursOpen || toursActive) && (
                    <div className="ml-3 pl-3 border-l border-white/10 flex flex-col">
                      {l.children.map((c) => (
                        <NavLink
                          key={c.key}
                          to={c.to}
                          data-testid={`mobile-nav-link-${c.key}`}
                          className={({ isActive }) =>
                            `py-2.5 px-2 rounded-lg text-base font-medium ${
                              isActive ? "text-[#00B4D8] bg-white/5" : "text-white/75"
                            }`
                          }
                        >
                          {t.nav[c.key]}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={l.key}
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`mobile-nav-link-${l.key}`}
                  className={({ isActive }) =>
                    `py-3 px-2 rounded-lg text-base font-medium ${
                      isActive ? "text-[#00B4D8] bg-white/5" : "text-white/85"
                    }`
                  }
                >
                  {t.nav[l.key]}
                </NavLink>
              )
            )}
            <button
              onClick={toggle}
              data-testid="mobile-lang-toggle"
              className="flex items-center gap-2 mt-2 py-3 px-2 text-white/85 text-base font-medium"
            >
              <Languages className="w-5 h-5" /> {other}
            </button>
            <Link
              to="/book"
              data-testid="mobile-book-btn"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-[#00B4D8] text-[#061A2B] font-semibold py-3 rounded-full"
            >
              <CalendarCheck className="w-5 h-5" /> {t.nav.bookNow}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
