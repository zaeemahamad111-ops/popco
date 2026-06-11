"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// Inline lotus SVG — used in navbar logo
function LotusSVG({ size = 20, color = "#C9A14A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 36C20 36 8 28 8 18C8 12 13 8 20 8C27 8 32 12 32 18C32 28 20 36 20 36Z" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M20 8C20 8 14 4 10 8C8 12 12 18 20 36" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M20 8C20 8 26 4 30 8C32 12 28 18 20 36" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6"/>
      <path d="M20 36C20 36 16 22 8 18" stroke={color} strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M20 36C20 36 24 22 32 18" stroke={color} strokeWidth="1" fill="none" opacity="0.4"/>
      <circle cx="20" cy="8" r="2" fill={color}/>
    </svg>
  );
}

const navItems = [
  { label: "PRODUCT", href: "#products" },
  { label: "PROCESS", href: "#process" },
  { label: "ESSENCE", href: "#essence" },
  { label: "PROMISE", href: "#story" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#footer" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextSection = document.getElementById("products");
      if (nextSection) {
        setIsScrolled(nextSection.getBoundingClientRect().top <= 80);
      } else {
        setIsScrolled(window.scrollY > window.innerHeight - 80);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["products", "process", "essence", "story", "experience", "footer"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const handleHeroScroll = () => {
      if (window.scrollY < 200) setActiveSection("hero");
    };
    window.addEventListener("scroll", handleHeroScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleHeroScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(href);
    } else {
      document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHero = activeSection === "hero";
  // New frames have light/studio backgrounds — use dark text on hero too
  const navTextColor = "text-dark hover:text-gold";
  const dotColor = "bg-[#111111]/20";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 flex items-center justify-between ${
          isScrolled
            ? "glassmorphism max-lg:bg-[#F8F7F4] py-3 shadow-sm px-8 md:px-12"
            : "bg-transparent py-5 px-8 md:px-12"
        }`}
      >
        {/* Logo: left-aligned large wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center"
        >
          <Image src="/images/logo.png" alt="POPCO Logo" width={240} height={80} className="w-auto h-16 md:h-20 object-contain" />
        </a>


        {/* Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-10 h-10 rounded-full border border-[#111111]/15 flex items-center justify-center text-dark hover:border-gold hover:text-gold transition-all duration-300"
          aria-label="Open navigation menu"
        >
          <HiOutlineMenuAlt4 className="text-lg" />
        </button>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#F8F7F4]/98 z-[55] flex flex-col justify-between p-8 md:p-16"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <Image src="/images/logo.png" alt="POPCO Logo" width={280} height={92} className="w-auto h-20 sm:h-24 object-contain" />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full border border-[#111111]/10 flex items-center justify-center text-dark hover:border-dark transition-colors duration-300"
                aria-label="Close menu"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            <div className="flex flex-col items-start space-y-6 my-auto pl-4">
              <p className="text-[10px] tracking-[0.3em] text-gold font-medium uppercase mb-2">Navigation</p>
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx + 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-editorial text-4xl sm:text-5xl font-light hover:text-gold transition-colors duration-300 flex items-center space-x-4 group"
                  >
                    <span className="text-sm font-sans text-gold font-light tracking-[0.2em] w-8">0{idx + 1}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full border-t border-[#111111]/10 pt-8 gap-4">
              <div className="text-xs text-muted leading-relaxed font-light">
                <p>POPCO Premium Popcorn</p>
                <p>Always Worth Sharing.</p>
              </div>
              <div className="flex space-x-6 text-xs text-muted font-light">
                <a href="#privacy" className="hover:text-dark transition-colors">Privacy</a>
                <a href="#terms" className="hover:text-dark transition-colors">Terms</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
