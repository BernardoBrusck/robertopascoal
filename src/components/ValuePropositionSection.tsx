import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Backpack, Compass, Heart } from "lucide-react";

const items = [
  {
    icon: <Footprints className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />,
    title: "UMA JORNADA REAL",
    text: "Sem máscaras. Da infância à África… à Santiago de Compostela… aos lugares onde poucos chegam."
  },
  {
    icon: <Backpack className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />,
    title: "COM NOSSAS MOCHILAS",
    text: "O que carregamos? Qual é o peso disso? \nE o que evitamos deixar para trás… para que a jornada seja mais leve."
  },
  {
    icon: <Compass className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />,
    title: "SEM FÓRMULAS PRONTAS",
    text: "Sem atalhos, culpa ou ansiedade.\nApenas presença… para o próximo passo."
  },
  {
    icon: <Heart className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />,
    title: "EM COMPANHIA",
    text: "Você não está sozinho. \nCaminhar junto, torna a jornada mais leve."
  }
];

export const ValuePropositionSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 lg:px-12 bg-white text-black overflow-hidden font-sans">
      
      {/* Subtle Dot Texture Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Ambient Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-gray-50/60 tracking-tighter leading-none select-none pointer-events-none z-0">
        JORNADA
      </div>

      <div className="max-w-7xl mx-auto flex flex-col relative z-10 w-full justify-center">
        
        {/* Centered Title */}
        <motion.div 
          className="w-full mb-10 lg:mb-12 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-4xl font-light tracking-[0.5px] leading-tight text-gray-900">
            E se pudéssemos caminhar juntos?
          </h2>
          <div className="w-16 h-px bg-black mt-8" />
        </motion.div>

        {/* 4-Column Clean Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col text-left group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="text-black mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold uppercase text-black text-[13px] tracking-[0.15em]">{item.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed font-light whitespace-pre-line transition-colors duration-300 group-hover:text-black">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
