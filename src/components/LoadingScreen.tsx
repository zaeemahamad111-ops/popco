"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LotusSVG } from "./LotusLogo";

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

    // Set up a smooth progress counter over 2.4s
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // When progress reaches 100%, trigger fade-out
        setIsFadingOut(true);
        const timeout = setTimeout(() => {
          setIsDone(true);
          // Restore scrolling
          document.body.style.overflow = "";
          if ((window as any).lenis) {
            (window as any).lenis.start();
          }
        }, 900); // Allow time for exit animations
        return () => clearTimeout(timeout);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
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
            {/* Lotus SVG - Soft glow and floating scale animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative p-4 rounded-full bg-white/40 shadow-[0_8px_32px_rgba(201,161,74,0.04)] border border-gold/10">
                <LotusSVG size={72} color="#C9A14A" />
                {/* Subtle pulse ring around the lotus */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-gold/20"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Brand Names */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.0, ease: "easeOut" }}
              className="flex flex-col gap-2.5 items-center mb-10"
            >
              <span className="font-sans font-bold tracking-[0.35em] text-2xl text-dark leading-none">
                POPCO®
              </span>
              <span className="text-[9px] tracking-[0.3em] font-semibold text-gold leading-none uppercase">
                PREMIUM POPCORN
              </span>
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
