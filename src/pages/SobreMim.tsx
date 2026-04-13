import React, { useRef, useEffect } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── CSS Marquee (injetado inline para não depender de arquivo externo) ─── */
const marqueeStyle = `
  @keyframes marquee-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track { animation: marquee-left 22s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }
`;

/* ─── Word-by-word GSAP scrub ─── */
function useWordReveal(textRef: React.RefObject<HTMLElement>, sectionRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const words = textRef.current.querySelectorAll<HTMLSpanElement>('.word');
    if (!words.length) return;

    const anim = gsap.fromTo(words,
      { opacity: 0.08, y: 12 },
      {
        opacity: 1, y: 0,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 1,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);
}

/* ─── Paragraph Word Wrapper ─── */
function WordRevealParagraph({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="word inline-block pr-[0.25em]">{word}</span>
      ))}
    </span>
  );
}

/* ─── OriginsSection: Pinned GSAP — textos originais na esquerda, retrato na direita ─── */
const OriginsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const phrase3Ref = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animação de entrada da imagem (Curtain Reveal)
    tl.fromTo(imgContainerRef.current,
      { opacity: 0, clipPath: 'inset(100% 0 0 0)', scale: 1.05 },
      { opacity: 1, clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.5, ease: 'power2.inOut' }
    );

    tl.fromTo(phrase1Ref.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      "-=0.6"
    );
    tl.to({}, { duration: 0.3 });

    tl.fromTo(phrase2Ref.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
    tl.to({}, { duration: 0.3 });

    tl.fromTo(phrase3Ref.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
    tl.to({}, { duration: 0.6 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white w-full h-[100vh] flex items-center justify-center overflow-hidden px-4 md:px-6 lg:px-12"
    >
      <div className="max-w-[1200px] w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20 h-full">

        {/* Esquerda: Textos em fases — textos originais */}
        <div className="relative flex-1 w-full max-w-[550px] min-h-[200px] flex flex-col justify-center gap-8">

          <div ref={phrase1Ref} className="opacity-0">
            <span className="text-xl md:text-2xl font-light text-gray-600 text-left leading-[1.4] tracking-tight block">
              Lá atrás, depois de viver na correria, em busca de boas posições corporativas e de me formar em Publicidade e Propaganda, eu senti que faltava algo.
            </span>
          </div>

          <div ref={phrase2Ref} className="opacity-0">
            <span className="text-2xl md:text-3xl lg:text-4xl font-light text-black text-left leading-tight tracking-tight block">
              Faltava sentido.
            </span>
          </div>

          <div ref={phrase3Ref} className="opacity-0">
            <span className="text-xl md:text-2xl font-light text-gray-600 text-left leading-[1.4] tracking-tight block">
              Então, aos 27 anos, parti para uma jornada mundo afora. Fiz o Caminho de Santiago de Compostela, em 2007. Morei em países africanos por quatro anos. E, depois, vivi um mochilão de um ano pelas regiões mais distantes e vulneráveis do Brasil.
            </span>
          </div>

        </div>

        {/* Direita: Foto vertical */}
        <div
          ref={imgContainerRef}
          className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[350px] h-[55vh] md:h-[70vh] lg:h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10 shrink-0"
        >
          <img
            src="/image/retrato-3-opt.webp"
            alt="Roberto Pascoal"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>
    </section>
  );
};

/* ─── OmungaSection: Pinned GSAP — textos originais do Story 2 ─── */
const OmungaSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const phrase3Ref = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animação de entrada da imagem (Curtain/Wipe + Scale)
    tl.fromTo(imgContainerRef.current,
      { opacity: 0, clipPath: 'inset(0 100% 0 0)', scale: 0.9 },
      { opacity: 1, clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.5, ease: 'power2.inOut' }
    );

    tl.fromTo(phrase1Ref.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      "-=0.5" // Inicia um pouco antes do fim da animação da imagem
    );
    tl.to({}, { duration: 0.3 });

    tl.fromTo(phrase2Ref.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
    tl.to({}, { duration: 0.3 });

    tl.fromTo(phrase3Ref.current,
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
    tl.to({}, { duration: 0.6 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white w-full h-[100vh] flex items-center justify-center overflow-hidden px-4 md:px-6 lg:px-12"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-16 h-full">

        {/* Esquerda: Imagem retangular horizontal */}
        <div
          ref={imgContainerRef}
          className="relative w-full max-w-[420px] lg:max-w-[500px] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-2xl shadow-black/10 shrink-0"
        >
          <img
            src="/image/roberto-pascoal-leitura-indigena.webp"
            alt="Roberto Pascoal com leitura indígena"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Direita: Textos em fases */}
        <div className="relative flex-1 w-full max-w-[620px] min-h-[200px] flex flex-col justify-center gap-8">

          <div ref={phrase1Ref} className="opacity-0">
            <span className="text-xl md:text-2xl font-light text-gray-600 text-left leading-[1.4] tracking-tight block">
              Me tornei empreendedor social. Fundei a OMUNGA, Grife Social e Instituto, um empreendimento social que incentiva a cultura da leitura, amplia a visão de mundo e desenvolve potencialidades humanas.
            </span>
          </div>

          <div ref={phrase2Ref} className="opacity-0">
            <span className="text-xl md:text-2xl font-light text-gray-600 text-left leading-[1.4] tracking-tight block">
              Distribuímos livros, criamos espaços literários, realizamos ações de desenvolvimento de professores no seu próprio território e contribuímos para a valorização e perpetuação de memórias. Sempre, unicamente, para atender crianças e professores das regiões mais distantes e isoladas do Brasil.
            </span>
          </div>

          <div ref={phrase3Ref} className="opacity-0">
            <span className="text-2xl md:text-3xl lg:text-4xl font-light text-black text-left leading-tight tracking-tight block">
              E, eu me preenchi.<br /><span className="font-medium">Me encontrei.</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

/* ─── DepthSection: cada frase sozinha, gigante, centralizada — pin+scrub ─── */
const DepthSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    const dur = 0.8;
    const hold = 0.4;
    const fadeOut = 0.4;

    // Frase 1 in
    tl.fromTo(p1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' });
    tl.to({}, { duration: hold });
    // Frase 1 out + Frase 2 in
    tl.to(p1Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });
    tl.fromTo(p2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold });
    // Frase 2 out + Frase 3 in
    tl.to(p2Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });
    tl.fromTo(p3Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold });
    // Frase 3 out + Frase 4 in
    tl.to(p3Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });
    tl.fromTo(p4Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold * 1.5 });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const phraseClass = "absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 opacity-0 pointer-events-none";
  const bigText = "text-2xl md:text-3xl lg:text-4xl font-light text-white text-center leading-[1.3] max-w-4xl tracking-tight text-balance";
  const italicText = "text-xl md:text-2xl lg:text-3xl font-light italic text-gray-400 text-center mt-4 block text-balance";

  return (
    <section
      ref={containerRef}
      className="relative bg-black w-full h-[100vh] overflow-hidden"
    >
      {/* Gradient to smooth out the transition from previous white section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/10 to-transparent z-10 pointer-events-none opacity-20"></div>

      {/* Imagem de Fundo Nova com Sobreposição mais clara */}
      <div className="absolute inset-0">
        <img src="/image/WhatsApp%20Image%202026-04-01%20at%2015.47.22%20(3).jpeg" alt="Roberto Pascoal Monte Roraima" className="w-full h-full object-cover object-bottom" referrerPolicy="no-referrer" />
        {/* Overlay escuro mas transparente o suficiente para ver a imagem */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Frases sobrepostas — entram e saem uma a uma */}
      <div className="relative z-10 w-full h-full">

        <div ref={p1Ref} className={phraseClass}>
          <span className={bigText}>
            Se não há uma travessia de barco pela Amazônia… horas no lombo de um búfalo na Ilha do Marajó… ou dias de caminhada aos pés do Monte Roraima…
            <span className={italicText}>parece que falta algo.</span>
          </span>
        </div>

        <div ref={p2Ref} className={phraseClass}>
          <span className={bigText}>
            Se não há um ancião ou uma anciã para compartilhar saberes antigos…
            <span className={italicText}>o caminho perde profundidade.</span>
          </span>
        </div>

        <div ref={p3Ref} className={phraseClass}>
          <span className={bigText}>
            Se não encontro o olhar curioso de uma criança diante de um livro pela primeira vez…
            <span className={italicText}>a travessia perde brilho.</span>
          </span>
        </div>

        <div ref={p4Ref} className={phraseClass}>
          <span className={bigText}>
            E, se eu não posso compartilhar o que vivo e o que aprendo…
            <span className={italicText}>a jornada deixa de ser encontro e se torna apenas caminho solitário.</span>
          </span>
        </div>

      </div>
    </section>
  );
};

/* ─── TodaySection: cinematic expanding background with staggered text ─── */
const TodaySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run animations on desktop to keep mobile performance buttery smooth,
    // or run a modified version
    if (!containerRef.current) return;

    const isDesktop = window.innerWidth >= 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // Menos scroll
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    if (isDesktop) {
      // Suave animação apenas de leve entrada da imagem no container fixo
      tl.fromTo(imageBoxRef.current,
        { scale: 0.95, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    } else {
      tl.fromTo(imageBoxRef.current,
        { opacity: 0.8 },
        { opacity: 1, duration: 1 }
      );
    }

    const dur = 1;
    const hold = 0.3; // Segura por menos tempo

    // Phrase 1
    tl.fromTo(p1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur }, "<0.5");
    tl.to({}, { duration: hold });
    tl.to(p1Ref.current, { opacity: 0, y: -20, duration: dur });

    // Phrase 2
    tl.fromTo(p2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur });
    tl.to({}, { duration: hold });
    tl.to(p2Ref.current, { opacity: 0, y: -20, duration: dur });

    // Phrase 3
    tl.fromTo(p3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur });
    tl.to({}, { duration: hold });
    tl.to(p3Ref.current, { opacity: 0, y: -20, duration: dur });

    // Phrase 4
    tl.fromTo(p4Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur });
    tl.to({}, { duration: hold });
    tl.to(p4Ref.current, { opacity: 0, y: -20, duration: dur });

    // Phrase 5 (The long one)
    tl.fromTo(p5Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur });
    tl.to({}, { duration: hold * 2 });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const phraseClass = "absolute inset-0 flex items-center justify-center px-6 lg:px-12 opacity-0 pointer-events-none";
  // Fontes exatas do Hero / Vídeo
  const smallText = "text-2xl md:text-3xl lg:text-4xl font-light text-white text-center leading-[1.3] tracking-tight max-w-4xl text-balance";
  const bigText = "text-2xl md:text-3xl lg:text-4xl font-light text-white text-center leading-[1.3] tracking-tight max-w-5xl text-balance";
  const textShadowStyle = { textShadow: "0px 2px 4px rgba(0,0,0,0.4), 0px 4px 16px rgba(0,0,0,0.3), 0px 8px 32px rgba(0,0,0,0.3)" };

  return (
    <section ref={containerRef} className="bg-white w-full h-[100vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden">
        <div
          ref={imageBoxRef}
          className="relative w-full md:w-[90%] h-[100vh] md:h-[90vh] rounded-none md:rounded-[2rem] overflow-hidden flex items-center justify-center bg-black"
          style={{ clipPath: "none", transform: "none" }}
        >
          <img
            src="/image/WhatsApp%20Image%202026-04-01%20at%2015.47.22%20(2).jpeg"
            alt="Roberto Pascoal"
            className="absolute inset-0 w-full h-full object-cover opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Frases Sobrepostas */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">

            <div ref={p1Ref} className={phraseClass}>
              <span className={smallText} style={textShadowStyle}>Já fui uma criança inocente, medrosa e feliz.</span>
            </div>

            <div ref={p2Ref} className={phraseClass}>
              <span className={smallText} style={textShadowStyle}>Já fui um adolescente inseguro e curioso.</span>
            </div>

            <div ref={p3Ref} className={phraseClass}>
              <span className={smallText} style={textShadowStyle}>Já vivi uma vida corporativa precoce.</span>
            </div>

            <div ref={p4Ref} className={phraseClass}>
              <span className={smallText} style={textShadowStyle}>Já me perdi no mundo,<br className="md:hidden" /> tentando me encontrar.</span>
            </div>

            <div ref={p5Ref} className={phraseClass}>
              <span className={bigText} style={textShadowStyle}>
                Sou empreendedor social, palestrante e um escritor em construção. Vivo entre expedições, Florianópolis, com seus pores do sol e um certo “beach office”, e Joinville, no escritório da OMUNGA, reencontrando pessoas que amo.
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── ClosingSection: Stage Final — fundo branco, curtain wipe, HOJE watermark ─── */
const ClosingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const phrases = [
    'Busco aquilo que me preenche.',
    'O que amplia minha consciência.',
    'O que me torna mais humano.',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Watermark tipográfico — 'HOJE' com maior contraste e legibilidade */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{
          fontSize: 'clamp(8rem, 25vw, 25rem)',
          fontWeight: 800,
          color: 'rgba(0,0,0,0.03)', // Fundo cinza super leve preenchendo a letra
          WebkitTextStroke: '2px rgba(0,0,0,0.06)', // Bordas mais densas e visíveis
          letterSpacing: '-0.04em',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        HOJE
      </span>

      {/* Conteúdo principal - ajustado para redução de altura */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-14 lg:px-20">

        {/* Frases — curtain wipe da esquerda, sem rolar */}
        <div className="space-y-3 mb-8">
          {phrases.map((phrase, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block text-xl md:text-2xl font-light text-black/70 leading-snug"
              >
                {phrase}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Clímax: E sigo caminhando */}
        <div className="overflow-hidden mb-6 md:mb-8">
          <motion.span
            initial={{ clipPath: 'inset(-20% 100% -20% 0)' }}
            animate={isInView ? { clipPath: 'inset(-20% 0% -20% 0)' } : {}}
            transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-2xl md:text-3xl lg:text-4xl font-medium text-black leading-tight tracking-tight text-balance"
          >
            E sigo caminhando.
          </motion.span>
        </div>

        {/* Descrição discreta */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-base text-black/50 max-w-lg leading-relaxed mb-10 md:mb-12"
        >
          Com coragem, persistência e resiliência. E, principalmente… com fé na humanidade.
        </motion.p>

        {/* CTAs — alinhados à esquerda, estilo editorial */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-4"
        >
          <a
            href="/palestras"
            className="inline-block border border-black/40 text-black px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-all duration-300 text-center w-full sm:w-auto"
          >
            Conheça minha jornada
          </a>
          <a
            href="/livro"
            className="inline-block bg-black text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-black/80 transition-all duration-300 text-center w-full sm:w-auto"
          >
            Leia meu Livro
          </a>
        </motion.div>

      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════ */

const SobreMim = () => {

  // Section-scoped parallax for hero image
  const heroImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '30%']);

  // Scroll-driven parallax para seção da quote
  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: quoteScroll } = useScroll({
    target: quoteRef,
    offset: ['start end', 'end start'],
  });
  // A imagem desce 15% ao rolar pela seção (efeito parallax suave)
  const quoteImgY = useTransform(quoteScroll, [0, 1], ['-8%', '8%']);
  // Intensidade do gradiente escuro: mais opaco ao centro da seção
  const quoteOverlayOpacity = useTransform(quoteScroll, [0, 0.4, 0.6, 1], [0.2, 0.45, 0.45, 0.2]);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, ease: 'easeOut' }
  };

  const keywords = ["Sentido", "Território", "Força de Realização", "Humanidade", "Foco com Alma"];
  const marqueeItems = [...keywords, ...keywords]; // duplicado para loop contínuo

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <style>{marqueeStyle}</style>
      <NavbarAlt />

      {/* ── HERO ── */}
      <section className="pt-24 md:pt-28 pb-6 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-3 md:space-y-4 w-full"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-[10px] md:text-sm uppercase text-gray-500 font-medium block"
          >
            Empreendedor Social &nbsp;&bull;&nbsp; Palestrante &nbsp;&bull;&nbsp; Escritor
          </motion.span>

          <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-light tracking-tighter text-black leading-none">
            Roberto <span className="font-serif italic font-medium">Pascoal</span>
          </h1>

          {/* Linha decorativa animada */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="w-24 h-px bg-black mx-auto"
          />
        </motion.div>
      </section>

      {/* ── FOTO HERO COM PARALLAX SCROLL ── */}
      <section ref={heroImgRef} className="relative w-full px-4 md:px-8 lg:px-12 mb-0 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.5, ease: "easeOut" }}
          className="relative aspect-[4/3] md:aspect-[16/7] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
        >
          <motion.img
            style={{ y: heroImgY, scale: 1.12 }}
            src="/image/gemini-5.webp"
            alt="Roberto Pascoal"
            className="absolute inset-0 w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* ── KEYWORDS MARQUEE ── */}
      <section className="py-16 overflow-hidden border-y border-gray-100">
        <div className="flex whitespace-nowrap">
          <div className="marquee-track flex shrink-0 gap-16 pr-16">
            {marqueeItems.map((word, i) => (
              <span key={i} className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 font-medium shrink-0">
                {word} <span className="text-gray-200 ml-16">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY 1: ORIGENS (Pinned + Scrub) ── */}
      <OriginsSection />

      {/* ── QUOTE COM PARALLAX SCROLL-DRIVEN ── */}
      <section ref={quoteRef} className="relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Imagem: move com o scroll — parallax suave */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="/image/retrato-1-opt.webp"
            alt="Roberto Pascoal"
            style={{ y: quoteImgY, scale: 1.15 }}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Gradiente: cobre apenas a metade inferior, menos concentrado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/[0.08] via-50% to-transparent pointer-events-none" />

        {/* Overlay de opacidade dinâmica baseada no scroll */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: quoteOverlayOpacity }}
        />

        {/* Conteúdo: texto alinhado à direita */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex justify-end py-24">
          <div className="max-w-md lg:max-w-lg">
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-[2rem] font-sans font-light tracking-tight text-white leading-snug">
                "Tudo o que eu buscava mundo afora… estava mundo adentro. Dentro de mim."
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 text-xs uppercase tracking-[0.3em] text-white/50"
            >
              — Roberto Pascoal
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── STORY 2: OMUNGA — Estilo Video da Home (Pinned + Scrub) ── */}
      <OmungaSection />

      {/* ── STORY 3: PROFUNDIDADE (frases gigantes uma a uma) ── */}
      <DepthSection />

      {/* ── STORY 4: HOJE (full-width foto de fundo) ── */}
      <TodaySection />


      {/* ── ENCERRAMENTO: Stage Final ── */}
      <ClosingSection />

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs uppercase tracking-[0.2em] text-gray-400">
        © {new Date().getFullYear()} Roberto Pascoal — Sobre Mim
      </footer>
    </div>
  );
};

export default SobreMim;
