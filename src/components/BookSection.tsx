import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BookSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const coverEl = section.querySelector('.book-cover');
    const textEl = section.querySelector('.book-text');

    if (!coverEl || !textEl) return;

    gsap.set(coverEl, { opacity: 0, x: isMobile ? 0 : '-60%', y: isMobile ? 50 : 0 });
    gsap.set(textEl, { opacity: 0, x: isMobile ? 0 : '60%', y: isMobile ? 50 : 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(coverEl, { x: 0, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0);
    tl.to(textEl, { x: 0, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0.15);

    return () => { tl.kill(); };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div className={`w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 flex ${isMobile ? 'flex-col gap-12 py-24' : 'flex-row items-center gap-16'}`}>
        <div className="book-cover flex-shrink-0 flex items-center justify-center" style={{ width: isMobile ? '100%' : '45%' }}>
          <div className="relative group" style={{ perspective: '1800px' }}>
            {/* Realistic book wrapper with 3D transform */}
            <div
              className="relative transition-transform duration-700 ease-out group-hover:[transform:rotateY(-8deg)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Page edges — right side (visible pages) */}
              <div className="absolute top-[3px] -right-[10px] bottom-[3px] w-[10px]" style={{
                background: 'linear-gradient(to right, #e8e4e0 0%, #f5f0eb 20%, #e8e4e0 40%, #f5f0eb 60%, #e8e4e0 80%, #ddd8d3 100%)',
                transform: 'rotateY(90deg) translateZ(5px)',
                transformOrigin: 'left center',
                boxShadow: 'inset 0 0 3px rgba(0,0,0,0.08)',
              }} />

              {/* Page edges — bottom */}
              <div className="absolute -bottom-[8px] left-[8px] right-[2px] h-[8px]" style={{
                background: 'linear-gradient(to bottom, #e8e4e0, #ddd8d3)',
                borderRadius: '0 0 2px 2px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              }} />

              {/* Spine — thick left edge with realistic gradient */}
              <div className="absolute top-0 -left-[14px] bottom-0 w-[14px] rounded-l-[3px]" style={{
                background: 'linear-gradient(to right, #2a2520 0%, #3d3530 30%, #4a4035 50%, #3d3530 70%, #2a2520 100%)',
                boxShadow: '-3px 0 12px rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.05)',
                transformOrigin: 'right center',
              }}>
                {/* Spine ridge lines */}
                <div className="absolute inset-0 rounded-l-[3px]" style={{
                  background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 18px, rgba(255,255,255,0.04) 18px, rgba(255,255,255,0.04) 19px)',
                }} />
              </div>

              {/* Main cover image */}
              <img
                src="/image/capa-do-livro.webp"
                alt="Capa do livro O Caminho depois da Pressa"
                className="relative w-[260px] md:w-[320px] lg:w-[360px] rounded-r-[3px] rounded-l-[1px]"
                width={360}
                height={540}
                style={{
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
                  filter: 'brightness(0.98)',
                }}
                loading="lazy"
              />

              {/* Cover surface gloss/reflection */}
              <div className="absolute inset-0 rounded-r-[3px] rounded-l-[1px] pointer-events-none" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)',
              }} />
            </div>

            {/* Ground shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-[20px] rounded-[50%]" style={{
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)',
              filter: 'blur(6px)',
            }} />
          </div>
        </div>
        <div className="book-text flex flex-col gap-8" style={{ width: isMobile ? '100%' : '55%' }}>
          
          <h2 className="h-panel-title text-foreground">O Caminho<br />depois da<br />Pressa</h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-md">
            Um convite para desacelerar e enxergar o que realmente importa.
            Roberto compartilha as histórias e aprendizados que moldaram sua
            jornada pela educação, provando que o caminho mais lento pode ser
            o mais transformador.
          </p>
          <a
            href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-fit px-10 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-medium border border-foreground text-foreground bg-transparent transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Comprar agora
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
