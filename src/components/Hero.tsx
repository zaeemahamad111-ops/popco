"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

// Make sure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    subtitle: "GREAT POPCORN",
    titleStart: "Starts with",
    titleEnd: "Great Corn.",
    description:
      "From trusted farms to your favorite snack, we obsess over every detail so you can taste the difference.",
    indicator: "01",
    cta: "OUR JOURNEY",
    ctaSub: "Watch how we bring the perfect crunch",
    target: "#story",
    positionClass: "bottom-10 left-10 md:left-24 md:bottom-28",
  },
  {
    subtitle: "PREPARATION",
    titleStart: "Sorted for",
    titleEnd: "Pure Quality.",
    description:
      "We inspect every grain, filtering out imperfections to prepare the perfect kernels for popping.",
    indicator: "02",
    cta: "THE PROCESS",
    ctaSub: "Prepared with love and strict standards",
    target: "#process",
    positionClass: "bottom-10 left-10 md:left-24 md:bottom-28",
  },
  {
    subtitle: "THE POP",
    titleStart: "Heat, Pressure,",
    titleEnd: "& Popping.",
    description:
      "Using precise temperature control, the kernel's moisture expands until it bursts into a beautiful, white blossom.",
    indicator: "03",
    cta: "WITNESS THE POP",
    ctaSub: "Popping at the perfect temperature",
    target: "#process",
    positionClass: "bottom-10 left-10 md:left-24 md:bottom-28",
  },
  {
    subtitle: "FLAVORING",
    titleStart: "Infused with",
    titleEnd: "Rich Flavor.",
    description:
      "Tossed while warm in fine sea salt, natural sweet glazes, or savory spices to coat every surface.",
    indicator: "04",
    cta: "SIGNATURE BLENDS",
    ctaSub: "Crafted for the ultimate flavor profile",
    target: "#products",
    positionClass: "bottom-10 right-10 left-auto md:right-24 md:bottom-28 md:left-auto",
  },
  {
    subtitle: "PACKAGING",
    titleStart: "Packed for the",
    titleEnd: "Perfect Crunch.",
    description:
      "Sealed immediately in our designer boxes and bags to preserve that crunchy, fresh-from-the-pot taste.",
    indicator: "05",
    cta: "DISCOVER FLAVORS",
    ctaSub: "Explore our collection below",
    target: "#products",
    positionClass: "bottom-10 left-10 md:left-24 md:bottom-28",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Draw image cover-fit onto canvas (like object-fit: cover)
  const renderFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Only resize canvas if dimensions changed (avoids flicker)
    if (canvas.width !== vw || canvas.height !== vh) {
      canvas.width = vw;
      canvas.height = vh;
    }

    // Cover-fit math: scale so the image fills the canvas with no letterboxing
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = vw / vh;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image → fit width, crop height
      drawW = vw;
      drawH = vw / imgRatio;
    } else {
      // Canvas is taller than image → fit height, crop width
      drawH = vh;
      drawW = vh * imgRatio;
    }
    drawX = (vw - drawW) / 2;
    drawY = (vh - drawH) / 2;

    ctx.clearRect(0, 0, vw, vh);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    const folder = isMobile ? "mobile" : "web";
    const frameCount = 120;

    // Prepopulate images array with empty slots
    const images: HTMLImageElement[] = Array(frameCount);
    imagesRef.current = images;

    // ─── Wait for Lenis proxy to be set up before registering ScrollTrigger ───
    // SmoothScroll.tsx sets up the scrollerProxy in its own useEffect.
    // Both run after render — we defer by one RAF to guarantee ordering.
    let ctx: ReturnType<typeof gsap.context>;
    let timeoutId: ReturnType<typeof setTimeout>;

    const initScrollTrigger = () => {
      ctx = gsap.context(() => {
        const obj = { frame: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            // Function form: computed fresh on each refresh so it always
            // matches the current viewport height exactly
            end: () => "+=" + window.innerHeight * 4,
            pin: true,
            scrub: 2.8,
            anticipatePin: 1,
            // Re-calculate end position if the window is resized
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const newStep = Math.min(4, Math.floor(self.progress * 5));
              setActiveStep(newStep);
            },
          },
        });

        // Scrub image index from 0 to frameCount-1
        tl.to(obj, {
          frame: frameCount - 1,
          ease: "none",
          onUpdate: () => {
            const index = Math.round(obj.frame);
            let currentImg = images[index];

            if (!currentImg) {
              // Fallback: find the closest loaded frame
              for (let diff = 1; diff < frameCount; diff++) {
                if (index - diff >= 0 && images[index - diff]) {
                  currentImg = images[index - diff];
                  break;
                }
                if (index + diff < frameCount && images[index + diff]) {
                  currentImg = images[index + diff];
                  break;
                }
              }
            }

            if (currentImg) renderFrame(currentImg);
          },
        });
      }, containerRef);
    };

    // Small delay to let SmoothScroll's useEffect run first
    timeoutId = setTimeout(initScrollTrigger, 50);

    // Load first frame immediately (frames are 1-indexed: ezgif-frame-001.png)
    const frameSrc = (i: number) =>
      `/images/frames/${folder}/ezgif-frame-${String(i).padStart(3, "0")}.png`;

    const firstImg = new Image();
    firstImg.src = frameSrc(1);
    firstImg.onload = () => {
      if (!isMounted) return;
      renderFrame(firstImg);
      images[0] = firstImg;

      let loadedCount = 1;
      const checkAllLoaded = () => {
        if (loadedCount === frameCount) {
          setLoaded(true);
          (window as any).heroLoaded = true;
          window.dispatchEvent(new CustomEvent("hero-loaded"));
          ScrollTrigger.refresh();
        }
      };

      // Load remaining frames (2–120) in the background
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = frameSrc(i + 1); // frames are 1-indexed
        img.onload = () => {
          if (!isMounted) return;
          images[i] = img;
          loadedCount++;
          checkAllLoaded();
        };
        img.onerror = () => {
          if (!isMounted) return;
          loadedCount++;
          checkAllLoaded();
        };
      }
    };


    // Re-render current frame on resize so canvas covers viewport
    const handleResize = () => {
      const currentIdx = Math.round(
        ((imagesRef.current.filter(Boolean).length - 1) / (frameCount - 1)) *
          (frameCount - 1)
      );
      const latestFrame = imagesRef.current.find(Boolean);
      if (latestFrame) renderFrame(latestFrame);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      ctx?.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [renderFrame]);

  const scrollToStep = (stepIndex: number) => {
    const scrollY =
      (containerRef.current?.offsetTop || 0) + window.innerHeight * stepIndex;
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(scrollY);
    } else {
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    const scrollY = (containerRef.current?.offsetTop || 0) + window.innerHeight;
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(scrollY);
    } else {
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full select-none bg-background overflow-hidden z-0"
      style={{ height: "100vh", minHeight: "100vh", flexShrink: 0 }}
    >
      {/* ─── Full-Screen Canvas ─── */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />

      <AnimatePresence mode="wait">
        {steps.map((stepData, index) => {
          if (index !== activeStep) return null;
          if (index === 0) return null; // Hide dialogue card on the first step/frame
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute z-30 w-[calc(100%-80px)] max-w-[320px] md:max-w-[460px] flex flex-col items-start ${stepData.positionClass}`}
            >
              {/* Subtitle tag */}
              <span className="block text-[8px] md:text-[10px] tracking-[0.35em] font-bold text-dark/50 uppercase mb-2">
                {stepData.subtitle}
              </span>

              {/* Main heading */}
              <h1
                className="font-editorial font-normal leading-[1.08] tracking-tight text-dark mb-3 text-[24px] sm:text-3xl md:text-5xl lg:text-[52px]"
              >
                {stepData.titleStart}
                <br />
                <span className="text-white italic font-serif">{stepData.titleEnd}</span>
              </h1>

              {/* Description */}
              <p className="text-[10.5px] md:text-[13px] text-muted font-medium leading-relaxed max-w-[340px] mb-5">
                {stepData.description}
              </p>

              {/* CTA */}
              <button
                onClick={() => {
                  if ((window as any).lenis) {
                    (window as any).lenis.scrollTo(stepData.target);
                  } else {
                    document
                      .getElementById(stepData.target.replace("#", ""))
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="flex items-center gap-3 group/cta text-[8.5px] md:text-[9.5px] tracking-[0.25em] font-bold text-dark hover:text-black transition-colors duration-300"
              >
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-dark/20 flex items-center justify-center group-hover/cta:border-dark group-hover/cta:bg-dark/5 transition-all duration-300">
                  <span className="text-[6.5px] md:text-[8px] ml-[1.5px] text-dark group-hover/cta:text-black">▶</span>
                </div>
                <div className="flex flex-col items-start leading-tight text-left">
                  <span>{stepData.cta}</span>
                  <span className="text-[7.5px] md:text-[8.5px] text-dark/50 tracking-[0.1em] font-normal group-hover/cta:text-black/70 transition-colors">
                    {stepData.ctaSub}
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* ─── Bottom Center: Circular "SCROLL" indicator ─── */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 group focus:outline-none"
        animate={activeStep === 0 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Scroll down"
      >
        {/* Pulsing circle (monochrome) */}
        <div className="relative w-12 h-12 rounded-full border border-dark/15 flex items-center justify-center bg-white/60 backdrop-blur-sm group-hover:border-dark/30 transition-colors duration-300">
          {/* Outer pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dark/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner dark dot */}
          <div className="w-3 h-3 rounded-full bg-dark shadow-[0_0_8px_1px_rgba(0,0,0,0.15)]" />
        </div>

        {/* SCROLL label */}
        <span className="text-[8px] tracking-[0.3em] font-semibold text-dark/60 uppercase group-hover:text-dark transition-colors duration-300">
          SCROLL
        </span>

        {/* Down arrow */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-dark/40 text-[10px]"
        >
          ↓
        </motion.div>
      </motion.button>

      {/* ─── Loading state overlay ─── */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="absolute inset-0 z-50 bg-background flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-dark/20 border-t-dark animate-spin" />
              <span className="text-[9px] tracking-[0.3em] text-dark/40 uppercase">
                Loading
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
