"use client";

import React, { useState } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowForwardOutline } from "react-icons/io5";
import LotusLogo from "./LotusLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-background border-t border-[#111111]/8 pt-16 pb-10 px-6 sm:px-12 md:px-24 w-full relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Main 5-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 mb-14">

          {/* Col 1: Lotus logo + brand desc */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#hero" onClick={(e) => scrollTo(e, "hero")} className="mb-5 block">
              <LotusLogo size={38} />
            </a>
            <p className="text-[12px] text-muted font-light leading-[1.8] max-w-[260px]">
              Real ingredients. Real taste.<br />Real moments.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-[9px] tracking-[0.25em] font-bold text-gold uppercase mb-5">QUICK LINKS</h4>
            <ul className="space-y-3">
              {[
                { label: "Story", id: "story" },
                { label: "Process", id: "process" },
                { label: "Products", id: "products" },
                { label: "Experience", id: "experience" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollTo(e, item.id)}
                    className="text-[12px] text-muted font-light hover:text-gold transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Help */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-[9px] tracking-[0.25em] font-bold text-gold uppercase mb-5">HELP</h4>
            <ul className="space-y-3">
              {["FAQ", "Shipping", "Returns", "Contact"].map((label) => (
                <li key={label}>
                  <a href="#" className="text-[12px] text-muted font-light hover:text-gold transition-colors duration-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Follow Us */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-[9px] tracking-[0.25em] font-bold text-gold uppercase mb-5">FOLLOW US</h4>
            <div className="flex gap-3">
              {[
                { icon: <FaInstagram className="text-base" />, href: "https://instagram.com", label: "Instagram" },
                { icon: <FaLinkedinIn className="text-base" />, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <MdOutlineEmail className="text-base" />, href: "mailto:hello@popco.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center
                             text-dark/70 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 5: Newsletter */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-[9px] tracking-[0.25em] font-bold text-gold uppercase mb-5 whitespace-nowrap">
              STAY IN THE LOOP
            </h4>
            <p className="text-[11px] text-muted font-light leading-relaxed mb-5 max-w-[200px]">
              Be the first to know about new flavors and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#111111]/15 bg-white/60 rounded-full py-3 pl-4 pr-12
                           text-[11px] font-light placeholder-[#111111]/35 text-dark
                           focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gold
                           flex items-center justify-center text-white hover:bg-gold/85
                           hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <IoArrowForwardOutline className="text-sm" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[10px] text-gold font-light mt-2">Thank you for subscribing! ✓</p>
            )}
          </div>
        </div>

        {/* Bottom legal row */}
        <div className="border-t border-[#111111]/8 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-muted font-light">
            © 2025 POPCO. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-muted font-light">
            <a href="#privacy" className="hover:text-gold transition-colors duration-300">Privacy Policy</a>
            <span className="mx-3 text-[#111111]/20">|</span>
            <a href="#terms" className="hover:text-gold transition-colors duration-300">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
