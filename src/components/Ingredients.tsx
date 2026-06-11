"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiaLeafSolid, LiaAwardSolid } from "react-icons/lia";

const rightFeatures = [
  {
    title: "100% NATURAL",
    desc: "Real ingredients.\nNothing artificial.\nEver.",
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 21l7.03-8.39C20.26 11.07 21 9.12 21 7c0-2.21-1.79-4-4-4h-5Z" />
      </svg>
    ),
  },
  {
    title: "SMALL BATCH",
    desc: "Crafted in small batches\nfor unmatched\nfreshness and quality.",
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 16.5a4.5 4.5 0 006 4M3 13.5c1-1.5 2.5-2 4-1.5s2.5 2 3.5 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 16.5a4.5 4.5 0 01-6 4M21 13.5c-1-1.5-2.5-2-4-1.5s-2.5 2-3.5 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a2 2 0 012 2c0 1.2-1 2-2 3.5-1-1.5-2-2.3-2-3.5a2 2 0 012-2Z" />
      </svg>
    ),
  },
  {
    title: "PREMIUM CORN",
    desc: "Sourced from trusted\nfarms that share our\ncommitment to\nexcellence.",
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="9" y="6" width="6" height="11" rx="3" />
        <path d="M12 6v11M9 9h6M9 12h6M9 15h6" strokeDasharray="1 1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 17c1-4 3-7 6-8M18 17c-1-4-3-7-6-8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v3" />
      </svg>
    ),
  },
];

const bottomBadges = [
  { icon: <LiaLeafSolid className="text-gold text-2xl" />, title: "100%", desc: "NATURAL" },
  { icon: <LiaAwardSolid className="text-gold text-2xl" />, title: "0", desc: "ARTIFICIAL\nANYTHING" },
  { 
    icon: (
      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ), 
    title: "100+", 
    desc: "QUALITY\nCHECKS" 
  },
  { 
    icon: (
      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ), 
    title: "∞", 
    desc: "LOVE IN EVERY\nBITE" 
  },
];

export default function Ingredients() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".prom-reveal", {
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        opacity: 0, y: 40, duration: 1.0, stagger: 0.1, ease: "power2.out",
      });
      
      gsap.from(".prom-bag", {
        scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        opacity: 0, scale: 0.9, y: 50, duration: 1.4, ease: "power3.out",
      });

      gsap.from(".prom-feature", {
        scrollTrigger: { trigger: containerRef.current, start: "top 60%" },
        opacity: 0, x: 30, duration: 1.0, stagger: 0.15, ease: "power2.out",
      });

      gsap.from(".prom-badge", {
        scrollTrigger: { trigger: ".prom-badge-container", start: "top 95%" },
        opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });
      
      // Floating popcorn animations
      gsap.utils.toArray<HTMLElement>(".prom-popcorn").forEach((el) => {
        gsap.to(el, {
          y: `random(-20, 20)`,
          x: `random(-15, 15)`,
          rotation: `random(-30, 30)`,
          duration: gsap.utils.random(4, 7),
          repeat: -1, yoyo: true, ease: "sine.inOut",
          delay: gsap.utils.random(0, 2),
        });
      });

      // Twinkling sparkles
      gsap.to(".prom-sparkle", {
        opacity: "random(0.1, 0.7)",
        scale: "random(0.7, 1.3)",
        duration: "random(1.5, 3.5)",
        repeat: -1,
        yoyo: true,
        stagger: 0.15,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full bg-[#FDFBF7] pt-24 md:pt-32 pb-16 overflow-hidden z-10"
    >
      {/* Left sidebar progress */}
      <div className="absolute left-6 md:left-10 top-0 bottom-0 hidden md:flex flex-col items-center z-10 pt-40 pb-10">
        <div className="w-px h-8 bg-gold/30 mb-5" />
        <div className="flex flex-col items-center gap-[10px]">
          {["hero", "products", "process", "essence", "story", "experience"].map((s, i) => (
            <div key={s} className={`rounded-full transition-all duration-500 ${
              i === 4 ? "w-[7px] h-[7px] bg-gold" : "w-[5px] h-[5px] bg-[#111111]/20"
            }`} />
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

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:pl-32 pr-6 md:pr-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[43%_57%] gap-8 items-center min-h-[700px]">
          
          {/* LEFT: Typography & Play Button */}
          <div className="flex flex-col items-start justify-center pt-10 pb-16 lg:py-0 z-20">
            <h3 className="prom-reveal text-[11px] tracking-[0.35em] text-gold font-bold uppercase mb-6">
              OUR PROMISE
            </h3>
            
            <h2 className="prom-reveal font-editorial text-[60px] sm:text-[75px] md:text-[90px] lg:text-[100px] font-light text-[#222] leading-[1.05] tracking-tight mb-8">
              From Nature.<br />
              To <span className="font-serif italic text-gold">Perfection.</span>
            </h2>
            
            <div className="prom-reveal w-16 h-[1.5px] bg-gold/60 mb-8" />
            
            <div className="prom-reveal text-[15px] sm:text-[17px] text-[#444] font-medium leading-[1.8] mb-12">
              <p>Every kernel we choose.</p>
              <p>Every batch we craft.</p>
              <p>Every detail we perfect.</p>
              <p>For moments that matter.</p>
            </div>
            
            <div className="prom-reveal flex items-center gap-5 cursor-pointer group">
              <div className="w-16 h-16 rounded-full border-[1.5px] border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.25em] font-bold text-gold uppercase mb-1">OUR STORY</span>
                <span className="text-[12px] text-muted font-light leading-snug">Watch the journey<br/>behind POPCO</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Bag, Popcorns, and Features */}
          <div className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center z-10">
            
            {/* SVG Connector Lines (Desktop only) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" viewBox="0 0 600 800" fill="none">
              {/* Outer orbit wireframe */}
              <circle cx="280" cy="400" r="280" stroke="#C9A14A" strokeWidth="0.8" className="opacity-35" />
              
              {/* Line 1 */}
              <line x1="385" y1="220" x2="522.5" y2="260" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="385" cy="220" r="4.5" fill="#C9A14A" />
              
              {/* Line 2 */}
              <line x1="430" y1="400" x2="560" y2="400" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="430" cy="400" r="4.5" fill="#C9A14A" />
              
              {/* Line 3 */}
              <line x1="385" y1="580" x2="522.5" y2="540" stroke="#C9A14A" strokeWidth="0.8" className="opacity-45" />
              <circle cx="385" cy="580" r="4.5" fill="#C9A14A" />
            </svg>

            {/* Sparkles (twinkling) */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
              {/* Sparkle 1 */}
              <svg className="prom-sparkle absolute text-gold w-3 h-3" style={{ left: "45%", top: "20%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
              {/* Sparkle 2 */}
              <svg className="prom-sparkle absolute text-gold w-4 h-4" style={{ right: "35%", top: "15%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
              {/* Sparkle 3 */}
              <svg className="prom-sparkle absolute text-gold w-2.5 h-2.5" style={{ left: "30%", top: "45%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
              {/* Sparkle 4 */}
              <svg className="prom-sparkle absolute text-gold w-3.5 h-3.5" style={{ right: "28%", bottom: "35%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
              {/* Sparkle 5 */}
              <svg className="prom-sparkle absolute text-gold w-4 h-4" style={{ left: "40%", bottom: "20%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
              {/* Sparkle 6 */}
              <svg className="prom-sparkle absolute text-gold w-2.5 h-2.5" style={{ right: "32%", top: "60%" }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c.1 4.5 3.5 7.9 8 8-4.5.1-7.9 3.5-8 8-.1-4.5-3.5-7.9-8-8 4.5-.1 7.9-3.5 8-8z" />
              </svg>
            </div>

            {/* Popcorn Bag */}
            <div 
              className="prom-bag absolute z-20 w-[140%] h-[140%] sm:w-[120%] sm:h-[120%] lg:w-[900px] lg:h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] lg:left-[46.7%] lg:top-[50%] lg:rotate-[-10deg]"
            >
              <Image 
                src="/images/cheese-bag.png" 
                alt="POPCO Cheese Bag" 
                fill 
                className="object-contain drop-shadow-[0_45px_90px_rgba(0,0,0,0.22)]"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Feature Text Callouts (Right side - Desktop only) */}
            <div className="absolute inset-0 hidden lg:block pointer-events-none z-30">
              
              {/* Feature 1: 100% NATURAL */}
              <div 
                className="prom-feature absolute flex items-center gap-4 w-[280px] pointer-events-auto"
                style={{ left: "87.1%", top: "32.5%", transform: "translate(-20px, -20px)" }}
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 bg-[#FDFBF7] flex items-center justify-center flex-shrink-0 text-gold shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 21l7.03-8.39C20.26 11.07 21 9.12 21 7c0-2.21-1.79-4-4-4h-5Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[12px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                    100% NATURAL
                  </h4>
                  <p className="text-[11px] text-[#555] font-light leading-[1.6] whitespace-pre-line">
                    Real ingredients.{"\n"}Nothing artificial.{"\n"}Ever.
                  </p>
                </div>
              </div>

              {/* Feature 2: SMALL BATCH */}
              <div 
                className="prom-feature absolute flex items-center gap-4 w-[280px] pointer-events-auto"
                style={{ left: "93.3%", top: "50%", transform: "translate(-20px, -20px)" }}
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 bg-[#FDFBF7] flex items-center justify-center flex-shrink-0 text-gold shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 16.5a4.5 4.5 0 006 4M3 13.5c1-1.5 2.5-2 4-1.5s2.5 2 3.5 3" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 16.5a4.5 4.5 0 01-6 4M21 13.5c-1-1.5-2.5-2-4-1.5s-2.5 2-3.5 3" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a2 2 0 012 2c0 1.2-1 2-2 3.5-1-1.5-2-2.3-2-3.5a2 2 0 012-2Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[12px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                    SMALL BATCH
                  </h4>
                  <p className="text-[11px] text-[#555] font-light leading-[1.6] whitespace-pre-line">
                    Crafted in small batches{"\n"}for unmatched{"\n"}freshness and quality.
                  </p>
                </div>
              </div>

              {/* Feature 3: PREMIUM CORN */}
              <div 
                className="prom-feature absolute flex items-center gap-4 w-[280px] pointer-events-auto"
                style={{ left: "87.1%", top: "67.5%", transform: "translate(-20px, -20px)" }}
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 bg-[#FDFBF7] flex items-center justify-center flex-shrink-0 text-gold shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="9" y="6" width="6" height="11" rx="3" />
                    <path d="M12 6v11M9 9h6M9 12h6M9 15h6" strokeDasharray="1 1" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 17c1-4 3-7 6-8M18 17c-1-4-3-7-6-8" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v3" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[12px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                    PREMIUM CORN
                  </h4>
                  <p className="text-[11px] text-[#555] font-light leading-[1.6] whitespace-pre-line">
                    Sourced from trusted{"\n"}farms that share our{"\n"}commitment to excellence.
                  </p>
                </div>
              </div>

              {/* Feature 4: FRESHLY POPPED */}
              <div 
                className="prom-feature absolute flex flex-col items-start w-[240px] pointer-events-auto"
                style={{ left: "87.1%", top: "82%", paddingLeft: "36px" }}
              >
                <h4 className="text-[12px] font-bold tracking-[0.18em] text-dark uppercase mb-1">
                  FRESHLY POPPED
                </h4>
                <p className="text-[11px] text-[#555] font-light leading-[1.6]">
                  Popped to perfection for maximum crunch and irresistible flavor.
                </p>
              </div>

            </div>

            {/* Floating Popcorn Pieces */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <Image src="/images/floating-popcorn-1.png" alt="" width={80} height={80} className="prom-popcorn absolute top-[10%] left-[25%] opacity-90 object-contain drop-shadow-md blur-[1px]" />
              <Image src="/images/floating-popcorn-2.png" alt="" width={140} height={140} className="prom-popcorn absolute top-[-5%] left-[55%] opacity-100 object-contain drop-shadow-xl" />
              <Image src="/images/floating-popcorn-3.png" alt="" width={70} height={70} className="prom-popcorn absolute top-[20%] right-[10%] opacity-80 object-contain drop-shadow-sm blur-[2px]" />
              
              <Image src="/images/floating-popcorn-4.png" alt="" width={60} height={60} className="prom-popcorn absolute top-[40%] left-[10%] opacity-85 object-contain drop-shadow-sm" />
              <Image src="/images/floating-popcorn-1.png" alt="" width={50} height={50} className="prom-popcorn absolute top-[45%] right-[25%] opacity-90 object-contain drop-shadow-sm blur-[1px]" />
              
              <Image src="/images/floating-popcorn-2.png" alt="" width={90} height={90} className="prom-popcorn absolute bottom-[30%] left-[15%] opacity-95 object-contain drop-shadow-lg" />
              <Image src="/images/floating-popcorn-3.png" alt="" width={110} height={110} className="prom-popcorn absolute bottom-[15%] right-[20%] opacity-100 object-contain drop-shadow-xl" />
              <Image src="/images/floating-popcorn-4.png" alt="" width={55} height={55} className="prom-popcorn absolute bottom-[10%] left-[45%] opacity-80 object-contain drop-shadow-sm blur-[2px]" />
            </div>
            
            {/* Extremely blurred large foreground popcorns */}
            <Image src="/images/floating-popcorn-1.png" alt="" width={200} height={200} className="prom-popcorn absolute bottom-[-10%] left-[-20%] opacity-70 object-contain blur-[12px] z-40" />
            <Image src="/images/floating-popcorn-2.png" alt="" width={180} height={180} className="prom-popcorn absolute top-[30%] right-[-15%] opacity-60 object-contain blur-[10px] z-40" />

          </div>
        </div>

        {/* Mobile features fallback */}
        <div className="lg:hidden grid grid-cols-2 gap-6 mt-8 mb-12">
           {rightFeatures.map((feat, idx) => (
             <div key={idx} className="prom-feature flex flex-col items-start bg-white/50 p-4 rounded-xl border border-[#111111]/5">
               <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center mb-2 text-gold">
                 {feat.icon}
               </div>
               <h4 className="text-[10px] font-bold tracking-[0.15em] text-dark uppercase mb-1">{feat.title}</h4>
               <p className="text-[10px] text-[#555] font-light leading-snug">{feat.desc}</p>
             </div>
           ))}
        </div>

      </div>

      {/* Bottom Promo Badges */}
      <div className="prom-badge-container max-w-[1100px] mx-auto mt-10 md:mt-20 px-6 sm:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gold/30 rounded-[20px] bg-[#FDFBF7] divide-y md:divide-y-0 md:divide-x divide-gold/20 overflow-hidden shadow-sm">
          {bottomBadges.map((badge, idx) => (
            <div key={idx} className="prom-badge flex items-center justify-start gap-4 p-6 md:py-8 md:px-6 hover:bg-white transition-colors duration-300">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                {badge.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] md:text-[20px] font-bold text-dark leading-none mb-1">{badge.title}</span>
                <span className="text-[10px] tracking-[0.15em] text-muted font-semibold uppercase whitespace-pre-line leading-tight">{badge.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
