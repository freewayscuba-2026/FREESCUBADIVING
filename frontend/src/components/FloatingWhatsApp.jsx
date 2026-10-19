import { waLink, waFor } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";

export const FloatingWhatsApp = () => {
  const { lang } = useLanguage();
  return (
    <a
      href={waLink(undefined, lang)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp-btn"
      aria-label={lang === "es" ? "Reservar por WhatsApp" : "Book on WhatsApp"}
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-transform hover:scale-110"
    >
      <span className="absolute inline-flex w-full h-full rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <svg viewBox="0 0 32 32" className="relative w-8 h-8 fill-current" aria-hidden="true">
        <path d="M16.003 3C9.38 3 4 8.38 4 15c0 2.117.553 4.106 1.523 5.84L4 29l8.36-1.49A11.93 11.93 0 0 0 16.003 27C22.62 27 28 21.62 28 15S22.62 3 16.003 3zm0 21.6a9.55 9.55 0 0 1-4.87-1.33l-.35-.21-3.96.71.71-3.86-.23-.36A9.55 9.55 0 0 1 6.4 15c0-5.3 4.31-9.6 9.6-9.6 5.3 0 9.6 4.3 9.6 9.6s-4.3 9.6-9.597 9.6zm5.27-7.18c-.29-.14-1.71-.84-1.97-.94-.26-.1-.45-.14-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33z" />
      </svg>
      <span className="sr-only">{lang === "es" ? "WhatsApp" : "WhatsApp"}</span>
    </a>
  );
};
