import { useEffect, useRef } from 'react';
import { Lightbulb, Heart, Compass, Flame } from 'lucide-react';

declare const gsap: any;

const themes = [
  { icon: Lightbulb, title: 'Educação como ferramenta de transformação social' },
  { icon: Heart, title: 'Empatia e liderança em comunidades vulneráveis' },
  { icon: Compass, title: 'O caminho depois da pressa: propósito e desaceleração' },
  { icon: Flame, title: 'Empreendedorismo social e impacto real' },
];

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

      gsap.from(sectionRef.current.querySelectorAll('.theme-item'), {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(sectionRef.current.querySelector('.stage-photo'), {
        scale: 0.9,
        opacity: 0,
        duration: 1,
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
      className="relative w-full py-28 md:py-40 px-6 md:px-16 lg:px-24 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <span className="block text-xs uppercase tracking-[0.3em] mb-4 text-accent">
          Palestras
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-16 tracking-[-0.04em] text-foreground">
          Palestras que transformam
        </h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Temas */}
          <div className="flex-1 flex flex-col gap-6">
            {themes.map((theme, i) => {
              const Icon = theme.icon;
              return (
                <div
                  key={i}
                  className="theme-item flex items-start gap-4 p-5 rounded-sm border border-border bg-background"
                >
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="flex-shrink-0 mt-0.5 text-accent"
                  />
                  <span className="text-base md:text-lg font-light text-foreground">
                    {theme.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stage photo placeholder */}
          <div
            className="stage-photo flex-shrink-0 w-full md:w-[400px] h-[300px] md:h-[380px] rounded-sm flex items-center justify-center text-xs uppercase tracking-widest select-none bg-muted text-muted-foreground"
          >
            Foto de palco
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center px-10 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 border border-accent text-accent bg-background hover:bg-accent hover:text-primary-foreground"
          >
            Contratar palestra
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpeakingSection;
