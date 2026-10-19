import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { waLink } from "@/data/content";
import { WaIcon } from "@/components/icons";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const cenotes = [
  {
    name: "Dos Ojos",
    category: "Cavern diving",
    depth: "Up to 10–12 m (33–40 ft)",
    visibility: "30–100 m (100–330 ft)",
    cert: "Open Water Diver",
    age: "From 10 (snorkel), 12 (diving)",
    level: "beginner",
    desc: "The most famous cenote in the world. Two connected circular sinkholes offer two iconic routes: the Barbie Line and the Bat Cave, where you surface inside an air dome covered in stalactites. Perfect for a first cenote dive or a family snorkeling tour.",
  },
  {
    name: "The Pit",
    category: "Cavern / deep diving",
    depth: "Dives to 40 m; cenote exceeds 100 m",
    visibility: "40+ m",
    cert: "Advanced Open Water",
    age: "15 years old",
    level: "advanced",
    desc: "Regularly ranked among the best dive sites on the planet. A near-perfect circular shaft where sunbeams cut through the halocline, creating a surreal scene above a floor scattered with ancient leaves and fallen trees.",
  },
  {
    name: "Casa Cenote",
    category: "Open cenote / lagoon",
    depth: "4–8 m (13–26 ft)",
    visibility: "Good, varies with current",
    cert: "None (snorkel) / Open Water (diving)",
    age: "Kid-friendly for snorkeling",
    level: "beginner",
    desc: "Also known as Manatee Cenote, this open lagoon connects to the ocean through mangrove channels. Perfect for beginners and families — spot fish, turtles and even small crocodiles from the surface.",
  },
  {
    name: "Cenote Angelita",
    category: "Deep cenote",
    depth: "Recreational diving at 30–35 m",
    visibility: "20+ m",
    cert: "Advanced Open Water (deep specialty recommended)",
    age: "15–18 years old",
    level: "advanced",
    desc: "One of the most jaw-dropping dives in Mexico. At around 30 m, a thick cloud of hydrogen sulfide creates the illusion of an underground river, with fallen trees poking through like a ghostly forest.",
  },
  {
    name: "Dream Gate",
    category: "Cavern diving",
    depth: "6–15 m (20–50 ft)",
    visibility: "50–80 m (165–260 ft)",
    cert: "Advanced Open Water recommended",
    age: "16 years old",
    level: "intermediate",
    desc: "Part of the Sac Actún system — one of the largest flooded cave systems in the world. Rarely crowded, ideal for divers seeking tranquility and underwater photography among near-pristine formations.",
  },
  {
    name: "Nicte-Ha",
    category: "Open cenote / cavern",
    depth: "Max 8 m (26 ft)",
    visibility: "15–30 m",
    cert: "Open Water Diver",
    age: "12 years old",
    level: "beginner",
    desc: "A neighbor of Dos Ojos, this cenote stands out for its surface covered in water lilies — creating a unique visual effect when you look up from below. Relaxed and highly photogenic.",
  },
  {
    name: "Tajma Ha",
    category: "Cavern diving",
    depth: "Up to 14 m (46 ft)",
    visibility: "20–30 m (65–100 ft)",
    cert: "Open Water Diver",
    age: "12 years old",
    level: "beginner",
    desc: "Its name means 'sacred water' in Maya. It combines spectacular natural light zones with decorated passages and a gentle halocline — a great choice for your second or third cenote dive.",
  },
  {
    name: "Ponderosa (Garden of Eden)",
    category: "Open cenote",
    depth: "Up to 10 m (33 ft)",
    visibility: "Excellent in dry season",
    cert: "None (snorkel) / Open Water (diving)",
    age: "All ages (snorkeling)",
    level: "beginner",
    desc: "An open cenote ideal for beginners and practicing buoyancy before tackling more technical caverns. Also extremely popular for family snorkeling — limestone boulders, rock gardens and crystal-clear water.",
  },
  {
    name: "Maravilla",
    category: "Cavern diving",
    depth: "10–12 m (33–40 ft)",
    visibility: "20–30 m",
    cert: "Open Water / Advanced depending on route",
    age: "12–15 years old",
    level: "intermediate",
    desc: "A lesser-known cenote that hasn't been overrun by mass tourism. Well-preserved columns and stalactites with striking light play — a hidden gem for divers who want near-untouched formations without the crowds.",
  },
  {
    name: "Hell's Bells (Cenote Zapote)",
    category: "Deep cavern diving",
    depth: "Formations at 25–50 m",
    visibility: "Good above sulfide cloud",
    cert: "Advanced Open Water / Deep Diver",
    age: "18 years old",
    level: "advanced",
    desc: "A geological formation found nowhere else on Earth: bell-shaped calcite structures hanging from the ceiling, up to 6 m long. A technical, deep dive reserved for experienced divers looking for something truly extraordinary.",
  },
  {
    name: "Car Wash (Aktun Ha)",
    category: "Open cenote",
    depth: "8–15 m (26–50 ft)",
    visibility: "Good, varies with organic matter",
    cert: "None (snorkel) / Open Water (diving)",
    age: "All ages (snorkeling)",
    level: "beginner",
    desc: "Named after the days when taxi drivers washed their cars here. Today it combines an open area full of aquatic life with a cave section featuring a striking humic-acid 'mirror effect' layer.",
  },
  {
    name: "Chikin Ha",
    category: "Cavern / River",
    depth: "10–15 m (33–50 ft)",
    visibility: "20–30 m",
    cert: "Open Water / Advanced",
    age: "12–15 years old",
    level: "intermediate",
    desc: "A classic pick for divers who already have some cenote experience and want more elaborate formations. Upstream and downstream dives through beautifully preserved stalactites, stalagmites and columns.",
  },
];

const levelColor = {
  beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  intermediate: "bg-[#00B4D8]/15 text-[#00B4D8] border-[#00B4D8]/25",
  advanced: "bg-purple-500/15 text-purple-300 border-purple-500/25",
};
const levelLabel = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

const certSection = [
  { cert: "No certification", desc: "Discover Scuba Diving experience or snorkeling in open cenotes like Casa Cenote, Ponderosa or Car Wash." },
  { cert: "Open Water Diver", desc: "Unlocks most cavern-zone cenotes: Dos Ojos, Nicte-Ha, Tajma Ha, Chikin Ha, Casa Cenote." },
  { cert: "Advanced Open Water", desc: "Required for deeper or more technical cenotes: The Pit, Angelita, Dream Gate, Hell's Bells." },
  { cert: "Cave Diver", desc: "Needed to venture beyond the natural-light zone in systems like Nohoch Nah Chich." },
];

export default function BlogCenoteGuide() {
  const { t } = useLanguage();
  return (
    <>
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://freewayscubadiving.com/wp-content/uploads/2023/07/dos-ojos-cenote-2.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Best Cenotes for Diving in Tulum and Playa del Carmen",
          description: "Complete guide to cenote diving near Tulum: the 14 best cenotes, depths, certifications required and what to expect.",
          author: { "@type": "Organization", name: "Freeway Scuba Diving" },
          publisher: { "@type": "Organization", name: "Freeway Scuba Diving", url: "https://freewayscubadiving.com" },
          datePublished: "2026-07-01",
          url: "https://freewayscubadiving.com/blog/best-cenotes-tulum",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://freewayscubadiving.com/blog" },
              { "@type": "ListItem", position: 3, name: "Best Cenotes for Diving in Tulum", item: "https://freewayscubadiving.com/blog/best-cenotes-tulum" },
            ],
          },
        })}</script>
      </Helmet>

      {/* Hero */}
      <div className="relative pt-24 pb-16 bg-[#061A2B] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://freewayscubadiving.com/wp-content/uploads/2023/07/Pit-dos-ojos-cenote-scaled.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#00B4D8] text-sm font-medium mb-6 hover:underline">
            ← All guides
          </Link>
          <div className="inline-flex items-center gap-2 bg-[#00B4D8]/15 border border-[#00B4D8]/25 text-[#00B4D8] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            Cenote Guide · Tulum & Tulum & Playa del Carmen
          </div>
          <h1 className="font-serif text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Best Cenotes for Diving: Your Complete Guide to Cenote Diving in Tulum
          </h1>
          <p className="text-white/65 text-base leading-relaxed">
            Tulum is the world's number one destination for cenote diving. With over 6,000 cenotes across the Yucatán Peninsula, we've put together this guide to the best ones — broken down by depth, visibility, certification and experience level.
          </p>
        </div>
      </div>

      {/* What is a cenote */}
      <section className="py-14 bg-[#020B14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-white text-2xl sm:text-3xl mb-4">What Is a Cenote, and Why Dive in One?</h2>
            <p className="text-white/70 leading-relaxed">
              A cenote is a natural freshwater sinkhole formed when limestone bedrock collapses, revealing an underground system of caves and caverns. The result: crystal-clear water, ancient stalactite and stalagmite formations, mesmerizing haloclines, and sunbeams piercing the water like laser light. It's a diving experience completely unlike anything the open ocean can offer — and it's exclusive to this corner of the world.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cenote list */}
      <section className="py-16 bg-[#061A2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10">
            <h2 className="font-serif text-white text-2xl sm:text-3xl">The Best Cenotes Near Tulum & Playa del Carmen</h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {cenotes.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.03}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#00B4D8]/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-serif text-white text-xl">{i + 1}. {c.name}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${levelColor[c.level]}`}>
                      {levelLabel[c.level]}
                    </span>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">{c.desc}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-white/40 uppercase tracking-wide mb-1">Category</div>
                      <div className="text-white/80 font-medium">{c.category}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-white/40 uppercase tracking-wide mb-1">Depth</div>
                      <div className="text-white/80 font-medium">{c.depth}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-white/40 uppercase tracking-wide mb-1">Visibility</div>
                      <div className="text-white/80 font-medium">{c.visibility}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="text-white/40 uppercase tracking-wide mb-1">Certification</div>
                      <div className="text-white/80 font-medium">{c.cert}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#061A2B] text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-white text-2xl sm:text-3xl mb-3">Ready to Dive a Cenote?</h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Whether it's your first dive or you're chasing the halocline at Angelita — we'll match you to the right cenote and take care of everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waLink("Hi Freeway Scuba Diving! 👋 I just read your cenote guide and I'd like to book a cenote diving tour in Tulum.\n\n📅 Preferred date: \n👥 Number of divers: \n🤿 My certification level: \n\nWhich cenote would you recommend?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/30"
              >
                <WaIcon className="w-5 h-5" /> Book on WhatsApp
              </a>
              <Link
                to="/cenote-diving"
                className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-7 py-3.5 rounded-full transition-transform hover:-translate-y-1"
              >
                View Cenote Tours →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <ReviewCarousel topic="cenote" />
    </>
  );
}
