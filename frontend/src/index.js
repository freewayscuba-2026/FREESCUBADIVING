import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";
import { getPreferredLang } from "@/context/LanguageContext";

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

const normalizePath = (p) => p.replace(/\/+$/, "") || "/";

const tree = (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App initialCms={readBakedCms()} />
    </QueryClientProvider>
  </React.StrictMode>
);

// Prerendered pages are generated in English for exactly one route, which the build
// stores in data-prerendered. We only hydrate (reuse that HTML) when it is the page
// being visited AND the visitor wants English; otherwise the HTML would not match what
// React renders, so we fall back to a normal client render, exactly as before.
const prerenderedPath = rootEl.getAttribute("data-prerendered");
const canHydrate =
  Boolean(prerenderedPath) &&
  rootEl.hasChildNodes() &&
  normalizePath(window.location.pathname) === prerenderedPath &&
  getPreferredLang() === "en";

if (canHydrate) {
  ReactDOM.hydrateRoot(rootEl, tree);
} else {
  // Client-only render: use the visitor's real date instead of the build's.
  window.__PRERENDER__ = undefined;
  ReactDOM.createRoot(rootEl).render(tree);
}
