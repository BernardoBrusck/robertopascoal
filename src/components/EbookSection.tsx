import React, { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phase1Phrases = [
  "A quem busca mais sentido.",
  "A quem deseja mais clareza.",
  "A quem tem coragem de se ouvir.",
];

const phase2Phrases = [
  "A quem, enfim, se escolhe.",
  "Este e-book não é uma resposta.\nÉ um caminho.",
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

/* ── Tablet Mockup interativo (tilt 3D + glare dinâmico + link Hotmart) ── */
const TabletMockup = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });
  const [glare, setGlare] = useState({ x: 30, y: 20 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!bodyRef.current) return;
    const rect = bodyRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({
      rotX: -((y - cy) / cy) * 10,
      rotY: ((x - cx) / cx) * 14,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => {
    setHovering(false);
    setTilt({ rotX: 0, rotY: 0 });
    setGlare({ x: 30, y: 20 });
  };

  return (
    <a
      href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D"
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full max-w-[380px] md:max-w-[440px] lg:max-w-[480px] mx-auto shrink-0 block"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${hovering ? 1.03 : 1}, ${hovering ? 1.03 : 1}, 1)`,
        transition: hovering ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Corpo do tablet */}
      <div
        ref={bodyRef}
        className="relative bg-[#1a1a1a] rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)]"
        style={{ padding: '14px 12px 14px 12px' }}
      >
        {/* Câmera frontal — margem superior de 20px */}
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#111] ring-[1.5px] ring-[#3a3a3a] z-10" />

        {/* Tela */}
        <div className="relative w-full aspect-[3/4] rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-white">
          <img
            src="/image/capa-do-livro.webp"
            alt="Capa do E-book - O Caminho depois da pressa"
            className="w-full h-full object-contain bg-white"
            referrerPolicy="no-referrer"
          />

          {/* Glare dinâmico — segue o mouse */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`,
              transition: hovering ? 'background 0.08s ease' : 'background 0.4s ease',
            }}
          />

          {/* Highlight de borda esquerda */}
          <div className="absolute top-0 left-0 w-[2px] h-full pointer-events-none bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
        </div>
      </div>

      {/* Sombra projetada — move sutilmente com o tilt */}
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[75%] h-10 rounded-full"
        style={{
          background: 'rgba(0,0,0,0.15)',
          filter: 'blur(16px)',
          transform: hovering ? `translateX(${tilt.rotY * 0.6}px) scaleX(1.05)` : 'none',
          transition: 'transform 0.3s ease-out',
        }}
      />
    </a>
  );
};


/* ── Versão Mobile (empilhada, sem pin) ── */
const MobileEbook = () => (
  <section className="py-24 px-6 bg-gray-50 overflow-hidden">
    <div className="max-w-lg mx-auto space-y-16">
      <TabletMockup />
      <div className="space-y-6 text-center flex flex-col items-center">
        {[...phase1Phrases, ...phase2Phrases].map((phrase, i) => (
          <motion.p
            key={i}
            {...fadeIn}
            transition={{ delay: i * 0.1 }}
            className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed whitespace-pre-line"
          >
            {i === 4 ? (
              <>
                <span className="font-medium text-black block">Este e-book não é uma resposta.</span>
                <span className="italic block mt-2">É um caminho.</span>
              </>
            ) : (
              phrase
            )}
          </motion.p>
        ))}
        <motion.div {...fadeIn} transition={{ delay: 0.6 }} className="pt-8">
           <a href="/e-book" className="inline-block bg-black text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-gray-800 transition-colors">
              Conheça mais
           </a>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Versão Desktop (GSAP Pinned Scrub) ── */
const DesktopEbook = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phase1Refs = useRef<(HTMLDivElement | null)[]>([]);
  const phase2Refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    const p1Els = phase1Refs.current.filter(Boolean);
    const p2Els = phase2Refs.current.filter(Boolean);

    // Fade In Phase 1 Accumulating
    if (p1Els.length) {
       tl.fromTo(p1Els, 
         { opacity: 0, y: 50 }, 
         { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.out' }
       );
       tl.to({}, { duration: 1 }); // read time
       
       // Fade Out Phase 1
       tl.to(p1Els, { opacity: 0, y: -50, duration: 1, stagger: 0.2, ease: 'power2.in' });
    }

    // Fade In Phase 2 Accumulating
    if (p2Els.length) {
       tl.fromTo(p2Els,
         { opacity: 0, y: 50 },
         { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power2.out' }
       );
       tl.to({}, { duration: 1.5 }); // read time before leaving
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white w-full h-screen flex items-center justify-center px-6 lg:px-12 relative"
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-row items-center justify-center gap-10 lg:gap-16 h-full relative z-10">
        
        {/* Esquerda: Frases empilhadas em Fases */}
        <div className="relative flex-1 w-full max-w-[500px] min-h-[300px] flex items-center">
          
          {/* Phase 1 */}
          <div className="absolute inset-0 flex flex-col justify-center gap-8 pointer-events-none">
            {phase1Phrases.map((phrase, i) => (
              <div
                key={i}
                ref={(el) => { phase1Refs.current[i] = el; }}
                className="opacity-0"
              >
                <span className="text-2xl md:text-4xl lg:text-[2.8rem] font-light text-gray-600 text-left leading-tight">
                  {phrase}
                </span>
              </div>
            ))}
          </div>

          {/* Phase 2 */}
          <div className="absolute inset-0 flex flex-col justify-center gap-8">
            <div ref={(el) => { phase2Refs.current[0] = el; }} className="opacity-0 pointer-events-none">
                <span className="text-2xl md:text-4xl lg:text-[2.8rem] font-light text-gray-600 text-left leading-tight">
                  {phase2Phrases[0]}
                </span>
            </div>
            
            <div ref={(el) => { phase2Refs.current[1] = el; }} className="opacity-0 pointer-events-none">
                 <span className="text-2xl md:text-4xl lg:text-[2.8rem] leading-[1.3] text-left block">
                  <span className="font-medium text-black block">Este e-book não é uma resposta.</span>
                  <span className="font-light italic text-gray-600 block mt-3">É um caminho.</span>
                </span>
            </div>

            <div ref={(el) => { phase2Refs.current[2] = el; }} className="opacity-0 mt-4">
                <a href="/e-book" className="inline-block bg-black text-white px-8 py-5 text-sm font-semibold uppercase tracking-[0.2em] rounded-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    Conheça mais
                </a>
            </div>
          </div>

        </div>

        {/* Direita: Tablet fixo */}
        <TabletMockup />
      </div>
    </section>
  );
};

/* ── Export ── */
export const EbookSection = () => {
  const isMobile = useIsMobile();
  if (isMobile === undefined) return null;
  return isMobile ? <MobileEbook /> : <DesktopEbook />;
};
