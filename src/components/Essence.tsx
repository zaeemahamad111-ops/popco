"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { LiaLeafSolid, LiaAwardSolid } from "react-icons/lia";

const bottomBadges = [
  { 
    icon: <LiaLeafSolid className="text-gold text-2xl" />, 
    title: "100%", 
    desc: "NATURAL INGREDIENTS" 
  },
  { 
    icon: <LiaAwardSolid className="text-gold text-2xl" />, 
    title: "SMALL BATCH", 
    desc: "MADE" 
  },
  { 
    icon: (
      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ), 
    title: "MADE WITH", 
    desc: "CARE & PASSION" 
  },
  { 
    icon: (
      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 16.5a4.5 4.5 0 006 4M3 13.5c1-1.5 2.5-2 4-1.5s2.5 2 3.5 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 16.5a4.5 4.5 0 01-6 4M21 13.5c-1-1.5-2.5-2-4-1.5s-2.5 2-3.5 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a2 2 0 012 2c0 1.2-1 2-2 3.5-1-1.5-2-2.3-2-3.5a2 2 0 012-2Z" />
      </svg>
    ), 
    title: "REAL INGREDIENTS.", 
    desc: "REAL TASTE. REAL POPCO." 
  },
];

// Mobile fallback list
const mobileIngredients = [
  {
    title: "PREMIUM CORN",
    desc: "Sourced from trusted farms for exceptional quality and taste.",
    img: "/images/ingredient-corn.png",
    x: 74,
    y: 110,
  },
  {
    title: "SUNFLOWER OIL",
    desc: "Light, clean and heart-friendly for the perfect pop.",
    img: "/images/ingredient-oil.png",
    x: 60,
    y: 160,
  },
  {
    title: "NATURAL SWEETNESS",
    desc: "Just the right hint of sweetness, made from natural ingredients.",
    img: "/images/ingredient-sugar.png",
    x: 74,
    y: 210,
  },
  {
    title: "SEA SALT",
    desc: "A touch of sea salt brings out the perfect balance in every bite.",
    img: "/images/ingredient-salt.png",
    x: 246,
    y: 110,
  },
  {
    title: "PERFECT POP",
    desc: "Popped to perfection for a light, crunchy and satisfying bite.",
    img: "/images/ingredient-popcorn.png",
    x: 260,
    y: 160,
  },
  {
    title: "NO COMPROMISES",
    desc: "No artificial colors. No preservatives. Just real goodness.",
    img: "/images/ingredient-leaf.png",
    x: 246,
    y: 210,
  }
];

export default function Essence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMobileIdx((prev) => (prev + 1) % mobileIngredients.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".ess-reveal", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        opacity: 0, y: 40, duration: 1.0, stagger: 0.1, ease: "power2.out",
      });
      
      gsap.from(".ess-bag", {
        scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        opacity: 0, scale: 0.9, y: 50, duration: 1.4, ease: "power3.out",
      });

      gsap.from(".ess-feature", {
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
        opacity: 0, y: 30, duration: 1.0, stagger: 0.1, ease: "power2.out",
      });

      gsap.from(".ess-badge", {
        scrollTrigger: { trigger: ".ess-badge-container", start: "top 95%" },
        opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });

      // Twinkling sparkles
      gsap.to(".ess-sparkle", {
        opacity: "random(0.1, 0.7)",
        scale: "random(0.7, 1.3)",
        duration: "random(1.5, 3.5)",
        repeat: -1,
        yoyo: true,
        stagger: 0.15,
        ease: "sine.inOut",
      });
      
      // Floating popcorn animations
      gsap.utils.toArray<HTMLElement>(".ess-popcorn").forEach((el) => {
        gsap.to(el, {
          y: `random(-20, 20)`,
          x: `random(-15, 15)`,
          rotation: `random(-30, 30)`,
          duration: gsap.utils.random(4, 7),
          repeat: -1, yoyo: true, ease: "sine.inOut",
          delay: gsap.utils.random(0, 2),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo("#story");
    } else {
      document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="essence"
      ref={containerRef}
      className="relative w-full bg-[#FDFBF7] pt-24 md:pt-32 pb-16 overflow-hidden border-b border-gold/10 z-10"
    >
      {/* Left sidebar progress */}
      <div className="absolute left-6 md:left-10 top-0 bottom-0 hidden md:flex flex-col items-center z-10 pt-40 pb-10">
        <div className="w-px h-8 bg-gold/30 mb-5" />
        <div className="flex flex-col items-center gap-[10px]">
          {["hero", "products", "process", "essence", "story", "experience"].map((s, i) => (
            <div key={s} className={`rounded-full transition-all duration-500 ${
              i === 3 ? "w-[7px] h-[7px] bg-gold" : "w-[5px] h-[5px] bg-[#111111]/20"
            }`} />
          ))}
        </div>
        <div className="w-px flex-1 bg-[#111111]/10 my-5" />
        <span
          className="text-[9px] tracking-[0.4em] font-light text-muted uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          OUR ESSENCE
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:pl-32 pr-6 md:pr-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 items-center min-h-[700px]">
          
          {/* LEFT: Typography & CTA */}
          <div className="flex flex-col items-start justify-center pt-10 pb-16 lg:py-0 z-20">
            <h3 className="ess-reveal text-[11px] tracking-[0.35em] text-gold font-bold uppercase mb-6">
              WHAT MAKES POPCO
            </h3>
            
            <h2 className="ess-reveal font-editorial text-[60px] sm:text-[75px] md:text-[90px] lg:text-[100px] font-light text-[#222] leading-[1.05] tracking-tight mb-8">
              The Finest<br />
              Things, <span className="font-serif italic text-gold">Perfected.</span>
            </h2>
            
            <div className="ess-reveal w-16 h-[1.5px] bg-gold/60 mb-8" />
            
            <div className="ess-reveal text-[15px] sm:text-[17px] text-[#444] font-medium leading-[1.8] mb-12">
              <p>We believe great popcorn starts with</p>
              <p>great choices. Every ingredient, every</p>
              <p>batch, every detail—chosen for quality,</p>
              <p>crafted for taste.</p>
            </div>
            
            <a 
              href="#story" 
              onClick={handleCtaClick}
              className="ess-reveal flex items-center gap-3 group cursor-pointer text-[11px] font-bold tracking-[0.25em] text-gold hover:text-dark transition-colors duration-300"
            >
              <span>DISCOVER OUR PROMISE</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
            {/* RIGHT: Bag, Orbit, and Ingredients */}
          <div className="relative w-full h-[800px] hidden lg:flex items-center justify-center z-10">
            
            {/* SVG Connector Lines (Desktop only) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" viewBox="0 0 1000 800" fill="none">
              {/* Outer orbit wireframe - cx=560, cy=400, r=240 */}
              <circle cx="560" cy="400" r="240" stroke="#C9A14A" strokeWidth="0.8" className="opacity-35" />
              
              {/* Line 1 (Premium Corn) */}
              <path d="M 280 200 L 320 200 L 345 230" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="320" cy="200" r="3" fill="#C9A14A" className="opacity-60" />
              <circle cx="345" cy="230" r="4.5" fill="#C9A14A" />
              
              {/* Line 2 (Sunflower Oil) */}
              <path d="M 280 412 L 300 412 L 320 395" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="300" cy="412" r="3" fill="#C9A14A" className="opacity-60" />
              <circle cx="320" cy="395" r="4.5" fill="#C9A14A" />
              
              {/* Line 3 (Natural Sweetness) */}
              <path d="M 280 596 L 320 596 L 345 566" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="320" cy="596" r="3" fill="#C9A14A" className="opacity-60" />
              <circle cx="345" cy="566" r="4.5" fill="#C9A14A" />
              
              {/* Line 4 (Sea Salt) */}
              <path d="M 800 200 L 760 200 L 745 230" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="760" cy="200" r="3" fill="#C9A14A" className="opacity-60" />
              <circle cx="745" cy="230" r="4.5" fill="#C9A14A" />
              
              {/* Line 5 (Perfect Pop) */}
              <path d="M 830 412 L 800 412 L 780 395" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="800" cy="412" r="3" fill="#C9A14A" className="opacity-60" />
              <circle cx="780" cy="395" r="4.5" fill="#C9A14A" />
              
              {/* Line 6 (No Compromises) */}
              <path d="M 800 596 L 760 596 L 745 566" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="760" cy="596" r="3" fill="#C9A14A" className="opacity-60" />
              <circle cx="745" cy="566" r="4.5" fill="#C9A14A" />
            </svg>

            {/* Sparkles (twinkling) */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
              <svg className="ess-sparkle absolute text-gold w-3 h-3" style={{ left: "54%", top: "25%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
              <svg className="ess-sparkle absolute text-gold w-4 h-4" style={{ right: "32%", top: "22%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
              <svg className="ess-sparkle absolute text-gold w-2.5 h-2.5" style={{ left: "44%", bottom: "35%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
              <svg className="ess-sparkle absolute text-gold w-3.5 h-3.5" style={{ right: "28%", bottom: "28%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
            </div>

            {/* Central Upright Popcorn Bag (Shifted to left-[56%] to align with circle center) */}
            <div 
              className="ess-bag absolute z-20 w-[120%] h-[120%] sm:w-[100%] sm:h-[100%] lg:w-[800px] lg:h-[533px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[3deg] lg:left-[56%] lg:top-[50%]"
            >
              <Image 
                src="/images/original-bag.png" 
                alt="POPCO Original Bag" 
                fill 
                className="object-contain drop-shadow-[0_45px_90px_rgba(0,0,0,0.22)]"
                sizes="(max-width: 1024px) 100vw, 1000px"
                priority
              />
            </div>

            {/* Large Ingredient Images floating on the circle */}
            <div className="absolute inset-0 hidden lg:block pointer-events-none z-30">
              {/* Premium Corn */}
              <div 
                className="ess-feature absolute pointer-events-auto transition-transform duration-500 hover:scale-110 cursor-pointer"
                style={{ 
                  left: "36.4%", 
                  top: "32.75%", 
                  width: "160px", 
                  height: "160px",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Image 
                  src="/images/ingredient-corn.png" 
                  alt="Premium Corn" 
                  fill 
                  sizes="160px" 
                  className="object-contain drop-shadow-md"
                />
              </div>

              {/* Sunflower Oil */}
              <div 
                className="ess-feature absolute pointer-events-auto transition-transform duration-500 hover:scale-110 cursor-pointer"
                style={{ 
                  left: "32.0%", 
                  top: "50.0%", 
                  width: "160px", 
                  height: "160px",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Image 
                  src="/images/ingredient-oil.png" 
                  alt="Sunflower Oil" 
                  fill 
                  sizes="160px" 
                  className="object-contain drop-shadow-md"
                />
              </div>

              {/* Natural Sweetness */}
              <div 
                className="ess-feature absolute pointer-events-auto transition-transform duration-500 hover:scale-110 cursor-pointer"
                style={{ 
                  left: "36.4%", 
                  top: "67.25%", 
                  width: "160px", 
                  height: "160px",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Image 
                  src="/images/ingredient-sugar.png" 
                  alt="Natural Sweetness" 
                  fill 
                  sizes="160px" 
                  className="object-contain drop-shadow-md"
                />
              </div>

              {/* Sea Salt */}
              <div 
                className="ess-feature absolute pointer-events-auto transition-transform duration-500 hover:scale-110 cursor-pointer"
                style={{ 
                  left: "75.6%", 
                  top: "32.75%", 
                  width: "160px", 
                  height: "160px",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Image 
                  src="/images/ingredient-salt.png" 
                  alt="Sea Salt" 
                  fill 
                  sizes="160px" 
                  className="object-contain drop-shadow-md"
                />
              </div>

              {/* Perfect Pop */}
              <div 
                className="ess-feature absolute pointer-events-auto transition-transform duration-500 hover:scale-110 cursor-pointer"
                style={{ 
                  left: "80.0%", 
                  top: "50.0%", 
                  width: "160px", 
                  height: "160px",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Image 
                  src="/images/ingredient-popcorn.png" 
                  alt="Perfect Pop" 
                  fill 
                  sizes="160px" 
                  className="object-contain drop-shadow-md"
                />
              </div>

              {/* No Compromises */}
              <div 
                className="ess-feature absolute pointer-events-auto transition-transform duration-500 hover:scale-110 cursor-pointer"
                style={{ 
                  left: "75.6%", 
                  top: "67.25%", 
                  width: "160px", 
                  height: "160px",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Image 
                  src="/images/ingredient-leaf.png" 
                  alt="No Compromises" 
                  fill 
                  sizes="160px" 
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>

            {/* Left/Right Text Callouts */}
            <div className="absolute inset-0 hidden lg:block pointer-events-none z-40">
              
              {/* LEFT SIDE TEXT CALLOUTS */}
              
              {/* Premium Corn */}
              <div 
                className="ess-feature absolute flex flex-col items-start text-left w-[240px] pointer-events-auto"
                style={{ left: "4%", top: "21.5%" }}
              >
                <h4 className="text-[13px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                  PREMIUM CORN
                </h4>
                <p className="text-[11px] text-[#555] font-light leading-[1.6]">
                  Sourced from trusted farms for exceptional quality and taste.
                </p>
              </div>

              {/* Sunflower Oil */}
              <div 
                className="ess-feature absolute flex flex-col items-start text-left w-[240px] pointer-events-auto"
                style={{ left: "1%", top: "48%" }}
              >
                <h4 className="text-[13px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                  SUNFLOWER OIL
                </h4>
                <p className="text-[11px] text-[#555] font-light leading-[1.6]">
                  Light, clean and heart-friendly for the perfect pop.
                </p>
              </div>

              {/* Natural Sweetness */}
              <div 
                className="ess-feature absolute flex flex-col items-start text-left w-[240px] pointer-events-auto"
                style={{ left: "4%", top: "71%" }}
              >
                <h4 className="text-[13px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                  NATURAL SWEETNESS
                </h4>
                <p className="text-[11px] text-[#555] font-light leading-[1.6]">
                  Just the right hint of sweetness, made from natural ingredients.
                </p>
              </div>

              {/* RIGHT SIDE TEXT CALLOUTS */}

              {/* Sea Salt */}
              <div 
                className="ess-feature absolute flex flex-col items-start text-left w-[240px] pointer-events-auto"
                style={{ left: "80%", top: "21.5%" }}
              >
                <h4 className="text-[13px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                  SEA SALT
                </h4>
                <p className="text-[11px] text-[#555] font-light leading-[1.6]">
                  A touch of sea salt brings out the perfect balance in every bite.
                </p>
              </div>

              {/* Perfect Pop */}
              <div 
                className="ess-feature absolute flex flex-col items-start text-left w-[240px] pointer-events-auto"
                style={{ left: "83%", top: "48%" }}
              >
                <h4 className="text-[13px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                  PERFECT POP
                </h4>
                <p className="text-[11px] text-[#555] font-light leading-[1.6]">
                  Popped to perfection for a light, crunchy and satisfying bite.
                </p>
              </div>

              {/* No Compromises */}
              <div 
                className="ess-feature absolute flex flex-col items-start text-left w-[240px] pointer-events-auto"
                style={{ left: "80%", top: "71%" }}
              >
                <h4 className="text-[13px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                  NO COMPROMISES
                </h4>
                <p className="text-[11px] text-[#555] font-light leading-[1.6] whitespace-pre-line">
                  No artificial colors.{"\n"}No preservatives.{"\n"}Just real goodness.
                </p>
              </div>

            </div>

            {/* Floating Popcorn Pieces */}
            <div className="absolute inset-0 z-35 pointer-events-none">
              <Image src="/images/floating-popcorn-1.png" alt="" width={70} height={70} className="ess-popcorn absolute top-[15%] left-[32%] opacity-90 object-contain drop-shadow-md blur-[1px]" />
              <Image src="/images/floating-popcorn-2.png" alt="" width={120} height={120} className="ess-popcorn absolute top-[5%] left-[58%] opacity-100 object-contain drop-shadow-xl" />
              <Image src="/images/floating-popcorn-3.png" alt="" width={60} height={60} className="ess-popcorn absolute top-[25%] right-[12%] opacity-80 object-contain drop-shadow-sm blur-[2px]" />
              
              <Image src="/images/floating-popcorn-4.png" alt="" width={50} height={50} className="ess-popcorn absolute bottom-[35%] left-[30%] opacity-85 object-contain drop-shadow-sm" />
              <Image src="/images/floating-popcorn-1.png" alt="" width={90} height={90} className="ess-popcorn absolute bottom-[22%] right-[22%] opacity-95 object-contain drop-shadow-lg" />
            </div>

          </div>
        </div>

        {/* Mobile interactive orbit diagram */}
        <div className="lg:hidden flex flex-col items-center mt-6 mb-12">
          
          <div className="relative w-[320px] h-[320px] mx-auto flex items-center justify-center">
            
            {/* SVG circle */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
              <circle cx="160" cy="160" r="100" stroke="#C9A14A" strokeWidth="0.8" strokeDasharray="4 4" className="opacity-45" />
            </svg>
            
            {/* Central Bag */}
            <div className="absolute w-[220px] h-[220px] z-10 pointer-events-none rotate-[3deg]">
              <Image 
                src="/images/original-bag.png" 
                alt="POPCO Original Bag" 
                fill 
                className="object-contain drop-shadow-lg"
                sizes="220px"
              />
            </div>
            
            {/* Orbiting Ingredient Buttons */}
            {mobileIngredients.map((feat, idx) => {
              const isActive = idx === activeMobileIdx;
              return (
                <button
                  key={feat.title}
                  onClick={() => setActiveMobileIdx(idx)}
                  className={`absolute w-14 h-14 rounded-full bg-white flex items-center justify-center p-1.5 transition-all duration-300 shadow-sm border ${
                    isActive 
                      ? "border-gold ring-4 ring-gold/20 scale-110 z-20 shadow-md" 
                      : "border-gold/15 scale-100 z-10 hover:border-gold/40"
                  }`}
                  style={{
                    left: `${feat.x}px`,
                    top: `${feat.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image src={feat.img} alt={feat.title} fill sizes="48px" className="object-contain" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Description Display */}
          <div className="w-full max-w-[340px] px-2 mt-4">
            <div className="bg-white/60 backdrop-blur-sm border border-gold/15 p-5 rounded-2xl min-h-[110px] shadow-sm flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {mobileIngredients.map((feat, idx) => {
                  if (idx !== activeMobileIdx) return null;
                  return (
                    <motion.div
                      key={feat.title}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <h4 className="text-[11px] font-bold tracking-[0.18em] text-dark uppercase mb-1.5">
                        {feat.title}
                      </h4>
                      <p className="text-[10.5px] text-[#555] font-light leading-relaxed">
                        {feat.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
          
        </div>

      </div>

      {/* Bottom Promo Badges */}
      <div className="ess-badge-container max-w-[1100px] mx-auto mt-10 md:mt-20 px-6 sm:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gold/30 rounded-[20px] bg-[#FDFBF7] divide-y md:divide-y-0 md:divide-x divide-gold/20 overflow-hidden shadow-sm">
          {bottomBadges.map((badge, idx) => (
            <div key={idx} className="ess-badge flex items-center justify-start gap-4 p-6 md:py-8 md:px-6 hover:bg-white transition-colors duration-300">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                {badge.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] md:text-[18px] font-bold text-dark leading-none mb-1">{badge.title}</span>
                <span className="text-[10px] tracking-[0.15em] text-muted font-semibold uppercase whitespace-pre-line leading-tight">{badge.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
