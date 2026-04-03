import { useEffect, useRef } from 'react';

declare const gsap: any;

const timelineSteps = [
  {
    id: 'infancia',
    label: 'INFÂNCIA',
    title: 'Onde tudo\ncomeçou',
    text: 'Nascido no interior do Brasil, Roberto cresceu cercado por histórias e pela vontade de transformar o mundo ao seu redor. Desde cedo, a educação foi seu maior aliado.',
  },
  {
    id: 'formacao',
    label: 'FORMAÇÃO',
    title: 'O poder\nda palavra',
    text: 'Escritor e comunicador por natureza. Encontrou nos livros e nas palestras a ferramenta para amplificar sua voz e levar sua mensagem a milhares de pessoas.',
  },
  {
    id: 'omunga',
    label: 'OMUNGA',
    title: 'Criar para\ntransformar',
    text: 'Fundou o Projeto Omunga com uma missão clara: levar bibliotecas e educação para as comunidades mais isoladas da Amazônia. Mais de 50 bibliotecas construídas.',
  },
  {
    id: 'hoje',
    label: 'HOJE',
    title: 'Inspirar\npara agir',
    text: 'Palestrante nos maiores palcos do país, autor publicado e ativista incansável. Roberto continua dedicando cada dia a provar que a educação é o caminho.',
  },
];

const HorizontalScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;

    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        clearInterval(waitForGsap);

        const loadScrollTrigger = (): Promise<void> =>
          new Promise((res, rej) => {
            if ((window as any).ScrollTrigger) {
              gsap.registerPlugin((window as any).ScrollTrigger);
              res();
              return;
            }
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            s.onload = () => {
              setTimeout(() => {
                gsap.registerPlugin((window as any).ScrollTrigger);
                res();
              }, 100);
            };
            s.onerror = () => rej();
            document.head.appendChild(s);
          });

        loadScrollTrigger().then(() => initAnimation());
      }
    }, 100);

    const initAnimation = () => {
      if (!sectionRef.current || !containerRef.current) return;

      // Horizontal scroll
      const scrollTween = gsap.to(containerRef.current, {
        x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${containerRef.current!.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Timeline line animation
      const line = containerRef.current.querySelector('.timeline-progress');
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              scrub: 1,
              start: 'top top',
              end: () => `+=${containerRef.current!.scrollWidth - window.innerWidth}`,
            },
          }
        );
      }
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => {
      clearInterval(waitForGsap);
      clearTimeout(timeout);
    };
  }, [isMobile]);

  // Mobile: vertical stack
  if (isMobile) {
    return (
      <section className="w-full bg-background">
        {timelineSteps.map((step, i) => (
          <div key={step.id} className="relative w-full px-6 py-20 border-b border-border">
            <span className="h-panel-label text-muted-foreground">{step.label}</span>
            <h2 className="h-panel-title whitespace-pre-line text-foreground">{step.title}</h2>
            <p className="h-panel-text text-muted-foreground">{step.text}</p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      {/* Timeline progress line */}
      <div className="absolute bottom-16 left-0 right-0 h-px bg-border z-20">
        <div
          className="timeline-progress absolute inset-0 bg-foreground origin-left"
          style={{ transformOrigin: 'left center' }}
        />
      </div>

      <div
        ref={containerRef}
        className="flex h-screen"
        style={{ width: `${timelineSteps.length * 100}vw` }}
      >
        {timelineSteps.map((step, i) => (
          <div
            key={step.id}
            className="h-panel relative w-screen h-screen flex items-center bg-background"
          >
            {/* Content */}
            <div className="h-panel-content relative z-10 flex flex-col justify-center px-16 lg:px-24 max-w-3xl">
              <span className="h-panel-label text-muted-foreground">
                {step.label}
              </span>
              <h2 className="h-panel-title whitespace-pre-line text-foreground">
                {step.title}
              </h2>
              <p className="h-panel-text text-muted-foreground">
                {step.text}
              </p>
            </div>

            {/* Timeline dot */}
            <div
              className="absolute bottom-14 z-30"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="w-3 h-3 rounded-full bg-foreground" />
              <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
