"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LotusSVG } from "./LotusLogo";

const products = [
  {
    id: "original",
    name: "ORIGINAL",
    tagline: "SIMPLY PERFECT",
    desc: "Lightly seasoned to perfection. A timeless classic.",
    img: "/images/original-product-group.png",
    archColor: "#E8E2D8",
  },
  {
    id: "caramel",
    name: "CARAMEL",
    tagline: "RICH & BUTTERY",
    desc: "Rich, buttery caramel coating in every bite.",
    img: "/images/caramel-product-group.png",
    archColor: "#DEC9A0",
  },
  {
    id: "truffle",
    name: "TRUFFLE",
    tagline: "EARTHY & INDULGENT",
    desc: "Earthy truffle infused with a touch of sea salt.",
    img: "/images/truffle-product-group.png",
    archColor: "#D3CECC",
  },
  {
    id: "cheese",
    name: "CHEESE",
    tagline: "BOLD & SAVORY",
    desc: "Bold, savory, and irresistibly cheesy delight.",
    img: "/images/cheese-product-group.png",
    archColor: "#E6CE9A",
  },
];

// True arch: wide semi-circle top + tall rectangular body — matches reference
// viewBox 200×220: semicircle radius=100 at y=100, rectangle from y=100→220
function ArchSVG({ color, className }: { color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      {/* Shadow/depth behind arch */}
      <path d="M4,102 A100,100 0 0,1 196,102 L196,224 L4,224 Z" fill="rgba(0,0,0,0.04)" />
      {/* Main arch fill */}
      <path d="M0,100 A100,100 0 0,1 200,100 L200,220 L0,220 Z" fill={color} />
    </svg>
  );
}

function SparkleSVG({ className, style, size = 14 }: { className?: string; style?: React.CSSProperties; size?: number }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" fill="#C9A14A" opacity="0.85" />
    </svg>
  );
}

function PlusSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="5" y="0" width="2" height="12" rx="1" fill="#C9A14A" opacity="0.65" />
      <rect x="0" y="5" width="12" height="2" rx="1" fill="#C9A14A" opacity="0.65" />
    </svg>
  );
}

export default function ProductCollection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".prod-header-reveal", {
        scrollTrigger: { trigger: containerRef.current, start: "top 82%" },
        opacity: 0, y: 35, duration: 1.0, stagger: 0.1, ease: "power2.out",
      });

      gsap.from(".prod-card-item", {
        scrollTrigger: { trigger: ".prod-grid-wrap", start: "top 80%" },
        opacity: 0, y: 70, duration: 1.3, stagger: 0.18, ease: "power3.out",
      });

      // Parallax foreground
      gsap.to(".prod-fg", {
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.0 },
        y: (_: number, el: Element) => parseFloat((el as HTMLElement).dataset.speed || "-120"),
        ease: "none",
      });

      // Parallax background
      gsap.to(".prod-bg", {
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1.6 },
        y: (_: number, el: Element) => parseFloat((el as HTMLElement).dataset.speed || "-50"),
        ease: "none",
      });

      // Idle sway
      gsap.utils.toArray<HTMLElement>(".prod-fg, .prod-bg").forEach((el) => {
        gsap.to(el, {
          x: `random(-18, 18)`,
          rotation: `random(-25, 25)`,
          duration: gsap.utils.random(4, 8),
          repeat: -1, yoyo: true, ease: "power1.inOut",
          delay: gsap.utils.random(0, 3),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={containerRef}
      className="relative w-full bg-[#F8F7F4] pt-20 md:pt-28 pb-6 md:pb-10 overflow-hidden border-b border-[#111111]/5 z-10"
    >
      {/* ═══ FOREGROUND POPCORN — large, heavy blur, overlap edges ═══ */}
      <div className="prod-fg pointer-events-none absolute z-30 hidden md:block" data-speed="-110"
        style={{ top: "38%", left: "-100px", width: "260px", height: "260px", filter: "blur(9px)", opacity: 0.88 }}>
        <Image src="/images/floating-popcorn-1.png" alt="" fill sizes="260px" className="object-contain" />
      </div>
      <div className="prod-fg pointer-events-none absolute z-30 hidden md:block" data-speed="-90"
        style={{ top: "12%", right: "-80px", width: "240px", height: "240px", filter: "blur(10px)", opacity: 0.85 }}>
        <Image src="/images/floating-popcorn-2.png" alt="" fill sizes="240px" className="object-contain" />
      </div>
      <div className="prod-fg pointer-events-none absolute z-30 hidden md:block" data-speed="-130"
        style={{ bottom: "2%", left: "-60px", width: "230px", height: "230px", filter: "blur(7px)", opacity: 0.9 }}>
        <Image src="/images/floating-popcorn-4.png" alt="" fill sizes="230px" className="object-contain" />
      </div>
      <div className="prod-fg pointer-events-none absolute z-30 hidden md:block" data-speed="-100"
        style={{ bottom: "5%", right: "-70px", width: "250px", height: "250px", filter: "blur(8px)", opacity: 0.88 }}>
        <Image src="/images/floating-popcorn-3.png" alt="" fill sizes="250px" className="object-contain" />
      </div>

      {/* ═══ MIDGROUND POPCORN — medium, flanking product columns ═══ */}
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-60"
        style={{ top: "28%", left: "5%", width: "110px", height: "110px", filter: "blur(1.2px)", opacity: 0.8 }}>
        <Image src="/images/floating-popcorn-2.png" alt="" fill sizes="110px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-45"
        style={{ top: "60%", left: "7%", width: "85px", height: "85px", filter: "blur(1.5px)", opacity: 0.7 }}>
        <Image src="/images/floating-popcorn-3.png" alt="" fill sizes="85px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-55"
        style={{ top: "35%", right: "5%", width: "100px", height: "100px", filter: "blur(1.2px)", opacity: 0.8 }}>
        <Image src="/images/floating-popcorn-1.png" alt="" fill sizes="100px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-40"
        style={{ top: "65%", right: "6%", width: "80px", height: "80px", filter: "blur(2px)", opacity: 0.65 }}>
        <Image src="/images/floating-popcorn-4.png" alt="" fill sizes="80px" className="object-contain" />
      </div>

      {/* ═══ BACKGROUND POPCORN — small, behind header & scattered ═══ */}
      <div className="prod-bg pointer-events-none absolute z-0 hidden md:block" data-speed="-30"
        style={{ top: "5%", left: "12%", width: "65px", height: "65px", filter: "blur(2px)", opacity: 0.6 }}>
        <Image src="/images/floating-popcorn-2.png" alt="" fill sizes="65px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-0 hidden md:block" data-speed="-25"
        style={{ top: "8%", right: "14%", width: "70px", height: "70px", filter: "blur(2.5px)", opacity: 0.55 }}>
        <Image src="/images/floating-popcorn-4.png" alt="" fill sizes="70px" className="object-contain" />
      </div>

      {/* NEW/EXTRA Background popcorn elements to fulfill the "add more popcorn" request */}
      <div className="prod-bg pointer-events-none absolute z-0 hidden md:block" data-speed="-35"
        style={{ top: "4%", left: "32%", width: "55px", height: "55px", filter: "blur(2px)", opacity: 0.65 }}>
        <Image src="/images/floating-popcorn-3.png" alt="" fill sizes="55px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-0 hidden md:block" data-speed="-20"
        style={{ top: "7%", right: "30%", width: "50px", height: "50px", filter: "blur(2.5px)", opacity: 0.6 }}>
        <Image src="/images/floating-popcorn-1.png" alt="" fill sizes="50px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-0 hidden md:block" data-speed="-40"
        style={{ top: "22%", left: "48%", width: "60px", height: "60px", filter: "blur(1.8px)", opacity: 0.7 }}>
        <Image src="/images/floating-popcorn-2.png" alt="" fill sizes="60px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-45"
        style={{ bottom: "12%", left: "24%", width: "65px", height: "65px", filter: "blur(2.2px)", opacity: 0.65 }}>
        <Image src="/images/floating-popcorn-4.png" alt="" fill sizes="65px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-35"
        style={{ bottom: "14%", right: "26%", width: "60px", height: "60px", filter: "blur(2px)", opacity: 0.6 }}>
        <Image src="/images/floating-popcorn-3.png" alt="" fill sizes="60px" className="object-contain" />
      </div>

      {/* Small scattered between columns */}
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-70"
        style={{ top: "52%", left: "32%", width: "38px", height: "38px", filter: "blur(0.5px)", opacity: 0.75 }}>
        <Image src="/images/floating-popcorn-3.png" alt="" fill sizes="38px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-55"
        style={{ top: "44%", left: "50%", width: "32px", height: "32px", filter: "blur(0.3px)", opacity: 0.8 }}>
        <Image src="/images/floating-popcorn-1.png" alt="" fill sizes="32px" className="object-contain" />
      </div>
      <div className="prod-bg pointer-events-none absolute z-10 hidden md:block" data-speed="-65"
        style={{ top: "58%", left: "67%", width: "36px", height: "36px", filter: "blur(0.4px)", opacity: 0.7 }}>
        <Image src="/images/floating-popcorn-2.png" alt="" fill sizes="36px" className="object-contain" />
      </div>

      {/* ═══ GOLD SPARKLES ═══ */}
      <SparkleSVG className="pointer-events-none absolute z-10 animate-pulse" style={{ top: "20%", left: "20%", animationDuration: "3s" }} size={12} />
      <SparkleSVG className="pointer-events-none absolute z-10 animate-pulse" style={{ top: "26%", right: "22%", animationDuration: "4s", animationDelay: "1s" }} size={14} />
      <SparkleSVG className="pointer-events-none absolute z-10 animate-pulse" style={{ top: "15%", left: "44%", animationDuration: "3.5s", animationDelay: "0.5s" }} size={10} />
      <PlusSVG className="pointer-events-none absolute z-10" style={{ top: "32%", left: "25%", opacity: 0.65 }} />
      <PlusSVG className="pointer-events-none absolute z-10" style={{ top: "18%", right: "32%", opacity: 0.6 }} />
      <PlusSVG className="pointer-events-none absolute z-10" style={{ top: "42%", right: "27%", opacity: 0.55 }} />
      <PlusSVG className="pointer-events-none absolute z-10" style={{ top: "47%", left: "22%", opacity: 0.5 }} />

      {/* ═══ SECTION HEADER ═══ */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 mb-12 md:mb-16">
        <div className="prod-header-reveal mb-6 flex justify-center">
          <Image src="/images/logo.png" alt="POPCO Logo" width={800} height={280} className="w-auto h-20 md:h-64 object-contain" />
        </div>

        <div className="prod-header-reveal flex items-center gap-3 mb-2" style={{ maxWidth: "320px", width: "100%" }}>
          <div className="flex-1 h-px bg-gold/50" />
          <span className="text-[8px] md:text-[9px] tracking-[0.35em] text-gold font-medium uppercase whitespace-nowrap">
            CRAFTED TO PERFECTION
          </span>
          <div className="flex-1 h-px bg-gold/50" />
        </div>

        <div className="prod-header-reveal h-px bg-[#111111]/8 mb-6" style={{ width: "min(500px, 90%)" }} />

        <h3
          className="prod-header-reveal font-sans font-semibold uppercase tracking-[0.3em] text-gold mb-3"
          style={{ fontSize: "clamp(11px, 1.2vw, 15px)" }}
        >
          OUR POPCORN COLLECTION
        </h3>
        <p className="prod-header-reveal text-[12px] md:text-[13px] text-muted font-light leading-relaxed" style={{ maxWidth: "420px" }}>
          Each flavor is thoughtfully crafted using premium ingredients,
          perfectly popped to deliver an unforgettable experience.
        </p>
      </div>

      {/* ═══ PRODUCT GRID ═══ */}
      <div className="prod-grid-wrap relative z-20 w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16" style={{ maxWidth: "1320px" }}>

        {/* Desktop 4-col */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
          {products.map((prod) => (
            <div key={prod.id} className="prod-card-item flex flex-col items-center text-center group cursor-pointer px-2">
              {/*
                ┌─ CARD VISUAL ─────────────────────────────────┐
                │ paddingBottom=105% → card height is balanced   │
                │                                               │
                │ ARCH:  bottom=0, width=86%, height=64%        │
                │                                               │
                │ IMAGE: bottom=0%, width=155%, height=100%     │
                │        aligned to bottom, fits inside block    │
                │        and prevents any label overlap.        │
                └───────────────────────────────────────────────┘
              */}
              <div className="relative w-full mb-6" style={{ paddingBottom: "105%" }}>
                {/* ARCH — sits in lower part of card */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-transform duration-500 group-hover:scale-[1.02] z-0"
                  style={{ width: "86%", height: "64%" }}
                >
                  <ArchSVG color={prod.archColor} className="w-full h-full" />
                </div>

                {/* PRODUCT IMAGE — massive, overflows arch and sides */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-10 transition-transform duration-500 group-hover:-translate-y-3"
                  style={{ bottom: "0%", width: "155%", height: "100%" }}
                >
                  <Image
                    src={prod.img}
                    alt={`POPCO ${prod.name} Popcorn`}
                    fill
                    sizes="(max-width: 1024px) 350px, 450px"
                    className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.09)]"
                  />
                </div>
              </div>

              <h3
                className="font-editorial font-light text-dark tracking-[0.12em] mb-2 group-hover:text-gold transition-colors duration-300"
                style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
              >
                {prod.name}
              </h3>
              <p className="text-[12px] text-muted font-light leading-relaxed mb-5" style={{ maxWidth: "190px" }}>
                {prod.desc}
              </p>
              <a
                href="#"
                className="text-[10px] tracking-[0.22em] font-semibold text-dark/70 group-hover:text-gold transition-colors duration-300 flex items-center gap-2 uppercase"
              >
                View Product
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Mobile snap carousel */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar pb-6">
          {products.map((prod) => (
            <div key={prod.id} className="snap-center flex-shrink-0 w-[78%] sm:w-[52%] flex flex-col items-center text-center px-2">
              <div className="relative w-full mb-5" style={{ paddingBottom: "105%" }}>
                {/* Arch */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0" style={{ width: "86%", height: "64%" }}>
                  <ArchSVG color={prod.archColor} className="w-full h-full" />
                </div>
                {/* Product image */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: "0%", width: "155%", height: "100%" }}>
                  <Image src={prod.img} alt={prod.name} fill sizes="280px" className="object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.08)]" />
                </div>
              </div>
              <h3 className="font-editorial text-2xl font-light text-dark tracking-wide mb-2">{prod.name}</h3>
              <p className="text-[11px] text-muted font-light leading-relaxed mb-4">{prod.desc}</p>
              <a href="#" className="text-[10px] tracking-[0.2em] font-semibold text-dark/70 flex items-center gap-2 uppercase">
                View Product →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
