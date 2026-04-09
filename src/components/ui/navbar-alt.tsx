"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Linkedin } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "O Caminho", href: "/" },
  { label: "Sobre mim", href: "/sobre-mim" },
  { label: "E-book", href: "/e-book" },
  { label: "Palestras", href: "/palestras" },
  { label: "Blog", href: "/blog" },
  { label: "Galeria", href: "/galeria" },
  { label: "Contatos", href: "/palestras#orcamento" },
];

const NavbarAlt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hoverShow, setHoverShow] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setScrolled(currentY > 50);

        if (currentY <= 50) {
          setVisible(true);
        } else {
          setVisible(false);
        }

        lastScrollY = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLightPage = 
    location.pathname.startsWith("/galeria") || 
    location.pathname.startsWith("/sobre-mim") || 
    location.pathname.startsWith("/blog");

  const textColor = scrolled ? "text-foreground" : (isLightPage ? "text-foreground" : "text-white");
  const mutedColor = scrolled ? "text-foreground/70" : (isLightPage ? "text-foreground/70" : "text-white/70");
  const borderColor = scrolled ? "border-foreground" : (isLightPage ? "border-foreground" : "border-white");
  const hoverBg = scrolled ? "hover:bg-foreground hover:text-background" : (isLightPage ? "hover:bg-foreground hover:text-background" : "hover:bg-white hover:text-black");

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out"
        style={{
          padding: scrolled ? "8px 16px" : "0",
          transform: (visible || hoverShow || isOpen) ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <header
          className="mx-auto transition-all duration-500 ease-out"
          style={{
            maxWidth: scrolled ? "1350px" : "100%",
            backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            borderRadius: scrolled ? "16px" : "0",
            boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.05)" : "none",
            border: scrolled ? "1px solid rgba(0, 0, 0, 0.05)" : "none",
          }}
        >
          <div className="px-6 md:px-10">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link
                to="/"
                className={`text-sm uppercase tracking-[0.25em] font-bold transition-colors duration-300 ${textColor}`}
              >
                Roberto Pascoal
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-10">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${mutedColor} hover:opacity-100 ${location.pathname === item.href ? "opacity-100 font-semibold" : ""}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Desktop CTA (Social Icons) */}
              <div className="hidden md:flex items-center gap-4">
                <a
                  href="https://www.instagram.com/roberto_pascoal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 transition-transform duration-300 ${textColor} hover:scale-110`}
                  aria-label="Instagram Roberto Pascoal"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://www.linkedin.com/in/roberto-pascoal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 transition-transform duration-300 ${textColor} hover:scale-110`}
                  aria-label="LinkedIn Roberto Pascoal"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className={`md:hidden p-3 transition-colors duration-300 ${textColor}`}
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile overlay */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[105] bg-background flex flex-col items-center justify-center"
            >
              <button
                onClick={toggleMenu}
                className="absolute top-5 right-6 p-2 text-foreground"
              >
                <X size={24} />
              </button>
              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        setIsOpen(false);
                      }}
                      className="text-2xl font-bold uppercase tracking-[0.15em] text-foreground"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export { NavbarAlt };
