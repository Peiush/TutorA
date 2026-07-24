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
export function ScrollTriggerGuard() {
  useEffect(() => {
    let debounceId: number | undefined;
    const refresh = () => {
      window.clearTimeout(debounceId);
      debounceId = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);

    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh);

    return () => {
      window.clearTimeout(debounceId);
      ro.disconnect();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
