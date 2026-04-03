import { useEffect, useRef } from 'react';

declare const gsap: any;

/* ─── Panel Data ─── */
const timelineSteps = [
  { id: 'infancia', label: 'INFÂNCIA' },
  { id: 'formacao', label: 'FORMAÇÃO' },
  { id: 'omunga', label: 'OMUNGA' },
  { id: 'hoje', label: 'HOJE' },
];

/* ─── Placeholder image component ─── */
const PhotoPlaceholder = ({
  label,
  className = '',
  style = {},
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`bg-muted flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest select-none ${className}`}
    style={style}
  >
    {label}
  </div>
);


/* ─────────────────────────────────────────────────────
   PANEL 1 — INFÂNCIA (Editorial Assimétrico / Polaroid)
   ───────────────────────────────────────────────────── */
const PanelInfancia = () => (
  <div className="panel-inner flex items-center justify-center h-full w-full px-16 lg:px-24 gap-16">
    {/* Fotos lado esquerdo */}
    <div className="relative flex-shrink-0 w-[340px] h-[460px]">
      <div
        className="polaroid-frame absolute top-0 left-0 w-[280px] h-[340px] anim-photo"
        style={{ transform: 'rotate(-3deg)' }}
      >
        <PhotoPlaceholder label="Foto infância 1" className="w-full h-full rounded" />
        <span className="block text-center text-[11px] text-muted-foreground mt-2 font-medium tracking-wide">
          Joinville, anos 80
        </span>
      </div>
      <div
        className="polaroid-frame absolute bottom-0 right-0 w-[200px] h-[240px] anim-photo"
        style={{ transform: 'rotate(2deg)' }}
      >
        <PhotoPlaceholder label="Foto infância 2" className="w-full h-full rounded" />
      </div>
    </div>

    {/* Texto lado direito */}
    <div className="flex flex-col justify-center max-w-lg anim-text">
      <span className="h-panel-label text-muted-foreground">INFÂNCIA</span>
      <h2 className="h-panel-title whitespace-pre-line text-foreground">
        {'Onde tudo\ncomeçou'}
      </h2>
      <p className="h-panel-text text-muted-foreground">
        Nascido no interior do Brasil, Roberto cresceu cercado por histórias e pela
        vontade de transformar o mundo ao seu redor. Desde cedo, a educação foi seu
        maior aliado.
      </p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────
   PANEL 2 — FORMAÇÃO (Split Vertical)
   ───────────────────────────────────────────────────── */
const PanelFormacao = () => (
  <div className="panel-inner flex items-center justify-center h-full w-full px-16 lg:px-24 gap-16">
    {/* Texto à esquerda */}
    <div className="flex flex-col justify-center max-w-md anim-text">
      <span className="h-panel-label text-muted-foreground">FORMAÇÃO</span>
      <h2 className="h-panel-title whitespace-pre-line text-foreground">
        {'O poder\nda palavra'}
      </h2>
      <p className="h-panel-text text-muted-foreground mb-8">
        Escritor e comunicador por natureza. Encontrou nos livros e nas palestras a
        ferramenta para amplificar sua voz e levar sua mensagem a milhares de pessoas.
      </p>
      {/* Duas fotos menores */}
      <div className="flex gap-4">
        <PhotoPlaceholder
          label="Foto formação 1"
          className="w-[160px] h-[120px] rounded anim-photo-sm"
        />
        <PhotoPlaceholder
          label="Foto formação 2"
          className="w-[160px] h-[120px] rounded anim-photo-sm"
        />
      </div>
    </div>

    {/* Foto grande à direita */}
    <div className="flex-shrink-0 anim-photo-main">
      <PhotoPlaceholder
        label="Foto teatro / palco"
        className="w-[400px] h-[500px] rounded-lg"
      />
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────
   PANEL 3 — OMUNGA (Grid de Impacto)
   ───────────────────────────────────────────────────── */
const PanelOmunga = () => (
  <div className="panel-inner flex flex-col justify-center h-full w-full px-16 lg:px-24">
    <div className="flex items-start gap-16">
      {/* Coluna esquerda: título + foto grande */}
      <div className="flex flex-col gap-6 anim-text">
        <div>
          <span className="h-panel-label text-muted-foreground">OMUNGA</span>
          <h2 className="h-panel-title whitespace-pre-line text-foreground">
            {'Criar para\ntransformar'}
          </h2>
        </div>
        <PhotoPlaceholder
          label="Foto Amazônia"
          className="w-[400px] h-[280px] rounded-lg anim-photo"
        />
      </div>

      {/* Coluna direita: 2 fotos + counter + texto */}
      <div className="flex flex-col gap-6 pt-12">
        <div className="flex gap-4">
          <PhotoPlaceholder
            label="Foto comunidade 1"
            className="w-[180px] h-[140px] rounded anim-photo-sm"
          />
          <PhotoPlaceholder
            label="Foto comunidade 2"
            className="w-[180px] h-[140px] rounded anim-photo-sm"
          />
        </div>
        <div className="anim-counter">
          <span className="text-foreground font-bold text-5xl lg:text-7xl tracking-tight counter-number">
            +50
          </span>
          <span className="block text-muted-foreground text-sm uppercase tracking-widest mt-1">
            bibliotecas construídas
          </span>
        </div>
        <p className="h-panel-text text-muted-foreground max-w-sm anim-text-delay">
          Fundou o Projeto Omunga com uma missão clara: levar bibliotecas e educação
          para as comunidades mais isoladas da Amazônia.
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────
   PANEL 4 — HOJE (Statement Central) — 3 fotos cada lado
   ───────────────────────────────────────────────────── */
const PanelHoje = () => (
  <div className="panel-inner relative flex flex-col items-center justify-center h-full w-full px-16 lg:px-24">
    {/* 3 fotos à esquerda — bem espaçadas, mix vertical/horizontal */}
    <PhotoPlaceholder
      label="Foto palestra"
      className="absolute top-[8%] left-[3%] w-[200px] h-[140px] rounded-lg anim-scatter"
      style={{ transform: 'rotate(-3deg)' }}
    />
    <PhotoPlaceholder
      label="Foto ação social"
      className="absolute top-[42%] left-[2%] w-[150px] h-[190px] rounded anim-scatter"
      style={{ transform: 'rotate(2deg)' }}
    />
    <PhotoPlaceholder
      label="Foto comunidade"
      className="absolute bottom-[10%] left-[12%] w-[190px] h-[130px] rounded-lg anim-scatter"
      style={{ transform: 'rotate(-1.5deg)' }}
    />

    {/* 3 fotos à direita — bem espaçadas, mix vertical/horizontal */}
    <PhotoPlaceholder
      label="Foto livro"
      className="absolute top-[6%] right-[4%] w-[180px] h-[130px] rounded-lg anim-scatter"
      style={{ transform: 'rotate(2.5deg)' }}
    />
    <PhotoPlaceholder
      label="Foto palco"
      className="absolute top-[40%] right-[3%] w-[160px] h-[200px] rounded anim-scatter"
      style={{ transform: 'rotate(-2deg)' }}
    />
    <PhotoPlaceholder
      label="Foto atual"
      className="absolute bottom-[8%] right-[14%] w-[200px] h-[140px] rounded-lg anim-scatter"
      style={{ transform: 'rotate(1deg)' }}
    />

    {/* Conteúdo central */}
    <div className="relative z-10 text-center max-w-2xl anim-center">
      <span className="h-panel-label text-muted-foreground">HOJE</span>
      <h2 className="h-panel-title text-foreground">Inspirar para agir</h2>
      <p className="h-panel-text text-muted-foreground mx-auto mt-4">
        Empreendedor social, palestrante e aspirante a escritor. Roberto continua
        dedicando cada dia a provar que a educação é o caminho.
      </p>
    </div>
  </div>
);

/* ─── Panels array ─── */
const panels = [PanelInfancia, PanelFormacao, PanelOmunga, PanelHoje];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
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
      const container = containerRef.current;

      // Main horizontal scroll tween
      const scrollTween = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Timeline progress line
      const line = container.querySelector('.timeline-progress');
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
              end: () => `+=${container.scrollWidth - window.innerWidth}`,
            },
          }
        );
      }

      /* ── Per-panel animations ── */
      const panelEls = container.querySelectorAll('.h-panel');

      panelEls.forEach((panel: Element) => {
        const stBase = {
          trigger: panel,
          containerAnimation: scrollTween,
          start: 'left 80%',
          end: 'left 20%',
          toggleActions: 'play none none reverse',
        };

        // Photos
        const photos = panel.querySelectorAll('.anim-photo');
        if (photos.length) {
          gsap.from(photos, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: stBase,
          });
        }

        // Small photos
        const photosSm = panel.querySelectorAll('.anim-photo-sm');
        if (photosSm.length) {
          gsap.from(photosSm, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { ...stBase, start: 'left 60%' },
          });
        }

        // Main photo (scale)
        const photoMain = panel.querySelector('.anim-photo-main');
        if (photoMain) {
          gsap.from(photoMain, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: stBase,
          });
        }

        // Scattered photos
        const scatterPhotos = panel.querySelectorAll('.anim-scatter');
        if (scatterPhotos.length) {
          scatterPhotos.forEach((el: Element, j: number) => {
            const directions = [
              { x: -80, y: 40 },
              { x: 60, y: -50 },
              { x: -40, y: -60 },
              { x: 70, y: 50 },
              { x: -60, y: -30 },
              { x: 50, y: 60 },
            ];
            const dir = directions[j % directions.length];
            gsap.from(el, {
              x: dir.x,
              y: dir.y,
              opacity: 0,
              duration: 0.8,
              delay: j * 0.12,
              ease: 'power3.out',
              scrollTrigger: stBase,
            });
          });
        }

        // Text elements
        const texts = panel.querySelectorAll('.anim-text');
        if (texts.length) {
          gsap.from(texts, {
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: stBase,
          });
        }

        // Center content
        const center = panel.querySelector('.anim-center');
        if (center) {
          gsap.from(center, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: stBase,
          });
        }

        // Counter
        const counter = panel.querySelector('.anim-counter');
        if (counter) {
          gsap.from(counter, {
            scale: 0.6,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.4)',
            scrollTrigger: { ...stBase, start: 'left 50%' },
          });
        }

        // Delayed text
        const delayedText = panel.querySelector('.anim-text-delay');
        if (delayedText) {
          gsap.from(delayedText, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { ...stBase, start: 'left 40%' },
          });
        }
      });
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
        {timelineSteps.map((step, i) => {
          const Panel = panels[i];
          return (
            <div key={step.id} className="relative w-full py-20 border-b border-border">
              <Panel />
            </div>
          );
        })}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      {/* Timeline progress line */}
      <div className="absolute bottom-8 left-0 right-0 h-px z-20" style={{ background: 'hsl(var(--foreground) / 0.12)' }}>
        <div
          className="timeline-progress absolute inset-0 origin-left"
          style={{ transformOrigin: 'left center', background: 'hsl(var(--foreground) / 0.2)' }}
        />
      </div>

      <div
        ref={containerRef}
        className="flex h-screen"
        style={{ width: `${timelineSteps.length * 100}vw` }}
      >
        {timelineSteps.map((step, i) => {
          const Panel = panels[i];
          return (
            <div
              key={step.id}
              className="h-panel relative w-screen h-screen flex items-center bg-background"
            >
              <Panel />

              {/* Timeline dot — label ABOVE */}
              <div
                className="absolute bottom-6 z-30 flex flex-col items-center"
                style={{ left: '50%', transform: 'translateX(-50%)' }}
              >
                <span className="text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap mb-2">
                  {step.label}
                </span>
                <div className="w-3 h-3 rounded-full bg-foreground" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
