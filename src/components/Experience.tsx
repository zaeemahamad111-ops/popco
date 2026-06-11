"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiSmile, FiBriefcase } from "react-icons/fi";
import { LiaLeafSolid, LiaHandHoldingHeartSolid, LiaAwardSolid } from "react-icons/lia";
import { IoCarOutline } from "react-icons/io5";
import { PiPopcorn } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";

const badges = [
  {
    icon: <FiSmile className="text-gold text-xl" />,
    title: "FEELS GOOD",
    desc: "Real ingredients that make you feel good.",
  },
  {
    icon: <LiaLeafSolid className="text-gold text-xl" />,
    title: "MADE MINDFULLY",
    desc: "Thoughtful choices for you and the planet.",
  },
  {
    icon: <LiaAwardSolid className="text-gold text-xl" />,
    title: "PREMIUM QUALITY",
    desc: "Every batch is crafted to the highest standard.",
  },
  {
    icon: <LiaHandHoldingHeartSolid className="text-gold text-xl" />,
    title: "MADE TO SHARE",
    desc: "Because the best moments are shared.",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".exp-header-reveal", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        opacity: 0, y: 40, duration: 1.0, stagger: 0.15, ease: "power2.out",
      });
      gsap.from(".exp-large-card", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        opacity: 0, x: 50, duration: 1.2, ease: "power3.out",
      });
      gsap.from(".exp-small-card", {
        scrollTrigger: { trigger: ".exp-small-cards-container", start: "top 80%" },
        opacity: 0, y: 50, duration: 1.0, stagger: 0.15, ease: "power3.out",
      });
      gsap.from(".exp-badge-item", {
        scrollTrigger: { trigger: ".exp-badges-container", start: "top 90%" },
        opacity: 0, y: 25, duration: 0.8, stagger: 0.1, ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-background pt-24 md:pt-32 pb-0 overflow-hidden border-b border-[#111111]/5 z-10"
    >
      {/* Left sidebar progress */}
      <div className="absolute left-6 md:left-10 top-0 bottom-0 hidden md:flex flex-col items-center z-10 pt-40 pb-10">
        <div className="w-px h-8 bg-gold/30 mb-5" />
        <div className="flex flex-col items-center gap-[10px]">
          {["hero", "products", "process", "essence", "story", "experience"].map((s, i) => (
            <div key={s} className={`rounded-full transition-all duration-500 ${
              i === 5 ? "w-[7px] h-[7px] bg-gold" : "w-[5px] h-[5px] bg-[#111111]/20"
            }`} />
          ))}
        </div>
        <div className="w-px flex-1 bg-[#111111]/10 my-5" />
        <span
          className="text-[9px] tracking-[0.4em] font-light text-muted uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          OUR EXPERIENCE
        </span>
      </div>

      <div className="px-8 md:pl-28 md:pr-12">
        {/* Top 2-col: header + large card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 items-center mb-8">

          {/* Left: header */}
          <div className="flex flex-col items-start">
            <p className="exp-header-reveal text-[10px] tracking-[0.35em] text-gold font-semibold uppercase mb-4">
              MADE FOR MOMENTS
            </p>
            <h2 className="exp-header-reveal font-editorial text-5xl sm:text-6xl md:text-[68px] font-light text-dark leading-[1.05] tracking-tight">
              Experiences<br />
              That{" "}
              <em className="not-italic" style={{ color: "#C9A14A" }}>Pop.</em>
            </h2>
            <div className="exp-header-reveal w-8 h-px bg-gold my-5" />
            <p className="exp-header-reveal text-[13px] text-muted font-light leading-relaxed max-w-sm">
              Life is better with good stories, great company, and the perfect bowl of POPCO. Crafted to be part of your best moments.
            </p>
            <button className="exp-header-reveal mt-8 flex items-center gap-3 group text-[11px] tracking-[0.25em] font-semibold text-dark hover:text-gold transition-colors duration-300 relative py-2">
              <span>SEE ALL MOMENTS</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              <span className="absolute bottom-0 left-0 right-[20%] h-px bg-gold" />
            </button>
          </div>

          {/* Right: large movie nights card */}
          <div className="exp-large-card relative w-full aspect-[3/2] rounded-xl overflow-hidden group shadow-sm">
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
              <Image
                src="/images/experience-movie.jpg"
                alt="Cozy movie night with POPCO"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
              <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-5 md:p-6 max-w-[320px] shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-dark">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                    <PiPopcorn className="text-gold text-base" />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] font-bold text-gold uppercase">
                    MOVIE NIGHTS
                  </span>
                </div>
                <p className="text-[11px] md:text-[12px] text-dark/70 font-light leading-relaxed">
                  The perfect crunch for unforgettable movie moments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: 3 equal small cards */}
        <div className="exp-small-cards-container grid grid-cols-1 sm:grid-cols-3 gap-5 mb-0">
          {[
            {
              img: "/images/experience-family.jpg",
              icon: <BsPeople className="text-gold text-base" />,
              label: "FAMILY TIME",
              desc: "Made for laughter, stories and the little moments that matter.",
            },
            {
              img: "/images/experience-roadtrip.jpg",
              icon: <IoCarOutline className="text-gold text-base" />,
              label: "ROAD TRIPS",
              desc: "Light, delicious and always the perfect travel companion.",
            },
            {
              img: "/images/experience-work.jpg",
              icon: <FiBriefcase className="text-gold text-base" />,
              label: "WORK BREAKS",
              desc: "A little crunch, a fresh mind, a better you.",
            },
          ].map((card) => (
            <div key={card.label} className="exp-small-card relative aspect-[4/3] rounded-xl overflow-hidden group shadow-sm">
              <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-dark w-full">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center">
                      {card.icon}
                    </div>
                    <span className="text-[9px] tracking-[0.2em] font-bold text-gold uppercase">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-dark/70 font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand value badges */}
      <div className="exp-badges-container w-full border-t border-[#111111]/8 mt-12 px-8 md:px-24 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((item) => (
            <div key={item.title} className="exp-badge-item flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gold/20 bg-[#F8F7F4] flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.15em] text-dark uppercase block">{item.title}</span>
                <span className="text-[11px] text-muted font-light mt-0.5 leading-relaxed block">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
