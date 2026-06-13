"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Disable scrolling immediately on mount
    document.body.style.overflow = "hidden";
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    let isHeroReady = !!(window as any).heroLoaded;

    // Timeout fallback: after 6.5s, force hero ready to prevent getting stuck
    const fallbackTimeout = setTimeout(() => {
      isHeroReady = true;
    }, 6500);

    const handleHeroLoaded = () => {
      isHeroReady = true;
    };

    window.addEventListener("hero-loaded", handleHeroLoaded);

    const interval = setInterval(() => {
      setProgress((prev) => {
        let next = prev;
        if (isHeroReady) {
          // If hero is loaded, speed up to 100%
          next = prev + 5;
        } else {
          // If hero is NOT loaded, count up smoothly to 90%, then hold
          if (prev < 90) {
            next = prev + 1;
          } else if (prev < 99) {
            // Very slow ticks so user sees it's not frozen
            next = prev + (Math.random() > 0.8 ? 1 : 0);
          }
        }

        if (next >= 100) {
          clearInterval(interval);
          clearTimeout(fallbackTimeout);
          
          // Trigger fade-out
          setIsFadingOut(true);
          const doneTimeout = setTimeout(() => {
            setIsDone(true);
            // Restore scrolling
            document.body.style.overflow = "";
            if ((window as any).lenis) {
              (window as any).lenis.start();
            }
          }, 900); // Allow time for exit animations
          return 100;
        }
        return next;
      });
    }, 25); // 25ms interval -> ~2.2s base duration to reach 90%

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      window.removeEventListener("hero-loaded", handleHeroLoaded);
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100vh",
            transition: { 
              duration: 0.85, 
              ease: [0.76, 0, 0.24, 1] // Custom cubic-bezier for smooth slide up
            }
          }}
          className="fixed inset-0 z-[99999] bg-[#FDFBF7] flex flex-col items-center justify-center select-none"
        >
          {/* Subtle luxurious cream vignette background */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/[0.02] pointer-events-none" />

          {/* Logo container */}
          <div className="relative flex flex-col items-center text-center">
            {/* Main Brand Logo - Floating fade-in animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-10 px-4"
            >
              <Image 
                src="/images/logo.png" 
                alt="POPCO Logo" 
                width={280} 
                height={92} 
                className="w-auto h-16 sm:h-20 md:h-24 object-contain" 
                priority
              />
            </motion.div>

            {/* Custom Progress Layout */}
            <div className="flex flex-col items-center w-[200px]">
              {/* Progress Percentage */}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                className="text-[10px] tracking-[0.25em] font-sans font-medium text-dark/70 mb-3"
              >
                {progress}%
              </motion.span>

              {/* Progress Track */}
              <div className="w-full h-[1.5px] bg-[#111111]/8 rounded-full overflow-hidden relative">
                {/* Gold Progress Fill expanding from center */}
                <motion.div
                  className="absolute top-0 bottom-0 left-0 right-0 bg-gold rounded-full"
                  style={{
                    transformOrigin: "center",
                    scaleX: progress / 100,
                  }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom ESTD details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.6, duration: 1.0 }}
            className="absolute bottom-10 text-[8px] tracking-[0.4em] font-light text-dark uppercase"
          >
            ESTD — 2025 — ORIGINAL
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
