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
          <img
            src="/image/capa-do-livro.webp"
            alt="Capa do livro O Caminho depois da Pressa"
            className="relative w-[260px] md:w-[320px] lg:w-[360px] rounded-sm"
            width={360}
            height={540}
            style={{ boxShadow: '20px 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)' }}
            loading="lazy"
          />
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
