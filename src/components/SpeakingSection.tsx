import { useEffect, useRef } from 'react';

declare const gsap: any;

const stats = [
  { value: 200, prefix: '+', suffix: '', label: 'palestras realizadas' },
  { value: 15000, prefix: '+', suffix: '', label: 'vidas impactadas' },
];

const themes = [
  'Educação como ferramenta de transformação social',
  'Empatia e liderança em comunidades vulneráveis',
  'Propósito e desaceleração',
  'Empreendedorismo social e impacto real',
];

const quote = '"Educação é a arma mais poderosa que você pode usar para mudar o mundo."';
const quoteAuthor = 'Nelson Mandela';

const SpeakingSection = () => {
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
      const section = sectionRef.current;

      // Counter animation
      const counterEls = section.querySelectorAll('.stat-number');
      counterEls.forEach((el: Element) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          snap: { val: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            (el as HTMLElement).textContent =
              prefix + Math.floor(obj.val).toLocaleString('pt-BR');
          },
        });
      });

      // Quote word-by-word reveal
      const quoteEl = section.querySelector('.quote-text');
      if (quoteEl) {
        const text = quoteEl.textContent || '';
        quoteEl.innerHTML = text
          .split(' ')
          .map((w: string) => `<span class="quote-word" style="color: hsl(220, 10%, 85%)">${w}</span>`)
          .join(' ');

        const words = quoteEl.querySelectorAll('.quote-word');
        gsap.to(words, {
          color: 'hsl(var(--foreground))',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: quoteEl,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 1,
          },
        });
      }

      // Theme items stagger
      const themeItems = section.querySelectorAll('.theme-item');
      gsap.from(themeItems, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.themes-list'),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // CTA fade
      const cta = section.querySelector('.speaking-cta');
      if (cta) {
        gsap.from(cta, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => {
      clearInterval(waitForGsap);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-16 lg:px-24 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <span className="block text-xs uppercase tracking-[0.3em] mb-16 text-muted-foreground">
          Palestras
        </span>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span
                className="stat-number font-light text-foreground"
                data-target={stat.value}
                data-prefix={stat.prefix}
                style={{
                  fontSize: 'clamp(48px, 8vw, 120px)',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                }}
              >
                0
              </span>
              <span className="text-sm md:text-base font-light text-muted-foreground tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-border mb-16" />

        {/* Quote */}
        <div className="mb-16">
          <p
            className="quote-text font-light italic text-foreground max-w-4xl"
            style={{
              fontSize: 'clamp(24px, 3.5vw, 48px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.3,
            }}
          >
            {quote}
          </p>
          <span className="block mt-4 text-sm text-muted-foreground tracking-wide">
            — {quoteAuthor}
          </span>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-border mb-16" />

        {/* Themes */}
        <div className="themes-list mb-20">
          <span className="block text-xs uppercase tracking-[0.3em] mb-10 text-muted-foreground">
            Temas
          </span>
          <div className="flex flex-col gap-6">
            {themes.map((theme, i) => (
              <div
                key={i}
                className="theme-item flex items-baseline gap-6 py-4 border-b border-border last:border-b-0"
              >
                <span
                  className="text-muted-foreground font-light"
                  style={{
                    fontSize: 'clamp(14px, 1.5vw, 20px)',
                    letterSpacing: '-0.02em',
                    minWidth: '2.5rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="font-light text-foreground"
                  style={{
                    fontSize: 'clamp(18px, 2vw, 28px)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {theme}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="speaking-cta text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-10 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-medium border border-foreground text-foreground bg-transparent transition-all duration-300 hover:bg-foreground hover:text-background"
          >
            Contratar palestra
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpeakingSection;
