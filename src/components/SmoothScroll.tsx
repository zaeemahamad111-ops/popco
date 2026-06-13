"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4, // Longer duration for buttery-smooth cinematic scroll response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95, // Smoother wheel scroll increments
      touchMultiplier: 1.5, // Natural touch sensitivity for touchpads/mobile
      syncTouch: true, // Keep touch scroll smoothly animated and in-sync on mobile
      infinite: false,
    });

    // Make lenis globally available for programmatic scrolling
    (window as any).lenis = lenis;

    // ─── Critical: Proxy GSAP ScrollTrigger through Lenis ───────────────
    // Without this, ScrollTrigger reads native window.scrollY which
    // doesn't match Lenis's interpolated scroll position — causing
    // pins to fire/end at completely wrong scroll positions.
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // pinType determines if pinned elements use "fixed" or "transform"
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    // Keep ScrollTrigger in sync with every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Bind Lenis raf loop to GSAP ticker (single animation loop)
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000); // Lenis expects milliseconds
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(125, 33);

    // After proxy is set up, refresh all ScrollTriggers so they
    // re-measure positions against the proxied scroller
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      ScrollTrigger.killAll();
      // Remove proxy on cleanup
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, []);

  return null;
}
