import "@/App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";
import { PageSkeleton } from "@/components/PageSkeleton";

const Home         = lazy(() => import("@/pages/Home"));
const CenoteDiving = lazy(() => import("@/pages/CenoteDiving"));
const ReefDiving   = lazy(() => import("@/pages/ReefDiving"));
const DivingCourses= lazy(() => import("@/pages/DivingCourses"));
const Packages     = lazy(() => import("@/pages/Packages"));
const About        = lazy(() => import("@/pages/About"));
const FAQ          = lazy(() => import("@/pages/FAQ"));
const Contact      = lazy(() => import("@/pages/Contact"));
const BookNow      = lazy(() => import("@/pages/BookNow"));
const NotFound     = lazy(() => import("@/pages/NotFound"));
const Blog         = lazy(() => import("@/pages/Blog"));
const BlogCenoteGuide = lazy(() => import("@/pages/BlogCenoteGuide"));
const BlogCertificationGuide = lazy(() => import("@/pages/BlogCertificationGuide"));

// The route table. Shared by the browser app and by the prerender step
// (scripts/prerender.mjs renders it with a StaticRouter), so both always agree.
export function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/cenote-diving"  element={<CenoteDiving />} />
          <Route path="/reef-diving"    element={<ReefDiving />} />
          <Route path="/diving-courses" element={<DivingCourses />} />
          <Route path="/packages"       element={<Packages />} />
          <Route path="/about"          element={<About />} />
          <Route path="/faq"            element={<FAQ />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/book"           element={<BookNow />} />
          <Route path="/blog"            element={<Blog />} />
          <Route path="/blog/best-cenotes-tulum" element={<BlogCenoteGuide />} />
          <Route path="/blog/certification-guide-cenote-diving" element={<BlogCertificationGuide />} />
          <Route path="*"               element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

// `Router` / `routerProps` / `helmetContext` are only overridden by the prerender step.
// `initialCms` is the Sanity content baked into a prerendered page (see src/index.js).
function App({ Router = BrowserRouter, routerProps, helmetContext, initialCms = null }) {
  // The prerendered HTML is hidden for Spanish-speaking visitors until the client has
  // rendered (see public/index.html); this reveals the page once React is running.
  useEffect(() => {
    document.getElementById("root")?.removeAttribute("data-prerendered");
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <LanguageProvider initialCms={initialCms}>
        <Router {...routerProps}>
          <AppRoutes />
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
