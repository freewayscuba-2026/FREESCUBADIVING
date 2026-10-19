import { Mail, Phone, MapPin, Star } from "lucide-react";
import { Link } from "@/components/LocalizedLink";
import { useLanguage } from "@/context/LanguageContext";
import { waLink, EMAIL, PHONE } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

export const ContactSection = () => {
  const { t } = useLanguage();
  const c = t.contact;
  return (
    <section className="py-20 sm:py-28 bg-[#061A2B] text-white relative overflow-hidden" data-testid="contact-section">
      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-[#00B4D8]/10 blur-3xl" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#00B4D8]">{c.label}</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">{c.title}</h2>
            <p className="mt-5 text-white/75 leading-relaxed">{c.text}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {c.formUrl && (
              <Link
                to={c.formUrl} data-testid="contact-form-btn"
                className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#00B4D8]/30"
              >
                {c.formCta}
              </Link>
            )}
            <a
              href={waLink()} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp-btn"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
            >
              <WaIcon className="w-5 h-5" /> {c.whatsapp}
            </a>
            <a
              href={`mailto:${EMAIL}`} data-testid="contact-email-btn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
            >
              <Mail className="w-5 h-5" /> {c.email}
            </a>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid sm:grid-cols-3 gap-4 text-center">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5 text-[#00B4D8] mx-auto" />
              <div className="mt-2 text-xs uppercase tracking-wide text-white/50">{c.callLabel}</div>
              <div className="mt-1 text-sm font-medium">{PHONE}</div>
            </a>
            <a href={`mailto:${EMAIL}`} className="bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
              <Mail className="w-5 h-5 text-[#00B4D8] mx-auto" />
              <div className="mt-2 text-xs uppercase tracking-wide text-white/50">{c.emailLabel}</div>
              <div className="mt-1 text-sm font-medium break-all">{EMAIL}</div>
            </a>
            <div className="bg-white/5 rounded-2xl p-5">
              <MapPin className="w-5 h-5 text-[#00B4D8] mx-auto" />
              <div className="mt-2 text-xs uppercase tracking-wide text-white/50">{c.areaLabel}</div>
              <div className="mt-1 text-sm font-medium">{c.area}</div>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-8 text-center">
            <span className="text-sm text-[#00B4D8]/90">{c.spanish}</span>
          </Reveal>

          <Reveal delay={0.4} className="mt-6 text-center">
            <a
              href="https://g.page/r/CWpT1ePgn0uAEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white font-medium px-6 py-3 rounded-full transition-colors text-sm"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              Leave us a Google Review — it means the world to us
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
