"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "História", href: "#historia" },
  { label: "Serviços", href: "#servicos" },
  { label: "Livro", href: "#livro" },
  { label: "Palestras", href: "#palestras" },
  { label: "Blog", href: "/blog" },
];

const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

/**
 * Samples the pixel color behind the header center to determine
 * if the background is dark (needs white text) or light (needs dark text).
 */
const useHeaderContrast = (scrolled: boolean) => {
  const [isDarkBg, setIsDarkBg] = useState(true); // hero is dark by default

  const sampleBackground = useCallback(() => {
    if (scrolled) {
      // When scrolled, the bar has white bg → always dark text
      setIsDarkBg(false);
      return;
    }

    // Sample the element at the center-top of the viewport
    const x = window.innerWidth / 2;
    const y = 40;
    const els = document.elementsFromPoint(x, y);

    // Skip the header itself and its children
    const headerEl = document.querySelector("[data-navbar]");
    const target = els.find(
      (el) => el !== headerEl && !headerEl?.contains(el)
    );

    if (!target) {
      setIsDarkBg(true);
      return;
    }

    const style = window.getComputedStyle(target);
    const bg = style.backgroundColor;

    // Parse rgb/rgba
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      // Luminance check
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      setIsDarkBg(luminance < 0.5);
    } else {
      // If bg is transparent, check for background images (hero slider)
      // Assume dark since hero has images
      setIsDarkBg(true);
    }
  }, [scrolled]);

  useEffect(() => {
    sampleBackground();
    const interval = setInterval(sampleBackground, 500);
    return () => clearInterval(interval);
  }, [sampleBackground]);

  return isDarkBg;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hoverShow, setHoverShow] = useState(false);
  const isDarkBg = useHeaderContrast(scrolled);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setScrolled(currentY > 80);

        if (currentY <= 80) {
          setVisible(true);
        } else if (currentY < lastScrollY) {
          // scrolling up
          setVisible(true);
        } else if (currentY > lastScrollY + 5) {
          // scrolling down (with threshold)
          setVisible(false);
        }

        lastScrollY = currentY;
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show on mouse near top of screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 60) {
        setHoverShow(true);
      } else if (e.clientY > 120) {
        setHoverShow(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Dynamic text color based on contrast
  const textColor = scrolled
    ? "text-foreground"
    : isDarkBg
      ? "text-white"
      : "text-foreground";

  const mutedColor = scrolled
    ? "text-foreground/70"
    : isDarkBg
      ? "text-white/70"
      : "text-foreground/70";

  const borderColor = scrolled
    ? "border-foreground"
    : isDarkBg
      ? "border-white"
      : "border-foreground";

  const hoverBg = scrolled
    ? "hover:bg-foreground hover:text-background"
    : isDarkBg
      ? "hover:bg-white hover:text-black"
      : "hover:bg-foreground hover:text-background";

  return (
    <>
      <div
        data-navbar
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out"
        style={{
          padding: scrolled ? "8px 16px" : "0",
          transform: (visible || hoverShow || isOpen) ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <header
          className="mx-auto transition-all duration-500 ease-out"
          style={{
            maxWidth: scrolled ? "1100px" : "100%",
            backgroundColor: scrolled
              ? "rgba(255, 255, 255, 0.85)"
              : "transparent",
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(20px) saturate(180%)"
              : "none",
            borderRadius: scrolled ? "16px" : "0",
            boxShadow: scrolled
              ? "0 4px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)"
              : "none",
            border: scrolled ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
          }}
        >
          <div className="px-6 md:px-10">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a
                href="#"
                className={`relative z-[110] text-sm uppercase tracking-[0.25em] font-bold transition-colors duration-300 ${textColor}`}
              >
                Roberto Pascoal
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-10">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${mutedColor} hover:opacity-100`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <a
                  href="#contato"
                  onClick={(e) => handleAnchorClick(e, "#contato")}
                  className={`inline-flex items-center justify-center px-6 py-2.5 rounded-sm text-xs uppercase tracking-[0.2em] font-medium border bg-transparent transition-all duration-300 ${textColor} ${borderColor} ${hoverBg}`}
                >
                  Contato
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className={`relative z-[110] md:hidden p-2 transition-colors duration-300 ${textColor}`}
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile overlay via portal to avoid GSAP DOM conflicts */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[105] bg-background flex flex-col items-center justify-center"
            >
              <button
                onClick={toggleMenu}
                className="absolute top-5 right-6 z-[110] p-2 text-foreground"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        handleAnchorClick(e, item.href);
                        setIsOpen(false);
                      }}
                      className="text-2xl font-bold uppercase tracking-[0.15em] text-foreground transition-opacity hover:opacity-60"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: navItems.length * 0.08,
                    duration: 0.4,
                  }}
                  className="mt-4"
                >
                  <a
                    href="#contato"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center px-10 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-medium border border-foreground text-foreground bg-transparent transition-all duration-300 hover:bg-foreground hover:text-background"
                  >
                    Contato
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export { Navbar };
