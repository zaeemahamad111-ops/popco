"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";
import { LiaLeafSolid, LiaHandHoldingHeartSolid, LiaAwardSolid } from "react-icons/lia";
import { PiPopcorn } from "react-icons/pi";

const storyFeatures = [
  {
    icon: <LiaLeafSolid className="text-gold text-xl" />,
    title: "100% NATURAL",
    desc: "Real ingredients. Nothing artificial. Ever.",
  },
  {
    icon: <LiaAwardSolid className="text-gold text-xl" />,
    title: "SMALL BATCH",
    desc: "Crafted in small batches for unmatched freshness and quality.",
  },
  {
    icon: <PiPopcorn className="text-gold text-xl" />,
    title: "PREMIUM CORN",
    desc: "Sourced from trusted farms that share our commitment to excellence.",
  },
  {
    icon: <LiaHandHoldingHeartSolid className="text-gold text-xl" />,
    title: "FRESHLY POPPED",
    desc: "Popped to perfection for maximum crunch and irresistible flavor.",
  },
];

const statBadges = [
  { label: "100%", desc: "NATURAL", icon: <LiaLeafSolid className="text-gold text-lg" /> },
  { label: "0", desc: "ARTIFICIAL ANYTHING", icon: <LiaAwardSolid className="text-gold text-lg" /> },
  { label: "100+", desc: "QUALITY CHECKS", icon: <PiPopcorn className="text-gold text-lg" /> },
  { label: "∞", desc: "LOVE IN EVERY BITE", icon: <LiaHandHoldingHeartSolid className="text-gold text-lg" /> },
];

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".story-reveal", {
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
        opacity: 0, y: 45, duration: 1.0, stagger: 0.15, ease: "power2.out",
      });
      gsap.from(".story-feat", {
        scrollTrigger: { trigger: ".story-features-col", start: "top 72%" },
        opacity: 0, x: 40, duration: 1.0, stagger: 0.15, ease: "power2.out",
      });
      gsap.from(".story-stat", {
        scrollTrigger: { trigger: ".story-stats", start: "top 90%" },
        opacity: 0, y: 25, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });
      gsap.from(bagRef.current, {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        opacity: 0, scale: 0.85, y: 40, duration: 1.4, ease: "power3.out",
      });
      // Gentle bag float
      gsap.to(bagRef.current, {
        y: -12, duration: 4.5, repeat: -1, yoyo: true, ease: "power1.inOut",
      });
      gsap.to(p1Ref.current, {
        y: -10, x: 5, rotation: 10, duration: 5, repeat: -1, yoyo: true, ease: "power1.inOut",
      });
      gsap.to(p2Ref.current, {
        y: 12, x: -6, rotation: -14, duration: 6, repeat: -1, yoyo: true, ease: "power1.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative min-h-screen w-full bg-background pt-24 md:pt-32 pb-0 overflow-hidden border-b border-[#111111]/5"
    >
      {/* Left sidebar progress */}
      <div className="absolute left-6 md:left-10 top-0 bottom-0 hidden md:flex flex-col items-center z-10 pt-40 pb-10">
        <div className="w-px h-8 bg-gold/30 mb-5" />
        <div className="flex flex-col items-center gap-[10px]">
          {["hero", "products", "process", "essence", "story", "experience"].map((s, i) => (
            <div
              key={s}
              className={`rounded-full transition-all duration-500 ${
                i === 4 ? "w-[7px] h-[7px] bg-gold" : "w-[5px] h-[5px] bg-[#111111]/20"
              }`}
            />
          ))}
        </div>
        <div className="w-px flex-1 bg-[#111111]/10 my-5" />
        <span
          className="text-[9px] tracking-[0.4em] font-light text-muted uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          OUR PROMISE
        </span>
      </div>

      {/* 3-column main grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr_0.85fr] gap-0 w-full px-8 md:pl-28 md:pr-12 items-center min-h-[80vh]">

        {/* Column 1: Text content */}
        <div className="flex flex-col items-start justify-center py-8 md:py-0 pr-0 md:pr-8">
          <p className="story-reveal text-[10px] tracking-[0.35em] text-gold font-semibold uppercase mb-4">
            OUR PROMISE
          </p>
          <h2 className="story-reveal font-editorial text-5xl sm:text-6xl md:text-[64px] font-light text-dark leading-[1.05] tracking-tight">
            From Nature.<br />
            To{" "}
            <em className="not-italic" style={{ color: "#C9A14A" }}>Perfection.</em>
          </h2>
          <div className="story-reveal w-8 h-px bg-gold my-6" />
          <div className="story-reveal text-[13px] text-muted font-light leading-[1.9] space-y-1">
            <p>Every kernel we choose.</p>
            <p>Every batch we craft.</p>
            <p>Every detail we perfect.</p>
            <p className="text-dark font-medium">For moments that matter.</p>
          </div>

          {/* Play Story button */}
          <button
            onClick={() => setIsVideoOpen(true)}
            className="story-reveal mt-10 flex items-center gap-5 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center
                           text-gold group-hover:bg-gold group-hover:text-[#F8F7F4] transition-all duration-500">
              <FiPlay className="ml-1 text-base" />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase">OUR STORY</span>
              <span className="text-[11px] text-muted font-light mt-1">Watch the journey behind POPCO</span>
            </div>
          </button>
        </div>

        {/* Column 2: Center bag + orbit + floaters */}
        <div className="relative flex items-center justify-center h-[55vh] md:h-[75vh] overflow-hidden">
          {/* Blurred deep background pieces */}
          <div className="absolute top-[10%] left-[10%] w-[80px] h-[80px] opacity-25 pointer-events-none"
            style={{ filter: "blur(5px)" }}>
            <Image src="/images/floating-popcorn-1.png" alt="" fill sizes="80px" className="object-contain" />
          </div>
          <div className="absolute bottom-[15%] right-[8%] w-[85px] h-[85px] opacity-20 pointer-events-none"
            style={{ filter: "blur(5px)" }}>
            <Image src="/images/floating-popcorn-3.png" alt="" fill sizes="85px" className="object-contain" />
          </div>

          {/* Gold orbit circle */}
          <svg
            className="absolute w-[80%] max-w-[420px] aspect-square pointer-events-none"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke="#C9A14A" strokeWidth="0.45" className="opacity-65" />
          </svg>

          {/* Foreground floating pieces */}
          <div ref={p1Ref} className="absolute top-[18%] left-[12%] w-[52px] h-[52px] z-10 pointer-events-none">
            <Image src="/images/floating-popcorn-2.png" alt="" fill sizes="52px" className="object-contain drop-shadow-md" />
          </div>
          <div ref={p2Ref} className="absolute bottom-[20%] right-[12%] w-[60px] h-[60px] z-10 pointer-events-none"
            style={{ filter: "blur(0.5px)" }}>
            <Image src="/images/floating-popcorn-4.png" alt="" fill sizes="60px" className="object-contain drop-shadow-md" />
          </div>

          {/* Central bag */}
          <div ref={bagRef} className="relative z-20 w-[62%] max-w-[310px] aspect-[1/1.45]">
            <Image
              src="/images/original-bag.png"
              alt="POPCO Original Bag"
              fill
              sizes="(max-width: 768px) 180px, 310px"
              className="object-contain drop-shadow-[0_20px_50px_rgba(201,161,74,0.15)]"
            />
          </div>
        </div>

        {/* Column 3: Feature list */}
        <div className="story-features-col flex flex-col justify-center space-y-6 py-8 md:py-0 pl-0 md:pl-6">
          {storyFeatures.map((feat) => (
            <div key={feat.title} className="story-feat flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border border-gold/20 bg-[#F8F7F4] flex items-center justify-center">
                {feat.icon}
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.18em] font-bold text-dark uppercase mb-1">{feat.title}</h4>
                <p className="text-[11px] text-muted font-light leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stats row */}
      <div className="story-stats w-full border-t border-[#111111]/8 mt-12 px-8 md:px-24 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statBadges.map((badge) => (
            <div key={badge.desc} className="story-stat flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center flex-shrink-0">
                {badge.icon}
              </div>
              <div>
                <p className="text-lg font-medium text-dark leading-none">{badge.label}</p>
                <p className="text-[9px] tracking-[0.2em] text-muted font-light uppercase mt-1 leading-tight">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/95 z-[55] flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:border-white transition-colors"
            >
              <FiX className="text-xl" />
            </button>
            <div className="w-full max-w-[960px] aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <video src="/images/story-video.mp4" controls autoPlay playsInline className="w-full h-full object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
