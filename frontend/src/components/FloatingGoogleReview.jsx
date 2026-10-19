import { GOOGLE_REVIEW_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-3 h-3" aria-hidden="true">
          {i <= full ? (
            <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill="#fbbc05" />
          ) : i === full + 1 && half ? (
            <>
              <defs><clipPath id={`h${i}`}><rect x="0" y="0" width="10" height="20"/></clipPath></defs>
              <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill="#e0e0e0" />
              <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill="#fbbc05" clipPath={`url(#h${i})`} />
            </>
          ) : (
            <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill="#e0e0e0" />
          )}
        </svg>
      ))}
    </span>
  );
}

export const FloatingGoogleReview = () => {
  const { lang } = useLanguage();
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={lang === "es" ? "Deja una reseña en Google" : "Leave a Google Review"}
      className="hidden sm:flex fixed bottom-28 right-5 z-50 items-center gap-2.5 bg-white text-[#3c4043] rounded-full shadow-xl shadow-black/25 px-3.5 py-2.5 hover:scale-105 hover:shadow-2xl transition-all duration-200"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>

      <span className="flex flex-col leading-none">
        <span className="flex items-center gap-1">
          <StarRating rating={GOOGLE_RATING} />
          <span className="text-[10px] font-bold text-[#3c4043]">{GOOGLE_RATING.toFixed(1)}</span>
          <span className="text-[10px] text-[#70757a]">({GOOGLE_REVIEW_COUNT})</span>
        </span>
        <span className="text-[11px] font-semibold mt-0.5">
          {lang === "es" ? "Deja tu reseña" : "Leave a review"}
        </span>
      </span>
    </a>
  );
};
