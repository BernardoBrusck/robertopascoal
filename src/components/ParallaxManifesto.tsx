import React from 'react';
import { motion } from 'framer-motion';

// Alternating pattern: false, true, false, true, false
// (sem fixed, com fixed, sem fixed, com fixed, sem fixed)
const slides = [
  {
    word: 'SENTIDO',
    image: '/Selecionadas/manifesto-sentido-opt.webp',
    alt: 'Sentido',
    fixed: false,
  },
  {
    word: 'AUTOCONHECIMENTO',
    image: '/Selecionadas/manifesto-autoconhecimento-opt.webp',
    alt: 'Autoconhecimento',
    fixed: true,
  },
  {
    word: 'FOCO COM ALMA',
    image: '/Selecionadas/manifesto-foco-com-alma-opt.webp',
    alt: 'Foco com Alma',
    fixed: false,
  },
  {
    word: 'TERRITÓRIO',
    image: '/Selecionadas/manifesto-territorio-opt.webp',
    alt: 'Território',
    fixed: true,
  },
  {
    word: 'FORÇA DE REALIZAÇÃO',
    image: '/Selecionadas/manifesto-forca-de-realizacao-opt.webp',
    alt: 'Força de Realização',
    fixed: false,
  },
];

const ParallaxSlide = ({
  slide,
  index,
}: {
  slide: (typeof slides)[0];
  index: number;
}) => {
  return (
    <div
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${slide.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: slide.fixed ? 'fixed' : 'scroll',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Centered word — no overlay, only text shadow */}
      <motion.div
        className="relative z-10 text-center select-none px-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="font-light text-white uppercase"
          style={{
            fontSize: 'clamp(1rem, 2.8vw, 2.2rem)',
            letterSpacing: '0.35em',
            lineHeight: '1.6',
            whiteSpace: 'nowrap',
            textShadow:
              '0 2px 8px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7), 0 8px 40px rgba(0,0,0,0.5)',
          }}
        >
          {slide.word}
        </p>
      </motion.div>
    </div>
  );
};

export const ParallaxManifesto = () => {
  return (
    <section className="w-full">
      {slides.map((slide, i) => (
        <ParallaxSlide key={i} slide={slide} index={i} />
      ))}
    </section>
  );
};
