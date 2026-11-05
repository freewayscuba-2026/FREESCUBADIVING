// Sanity client + image URL builder for the website.
// Content falls back to src/data/content.js when Sanity is not configured yet,
// so the site keeps working before the CMS is connected.
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Project ID is public (it ends up in the client bundle anyway); the env var
// simply lets you point at a different project without editing code.
const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || "4fuznbul";
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";

export const sanityEnabled = Boolean(projectId);

export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      // Visitors read through the fast CDN cache. The build (prerender, which runs
      // without a browser window) reads the live API, because it is started right after
      // a publish in Sanity and the CDN can still hold the previous version for ~1 minute.
      useCdn: typeof window !== "undefined",
    })
  : null;

const builder = sanityEnabled ? imageUrlBuilder(sanityClient) : null;

// urlFor(image).width(800).url()
export const urlFor = (source) => (builder ? builder.image(source) : { url: () => "", width: () => ({ url: () => "" }) });
