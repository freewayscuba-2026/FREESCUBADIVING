// Server-side entry used ONLY by scripts/prerender.mjs (never shipped to the browser).
// It renders the same <App /> the browser runs, with a StaticRouter, and returns the
// HTML plus the <head> tags collected by react-helmet-async.
import { prerenderToNodeStream } from "react-dom/static";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StaticRouter } from "react-router-dom";
import App from "@/App";
import { fetchSanityContent } from "@/lib/sanityQueries";

export function loadCms() {
  return fetchSanityContent();
}

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const HELMET_KEYS = ["htmlAttributes", "title", "priority", "base", "meta", "link", "script", "style", "noscript"];

function serializeHelmet(helmet) {
  const out = {};
  for (const key of HELMET_KEYS) {
    const value = helmet?.[key];
    out[key] = value && typeof value.toString === "function" ? value.toString() : "";
  }
  return out;
}

export async function render(url, cms) {
  if (!StaticRouter) {
    throw new Error("StaticRouter is not exported by react-router-dom in this version");
  }
  const helmetContext = {};
  const errors = [];

  const tree = (
    <QueryClientProvider client={new QueryClient()}>
      <App
        Router={StaticRouter}
        routerProps={{ location: url }}
        helmetContext={helmetContext}
        initialCms={cms}
      />
    </QueryClientProvider>
  );

  // `prerender` waits for every lazy() page and Suspense boundary to finish, so the
  // HTML contains the real page instead of the loading skeleton.
  const { prelude } = await prerenderToNodeStream(tree, {
    onError(error) {
      errors.push(error?.message || String(error));
    },
  });

  return {
    html: await streamToString(prelude),
    helmet: serializeHelmet(helmetContext.helmet),
    errors,
  };
}
