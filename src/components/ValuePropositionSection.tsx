import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { Footprints, Backpack, Compass, Heart } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const items = [
  {
    icon: <Footprints className="w-12 h-12 md:w-16 md:h-16 stroke-[1]" />,
    title: "UMA JORNADA REAL",
    text: "Sem máscaras. Da infância à África… à Santiago de Compostela… aos lugares onde poucos chegam."
  },
  {
    icon: <Backpack className="w-12 h-12 md:w-16 md:h-16 stroke-[1]" />,
    title: "COM NOSSAS MOCHILAS",
    text: "O que carregamos? Qual é o peso disso? \nE o que evitamos deixar para trás… para que a jornada seja mais leve."
  },
  {
    icon: <Compass className="w-12 h-12 md:w-16 md:h-16 stroke-[1]" />,
    title: "SEM FÓRMULAS PRONTAS",
    text: "Sem atalhos, culpa ou ansiedade.\nApenas presença… para o próximo passo."
  },
  {
    icon: <Heart className="w-12 h-12 md:w-16 md:h-16 stroke-[1]" />,
    title: "EM COMPANHIA",
    text: "Você não está sozinho. \nCaminhar junto, torna a jornada mais leve."
  }
];

const ValueItem = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-8 max-w-md mx-auto xl:mx-0">
    <div className="text-black shrink-0">
      {icon}
    </div>
    <div className="space-y-4">
      <h3 className="font-semibold uppercase text-black text-sm tracking-[0.1em]">{title}</h3>
      <p className="text-xl md:text-2xl text-black leading-relaxed font-light whitespace-pre-line">
        {text}
      </p>
    </div>
  </div>
);

export const ValuePropositionSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile !== false) return;
    if (!sectionRef.current || !containerRef.current) return;

    const sectionEl = sectionRef.current;
    const container = containerRef.current;

    // Distância a rolar: tudo que sobra fora da janela
    const distance = container.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(container, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top top',
        pin: true,
        scrub: 1,
        end: () => `+=${distance + 400}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      scrollTween.kill();
      scrollTween.scrollTrigger?.kill();
    };
  }, [isMobile]);

  if (isMobile === undefined) return null;

  // VERSÃO MOBILE (Empilhado vertical tradicional s/ overflow-x complexo)
  if (isMobile) {
    return (
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            {...fadeIn}
            className="text-2xl md:text-4xl lg:text-4xl leading-none font-light tracking-[0.5px] text-center mb-16 px-4"
          >
            E se pudéssemos caminhar juntos?
          </motion.h2>
          <div className="flex flex-col gap-12">
            {items.map((item, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }}>
                <ValueItem icon={item.icon} title={item.title} text={item.text} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // VERSÃO DESKTOP — GSAP com Scroll Horizontal
  return (
    <section ref={sectionRef} className="h-screen w-full bg-white relative overflow-hidden flex flex-col justify-center">

      {/* Título centralizado na tela na horizontal */}
      <motion.div 
        className="w-full text-center z-20 mb-16 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl md:text-4xl lg:text-4xl leading-none font-light tracking-[0.5px]">
          E se pudéssemos<br />caminhar juntos?
        </h2>
        <div className="w-16 h-px bg-gray-300 mx-auto mt-6" />
      </motion.div>

      {/* Container dos cards — movido no eixo X pelo GSAP */}
      <div className="w-full overflow-hidden">
        <div ref={containerRef} className="flex flex-row items-start w-max px-[6vw] xl:px-[10vw]" style={{ willChange: "transform" }}>

          {/* 4 Cards */}
          <div className="flex gap-20 xl:gap-32 pb-4">
            {items.map((item, i) => (
              <motion.div 
                key={i} 
                className="w-[320px] md:w-[400px] xl:w-[450px] shrink-0"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i < 2 ? i * 0.15 : 0 }}
              >
                <ValueItem icon={item.icon} title={item.title} text={item.text} />
              </motion.div>
            ))}
          </div>

          {/* Alívio do final do scroll */}
          <div className="w-[10vw] shrink-0" />

        </div>
      </div>

    </section>
  );
};
