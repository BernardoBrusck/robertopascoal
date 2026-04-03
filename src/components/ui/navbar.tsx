"use client";

import * as React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "História", href: "#historia" },
  { label: "Serviços", href: "#servicos" },
  { label: "Livro", href: "#livro" },
  { label: "Palestras", href: "#palestras" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100]">
        <div className="mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <a
              href="#"
              className="relative z-[110] text-sm uppercase tracking-[0.25em] font-bold text-foreground"
            >
              Roberto Pascoal
            </a>

            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a
                href="#contato"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-sm text-xs uppercase tracking-[0.2em] font-medium border border-foreground text-foreground bg-transparent transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                Contato
              </a>
            </div>

            <button
              onClick={toggleMenu}
              className="relative z-[110] md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

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
                className="absolute top-6 right-6 z-[110] p-2 text-foreground"
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
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-bold uppercase tracking-[0.15em] text-foreground transition-opacity hover:opacity-60"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.08, duration: 0.4 }}
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
