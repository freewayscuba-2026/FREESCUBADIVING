import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ES_SLUGS, spanishPath } from "@/lib/i18nRoutes";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/context/LanguageContext";
import { Layout } from "@/components/Layout";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { lazyWithRetry as lazy } from "@/lib/lazyWithRetry";

const Home         = lazy(() => import("@/pages/Home"));
const CenoteDiving = lazy(() => import("@/pages/CenoteDiving"));
const ReefDiving   = lazy(() => import("@/pages/ReefDiving"));
const DivingCourses= lazy(() => import("@/pages/DivingCourses"));
const Packages     = lazy(() => import("@/pages/Packages"));
const About        = lazy(() => import("@/pages/About"));
const FAQ          = lazy(() => import("@/pages/FAQ"));
const BookNow      = lazy(() => import("@/pages/BookNow"));
const NotFound     = lazy(() => import("@/pages/NotFound"));
const Blog         = lazy(() => import("@/pages/Blog"));
const BlogCenoteGuide = lazy(() => import("@/pages/BlogCenoteGuide"));
const BlogCertificationGuide = lazy(() => import("@/pages/BlogCertificationGuide"));

// Pages that exist in English (/page) and Spanish (/es/page).
const BILINGUAL_PAGES = [
  ["/", Home],
  ["/cenote-diving", CenoteDiving],
  ["/reef-diving", ReefDiving],
  ["/diving-courses", DivingCourses],
  ["/packages", Packages],
  ["/about", About],
  ["/faq", FAQ],
  ["/book", BookNow],
];

// The route table. Shared by the browser app and by the prerender step
// (scripts/prerender.mjs renders it with a StaticRouter), so both always agree.
export function AppRoutes() {
  return (
    <Routes>
        <Route element={<Layout />}>
          {BILINGUAL_PAGES.map(([path, Page]) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          {BILINGUAL_PAGES.map(([path, Page]) => (
            <Route key={`es${path}`} path={spanishPath(path)} element={<Page />} />
          ))}
          {/* Earlier Spanish URLs that reused the English words now redirect */}
          {Object.keys(ES_SLUGS).map((path) => (
            <Route key={`old-es${path}`} path={`/es${path}`} element={<Navigate to={spanishPath(path)} replace />} />
          ))}
          {/* Contact was merged into the booking page */}
          <Route path="/contact" element={<Navigate to="/book" replace />} />
          <Route path="/es/contacto" element={<Navigate to={spanishPath("/book")} replace />} />
          <Route path="/es/contact" element={<Navigate to={spanishPath("/book")} replace />} />
          <Route path="/blog"            element={<Blog />} />
          <Route path="/blog/best-cenotes-tulum" element={<BlogCenoteGuide />} />
          <Route path="/blog/certification-guide-cenote-diving" element={<BlogCertificationGuide />} />
          <Route path="*"               element={<NotFound />} />
        </Route>
    </Routes>
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
    <RouteErrorBoundary>
      <HelmetProvider context={helmetContext}>
        <Router {...routerProps}>
          <LanguageProvider initialCms={initialCms}>
            <AppRoutes />
          </LanguageProvider>
        </Router>
      </HelmetProvider>
    </RouteErrorBoundary>
  );
}

export default App;
