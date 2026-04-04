import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, useInView } from 'framer-motion';

declare const gsap: any;

/* ─── Panel Data ─── */
const timelineSteps = [
  { id: 'infancia', label: 'INFÂNCIA' },
  { id: 'formacao', label: 'FORMAÇÃO' },
  { id: 'omunga', label: 'OMUNGA' },
  { id: 'hoje', label: 'HOJE' },
];

/* ─── Photo component ─── */
const Photo = ({
  src,
  alt,
  className = '',
  style = {},
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <img
    src={src}
    alt={alt}
    className={`object-cover ${className}`}
    style={style}
    loading="lazy"
  />
);

/* ═══════════════════════════════════════════════════════
   DESKTOP PANELS (GSAP horizontal scroll)
   ═══════════════════════════════════════════════════════ */

const PanelInfancia = () => (
  <div className="panel-inner flex items-center justify-center h-full w-full px-16 lg:px-24 gap-16">
    <div className="relative flex-shrink-0 w-[340px] h-[460px]">
      <div
        className="polaroid-frame absolute top-0 left-0 w-[280px] h-[340px] anim-photo"
        style={{ transform: 'rotate(-3deg)' }}
      >
        <Photo src="/image/foto_infancia_upscale_4x.jpg" alt="Infância de Roberto" className="w-full h-full rounded" />
        <span className="block text-center text-[11px] text-muted-foreground mt-2 font-medium tracking-wide">
          Joinville, anos 80
        </span>
      </div>
      <div
        className="polaroid-frame absolute bottom-0 right-0 w-[200px] h-[240px] anim-photo"
        style={{ transform: 'rotate(2deg)' }}
      >
        <Photo src="/image/roberto-infancia-crianca.png" alt="Infância 2" className="w-full h-full rounded" />
      </div>
    </div>
    <div className="flex flex-col justify-center max-w-lg anim-text">
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

const PanelFormacao = () => (
  <div className="panel-inner flex items-center justify-center h-full w-full px-16 lg:px-24 gap-16">
    <div className="flex flex-col justify-center max-w-md anim-text">
      <h2 className="h-panel-title whitespace-pre-line text-foreground">
        {'O poder\nda palavra'}
      </h2>
      <p className="h-panel-text text-muted-foreground mb-8">
        Escritor e comunicador por natureza. Encontrou nos livros e nas palestras a
        ferramenta para amplificar sua voz e levar sua mensagem a milhares de pessoas.
      </p>
      <div className="flex gap-4">
        <Photo src="/image/FOTO ROBERTO 04.jpg" alt="Formação 1" className="w-[160px] h-[120px] rounded anim-photo-sm" />
        <Photo src="/image/FOTO ROBERTO 05.jpg" alt="Formação 2" className="w-[160px] h-[120px] rounded anim-photo-sm" />
      </div>
    </div>
    <div className="flex-shrink-0 anim-photo-main">
      <Photo src="/image/FOTO ROBERTO 07.jpg" alt="Roberto no palco" className="w-[400px] h-[500px] rounded-lg" />
    </div>
  </div>
);

const PanelOmunga = () => (
  <div className="panel-inner flex flex-col justify-center h-full w-full px-16 lg:px-24">
    <div className="flex items-start gap-16">
      <div className="flex flex-col gap-6 anim-text">
        <div>
          <img src="/image/omunga-logo.png" alt="Logo Omunga" className="h-10 md:h-12 mb-4 object-contain" loading="lazy" />
          <h2 className="h-panel-title whitespace-pre-line text-foreground">
            {'Criar para\ntransformar'}
          </h2>
        </div>
        <Photo src="/image/roberto-pascoal-comunidade-isolada.jpg" alt="Amazônia" className="w-[400px] h-[280px] rounded-lg anim-photo" />
      </div>
      <div className="flex flex-col gap-6 pt-12">
        <div className="flex gap-4">
          <Photo src="/image/roberto-pascoal-criancas-indigenas.png" alt="Crianças indígenas" className="w-[180px] h-[140px] rounded anim-photo-sm" />
          <Photo src="/image/roberto-pascoal-leitura-indigena.png" alt="Leitura indígena" className="w-[180px] h-[140px] rounded anim-photo-sm" />
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

const PanelHoje = () => (
  <div className="panel-inner relative flex flex-col items-center justify-center h-full w-full px-16 lg:px-24">
    <Photo src="/image/B0119027.JPG" alt="Palestra" className="absolute top-[8%] left-[3%] w-[200px] h-[140px] rounded-lg anim-scatter" style={{ transform: 'rotate(-3deg)' }} />
    <Photo src="/image/200229_OMG_4225.jpg" alt="Ação social" className="absolute top-[42%] left-[2%] w-[150px] h-[190px] rounded anim-scatter" style={{ transform: 'rotate(2deg)' }} />
    <Photo src="/image/roberto-pascoal-projetos-africa.jpg" alt="Projetos África" className="absolute bottom-[10%] left-[12%] w-[190px] h-[130px] rounded-lg anim-scatter" style={{ transform: 'rotate(-1.5deg)' }} />
    <Photo src="/image/capa do livro.png" alt="Livro" className="absolute top-[6%] right-[4%] w-[180px] h-[130px] rounded-lg anim-scatter" style={{ transform: 'rotate(2.5deg)' }} />
    <Photo src="/image/FOTO ROBERTO 08 (2).jpg" alt="No palco" className="absolute top-[40%] right-[3%] w-[160px] h-[200px] rounded anim-scatter" style={{ transform: 'rotate(-2deg)' }} />
    <Photo src="/image/FOTO ROBERTO 09.jpg" alt="Roberto atual" className="absolute bottom-[8%] right-[14%] w-[200px] h-[140px] rounded-lg anim-scatter" style={{ transform: 'rotate(1deg)' }} />
    <div className="relative z-10 text-center max-w-2xl anim-center">
      <h2 className="h-panel-title text-foreground">Inspirar para agir</h2>
      <p className="h-panel-text text-muted-foreground mx-auto mt-4">
        Empreendedor social, palestrante e aspirante a escritor. Roberto continua
        dedicando cada dia a provar que a educação é o caminho.
      </p>
    </div>
  </div>
);

const panels = [PanelInfancia, PanelFormacao, PanelOmunga, PanelHoje];

/* ═══════════════════════════════════════════════════════
   MOBILE PANELS (vertical scroll, framer-motion)
   ═══════════════════════════════════════════════════════ */

const MobilePanel = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="w-full px-6 py-16 border-b border-border"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4 block">
        {label}
      </span>
      {children}
    </motion.div>
  );
};

const MobilePanelInfancia = () => (
  <MobilePanel label="INFÂNCIA">
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <div className="flex-1" style={{ transform: 'rotate(-2deg)' }}>
          <Photo src="/image/foto_infancia_upscale_4x.jpg" alt="Infância" className="w-full aspect-[4/5] rounded" />
          <span className="block text-center text-[10px] text-muted-foreground mt-1 tracking-wide">
            Joinville, anos 80
          </span>
        </div>
        <div className="w-2/5 self-end" style={{ transform: 'rotate(1.5deg)' }}>
          <Photo src="/image/roberto-infancia-crianca.png" alt="Infância 2" className="w-full aspect-square rounded" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium tracking-tight text-foreground mb-3">Onde tudo começou</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Nascido no interior do Brasil, Roberto cresceu cercado por histórias e pela
          vontade de transformar o mundo ao seu redor. Desde cedo, a educação foi seu
          maior aliado.
        </p>
      </div>
    </div>
  </MobilePanel>
);

const MobilePanelFormacao = () => (
  <MobilePanel label="FORMAÇÃO">
    <div className="flex flex-col gap-6">
      <Photo src="/image/FOTO ROBERTO 07.jpg" alt="Roberto no palco" className="w-full aspect-[3/4] rounded-lg" />
      <div>
        <h2 className="text-2xl font-medium tracking-tight text-foreground mb-3">O poder da palavra</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Escritor e comunicador por natureza. Encontrou nos livros e nas palestras a
          ferramenta para amplificar sua voz e levar sua mensagem a milhares de pessoas.
        </p>
      </div>
      <div className="flex gap-3">
        <Photo src="/image/FOTO ROBERTO 04.jpg" alt="Formação 1" className="flex-1 aspect-[4/3] rounded" />
        <Photo src="/image/FOTO ROBERTO 05.jpg" alt="Formação 2" className="flex-1 aspect-[4/3] rounded" />
      </div>
    </div>
  </MobilePanel>
);

const MobilePanelOmunga = () => (
  <MobilePanel label="OMUNGA">
    <div className="flex flex-col gap-6">
      <img src="/image/omunga-logo.png" alt="Logo Omunga" className="h-8 mb-3 object-contain" loading="lazy" />
      <Photo src="/image/roberto-pascoal-comunidade-isolada.jpg" alt="Amazônia" className="w-full aspect-[16/10] rounded-lg" />
      <div className="flex gap-3">
        <Photo src="/image/roberto-pascoal-criancas-indigenas.png" alt="Crianças indígenas" className="flex-1 aspect-[4/3] rounded" />
        <Photo src="/image/roberto-pascoal-leitura-indigena.png" alt="Leitura indígena" className="flex-1 aspect-[4/3] rounded" />
      </div>
      <div>
        <span className="text-foreground font-bold text-4xl tracking-tight">+50</span>
        <span className="block text-muted-foreground text-xs uppercase tracking-widest mt-1">
          bibliotecas construídas
        </span>
      </div>
      <div>
        <h2 className="text-2xl font-medium tracking-tight text-foreground mb-3">Criar para transformar</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Fundou o Projeto Omunga com uma missão clara: levar bibliotecas e educação
          para as comunidades mais isoladas da Amazônia.
        </p>
      </div>
    </div>
  </MobilePanel>
);

const MobilePanelHoje = () => (
  <MobilePanel label="HOJE">
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <Photo src="/image/B0119027.JPG" alt="Palestra" className="flex-1 aspect-[4/3] rounded-lg" />
        <Photo src="/image/capa do livro.png" alt="Livro" className="flex-1 aspect-[3/4] rounded-lg" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-medium tracking-tight text-foreground mb-3">Inspirar para agir</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Empreendedor social, palestrante e aspirante a escritor. Roberto continua
          dedicando cada dia a provar que a educação é o caminho.
        </p>
      </div>
      <div className="flex gap-3">
        <Photo src="/image/200229_OMG_4225.jpg" alt="Ação social" className="flex-1 aspect-square rounded" />
        <Photo src="/image/FOTO ROBERTO 09.jpg" alt="Roberto atual" className="flex-1 aspect-[4/3] rounded-lg" />
      </div>
    </div>
  </MobilePanel>
);

const mobilePanels = [MobilePanelInfancia, MobilePanelFormacao, MobilePanelOmunga, MobilePanelHoje];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
const HorizontalScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

      const panelEls = container.querySelectorAll('.h-panel');

      panelEls.forEach((panel: Element) => {
        const stBase = {
          trigger: panel,
          containerAnimation: scrollTween,
          start: 'left 80%',
          end: 'left 20%',
          toggleActions: 'play none none reverse',
        };

        const photos = panel.querySelectorAll('.anim-photo');
        if (photos.length) {
          gsap.from(photos, {
            y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: stBase,
          });
        }

        const photosSm = panel.querySelectorAll('.anim-photo-sm');
        if (photosSm.length) {
          gsap.from(photosSm, {
            y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { ...stBase, start: 'left 60%' },
          });
        }

        const photoMain = panel.querySelector('.anim-photo-main');
        if (photoMain) {
          gsap.from(photoMain, {
            scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: stBase,
          });
        }

        const scatterPhotos = panel.querySelectorAll('.anim-scatter');
        if (scatterPhotos.length) {
          scatterPhotos.forEach((el: Element, j: number) => {
            const directions = [
              { x: -80, y: 40 }, { x: 60, y: -50 }, { x: -40, y: -60 },
              { x: 70, y: 50 }, { x: -60, y: -30 }, { x: 50, y: 60 },
            ];
            const dir = directions[j % directions.length];
            gsap.from(el, {
              x: dir.x, y: dir.y, opacity: 0, duration: 0.8, delay: j * 0.12,
              ease: 'power3.out', scrollTrigger: stBase,
            });
          });
        }

        const texts = panel.querySelectorAll('.anim-text');
        if (texts.length) {
          gsap.from(texts, {
            x: -40, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: stBase,
          });
        }

        const center = panel.querySelector('.anim-center');
        if (center) {
          gsap.from(center, {
            y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: stBase,
          });
        }

        const counter = panel.querySelector('.anim-counter');
        if (counter) {
          gsap.from(counter, {
            scale: 0.6, opacity: 0, duration: 0.8, ease: 'back.out(1.4)',
            scrollTrigger: { ...stBase, start: 'left 50%' },
          });
        }

        const delayedText = panel.querySelector('.anim-text-delay');
        if (delayedText) {
          gsap.from(delayedText, {
            y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
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

  /* ── Mobile: vertical stack ── */
  if (isMobile) {
    return (
      <section className="w-full bg-background">
        {mobilePanels.map((Panel, i) => (
          <Panel key={timelineSteps[i].id} />
        ))}
      </section>
    );
  }

  /* ── Desktop: horizontal GSAP scroll ── */
  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
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
