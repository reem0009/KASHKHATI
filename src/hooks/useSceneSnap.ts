// src/hooks/useSceneSnap.ts
//
// Adds "click into place" snapping on top of an existing Lenis instance.
// Each full-viewport section marked with the sceneSelector attribute
// becomes a resting point: once the user's scroll settles near one,
// the hook finishes the motion for them with a short, decisive ease.
//
// A fast flick through multiple scenes is left alone — snapping only
// engages once velocity drops below velocityThreshold, so it never
// fights the user mid-scroll.
//
// IMPORTANT — scope boundary:
// This hook does ONE thing: it changes scroll POSITION (via lenis.scrollTo).
// It does not read, set, or animate opacity, transform, scale, or any other
// visual property on any element, and it has no concept of "hero", "peek",
// "zoom", or "crossfade". Do not add visual/animation logic to this file —
// if scroll-driven animation is wanted later, it belongs in a separate
// hook/component, not here. This file should stay animation-free.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis"; // adjust import if your package is '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

interface UseSceneSnapOptions {
  /** CSS selector for each full-viewport "scene" section. */
  sceneSelector?: string;
  /** How long the snap animation takes, in seconds. Keep this short —
   *  long snaps feel like the page is dragging you, not clicking into place. */
  duration?: number;
  /** Scroll velocity (in px per animation frame) below which the page is
   *  considered "settling" and becomes eligible to snap. Raise this if
   *  snapping feels like it grabs the page too early during a scroll. */
  velocityThreshold?: number;
  /** How long the user must stay below velocityThreshold before the
   *  snap fires, in ms. Lower = snappier but more likely to interrupt
   *  someone reading mid-scene; higher = calmer but slower to commit. */
  settleDelay?: number;
}

export function useSceneSnap(
  lenis: Lenis | null,
  {
    sceneSelector = "[data-scene]",
    duration = 0.65,
    velocityThreshold = 2.5,
    settleDelay = 90,
  }: UseSceneSnapOptions = {}
) {
  const scenesRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!lenis) return;

    scenesRef.current = Array.from(
      document.querySelectorAll<HTMLElement>(sceneSelector)
    );
    if (scenesRef.current.length === 0) return;

    // Lenis is already driven by GSAP's ticker in useLenis — only keep
    // ScrollTrigger in sync here, then add snap-position logic below.
    lenis.on("scroll", ScrollTrigger.update);

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let settleTimer: ReturnType<typeof setTimeout>;

    const getSnapPoints = () => {
      const points = scenesRef.current.map((el) => el.offsetTop);
      // Without this, anything scrolled past the last marked scene has
      // nowhere to settle but backward into that scene — it gets pulled
      // back up no matter how far down the user scrolls. Adding the true
      // page bottom gives unmarked trailing content (CTA, footer) a
      // legitimate resting point of its own.
      const bottom = document.documentElement.scrollHeight - window.innerHeight;
      if (!points.includes(bottom)) points.push(bottom);
      return points;
    };

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: maxScroll,
      onRefresh: () => {
        // Recompute offsets if layout shifts (images loading, resize, etc).
      },
      onUpdate: (self) => {
        clearTimeout(settleTimer);
        const velocity = Math.abs(self.getVelocity() / 1000);
        if (velocity > velocityThreshold) return; // still moving, let it ride

        settleTimer = setTimeout(() => {
          // Re-measure first: images/fonts loading after mount grow the page,
          // leaving Lenis's construction-time limit stale and clamping
          // scrollTo short of the true bottom.
          lenis.resize();
          const current = lenis.scroll;
          const snapPoints = getSnapPoints();
          const nearest = snapPoints.reduce((closest, point) =>
            Math.abs(point - current) < Math.abs(closest - current) ? point : closest
          );

          // Already settled close enough — don't fight tiny residual motion.
          if (Math.abs(nearest - current) < 4) return;

          lenis.scrollTo(nearest, {
            duration,
            easing: (t: number) => 1 - Math.pow(1 - t, 3), // quick ease-out
          });
        }, settleDelay);
      },
    });

    return () => {
      clearTimeout(settleTimer);
      trigger.kill();
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis, sceneSelector, duration, velocityThreshold, settleDelay]);
}
