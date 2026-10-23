import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FloatingGoogleReview } from "@/components/FloatingGoogleReview";
import { PageSkeleton } from "@/components/PageSkeleton";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { LangHead } from "@/components/LangHead";
import { stripLang } from "@/lib/i18nRoutes";

export const Layout = () => {
  const { pathname } = useLocation();
  // Scroll to the top when the page changes, but not when only the language changes.
  const page = stripLang(pathname);
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [page]);
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#061A2B] font-sans antialiased">
      <LangHead />
      <Navbar />
      <main>
        <RouteErrorBoundary key={page}>
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <FloatingGoogleReview />
    </div>
  );
};
