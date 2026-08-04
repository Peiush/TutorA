"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Several homepage sections reveal via a one-shot ScrollTrigger (autoAlpha:0 -> 1).
// Below-the-fold sections are loaded with next/dynamic and web fonts can reflow
// layout after those triggers are first calculated, which leaves their start/end
// positions stale and the section stuck invisible-but-fully-sized (a blank gap).
// Refresh once everything has actually settled so trigger positions match reality.
//
// Perf note: ScrollTrigger.refresh() synchronously reads layout geometry for every
// registered trigger on the page, which is expensive with the number of Reveal-wrapped
// sections this site has. A ResizeObserver on document.body fires many times during
// initial hydration (below-the-fold chunks mounting, fonts swapping, images decoding),
// and calling refresh() on every one of those was measured as the dominant cause of
// forced-synchronous-layout / main-thread blocking on every route (Lighthouse traced
// several seconds of TBT to this). Two changes fix that without losing correctness:
// only start watching for late layout shifts once the page has actually loaded (nothing
// needs refreshing before the first reveal can even fire), and run the refresh itself on
// a rAF instead of inline in the observer callback so it doesn't compound with whatever
// else is happening on the thread that tick.
export function ScrollTriggerGuard() {
  useEffect(() => {
    let debounceId: number | undefined;
    let rafId: number | undefined;
    const scheduleRefresh = () => {
      window.clearTimeout(debounceId);
      debounceId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      }, 300);
    };

    let ro: ResizeObserver | undefined;
    const startWatching = () => {
      scheduleRefresh();
      if (ro) return;
      ro = new ResizeObserver(scheduleRefresh);
      ro.observe(document.body);
    };

    if (document.readyState === "complete") {
      startWatching();
    } else {
      window.addEventListener("load", startWatching, { once: true });
    }
    document.fonts?.ready?.then(scheduleRefresh);

    return () => {
      window.clearTimeout(debounceId);
      if (rafId !== undefined) window.cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener("load", startWatching);
    };
  }, []);

  return null;
}
