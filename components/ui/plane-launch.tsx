"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const PLANE_SVG = `
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
`;

export function usePlaneLaunch() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  function ensureLayer() {
    if (typeof document === "undefined") return null;
    if (!layerRef.current || !document.body.contains(layerRef.current)) {
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.inset = "0";
      el.style.pointerEvents = "none";
      el.style.zIndex = "80";
      document.body.appendChild(el);
      layerRef.current = el;
    }
    return layerRef.current;
  }

  return function launchPlane(originEl: HTMLElement | null) {
    if (!originEl) return;
    const layer = ensureLayer();
    if (!layer) return;

    const rect = originEl.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const plane = document.createElement("div");
    plane.innerHTML = PLANE_SVG;
    const size = 60;
    Object.assign(plane.style, {
      position: "absolute",
      left: "0",
      top: "0",
      width: `${size}px`,
      height: `${size}px`,
      display: "grid",
      placeContent: "center",
      borderRadius: "50%",
      background: "var(--color-verified, #2C8F5E)",
      boxShadow: "0 10px 26px rgba(15,23,42,0.32)",
      transform: `translate(${startX - size / 2}px, ${startY - size / 2}px)`,
    });
    layer.appendChild(plane);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.to(plane, {
        opacity: 0,
        y: -12,
        duration: 0.5,
        delay: 0.3,
        onComplete: () => plane.remove(),
      });
      return;
    }

    const dir = startX > window.innerWidth / 2 ? -1 : 1;
    const loopCx = startX + dir * 140;
    const loopCy = startY - 190;

    const path = [
      { x: startX, y: startY },
      { x: startX + dir * 60, y: startY - 95 },
      { x: loopCx + dir * 50, y: loopCy - 10 },
      { x: loopCx, y: loopCy - 70 },
      { x: loopCx - dir * 50, y: loopCy - 10 },
      { x: loopCx + dir * 8, y: loopCy + 16 },
      { x: startX + dir * 250, y: startY - 370 },
    ];

    gsap.set(plane, { transformOrigin: "50% 50%" });

    gsap
      .timeline({ onComplete: () => plane.remove() })
      .to(plane, {
        duration: 2.2,
        ease: "power1.inOut",
        motionPath: { path, curviness: 1.4, autoRotate: true },
      })
      .to(plane, { scale: 0.35, opacity: 0, duration: 0.6, ease: "power1.in" }, "-=0.6");
  };
}
