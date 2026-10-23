import { lazy } from "react";

const KEY = "fws-chunk-reload";

// A page is a separate JS file that the browser downloads the first time it is opened.
// After a new deploy, a tab that was opened before still asks for the old file names, which
// no longer exist, and the page stays blank until the visitor refreshes by hand.
// This wrapper retries the download once and, if it still fails, reloads the page once so
// the visitor gets the new files automatically.
export function lazyWithRetry(factory) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (firstError) {
      try {
        await new Promise((r) => setTimeout(r, 400));
        return await factory();
      } catch (error) {
        if (typeof window !== "undefined") {
          let already = false;
          try { already = sessionStorage.getItem(KEY) === window.location.href; } catch (e) { /* storage blocked */ }
          if (!already) {
            try { sessionStorage.setItem(KEY, window.location.href); } catch (e) { /* storage blocked */ }
            window.location.reload();
            // Keep React waiting while the browser reloads.
            return new Promise(() => {});
          }
        }
        throw error;
      }
    }
  });
}
