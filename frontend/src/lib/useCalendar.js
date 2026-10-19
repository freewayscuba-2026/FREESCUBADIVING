import { useEffect, useState } from "react";

// Month / year used by season badges, the seasonal banner and the footer.
//
// Prerendered pages are generated at build time, so the first render must use
// the month/year baked into the HTML (window.__PRERENDER__, written by
// scripts/prerender.mjs) — otherwise hydration would mismatch whenever the
// visitor's clock differs from the build's. Right after mount we switch to the
// visitor's real date, so people always see the correct season.
function initialCalendar() {
  const baked = globalThis.__PRERENDER__;
  if (baked && Number.isInteger(baked.month) && Number.isInteger(baked.year)) {
    return { month: baked.month, year: baked.year };
  }
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

export function useCalendar() {
  const [calendar, setCalendar] = useState(initialCalendar);

  useEffect(() => {
    const now = new Date();
    const next = { month: now.getMonth() + 1, year: now.getFullYear() };
    setCalendar((current) =>
      current.month === next.month && current.year === next.year ? current : next,
    );
  }, []);

  return calendar;
}
