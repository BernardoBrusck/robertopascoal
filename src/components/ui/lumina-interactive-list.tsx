import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const slides = [
  { title: "Roberto Pascoal", description: "Escritor. Palestrante. Fundador da Omunga.", media: "/hero/Pagina 01 - Confirmada 01.jpg", mobilePosition: "center center" },
  { title: "Não é sobre se sentir pronto", description: "É sobre ser suficiente para continuar caminhando.", media: "/hero/Página 01 - Confirmada 02.png", mobilePosition: "center center" },
  { title: "O Caminho", description: "Sentido, propósito e a jornada que nos transforma.", media: "/hero/Página 01 - Confirmada 03.jpg", mobilePosition: "center center" },
  { title: "A Jornada", description: "Da Amazônia ao Sertão, da África ao Monte Roraima.", media: "/hero/Página 01 - Confirmada 04.png", mobilePosition: "center center" },
  { title: "Multiculturalidade", description: "Quando todas as culturas coexistem, a humanidade se revela.", media: "/hero/01 - África 06 por Max Schwoelk.JPG", mobilePosition: "center center" },
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
              objectPosition: isMobile ? slide.mobilePosition : 'center center',
            }}
            {...(i === 0
              ? { fetchpriority: 'high' as const, loading: 'eager' as const }
              : { loading: 'lazy' as const }
            )}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
      <div className="slider-overlay z-20">
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
        
        {/* Animated Central Text */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 1.0, delayChildren: 1.5 } }
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="text-center font-sans font-light text-white flex flex-col gap-0 drop-shadow-md">
            
            {/* Line 1 */}
            <div className="overflow-hidden">
              <motion.div 
                variants={{
                  hidden: { y: "120%", opacity: 0 },
                  visible: { y: "0%", opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-[2.2rem] tracking-[2px] py-0 px-1 leading-none"
              >
                Não é sobre se sentir <span className="font-serif italic font-medium ml-1 text-white">pronto...</span>
              </motion.div>
            </div>
            
            {/* Line 2 */}
            <div className="overflow-hidden">
              <motion.div 
                variants={{
                  hidden: { y: "120%", opacity: 0 },
                  visible: { y: "0%", opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-[2.2rem] tracking-[2px] py-0 px-3 leading-none margin-to"
              >
                ...nem sobre se sentir <span className="font-serif italic font-medium ml-1 text-white">Completo.</span>
              </motion.div>
            </div>

          </div>
        </motion.div>

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
