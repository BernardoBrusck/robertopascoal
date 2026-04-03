import { useEffect, useRef } from 'react';

declare const gsap: any;

const BookSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined' && (window as any).ScrollTrigger) {
        clearInterval(waitForGsap);
        initAnimation();
      }
    }, 100);

    const initAnimation = () => {
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelector('.book-cover'), {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(sectionRef.current.querySelector('.book-text'), {
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => { clearInterval(waitForGsap); clearTimeout(timeout); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-16 lg:px-24"
      className="relative w-full py-28 md:py-40 px-6 md:px-16 lg:px-24 bg-background"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Book cover placeholder */}
        <div
          className="book-cover flex-shrink-0 w-[240px] md:w-[300px] h-[360px] md:h-[440px] rounded-sm flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest select-none bg-muted"
          style={{
            background: 'hsl(220, 10%, 85%)',
            boxShadow: '12px 12px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
            transition: 'transform 0.5s ease',
            perspective: '800px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'rotateY(-5deg) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'rotateY(0deg) scale(1)';
          }}
        >
          Capa do Livro
        </div>

        {/* Text + CTA */}
        <div className="book-text flex flex-col gap-6 max-w-lg">
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: 'hsl(38, 70%, 55%)' }}
          >
            Livro
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-foreground">
            O Caminho depois<br />da Pressa
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Um convite para desacelerar e enxergar o que realmente importa. Neste livro,
            Roberto compartilha as histórias e aprendizados que moldaram sua jornada pela
            educação, provando que o caminho mais lento pode ser o mais transformador.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center w-fit px-8 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300"
            style={{
              background: 'hsl(38, 70%, 55%)',
              color: 'hsl(0, 0%, 100%)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'hsl(38, 70%, 45%)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'hsl(38, 70%, 55%)';
            }}
          >
            Comprar agora
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookSection;
