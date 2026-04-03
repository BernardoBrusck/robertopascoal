import { useEffect, useRef } from 'react';

import slideAmazonia from '@/assets/hero/slide-03-amazonia.jpg';
import slideRoraima from '@/assets/hero/slide-04-roraima.png';
import slideIndigena from '@/assets/hero/slide-05-indigena.jpeg';
import slideOmunga from '@/assets/hero/slide-06-omunga.jpeg';

declare const gsap: any;

const panels = [
  {
    id: 'sobre',
    label: 'SOBRE',
    title: 'Roberto\nPascoal',
    text: 'Escritor, palestrante e ativista social. Nascido no interior do Brasil, dedicou sua vida a transformar realidades através da educação e da palavra. Fundador do projeto Omunga, já impactou milhares de vidas em comunidades remotas da Amazônia.',
    image: slideRoraima,
    dark: true,
  },
  {
    id: 'livro',
    label: 'O LIVRO',
    title: 'O Caminho\nda Educação',
    text: 'Uma obra que transforma a maneira como enxergamos o poder da educação. Cada página é um convite para repensar nosso papel na construção de um futuro mais justo e igualitário.',
    image: slideAmazonia,
    dark: false,
  },
  {
    id: 'palestras',
    label: 'PALESTRAS',
    title: 'Inspirar\npara Agir',
    text: 'Palestras que combinam storytelling visceral com dados reais. Roberto já esteve nos maiores palcos do país, levando sua mensagem de transformação social para líderes, educadores e jovens.',
    image: slideIndigena,
    dark: true,
  },
  {
    id: 'causa',
    label: 'A CAUSA',
    title: 'Projeto\nOmunga',
    text: 'Levar bibliotecas e educação para as comunidades mais isoladas da Amazônia brasileira. Cada livro doado é uma semente de mudança. Mais de 50 bibliotecas construídas em regiões sem acesso à leitura.',
    image: slideOmunga,
    dark: false,
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
      const totalPanels = panels.length;

      gsap.to(containerRef.current, {
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

      // Panel content animations
      const panelEls = containerRef.current.querySelectorAll('.h-panel');
      panelEls.forEach((panel, i) => {
        const content = panel.querySelector('.h-panel-content');
        if (!content) return;

        gsap.fromTo(
          content.children,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById?.('horizontalScroll'),
              start: 'left 80%',
              end: 'left 30%',
              scrub: 1,
              horizontal: true,
            },
          }
        );
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
      <section className="w-full">
        {panels.map((panel) => (
          <div
            key={panel.id}
            className={`relative w-full min-h-screen flex items-center ${
              panel.dark ? 'bg-foreground' : 'bg-background'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={panel.image}
                alt={panel.label}
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="relative z-10 px-6 py-20">
              <span
                className={`h-panel-label ${
                  panel.dark ? 'text-white/40' : 'text-foreground/40'
                }`}
              >
                {panel.label}
              </span>
              <h2
                className={`h-panel-title whitespace-pre-line ${
                  panel.dark ? 'text-white' : 'text-foreground'
                }`}
              >
                {panel.title}
              </h2>
              <p
                className={`h-panel-text ${
                  panel.dark ? 'text-white/70' : 'text-foreground/70'
                }`}
              >
                {panel.text}
              </p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="flex h-screen"
        style={{ width: `${panels.length * 100}vw` }}
      >
        {panels.map((panel) => (
          <div
            key={panel.id}
            className={`h-panel relative w-screen h-screen flex items-center ${
              panel.dark ? 'bg-[#0a0a0a]' : 'bg-background'
            }`}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={panel.image}
                alt={panel.label}
                className="w-full h-full object-cover"
                style={{ opacity: panel.dark ? 0.25 : 0.15 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: panel.dark
                    ? 'linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.8) 100%)'
                    : 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.9) 100%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="h-panel-content relative z-10 flex flex-col justify-center px-16 lg:px-24 max-w-3xl">
              <span
                className={`h-panel-label ${
                  panel.dark ? 'text-white/40' : 'text-foreground/40'
                }`}
              >
                {panel.label}
              </span>
              <h2
                className={`h-panel-title whitespace-pre-line ${
                  panel.dark ? 'text-white' : 'text-foreground'
                }`}
              >
                {panel.title}
              </h2>
              <p
                className={`h-panel-text ${
                  panel.dark ? 'text-white/60' : 'text-foreground/60'
                }`}
              >
                {panel.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
