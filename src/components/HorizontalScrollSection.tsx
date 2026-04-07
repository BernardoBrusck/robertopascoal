import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Panel Data ─── */
const timelineSteps = [
  { id: 'infancia', label: 'INFÂNCIA' },
  { id: 'formacao', label: 'FORMAÇÃO' },
  { id: 'omunga', label: 'OMUNGA' },
  { id: 'hoje', label: 'HOJE' },
];

/* ─── Photo component with width/height ─── */
const Photo = ({ src, alt, className = '', style = {}, width = 800, height = 600 }: { src: string; alt: string; className?: string; style?: React.CSSProperties; width?: number; height?: number; }) => (
  <img src={src} alt={alt} className={`object-cover ${className}`} style={style} loading="lazy" width={width} height={height} />
);

/* ═══════════════════════════════════════════════════════
   DESKTOP PANELS (GSAP horizontal scroll)
   ═══════════════════════════════════════════════════════ */

const PanelInfancia = () => (
  <div className="panel-inner flex items-center justify-center h-full w-full px-16 lg:px-24 gap-16">
    <div className="relative flex-shrink-0 w-[340px] h-[460px]">
      <div className="polaroid-frame absolute top-0 left-0 w-[280px] h-[340px] anim-photo" style={{ transform: 'rotate(-3deg)' }}>
        <Photo src="/image/infancia-upscale.webp" alt="Infância de Roberto" className="w-full h-full rounded" width={280} height={340} />
        <span className="block text-center text-[11px] text-muted-foreground mt-2 font-medium tracking-wide">Joinville, anos 80</span>
      </div>
      <div className="polaroid-frame absolute bottom-0 right-0 w-[200px] h-[240px] anim-photo" style={{ transform: 'rotate(2deg)' }}>
        <Photo src="/image/roberto-infancia-crianca.webp" alt="Infância 2" className="w-full h-full rounded" width={200} height={240} />
      </div>
    </div>
    <div className="flex flex-col justify-center max-w-lg anim-text">
      <h2 className="h-panel-title whitespace-pre-line text-foreground">{'Onde tudo\ncomeçou'}</h2>
      <p className="h-panel-text text-muted-foreground">Nascido no interior do Brasil, Roberto cresceu cercado por histórias e pela vontade de transformar o mundo ao seu redor. Desde cedo, a educação foi seu maior aliado.</p>
    </div>
  </div>
);

const PanelFormacao = () => (
  <div className="panel-inner flex items-center justify-center h-full w-full px-16 lg:px-24 gap-16">
    <div className="flex flex-col justify-center max-w-md anim-text">
      <h2 className="h-panel-title whitespace-pre-line text-foreground">{'O poder\nda palavra'}</h2>
      <p className="h-panel-text text-muted-foreground mb-8">Escritor e comunicador por natureza. Encontrou nos livros e nas palestras a ferramenta para amplificar sua voz e levar sua mensagem a milhares de pessoas.</p>
      <div className="flex gap-4">
        <Photo src="/image/roberto-pascoal-retrato-1.webp" alt="Formação 1" className="w-[160px] h-[120px] rounded anim-photo-sm" width={160} height={120} />
        <Photo src="/image/foto-roberto-05.webp" alt="Formação 2" className="w-[160px] h-[120px] rounded anim-photo-sm" width={160} height={120} />
      </div>
    </div>
    <div className="flex-shrink-0 anim-photo-main">
      <Photo src="/image/foto-roberto-07.webp" alt="Roberto no palco" className="w-[400px] h-[500px] rounded-lg" width={400} height={500} />
    </div>
  </div>
);

const PanelOmunga = () => (
  <div className="panel-inner flex flex-col justify-center h-full w-full px-16 lg:px-24">
    <div className="flex items-start gap-16">
      <div className="flex flex-col gap-6 anim-text">
        <div>
          <h2 className="h-panel-title whitespace-pre-line text-foreground">{'Criar para\ntransformar'}</h2>

        </div>
        <Photo src="/image/roberto-pascoal-comunidade-isolada.webp" alt="Amazônia" className="w-[400px] h-[280px] rounded-lg anim-photo" width={400} height={280} />
      </div>
      <div className="flex flex-col gap-6 pt-12">
        <div className="flex gap-4">
          <Photo src="/image/roberto-pascoal-criancas-indigenas.webp" alt="Crianças indígenas" className="w-[180px] h-[140px] rounded anim-photo-sm" width={180} height={140} />
          <Photo src="/image/roberto-pascoal-leitura-indigena.webp" alt="Leitura indígena" className="w-[180px] h-[140px] rounded anim-photo-sm" width={180} height={140} />
        </div>
        <div className="anim-counter">
          <span className="text-foreground font-bold text-5xl lg:text-7xl tracking-tight counter-number">+50</span>
          <span className="block text-muted-foreground text-sm uppercase tracking-widest mt-1">bibliotecas construídas</span>
        </div>
        <p className="h-panel-text text-muted-foreground max-w-sm anim-text-delay">Fundou o Projeto Omunga com uma missão clara: levar bibliotecas e educação para as comunidades mais isoladas da Amazônia.</p>
      </div>
    </div>
  </div>
);

const PanelHoje = () => (
  <div className="panel-inner relative flex flex-col items-center justify-center h-full w-full px-16 lg:px-24">
    <Photo src="/image/WhatsApp Image 2026-04-01 at 15.47.16 (1).jpeg" alt="Roberto Pascoal" className="absolute top-[8%] left-[3%] w-[200px] h-[140px] rounded-lg anim-scatter" style={{ transform: 'rotate(-3deg)' }} width={200} height={140} />
    <Photo src="/image/WhatsApp Image 2026-04-01 at 15.47.14 (1).jpeg" alt="Ação social" className="absolute top-[42%] left-[2%] w-[150px] h-[190px] rounded anim-scatter" style={{ transform: 'rotate(2deg)' }} width={150} height={190} />
    <Photo src="/image/WhatsApp Image 2026-04-01 at 15.47.14 (2).jpeg" alt="Projetos África" className="absolute bottom-[10%] left-[12%] w-[190px] h-[130px] rounded-lg anim-scatter" style={{ transform: 'rotate(-1.5deg)' }} width={190} height={130} />
    <Photo src="/image/WhatsApp Image 2026-04-01 at 15.47.15 (1).jpeg" alt="Documentário" className="absolute top-[6%] right-[4%] w-[180px] h-[130px] rounded-lg anim-scatter" style={{ transform: 'rotate(2.5deg)' }} width={180} height={130} />
    <Photo src="/image/WhatsApp Image 2026-04-01 at 15.47.11.jpeg" alt="Roberto" className="absolute top-[40%] right-[3%] w-[160px] h-[200px] rounded anim-scatter" style={{ transform: 'rotate(-2deg)' }} width={160} height={200} />
    <Photo src="/image/WhatsApp Image 2026-04-01 at 15.47.17.jpeg" alt="Roberto atual" className="absolute bottom-[8%] right-[14%] w-[200px] h-[140px] rounded-lg anim-scatter" style={{ transform: 'rotate(1deg)' }} width={200} height={140} />
    <div className="relative z-10 text-center max-w-2xl anim-center">
      <img src="/image/omunga-logo.png" alt="Logo Omunga" className="h-12 md:h-16 mb-6 mx-auto object-contain invert dark:invert-0" loading="lazy" />
      <h2 className="h-panel-title text-foreground">Inspirar para agir</h2>
      <p className="h-panel-text text-muted-foreground mx-auto mt-4">Empreendedor social, palestrante e aspirante a escritor. Roberto continua dedicando cada dia a provar que a educação é o caminho.</p>
    </div>
  </div>
);

const panels = [PanelInfancia, PanelFormacao, PanelOmunga, PanelHoje];

/* ═══════════════════════════════════════════════════════
   MOBILE PANELS (vertical scroll, framer-motion)
   ═══════════════════════════════════════════════════════ */

const MobilePanel = ({ label, children }: { label: string; children: React.ReactNode; }) => {
  return (
    <div className="w-full h-auto flex flex-col">
      <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-6 block opacity-60">{label}</span>
      <div className="w-full h-auto">
        {children}
      </div>
    </div>
  );
};

const MobilePanelInfancia = () => (
  <MobilePanel label="INFÂNCIA">
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <div className="flex-1" style={{ transform: 'rotate(-2deg)' }}>
          <Photo src="/image/infancia-upscale.webp" alt="Infância" className="w-full aspect-[4/5] rounded" width={400} height={500} />
          <span className="block text-center text-[10px] text-muted-foreground mt-1 tracking-wide">Joinville, anos 80</span>
        </div>
        <div className="w-2/5 self-end" style={{ transform: 'rotate(1.5deg)' }}>
          <Photo src="/image/roberto-infancia-crianca.webp" alt="Infância 2" className="w-full aspect-square rounded" width={300} height={300} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium tracking-tight text-foreground mb-3">Onde tudo começou</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">Nascido no interior do Brasil, Roberto cresceu cercado por histórias e pela vontade de transformar o mundo ao seu redor. Desde cedo, a educação foi seu maior aliado.</p>
      </div>
    </div>
  </MobilePanel>
);

const MobilePanelFormacao = () => (
  <MobilePanel label="FORMAÇÃO">
    <div className="flex flex-col gap-8">
      <Photo src="/image/foto-roberto-07.webp" alt="Roberto no palco" className="w-full aspect-[3/4] rounded-lg shadow-xl" width={600} height={800} />
      <div>
        <h2 className="text-3xl font-medium tracking-tight text-foreground mb-4 leading-tight">O poder da<br/>palavra</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">Escritor e comunicador por natureza. Encontrou nos livros e nas palestras a ferramenta para amplificar sua voz e levar sua mensagem a milhares de pessoas.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Photo src="/image/foto-roberto-04.webp" alt="Formação 1" className="w-full aspect-[4/3] rounded shadow-md" width={800} height={600} />
        <Photo src="/image/foto-roberto-05.webp" alt="Formação 2" className="w-full aspect-[4/3] rounded shadow-md" width={800} height={600} />
      </div>
    </div>
  </MobilePanel>
);

const MobilePanelOmunga = () => (
  <MobilePanel label="OMUNGA">
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl font-medium tracking-tight text-foreground leading-tight">Criar para<br/>transformar</h2>

      <div className="flex flex-col gap-4">
        <Photo src="/image/roberto-pascoal-comunidade-isolada.webp" alt="Amazônia" className="w-full aspect-[16/10] rounded-lg" width={800} height={500} />
        <div className="flex gap-3">
          <Photo src="/image/roberto-pascoal-criancas-indigenas.webp" alt="Crianças indígenas" className="w-1/2 aspect-[4/3] rounded" width={800} height={600} />
          <Photo src="/image/roberto-pascoal-leitura-indigena.webp" alt="Leitura indígena" className="w-1/2 aspect-[4/3] rounded" width={800} height={600} />
        </div>
      </div>
      
      <div className="py-4 border-y border-border/10">
        <span className="text-foreground font-bold text-5xl tracking-tight">+50</span>
        <span className="block text-muted-foreground text-[10px] uppercase tracking-[0.2em] mt-2">bibliotecas construídas</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">Fundou o Projeto Omunga com uma missão clara: levar bibliotecas e educação para as comunidades mais isoladas da Amazônia.</p>
    </div>
  </MobilePanel>
);

const MobilePanelHoje = () => (
  <MobilePanel label="HOJE">
    <div className="flex flex-col gap-10">
      <div className="pt-4 text-center">
        <img src="/image/omunga-logo.png" alt="Logo Omunga" className="h-12 mb-6 mx-auto object-contain invert dark:invert-0 opacity-80" loading="lazy" />
        <h2 className="text-3xl font-medium tracking-tight text-foreground mb-4">Inspirar para agir</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">Empreendedor social, palestrante e aspirante a escritor. Roberto continua dedicando cada dia a provar que a educação é o caminho.</p>
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
    if (isMobile !== false) return;
    if (!sectionRef.current || !containerRef.current) return;

    const sectionEl = sectionRef.current;
    const container = containerRef.current;

    const scrollTween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl,
        pin: true,
        scrub: 1,
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    });

    const panelEls = container.querySelectorAll('.h-panel');

    panelEls.forEach((panel: Element) => {
      const stBase = { trigger: panel, containerAnimation: scrollTween, start: 'left 80%', end: 'left 20%', toggleActions: 'play none none reverse' as const };

      const photos = panel.querySelectorAll('.anim-photo');
      if (photos.length) gsap.from(photos, { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: stBase });

      const photosSm = panel.querySelectorAll('.anim-photo-sm');
      if (photosSm.length) gsap.from(photosSm, { y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', scrollTrigger: { ...stBase, start: 'left 60%' } });

      const photoMain = panel.querySelector('.anim-photo-main');
      if (photoMain) gsap.from(photoMain, { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: stBase });

      const scatterPhotos = panel.querySelectorAll('.anim-scatter');
      if (scatterPhotos.length) {
        scatterPhotos.forEach((el: Element, j: number) => {
          const directions = [{ x: -80, y: 40 }, { x: 60, y: -50 }, { x: -40, y: -60 }, { x: 70, y: 50 }, { x: -60, y: -30 }, { x: 50, y: 60 }];
          const dir = directions[j % directions.length];
          gsap.from(el, { x: dir.x, y: dir.y, opacity: 0, duration: 0.8, delay: j * 0.12, ease: 'power3.out', scrollTrigger: stBase });
        });
      }

      const texts = panel.querySelectorAll('.anim-text');
      if (texts.length) gsap.from(texts, { x: -40, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: stBase });

      const center = panel.querySelector('.anim-center');
      if (center) gsap.from(center, { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: stBase });

      const counter = panel.querySelector('.anim-counter');
      if (counter) gsap.from(counter, { scale: 0.6, opacity: 0, duration: 0.8, ease: 'back.out(1.4)', scrollTrigger: { ...stBase, start: 'left 50%' } });

      const delayedText = panel.querySelector('.anim-text-delay');
      if (delayedText) gsap.from(delayedText, { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { ...stBase, start: 'left 40%' } });
    });

    return () => {
      if (scrollTween) {
        scrollTween.kill();
        if (scrollTween.scrollTrigger) {
          scrollTween.scrollTrigger.kill(true);
        }
      }
      
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(t => {
        if (t.vars.trigger === sectionEl || (t.vars.containerAnimation === scrollTween)) {
          t.kill(true);
        }
      });

      // Force clear any GSAP-injected styles and spacers
      if (sectionEl) {
        gsap.set(sectionEl, { clearProps: "all" });
        // If GSAP left a pin-spacer, we might need to handle it, 
        // but t.kill(true) usually handles it.
      }
      
      ScrollTrigger.refresh();
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section 
        ref={sectionRef}
        id="historia" 
        className="relative block w-full bg-background py-20 px-6 flex flex-col gap-24 h-auto overflow-visible clear-both z-0"
      >
        <MobilePanelInfancia />
        <MobilePanelFormacao />
        <MobilePanelOmunga />
        <MobilePanelHoje />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">

      <div ref={containerRef} className="flex h-full w-max">
        {panels.map((Panel, i) => (
          <div key={timelineSteps[i].id} className="h-panel w-screen h-full flex-shrink-0 overflow-hidden">
            <Panel />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
