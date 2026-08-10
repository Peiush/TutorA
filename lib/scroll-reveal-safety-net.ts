import gsap from "gsap";

// Every hand-rolled GSAP scroll reveal on this site (autoAlpha:0 -> 1 gated by a
// one-shot ScrollTrigger) shares a failure mode: the trigger's start position is
// calculated once and can go stale if web fonts reflow layout afterward (see
// ScrollTriggerGuard), or something interrupts GSAP before the tween ever runs.
// Either way the element is left permanently invisible since nothing else ever
// sets it visible. A plain IntersectionObserver doesn't depend on any cached
// scroll math, so it's a reliable backstop: once the trigger element is actually
// on screen, give the real animation a moment to run, then force the finished
// state — passed in as `reveal`, normally the same gsap.set(...) call already
// used for the component's prefers-reduced-motion branch — if it hasn't.
export function scrollRevealSafetyNet(
  trigger: Element,
  isHidden: () => boolean,
  reveal: () => void,
  delay = 1200
) {
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      window.setTimeout(() => {
        if (isHidden()) reveal();
      }, delay);
    },
    { threshold: 0.01 }
  );
  io.observe(trigger);
  return () => io.disconnect();
}

export function isGsapHidden(el: Element) {
  return gsap.getProperty(el, "autoAlpha") === 0;
}
