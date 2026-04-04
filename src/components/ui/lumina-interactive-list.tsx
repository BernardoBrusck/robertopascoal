import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

import slide01 from '@/assets/hero/slide-01-caminho.webp';
import slide02 from '@/assets/hero/slide-02-concha.webp';
import slide03 from '@/assets/hero/slide-03-amazonia.webp';
import slide04 from '@/assets/hero/slide-04-roraima.webp';
import slide05 from '@/assets/hero/slide-05-indigena.webp';
import slide06 from '@/assets/hero/slide-06-omunga.webp';

const slides = [
  { title: "Roberto Pascoal", description: "Escritor. Palestrante. Fundador da Omunga.", media: slide06, mobilePosition: "30% center" },
  { title: "Não é sobre se sentir pronto", description: "É sobre ser suficiente para continuar caminhando.", media: slide01, mobilePosition: "center center" },
  { title: "O Caminho", description: "Sentido, propósito e a jornada que nos transforma.", media: slide02, mobilePosition: "center center" },
  { title: "Multiculturalidade", description: "Quando todas as culturas coexistem, a humanidade se revela.", media: slide03, mobilePosition: "25% center" },
  { title: "Nunca prontos", description: "Mas sempre suficientes para o próximo passo.", media: slide04, mobilePosition: "center center" },
  { title: "A Jornada", description: "Da Amazônia ao Sertão, da África ao Monte Roraima.", media: slide05, mobilePosition: "20% center" },
];

/* ═══════════════════════════════════════════════════════
   UNIFIED SLIDER — Pure CSS transitions (no Three.js)
   Works for both mobile and desktop with rich CSS animations
   ═══════════════════════════════════════════════════════ */
function UnifiedSlider() {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setPrevIndex(current);
    setCurrent(idx);
  }, [current]);

  // Auto-slide
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        setPrevIndex(prev);
        return (prev + 1) % slides.length;
      });
    }, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Reset timer on manual navigation
  const handleDotClick = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(idx);
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        setPrevIndex(prev);
        return (prev + 1) % slides.length;
      });
    }, 3500);
  };

  return (
    <div className="slider-wrapper loaded">
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.media}
            alt={slide.title}
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? 'scale(1)' : 'scale(1.08)',
              transition: 'opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
              willChange: i === current || i === prevIndex ? 'opacity, transform' : 'auto',
            }}
            {...(i === 0
              ? { fetchPriority: 'high' as const, loading: 'eager' as const }
              : { loading: 'lazy' as const }
            )}
          />
        ))}
      </div>
      <div className="slider-overlay">
        <div id="slidesNav" className="slider-dots-nav">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slider-dot${i === current ? ' active' : ''}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Ir para slide ${i + 1}: ${slides[i].title}`}
            />
          ))}
        </div>
        <div className="slider-content-editorial">
          <p
            key={`desc-${current}`}
            className="slider-subtitle animate-slide-fade-in"
          >
            {slides[current].description}
          </p>
          <h1
            key={`title-${current}`}
            className="slider-title-editorial font-heading animate-slide-fade-in-delayed"
          >
            {slides[current].title}
          </h1>
        </div>
        <div className="slider-counter-editorial">
          <span className="slider-counter-current">{String(current + 1).padStart(2, '0')}</span>
          <span className="slider-counter-line"></span>
          <span className="slider-counter-total">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPORTED COMPONENT
   ═══════════════════════════════════════════════════════ */
export function LuminaSlider() {
  const isMobile = useIsMobile();

  // Avoid rendering anything until we know the device type
  if (isMobile === undefined) return null;

  return <UnifiedSlider />;
}
