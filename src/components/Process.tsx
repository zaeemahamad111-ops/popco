"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiaLeafSolid } from "react-icons/lia";

const steps = [
  {
    id: "01",
    title: "SOURCED",
    desc: "We handpick the finest corn from trusted farms that share our standards of quality.",
    img: "",
    imgAlt: "",
    align: "right",
    yPos: 550,
    imgX: 58,
    dotX: 70,
    sizeClass: "",
    mobileSizeClass: "",
    isTextOverlay: false,
    textContent: "",
  },
  {
    id: "02",
    title: "PREPARED",
    desc: "Each kernel is cleaned, sorted and quality-checked to ensure only the best makes the cut.",
    img: "/images/process-kernel.png",
    imgAlt: "Golden corn kernel",
    align: "left",
    yPos: 950,
    imgX: 52,
    dotX: 30,
    sizeClass: "w-[192px] h-[192px] lg:w-[300px] lg:h-[300px] rotate-[22deg]",
    mobileSizeClass: "w-[172px] h-[172px] sm:w-[210px] sm:h-[210px]",
    isTextOverlay: false,
    textContent: "",
  },
  {
    id: "03",
    title: "PERFECTED",
    desc: "Popped to perfection in just the right heat for that irresistible crunch and flavor.",
    img: "",
    imgAlt: "",
    align: "right",
    yPos: 1350,
    imgX: 47,
    dotX: 70,
    sizeClass: "w-[260px] h-[80px] lg:w-[380px] lg:h-[100px]",
    mobileSizeClass: "w-full h-16",
    isTextOverlay: true,
    textContent: "PRESSURE POPPED",
  },
  {
    id: "04",
    title: "POPPED",
    desc: "Our signature pop brings out maximum volume, lightness and the perfect texture in every bite.",
    img: "/images/floating-popcorn-1.png",
    imgAlt: "Large popped popcorn piece",
    align: "left",
    yPos: 1750,
    imgX: 52,
    dotX: 30,
    sizeClass: "w-[240px] h-[240px] lg:w-[336px] lg:h-[336px] rotate-[15deg]",
    mobileSizeClass: "w-48 h-48 sm:w-56 sm:h-56",
    isTextOverlay: false,
    textContent: "",
  },
  {
    id: "05",
    title: "PACKED",
    desc: "Packed fresh to lock in flavor and crunch, so every bag feels as good as the first.",
    img: "/images/original-product-group.png",
    imgAlt: "POPCO bag packed fresh",
    align: "right",
    yPos: 2150,
    imgX: 44,
    dotX: 50,
    sizeClass: "w-[448px] h-[298px] lg:w-[672px] lg:h-[448px]",
    mobileSizeClass: "w-[358px] h-[246px] sm:w-[448px] sm:h-[302px]",
    isTextOverlay: false,
    textContent: "",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".process-header-reveal", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        opacity: 0, y: 40, duration: 1.0, stagger: 0.15, ease: "power2.out",
      });

      const pathEl = pathRef.current;
      if (pathEl) {
        const pathLength = pathEl.getTotalLength();
        gsap.set(pathEl, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.to(pathEl, {
          scrollTrigger: {
            trigger: ".process-timeline-container",
            start: "top 60%",
            end: "bottom 90%",
            scrub: 1.5,
          },
          strokeDashoffset: 0,
          ease: "none",
        });
      }

      steps.forEach((step, idx) => {
        gsap.from(`.step-card-${step.id}`, {
          scrollTrigger: { trigger: `.step-trigger-${step.id}`, start: "top 78%" },
          opacity: 0,
          yPercent: -50, // Maintain translateY(-50%) centering
          y: 50,
          duration: 1.0,
          ease: "power2.out",
        });
        gsap.from(`.step-media-${step.id}`, {
          scrollTrigger: { trigger: `.step-trigger-${step.id}`, start: "top 75%" },
          opacity: 0,
          scale: 0.75,
          xPercent: -50, // Maintain translateX(-50%) centering
          yPercent: -50, // Maintain translateY(-50%) centering
          y: 50,
          rotation: step.align === "left" ? -20 : 20,
          duration: 1.2, ease: "power2.out",
        });
        if (step.id !== "05") {
          gsap.from(`.step-dot-${step.id}`, {
            scrollTrigger: { trigger: `.step-trigger-${step.id}`, start: "top 78%" },
            opacity: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        }
        gsap.from(`.step-line-${step.id}`, {
          scrollTrigger: { trigger: `.step-trigger-${step.id}`, start: "top 78%" },
          width: 0,
          opacity: 0,
          yPercent: -50, // Maintain translateY(-50%) centering
          duration: 0.8,
          ease: "power2.out",
        });

        // ScrollTrigger to detect which step is active and update left sidebar dots
        ScrollTrigger.create({
          trigger: `.step-trigger-${step.id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveStep(idx);
          },
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
      });

      gsap.from(".process-badge", {
        scrollTrigger: { trigger: ".process-badge", start: "top 90%" },
        opacity: 0, y: 30, duration: 0.8, ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-background pt-10 md:pt-14 pb-24 px-6 sm:px-12 md:px-24 overflow-hidden border-b border-[#111111]/5 z-10"
    >
      {/* Left sidebar progress - dynamically tracks the active process step */}
      <div className="absolute left-6 md:left-10 top-0 bottom-0 hidden md:flex flex-col items-center z-10 pt-40 pb-10">
        <div className="w-px h-8 bg-gold/30 mb-5" />
        <div className="flex flex-col items-center gap-[12px]">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`rounded-full transition-all duration-500 ${
                idx === activeStep
                  ? "w-[8px] h-[8px] bg-gold ring-4 ring-gold/20"
                  : "w-[5px] h-[5px] bg-[#111111]/25"
              }`}
            />
          ))}
        </div>
        <div className="w-px flex-1 bg-[#111111]/10 my-5" />
        <span
          className="text-[9px] tracking-[0.4em] font-light text-muted uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          OUR PROCESS
        </span>
      </div>

      {/* Unified container for both desktop and mobile layouts */}
      <div className="process-timeline-container relative w-full max-w-[1100px] mx-auto mt-8 min-h-0 md:min-h-[2350px]">
        
        {/* Header - visible on both mobile and desktop */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:pl-16 z-10 relative mb-12">
          <div className="max-w-md">
            <p className="process-header-reveal text-[10px] tracking-[0.35em] text-gold font-semibold uppercase mb-4">
              OUR PROCESS
            </p>
            <h2 className="process-header-reveal font-editorial text-5xl sm:text-6xl md:text-[72px] font-light text-dark leading-[1.05] tracking-tight">
              Crafted<br />With<br />
              <em className="not-italic" style={{ color: "#C9A14A" }}>Purpose.</em>
            </h2>
            <p className="process-header-reveal text-[13px] text-muted font-light mt-6 leading-relaxed max-w-sm">
              Every POPCO bag begins with care, thoughtfully crafted at every step to deliver the perfect bite.
            </p>
          </div>
          
          {/* Right side: The Corn image */}
          <div className="process-header-reveal relative w-[336px] h-[444px] sm:w-[384px] sm:h-[504px] lg:w-[576px] lg:h-[768px] rotate-[-25deg] self-center md:self-auto md:mr-12 md:mt-0 z-10">
            <Image
              src="/images/process-corn.png"
              alt="Organic corn on cob"
              fill
              sizes="(max-width: 768px) 300px, 480px"
              className="object-contain mix-blend-multiply drop-shadow-[0_10px_25px_rgba(201,161,74,0.06)]"
              priority
            />
          </div>
        </div>

        {/* Scattered floating popcorns in background - visible everywhere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <Image src="/images/floating-popcorn-2.png" alt="popcorn" width={120} height={120} className="absolute top-[15%] right-[10%] opacity-40 blur-sm rotate-12 scale-75 md:scale-100" />
          <Image src="/images/floating-popcorn-3.png" alt="popcorn" width={80} height={80} className="absolute top-[30%] left-[15%] opacity-60 blur-[2px] -rotate-12 scale-50 md:scale-75" />
          <Image src="/images/floating-popcorn-4.png" alt="popcorn" width={100} height={100} className="absolute top-[55%] right-[20%] opacity-50 blur-[3px] rotate-45 scale-75" />
          <Image src="/images/floating-popcorn-2.png" alt="popcorn" width={90} height={90} className="absolute top-[75%] left-[8%] opacity-30 blur-sm -rotate-45 scale-50 md:scale-100" />
        </div>

        {/* Desktop: SVG winding path timeline (starts from corn at 600,250) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
          viewBox="0 0 800 2300"
          fill="none"
        >
          {/* Animated draw path - starts in center of the corn image */}
          <path
            ref={pathRef}
            d="M 600,250 C 620,380 560,380 560,550 C 560,750 240,750 240,950 C 240,1150 560,1150 560,1350 C 560,1550 240,1550 240,1750 C 240,1950 400,1950 400,2150"
            stroke="#C9A14A"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="opacity-85"
          />
        </svg>

        {/* Step items (Desktop only) */}
        {steps.map((step) => {
          const isRight = step.align === "right";
          return (
            <div
              key={step.id}
              className={`step-trigger-${step.id} absolute w-full z-10 hidden md:block`}
              style={{ top: `${step.yPos}px` }}
            >
              {/* Image floating in coordinate space */}
              {(step.img || step.isTextOverlay) && (
                <div
                  className={`step-media-${step.id} absolute top-0`}
                  style={{
                    left: `${step.imgX}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className={`relative ${step.sizeClass} flex items-center justify-center`}>
                    {step.isTextOverlay ? (
                      <span className="font-editorial text-2xl lg:text-3xl text-gold font-light tracking-[0.2em] leading-none text-center select-none drop-shadow-sm whitespace-nowrap uppercase">
                        {step.textContent}
                      </span>
                    ) : (
                      <Image
                        src={step.img}
                        alt={step.imgAlt}
                        fill
                        sizes="(max-width: 768px) 150px, 500px"
                        className="object-contain mix-blend-multiply drop-shadow-[0_10px_25px_rgba(201,161,74,0.06)] z-10"
                      />
                    )}
                    {/* If step 05, render scattered popcorns around the base of the marble slab */}
                    {step.id === "05" && (
                      <>
                        {/* Popcorn piece 1: bottom-left of the slab */}
                        <div className="absolute bottom-[-10px] left-[-35px] w-14 h-14 z-20 rotate-12">
                          <Image src="/images/floating-popcorn-2.png" alt="" fill className="object-contain" />
                        </div>
                        {/* Popcorn piece 2: bottom-right of the slab */}
                        <div className="absolute bottom-[-15px] right-[-25px] w-16 h-16 z-20 -rotate-45">
                          <Image src="/images/floating-popcorn-4.png" alt="" fill className="object-contain" />
                        </div>
                        {/* Popcorn piece 3: front-center */}
                        <div className="absolute bottom-[-20px] left-[20%] w-12 h-12 z-20 rotate-[30deg]">
                          <Image src="/images/floating-popcorn-3.png" alt="" fill className="object-contain" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Path Dot Marker (Only render for steps 01-04) */}
              {step.id !== "05" && (
                <div
                  className={`step-dot-${step.id} absolute top-0 w-4.5 h-4.5 rounded-full border border-gold flex items-center justify-center bg-[#F8F7F4] z-20`}
                  style={{
                    left: `${step.dotX}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>
              )}

              {/* Horizontal Connector Line */}
              <div
                className={`step-line-${step.id} absolute top-0 h-px bg-gold/50 z-20`}
                style={{
                  transform: "translateY(-50%)",
                  ...(step.id === "05"
                    ? { left: "58%", width: "22%" } // Connects from right of product group image to text card
                    : isRight
                    ? { left: `${step.dotX}%`, width: `${80 - step.dotX}%` }
                    : { left: "20%", width: `${step.dotX - 20}%` }
                  )
                }}
              />

              {/* Text card */}
              <div
                className={`step-card-${step.id} absolute top-0 w-[220px] lg:w-[260px] text-left`}
                style={{
                  left: isRight ? "80%" : undefined,
                  right: isRight ? undefined : "80%",
                  transform: "translateY(-50%)",
                }}
              >
                <span className="text-2xl font-light text-gold tracking-widest block leading-none mb-1">
                  {step.id}
                </span>
                <h4 className="text-xs font-bold tracking-[0.2em] text-dark uppercase mb-2">
                  {step.title}
                </h4>
                <div className="w-6 h-px bg-gold/40 mb-3" />
                <p className="text-[11px] text-muted font-light leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}

        {/* Mobile stacked layout */}
        <div className="relative w-full flex flex-col space-y-16 mt-14 md:hidden">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gold/25 -translate-x-1/2" />
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step-trigger-${step.id} step-card-${step.id} relative pl-12 flex flex-col items-start`}
            >
              <div className="absolute left-0 w-6 h-6 rounded-full bg-background border border-gold flex items-center justify-center z-10 -translate-x-1/2">
                <span className="text-[8px] text-gold font-bold">{step.id}</span>
              </div>
              
              <div className="flex flex-col items-start">
                <span className="text-xl font-light text-gold tracking-widest block mb-0.5">{step.id}</span>
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-dark uppercase mb-2">{step.title}</h4>
                <p className="text-xs text-muted font-light leading-relaxed max-w-sm mb-6">{step.desc}</p>
              </div>

              {(step.img || step.isTextOverlay) && (
                <div className={`step-media-${step.id} relative ${step.mobileSizeClass} mb-4 flex items-center justify-center`}>
                  {step.isTextOverlay ? (
                    <span className="font-editorial text-2xl sm:text-3xl text-gold font-light tracking-[0.1em] text-center select-none drop-shadow-sm w-full block uppercase">
                      {step.textContent}
                    </span>
                  ) : (
                    <Image 
                      src={step.img} 
                      alt={step.imgAlt} 
                      fill 
                      sizes="200px" 
                      className="object-contain mix-blend-multiply drop-shadow-md z-10" 
                    />
                  )}
                  {/* If step 05, render scattered popcorns around the base */}
                  {step.id === "05" && (
                    <>
                      <div className="absolute bottom-[-5px] left-[-25px] w-10 h-10 z-20 rotate-12">
                        <Image src="/images/floating-popcorn-2.png" alt="" fill className="object-contain" />
                      </div>
                      <div className="absolute bottom-[-10px] right-[-20px] w-12 h-12 z-20 -rotate-45">
                        <Image src="/images/floating-popcorn-4.png" alt="" fill className="object-contain" />
                      </div>
                      <div className="absolute bottom-[-12px] left-[20%] w-8 h-8 z-20 rotate-[30deg]">
                        <Image src="/images/floating-popcorn-3.png" alt="" fill className="object-contain" />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clean ingredients badge */}
      <div className="process-badge w-full max-w-xs border border-gold/20 bg-[#F8F7F4] p-7 rounded-xl mt-16 md:mt-20 flex items-start gap-5 shadow-sm">
        <div className="flex-shrink-0 w-11 h-11 rounded-full border border-gold/20 flex items-center justify-center">
          <LiaLeafSolid className="text-gold text-xl" />
        </div>
        <div>
          <h4 className="text-[10px] tracking-[0.18em] font-bold text-dark uppercase mb-2">
            CLEAN INGREDIENTS. REAL GOODNESS.
          </h4>
          <div className="text-[11px] text-muted font-light leading-[1.8] space-y-0.5">
            <p>No artificial colors.</p>
            <p>No preservatives.</p>
            <p>Just honest ingredients you can trust.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
