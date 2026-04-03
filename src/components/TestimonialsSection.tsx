import { useEffect, useRef } from 'react';

declare const gsap: any;

const testimonials = [
  {
    quote: 'O Roberto não faz palestra, ele transforma a forma como você enxerga o mundo ao seu redor.',
    name: 'Maria Silva',
    role: 'Educadora, Florianópolis',
  },
  {
    quote: 'Depois de conhecer o trabalho do Omunga, entendi que educação é o caminho mais curto para mudar uma comunidade inteira.',
    name: 'Carlos Mendes',
    role: 'Gestor Público, Manaus',
  },
  {
    quote: 'Cada livro doado carrega uma possibilidade. O Roberto entende isso como ninguém.',
    name: 'Ana Beatriz',
    role: 'Voluntária, São Paulo',
  },
  {
    quote: 'Ele fala com uma verdade que só quem viveu na pele consegue transmitir. Impossível sair da palestra do mesmo jeito que entrou.',
    name: 'Pedro Oliveira',
    role: 'Empresário, Curitiba',
  },
  {
    quote: 'O projeto dele prova que não precisa de muito para começar. Precisa de propósito.',
    name: 'Juliana Costa',
    role: 'Jornalista, Joinville',
  },
  {
    quote: 'Roberto é daquelas pessoas que te fazem acreditar que o impossível está mais perto do que parece.',
    name: 'Fernando Ramos',
    role: 'Professor, Belém',
  },
];

const TestimonialsSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined' && (window as any).ScrollTrigger) {
        clearInterval(waitForGsap);
        initAnimation();
      }
    }, 100);

    const initAnimation = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;

      // Clone cards for infinite loop
      const cards = track.querySelectorAll('.testimonial-card');
      cards.forEach((card) => {
        const clone = card.cloneNode(true) as HTMLElement;
        track.appendChild(clone);
      });

      const totalWidth = track.scrollWidth / 2;

      const tl = gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: number) => x % totalWidth),
        },
      });

      // Pause on hover
      track.addEventListener('mouseenter', () => tl.pause());
      track.addEventListener('mouseleave', () => tl.resume());
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => { clearInterval(waitForGsap); clearTimeout(timeout); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 overflow-hidden bg-background"
    >
      <h2
        className="text-center text-sm md:text-base uppercase tracking-[0.3em] mb-16 text-muted-foreground"
      >
        O que dizem sobre o Roberto
      </h2>

      <div className="relative">
        <div ref={trackRef} className="flex gap-6 whitespace-nowrap">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card flex-shrink-0 w-[340px] md:w-[400px] p-8 rounded-lg border border-border bg-card"
              style={{ whiteSpace: 'normal' }}
            >
              <span
                className="block text-5xl leading-none mb-4 font-serif"
                style={{ color: 'hsl(38, 70%, 55%, 0.3)' }}
              >
                "
              </span>
              <p className="text-foreground text-base md:text-lg leading-relaxed mb-6 font-light">
                {t.quote}
              </p>
              <div>
                <span className="block text-sm font-medium text-foreground">{t.name}</span>
                <span className="block text-xs text-muted-foreground mt-1">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
