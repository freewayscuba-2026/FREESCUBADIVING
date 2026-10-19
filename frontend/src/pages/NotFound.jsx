import { Link } from "@/components/LocalizedLink";
import { Helmet } from "react-helmet-async";
import { WaIcon } from "@/components/icons";
import { waLink } from "@/data/content";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Freeway Scuba Diving</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-[#061A2B] flex flex-col items-center justify-center px-4 text-center">
        <div className="relative mb-8 select-none">
          <p className="font-serif text-[120px] sm:text-[160px] leading-none text-[#00B4D8]/10 font-bold">404</p>
          <p className="absolute inset-0 flex items-center justify-center text-5xl">🤿</p>
        </div>
        <h1 className="font-serif text-white text-3xl sm:text-4xl mb-4">Looks Like You've Gone Too Deep</h1>
        <p className="text-white/60 text-base max-w-md mb-10 leading-relaxed">
          This page doesn't exist — but the cenotes do. Head back and explore what we actually have to offer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0099BB] text-white font-semibold px-6 py-3.5 rounded-full transition-transform hover:-translate-y-1"
          >
            ← Back to Home
          </Link>
          <a
            href={waLink("Hi Freeway Scuba Diving, I'd like to book a cenote diving experience in Tulum.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3.5 rounded-full transition-transform hover:-translate-y-1"
          >
            <WaIcon className="w-5 h-5" /> Book on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
