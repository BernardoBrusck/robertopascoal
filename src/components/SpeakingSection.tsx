import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

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
      const elements = section.querySelectorAll('.speak-reveal');

      gsap.from(elements, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => {
      clearInterval(waitForGsap);
      clearTimeout(timeout);
    };
  }, []);

  // Counter animation inside modal
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      if (typeof gsap === 'undefined') return;
      const counterEls = document.querySelectorAll('.modal-stat-number');
      counterEls.forEach((el: Element) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate: () => {
            (el as HTMLElement).textContent =
              prefix + Math.floor(obj.val).toLocaleString('pt-BR');
          },
        });
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <>
      {/* Banner outdoor */}
      <section
        ref={sectionRef}
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: '80vh' }}
      >
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-xs uppercase tracking-[0.3em] select-none">
            Foto palestrando
          </span>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8">
          <span className="speak-reveal text-xs uppercase tracking-[0.3em] text-white/70">
            Roberto Pascoal
          </span>

          <h2
            className="speak-reveal h-panel-title text-white"
            style={{ margin: 0 }}
          >
            Palestras que
            <br />
            transformam
          </h2>

          <button
            onClick={() => setOpen(true)}
            className="speak-reveal inline-flex items-center justify-center px-10 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-medium border border-white text-white bg-transparent transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
          >
            Saiba mais
          </button>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`${
            isMobile
              ? 'w-full h-full max-w-full max-h-full rounded-none'
              : 'max-w-4xl max-h-[90vh]'
          } overflow-y-auto bg-background p-0 gap-0`}
        >
          <div className="p-8 md:p-12 flex flex-col gap-12">
            <DialogHeader>
              <DialogTitle className="h-panel-title text-foreground" style={{ margin: 0 }}>
                Palestras
              </DialogTitle>
              <DialogDescription className="sr-only">
                Informações sobre palestras de Roberto Pascoal
              </DialogDescription>
            </DialogHeader>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span
                    className="modal-stat-number font-bold text-foreground"
                    data-target={stat.value}
                    data-prefix={stat.prefix}
                    style={{
                      fontSize: 'clamp(40px, 7vw, 80px)',
                      letterSpacing: '-0.05em',
                      lineHeight: 1,
                    }}
                  >
                    0
                  </span>
                  <span className="text-sm text-muted-foreground tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-border" />

            {/* Gallery placeholders */}
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] mb-6 text-muted-foreground">
                Galeria
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Video placeholder */}
                <div className="aspect-video bg-muted rounded-sm flex items-center justify-center text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  Vídeo da palestra
                </div>
                <div className="aspect-video bg-muted rounded-sm flex items-center justify-center text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  Vídeo da palestra
                </div>
                {/* Photo placeholders */}
                <div className="aspect-video bg-muted rounded-sm flex items-center justify-center text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  Foto do evento
                </div>
                <div className="aspect-video bg-muted rounded-sm flex items-center justify-center text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  Foto do evento
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Quote */}
            <div>
              <p
                className="font-light italic text-foreground max-w-3xl"
                style={{
                  fontSize: 'clamp(20px, 3vw, 36px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.3,
                }}
              >
                {quote}
              </p>
              <span className="block mt-3 text-sm text-muted-foreground tracking-wide">
                — {quoteAuthor}
              </span>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Themes */}
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] mb-8 text-muted-foreground">
                Temas
              </span>
              <div className="flex flex-col gap-4">
                {themes.map((theme, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-5 py-3 border-b border-border last:border-b-0"
                  >
                    <span className="text-muted-foreground font-light text-sm min-w-[2rem]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-medium text-foreground"
                      style={{
                        fontSize: 'clamp(16px, 1.8vw, 24px)',
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
            <div className="text-center pt-4 pb-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-10 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-medium bg-foreground text-background transition-all duration-300 hover:opacity-80"
              >
                Contratar palestra
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpeakingSection;
