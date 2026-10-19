import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";
import { normalizePath, shouldRedirectHomeToSpanish } from "@/lib/i18nRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const rootEl = document.getElementById("root");

// Sanity content that scripts/prerender.mjs baked into the page (null if absent).
function readBakedCms() {
  try {
    const el = document.getElementById("__CMS__");
    return el ? JSON.parse(el.textContent) : null;
  } catch (e) {
    return null;
  }
}

const tree = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App initialCms={readBakedCms()} />
    </QueryClientProvider>
  </React.StrictMode>
);

// Spanish speakers who open the English home page (/) are taken to the Spanish one (/es).
// Done before React starts, so the prerendered English HTML is simply replaced.
if (shouldRedirectHomeToSpanish()) {
  try {
    window.history.replaceState(null, "", `/es${window.location.search}${window.location.hash}`);
  } catch (e) { /* ignore: the page just stays in English */ }
}

// Every prerendered page (English and /es) is built for exactly one URL, which the build
// stores in data-prerendered. When the visitor is on that URL the HTML matches what React
// renders, so React reuses it (hydration); otherwise it does a normal client render.
const prerenderedPath = rootEl.getAttribute("data-prerendered");
const canHydrate =
  Boolean(prerenderedPath) &&
  rootEl.hasChildNodes() &&
  normalizePath(window.location.pathname) === prerenderedPath;

if (canHydrate) {
  ReactDOM.hydrateRoot(rootEl, tree);
} else {
  // Client-only render: use the visitor's real date instead of the build's.
  window.__PRERENDER__ = undefined;
  ReactDOM.createRoot(rootEl).render(tree);
}
