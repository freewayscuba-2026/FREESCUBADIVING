import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { waLink } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";

const certLevels = [
  {
    cert: "No certification",
    icon: "🤿",
    color: "border-emerald-500/30 bg-emerald-500/5",
    labelColor: "text-emerald-400",
    desc: "You can still experience cenotes! A Discover Scuba Diving session (no prior experience needed) or snorkeling in open cenotes like Casa Cenote, Ponderosa or Car Wash is available to everyone.",
    canDo: ["Snorkeling in open cenotes", "Discover Scuba Diving intro experience", "Casa Cenote (lagoon)", "Ponderosa / Garden of Eden", "Car Wash (Aktun Ha)"],
    cannotDo: ["Cavern or cave diving", "Deep cenotes like The Pit or Angelita"],
  },
  {
    cert: "Open Water Diver (OWD)",
    icon: "🌊",
    color: "border-[#00B4D8]/30 bg-[#00B4D8]/5",
    labelColor: "text-[#00B4D8]",
    desc: "The standard entry-level certification. It's all you need to access the majority of cenote experiences in Tulum, including the most famous sites in the world.",
    canDo: ["Dos Ojos (Barbie Line & Bat Cave)", "Nicte-Ha", "Tajma Ha", "Chikin Ha (beginner routes)", "Casa Cenote (diving)", "Ponderosa (diving)", "Most cavern-zone tours"],
    cannotDo: ["Deep cenotes (The Pit, Angelita)", "Technical cave systems beyond natural light"],
  },
  {
    cert: "Advanced Open Water (AOW)",
    icon: "⬇️",
    color: "border-purple-500/30 bg-purple-500/5",
    labelColor: "text-purple-300",
    desc: "Unlocks the most iconic and dramatic cenotes. The deep diver specialty (included in AOW) is required to reach the halocline at Angelita or the light beams of The Pit.",
    canDo: ["The Pit (up to 40 m)", "Cenote Angelita (hydrogen sulfide river illusion)", "Dream Gate", "Hell's Bells (Cenote Zapote)", "All Open Water sites"],
    cannotDo: ["Full cave diving beyond natural-light zone"],
  },
  {
    cert: "Cave Diver",
    icon: "🔦",
    color: "border-orange-500/30 bg-orange-500/5",
    labelColor: "text-orange-300",
    desc: "A specialty technical certification for divers who want to venture fully into underwater cave systems, beyond the natural light zone. Requires cave diving training after AOW.",
    canDo: ["Full cave passages in Sac Actún & Nohoch Nah Chich systems", "Exploration dives in mapped cave networks", "All previous levels"],
    cannotDo: [],
  },
];

const faqs = [
  {
    q: "Can I do cenote diving without any certification?",
    a: "Yes — through a Discover Scuba Diving session. You dive to a maximum of 12 m with an instructor by your side. No prior experience is required. Snorkeling in open cenotes is also available to everyone.",
  },
  {
    q: "How long does it take to get Open Water certified?",
    a: "The PADI Open Water course takes 3–4 days. We offer it in Tulum — you'd finish certified and ready to dive cenotes all in the same trip.",
  },
  {
    q: "Is Open Water enough for The Pit?",
    a: "No. The Pit reaches depths of 40 m and requires Advanced Open Water with the deep diver specialty. Attempting it without the right certification is dangerous.",
  },
  {
    q: "Can children dive in cenotes?",
    a: "Children aged 10+ can snorkel in open cenotes. From age 12 they can do a Junior Open Water course and dive in cavern-zone cenotes with a certified guide.",
  },
  {
    q: "Do I need to bring my certification card?",
    a: "Yes — always carry your C-card (physical or digital via the PADI app). We are required to verify it before any dive.",
  },
];

export default function BlogCertificationGuide() {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/open-water-course-scaled.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Certification Do You Need for Cenote Diving in Tulum?",
          description: "Complete guide to scuba certifications required for cenote diving: no cert, OWD, AOW and cave diver explained.",
          author: { "@type": "Organization", name: "Freeway Scuba Diving" },
          publisher: { "@type": "Organization", name: "Freeway Scuba Diving", url: "https://freewayscubadiving.com" },
          datePublished: "2026-07-01",
          url: "https://freewayscubadiving.com/blog/certification-guide-cenote-diving",
        })}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative pt-24 pb-16 bg-[#061A2B] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://freewayscubadiving.com/wp-content/uploads/2023/07/open-water-course-scaled.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#00B4D8] text-sm font-medium mb-6 hover:underline">
            ← All guides
          </Link>
          <div className="inline-flex items-center gap-2 bg-[#00B4D8]/15 border border-[#00B4D8]/25 text-[#00B4D8] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            Certification Guide · Beginner to Advanced
          </div>
          <h1 className="font-serif text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            What Certification Do You Need for Cenote Diving in Tulum?
          </h1>
          <p className="text-white/65 text-base leading-relaxed">
            Not sure if your current certification is enough? Here's exactly what each level unlocks — from your very first cenote experience with no cert at all, to full cave exploration.
          </p>
        </div>
      </div>

      {/* Cert levels */}
      <section className="py-16 bg-[#020B14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          {certLevels.map((level, i) => (
            <Reveal key={level.cert} delay={i * 0.07}>
              <div className={`border rounded-2xl p-6 ${level.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{level.icon}</span>
                  <h2 className={`font-serif text-xl font-semibold ${level.labelColor}`}>{level.cert}</h2>
                </div>
                <p className="text-white/65 text-sm leading-relaxed mb-5">{level.desc}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">What you can dive</div>
                    <ul className="flex flex-col gap-1.5">
                      {level.canDo.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-white/70">
                          <span className="text-emerald-400 shrink-0 mt-0.5">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {level.cannotDo.length > 0 && (
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Not yet accessible</div>
                      <ul className="flex flex-col gap-1.5">
                        {level.cannotDo.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-white/50">
                            <span className="text-white/30 shrink-0 mt-0.5">✗</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-[#061A2B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-white text-2xl sm:text-3xl mb-8">Common Questions</h2>
            <div className="flex flex-col gap-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="text-white font-semibold text-sm mb-2">{faq.q}</div>
                  <div className="text-white/60 text-sm leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#020B14] text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-white text-2xl sm:text-3xl mb-3">Not Sure Which Cenote Is Right for You?</h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Tell us your certification level and we'll recommend the perfect cenote — whether it's your first dive or you're going after The Pit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waLink("Hi Freeway Scuba Diving! I read your certification guide and I'd like to know which cenote is right for my level.\n\n🤿 My certification: \n📅 Preferred date: \n👥 Number of divers: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
              >
                <WaIcon className="w-5 h-5" /> Ask Us on WhatsApp
              </a>
              <Link
                to="/blog/best-cenotes-tulum"
                className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1"
              >
                View Best Cenotes Guide →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <ReviewCarousel topic="course" />
    </>
  );
}
