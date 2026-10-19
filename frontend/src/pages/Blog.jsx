import { Helmet } from "react-helmet-async";
import { Link } from "@/components/LocalizedLink";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { Reveal } from "@/components/Reveal";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { ReviewQuote } from "@/components/ReviewQuote";

const posts = [
  {
    slug: "/blog/best-cenotes-tulum",
    title: "Best Cenotes for Diving in Tulum & Playa del Carmen",
    excerpt: "Your complete guide to the 14 best cenotes near Tulum — depths, visibility, certifications required and what to expect underwater.",
    tag: "Cenote Guide",
    date: "July 2026",
    readTime: "8 min read",
    image: "https://freewayscubadiving.com/wp-content/uploads/2023/07/dos-ojos-cenote-2.jpg",
  },
  {
    slug: "/blog/certification-guide-cenote-diving",
    title: "What Certification Do You Need for Cenote Diving?",
    excerpt: "No cert, Open Water, Advanced or Cave Diver — find out exactly which cenotes each level unlocks and what you can expect at every stage.",
    tag: "Beginner Guide",
    date: "July 2026",
    readTime: "5 min read",
    image: "https://freewayscubadiving.com/wp-content/uploads/2023/07/open-water-course-scaled.jpg",
  },
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://freewayscubadiving.com" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://freewayscubadiving.com/blog" },
          ],
        })}</script>
      </Helmet>

      <div className="pt-28 pb-12 bg-[#061A2B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#00B4D8] text-xs tracking-[0.2em] uppercase font-semibold">Guides & Tips</span>
          <h1 className="font-serif text-white text-3xl sm:text-4xl mt-3 mb-3">Diving Blog</h1>
          <p className="text-white/60 text-base">Local knowledge from the cenote specialists in Tulum.</p>
        </div>
      </div>

      <section className="py-14 bg-[#020B14] min-h-[50vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.07}>
                <Link to={post.slug} className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00B4D8]/40 transition-colors">
                  <div className="sm:flex">
                    <div className="sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-[#00B4D8]/15 text-[#00B4D8] border border-[#00B4D8]/25 px-2.5 py-1 rounded-full">{post.tag}</span>
                          <span className="text-white/30 text-xs">{post.date} · {post.readTime}</span>
                        </div>
                        <h2 className="font-serif text-white text-xl leading-snug mb-3 group-hover:text-[#00B4D8] transition-colors">{post.title}</h2>
                        <p className="text-white/55 text-sm leading-relaxed">{post.excerpt}</p>
                      </div>
                      <div className="mt-5 text-[#00B4D8] text-sm font-semibold">Read guide →</div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
          </div>
        </div>
      </section>
      <ReviewCarousel topic="general" />
    </>
  );
}
