import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phrases = [
  "A quem busca mais sentido.",
  "A quem deseja mais clareza.",
  "A quem tem coragem de se ouvir.",
  "A quem, enfim, se escolhe.",
  "Este e-book não é uma resposta.\nÉ um caminho.",
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

/* ── Tablet Mockup (CSS puro) ── */
const TabletMockup = () => (
  <div className="relative w-full max-w-[380px] md:max-w-[440px] lg:max-w-[480px] mx-auto shrink-0">
    {/* Corpo do tablet */}
    <div
      className="relative bg-[#1a1a1a] rounded-[2rem] md:rounded-[2.5rem] px-[10px] pt-[10px] pb-[10px] md:px-[12px] md:pt-[12px] md:pb-[12px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)]"
      style={{ maxHeight: '90vh' }}
    >
      {/* Câmera frontal */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-black ring-1 ring-[#333] z-10" />

      {/* Tela */}
      <div className="relative w-full aspect-[3/4] rounded-[1.2rem] md:rounded-[1.6rem] overflow-hidden bg-white">
        <img
          src="/image/capa-do-livro.webp"
          alt="Capa do E-book - O Caminho depois da pressa"
          className="w-full h-full object-contain bg-white"
          referrerPolicy="no-referrer"
        />
        {/* Brilho / glare diagonal na tela */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      </div>
    </div>

    {/* Reflexo / glow sutil */}
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-12 bg-black/10 blur-2xl rounded-full" />
  </div>
);

/* ── Versão Mobile (empilhada, sem pin) ── */
const MobileEbook = () => (
  <section className="py-24 px-6 bg-gray-50 overflow-hidden">
    <div className="max-w-lg mx-auto space-y-16">
      <TabletMockup />
      <div className="space-y-6 text-center">
        {phrases.map((phrase, i) => (
          <motion.p
            key={i}
            {...fadeIn}
            transition={{ delay: i * 0.1 }}
            className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed whitespace-pre-line"
          >
            {i === phrases.length - 1 ? (
              <>
                <span className="font-medium text-black block">Este e-book não é uma resposta.</span>
                <span className="italic block mt-2">É um caminho.</span>
              </>
            ) : (
              phrase
            )}
          </motion.p>
        ))}
      </div>
    </div>
  </section>
);

/* ── Versão Desktop (GSAP Pinned Scrub) ── */
const DesktopEbook = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const elements = phraseRefs.current;
    if (!section || elements.some((el) => !el)) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=350%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    elements.forEach((el, i) => {
      // Entra de baixo
      tl.fromTo(
        el,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
      );

      // Pausa de leitura
      tl.to({}, { duration: 1.5 });

      // Sai subindo (última frase também some suavemente)
      if (i < elements.length - 1) {
        tl.fromTo(
          el,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -50, duration: 2, ease: 'power2.in' }
        );
      } else {
        tl.to(el, { opacity: 0, y: -50, duration: 2, ease: 'power2.in' });
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 w-full h-screen flex items-center justify-center overflow-hidden px-6 lg:px-12"
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-row items-center justify-center gap-10 lg:gap-16 h-full">
        {/* Esquerda: Frases empilhadas */}
        <div className="relative flex-1 w-full max-w-[500px] min-h-[200px]">
          {phrases.map((phrase, i) => (
            <div
              key={i}
              ref={(el) => { phraseRefs.current[i] = el; }}
              className="absolute inset-0 flex items-center justify-start opacity-0 pointer-events-none"
            >
              {i === phrases.length - 1 ? (
              <span className="text-2xl md:text-4xl lg:text-[2.8rem] leading-[1.3] text-left block">
                  <span className="font-medium text-black block">Este e-book não é uma resposta.</span>
                  <span className="font-light italic text-gray-600 block mt-3">É um caminho.</span>
                </span>
              ) : (
                <span className="text-2xl md:text-4xl lg:text-[2.8rem] font-light text-gray-600 text-left leading-tight">
                  {phrase}
                </span>
              )}
            </div>
          ))}
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
