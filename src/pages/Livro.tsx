import React, { useRef, useEffect, useState } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Mail, ShieldCheck, Lock, Star, MessageCircle, ChevronDown, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// ─── UTILS ────────────────────────────────────────────────────────────────────

// ─── HERO ───────────────────────────────────────────────────────────────────
const BlockHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '+=120%', scrub: 1, pin: true, anticipatePin: 1 }
    });
    // Fade out p2 COMPLETAMENTE antes do p3 aparecer
    tl.to(p2Ref.current, { opacity: 0, y: -40, duration: 0.5, ease: 'power2.inOut' });
    tl.fromTo(p3Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.2');
    tl.to({}, { duration: 0.8 });
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const wrap = "absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none";
  const base = "font-light text-white leading-[1.15] tracking-tight drop-shadow-lg";

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-black flex items-center justify-center">
      <video src="/video/Drone monte Roraima.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 w-full h-full">
        {/* Pergunta 1 — aparece imediatamente no load */}
        <div ref={p2Ref} className={wrap}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className={`${base} text-3xl md:text-5xl lg:text-[4.5rem] max-w-5xl`}
          >
            Para onde você está indo<br /><span className="font-medium italic">com tanta pressa?</span>
          </motion.h1>
        </div>
        {/* Pergunta 2 — aparece no scroll */}
        <div ref={p3Ref} className={`${wrap} opacity-0`}>
          <p className={`${base} text-3xl md:text-5xl lg:text-[4.5rem] max-w-5xl`}>
            E o que você carrega<br /><span className="font-medium italic">na sua mochila?</span>
          </p>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <motion.div className="w-full h-1/2 bg-white" animate={{ y: [0, 80] }} transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }} />
        </div>
        <span className="text-[9px] uppercase tracking-[0.25em] text-white">Deslize</span>
      </div>
    </section>
  );
};

// ─── UM CONSELHO ────────────────────────────────────────────────────────────
const PolaroidsBackground = ({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const y5 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y6 = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const leftImages = [
    { src: '/image/roberto-pascoal-explorador.webp', alt: 'Explorador', w: 'w-40 lg:w-56', r: '-rotate-6', t: 'top-[10%]', l: 'left-[2%] lg:left-[5%]', y: y1 },
    { src: '/image/roberto-pascoal-comunidade-isolada.webp', alt: 'Comunidade', w: 'w-48 lg:w-64', r: 'rotate-3', t: 'top-[45%]', l: '-left-[2%] lg:left-[2%]', y: y2 },
    { src: '/image/roberto-pascoal-hero-montanha.webp', alt: 'Montanha', w: 'w-44 lg:w-60', r: '-rotate-2', t: 'top-[75%]', l: 'left-[4%] lg:left-[8%]', y: y3 },
  ];
  
  const rightImages = [
    { src: '/image/roberto-pascoal-caminhada-brasil.webp', alt: 'Caminhada', w: 'w-48 lg:w-64', r: 'rotate-6', t: 'top-[15%]', rPos: 'right-[2%] lg:right-[5%]', y: y4 },
    { src: '/image/roberto-pascoal-projetos-africa.webp', alt: 'África', w: 'w-40 lg:w-56', r: '-rotate-3', t: 'top-[50%]', rPos: 'right-[4%] lg:right-[8%]', y: y5 },
    { src: '/image/roberto-pascoal-leitura-indigena.webp', alt: 'Leitura', w: 'w-48 lg:w-60', r: 'rotate-2', t: 'top-[80%]', rPos: 'right-[1%] lg:right-[3%]', y: y6 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block overflow-hidden">
      {leftImages.map((img, i) => (
        <motion.div key={`l-${i}`} style={{ y: img.y }} className={`absolute ${img.w} aspect-[3/4] ${img.t} ${img.l} ${img.r} p-3 bg-white shadow-xl rounded-sm`}>
           <img src={img.src} alt={img.alt} className="w-full h-full object-cover grayscale opacity-50" />
        </motion.div>
      ))}
      {rightImages.map((img, i) => (
        <motion.div key={`r-${i}`} style={{ y: img.y }} className={`absolute ${img.w} aspect-[3/4] ${img.t} ${img.rPos} ${img.r} p-3 bg-white shadow-xl rounded-sm`}>
           <img src={img.src} alt={img.alt} className="w-full h-full object-cover grayscale opacity-50" />
        </motion.div>
      ))}
    </div>
  );
};

const BlockConselho = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative bg-gray-50 w-full flex flex-col justify-center py-40 md:py-56 border-b border-gray-100 overflow-hidden">
      
      <PolaroidsBackground containerRef={containerRef} />
      
      {/* Container natural scroll */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-32 md:gap-48 px-6 lg:px-12 w-full pointer-events-none">
        
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-sans text-xl md:text-3xl leading-[1.6] font-light max-w-2xl text-center text-black pointer-events-auto"
        >
          Talvez o que te cansa não seja o caminho…<br />
          mas a pressa e o peso do que você insiste em <span className="font-semibold italic">carregar</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-sans text-xl md:text-3xl leading-[1.6] font-light max-w-2xl text-center text-black pointer-events-auto"
        >
          Talvez você tenha <span className="font-semibold italic">dúvidas, dívidas e medos.</span><br />
          E, mesmo assim… precise seguir em frente.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-sans text-2xl md:text-4xl leading-[1.6] font-light max-w-2xl text-center text-black pointer-events-auto"
        >
          Nunca pronto ou pronta.<br />
          <span className="font-medium italic">Mas sempre suficiente.</span>
        </motion.p>
        
      </div>
    </section>
  );
};

// ─── APRESENTACAO AUTOR ──────────────────────────────────────────────────────
const BlockAutor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="pt-16 md:pt-24 pb-12 px-6 lg:px-12 bg-white relative overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10 w-full">
        
        {/* Photo Container with Parallax Effect */}
        <div className="w-full md:w-[70%] lg:w-[40%] aspect-[4/5] relative overflow-hidden rounded-xl shadow-2xl mx-auto shrink-0">
          <motion.img 
            style={{ y: y1 }}
            src="/image/Roberto-rio.webp" 
            alt="Roberto Pascoal" 
            className="absolute inset-0 w-full h-[130%] object-cover object-center -top-[15%]"
          />
        </div>
        
        {/* Text Presentation Box */}
        <div className="w-full lg:flex-1 flex flex-col justify-center space-y-10">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl lg:text-[2.25rem] font-light tracking-[0.5px] leading-[1.7] text-black"
          >
            Prazer, eu sou Roberto Pascoal.<br />
            Ainda não cheguei lá.<br />
            Mas continuo indo.<br />
            Consciente da minha incompletude,<br /> mas com coragem e determinação para seguir.
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-black origin-left" 
          />

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl lg:text-[2rem] font-light text-gray-700 leading-[1.7] max-w-xl"
          >
            Este e-book não é uma cura rápida.<br />
            É uma jornada.<br />
            E você é meu convidado para caminhar comigo por essas páginas.
          </motion.p>
        </div>

      </div>
    </section>
  );
};

// ─── O QUE TEM NO E-BOOK ─────────────────────────────────────────────────────
const StackedCarousel = () => {
  const images = [
    "/image/africa-max-schwoelk.webp",
    "/image/roberto-pascoal-explorador.webp",
    "/image/roberto-pascoal-caminhada-brasil.webp",
    "/image/roberto-pascoal-projetos-africa.webp"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // Troca a cada 4 segundos
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[450px] md:h-[600px] lg:h-[85vh] max-h-[850px] flex items-center justify-center lg:justify-end overflow-visible">
      <div className="absolute inset-0 z-40 cursor-pointer" onClick={nextSlide} /> {/* Click layer */}
      {images.map((src, i) => {
        let diff = (i - currentIndex) % images.length;
        if (diff < 0) diff += images.length;

        let xOffset = 0;
        let scale = 1;
        let zIndex = 30;
        let opacity = 1;

        if (diff === 0) {
          xOffset = 0;
          scale = 1;
          zIndex = 30;
          opacity = 1;
        } else if (diff === 1) {
          xOffset = 35; // 35% right
          scale = 0.85;
          zIndex = 20;
          opacity = 0.85;
        } else if (diff === 2) {
          xOffset = 70; // 70% right
          scale = 0.7;
          zIndex = 10;
          opacity = 0.5;
        } else {
          xOffset = 105;
          scale = 0.5;
          zIndex = 0;
          opacity = 0;
        }

        return (
          <motion.div
            key={i}
            className="absolute left-0 lg:left-auto lg:right-[40%] h-[80%] lg:h-[95%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            initial={false}
            animate={{ 
              x: `${xOffset}%`, 
              scale, 
              zIndex, 
              opacity 
            }}
            transition={{ duration: 0.6, ease: [0.16, 0.72, 0, 1] }}
          >
            <img src={src} alt="Jornada" className="w-full h-full object-cover" />
          </motion.div>
        );
      })}
    </div>
  );
};

const BlockEbookConteudo = () => {
  return (
    <section className="bg-white pt-8 md:pt-12 pb-16 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Column: Texts */}
        <div className="w-full lg:w-[45%] flex flex-col space-y-10 z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-[2.5rem] font-light text-black tracking-tight leading-tight"
          >
            O que você encontrará<br/>
            neste e-book: <span className="font-medium italic">Uma jornada.</span>
          </motion.h2>

          <div className="flex flex-col space-y-6 text-base md:text-xl lg:text-[1.35rem] font-light text-gray-700 leading-[1.6]">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: 0.1 }}>
              Da infância sensível<br/>
              à vida corporativa marcada pela autoafirmação.
            </motion.p>
            
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: 0.2 }}>
              Que passa por peregrinações, aventuras<br/>
              e vivências em regiões vulneráveis da África e do Brasil profundo.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: 0.3 }}>
              Um encontro que se torna espelho,<br/>
              onde quedas e quebras fortalecem e criam mais sentido.
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.6, delay: 0.4 }} className="font-medium text-black italic">
              E a certeza de que o melhor caminho<br/>
              é continuar caminhando…<br/>
              mesmo quando tudo volta a ser testado.
            </motion.p>
          </div>
        </div>

        {/* Right Column: Carousel */}
        <div className="w-full lg:w-[55%]">
          <StackedCarousel />
        </div>

      </div>
    </section>
  );
};

// ─── DEPOIMENTOS ────────────────────────────────────────────────────────────
const WhatsAppBubble = ({ text, time, isSender }: { text: string; time: string; isSender: boolean }) => (
  <div className={`flex mb-4 w-full flex-col ${isSender ? "items-end" : "items-start"}`}>
    <div className={`${isSender ? "bg-[#E7FFDB] rounded-xl rounded-tr-sm" : "bg-white rounded-xl rounded-tl-sm"} px-3 py-2 max-w-[85%] relative shadow-[0_1px_1px_rgba(0,0,0,0.1)]`}>
      <p className="text-[14px] leading-[1.3] font-normal mb-1 pb-3 whitespace-pre-wrap text-left text-[#111B21]">{text}</p>
      <div className="w-full flex justify-end items-center absolute bottom-1 right-2 gap-1">
        <span className="text-[#667781] text-[10px] tabular-nums">{time}</span>
        {isSender && (
          <svg viewBox="0 0 16 15" width="16" height="15" className="fill-[#53bdeb]"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" /></svg>
        )}
      </div>
    </div>
  </div>
);

const chats = [
  { msgs: [
    { from: "r", text: "Oi, Ana! Queria saber o que você achou da leitura 😊", time: "09:41" },
    { from: "c", text: "Olá, bom dia! Gostei muito do livro! É muito inspirador. A narrativa me prendeu do início ao fim.\n\nMe provocou reflexões sobre como conduzo minha vida — e acho que estou no caminho certo! Parabéns, Roberto! Que Deus continue iluminando o seu caminho 🙏", time: "09:43" },
    { from: "r", text: "Fico muito feliz em saber! Isso me aquece o coração 🙏", time: "09:45" },
  ]},
  { msgs: [
    { from: "r", text: "Marcelo! Passando para saber o que achou do e-book.", time: "14:10" },
    { from: "c", text: "'O Caminho Depois da Pressa' é um convite genuíno a repensar o ritmo acelerado com que temos vivido e a importância de nos reconectarmos com o aqui e o agora.\n\nUma leitura sensível, inspiradora e que vale muito a pena.", time: "14:15" },
    { from: "r", text: "Muito obrigado, Marcelo. Isso significa muito pra mim 🙏", time: "14:17" },
  ]},
  { msgs: [
    { from: "r", text: "Clécio! E aí, como está sendo a leitura?", time: "10:01" },
    { from: "c", text: "Cara, lendo a tua história de vida no livro... Incrível e inspiradora. Me vejo muito em várias partes. Muito especial essa tua vivência. Admirável.", time: "10:03" },
    { from: "c", text: "Frase forte. Inspiradora. Parabéns, cara.", time: "10:04" },
    { from: "r", text: "Cara, que mensagem linda. Obrigado de verdade 🙏", time: "10:06" },
  ]},
  { msgs: [
    { from: "r", text: "Oi! Já conseguiu dar uma olhada no livro?", time: "19:30" },
    { from: "c", text: "Cara, que livro necessário. Quantas coisas que eu já tinha em mente de forma abstrata estão ganhando consciência.", time: "19:32" },
    { from: "c", text: "Do que já li, duas coisas me marcaram. Acho que tive uma infância muito parecida com a sua, com menos acesso, em Manaus. Meus pais se separaram e eu me culpei muito por isso.", time: "19:33" },
    { from: "c", text: "Quando você percebe que a vida corporativa acelerada não é para você e que viver com propósito é o que te move... me reconheci naquelas palavras.", time: "19:35" },
  ]},
  { msgs: [
    { from: "r", text: "Oi! Soube que terminou o livro. O que achou? 😊", time: "21:05" },
    { from: "c", text: "Acabei de ler. 😉 Conheci o Beto da ETT, o Beto da rádio, o Beto das camisetas para as bibliotecas no sertão, o Beto da Omunga. São muitos Betos nesse caminho.", time: "21:08" },
    { from: "c", text: "A beleza de mostrar as suas vulnerabilidades... Somos todos vulneráveis. Poucos falam das suas quedas. Como é maravilhoso sermos verdadeiros. Somos humanos, em constante evolução: essa é a beleza da vida.", time: "21:09" },
    { from: "r", text: "Que palavras bonitas. Obrigado por isso 🙏", time: "21:11" },
  ]},
];

const BlockDepoimentos = () => {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t, delta) => {
    if (isDragging) return;
    
    // Velocidade do scroll (pixels por frame)
    // -1.0 é uma velocidade média agradável
    const moveBy = -1.2; 
    const currentX = x.get();
    let newX = currentX + moveBy;

    // Reset para loop infinito
    if (marqueeRef.current) {
      const halfWidth = marqueeRef.current.offsetWidth / 2;
      if (newX <= -halfWidth) {
        newX = 0;
      } else if (newX > 0) {
        newX = -halfWidth;
      }
    }
    
    x.set(newX);
  });

  return (
    <section className="bg-white pt-4 md:pt-8 pb-12 md:pb-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest text-[#25D366] font-semibold mb-6 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Experiência dos Leitores</span>
        <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-20 text-center leading-tight">
          O que estão comentando<br /><span className="font-medium italic">no WhatsApp?</span>
        </h2>
        <div className="w-full relative flex overflow-x-hidden">
          <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-40 pointer-events-none" />
          
          <motion.div 
            ref={marqueeRef}
            className="flex gap-8 whitespace-nowrap min-w-max pr-8 py-4 cursor-grab active:cursor-grabbing" 
            style={{ x, willChange: "transform" }}
            drag="x"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false);
              // Pequeno ajuste para garantir que o loop continue suave
              if (marqueeRef.current) {
                const halfWidth = marqueeRef.current.offsetWidth / 2;
                let currentX = x.get();
                if (currentX <= -halfWidth) x.set(currentX + halfWidth);
                if (currentX > 0) x.set(currentX - halfWidth);
              }
            }}
          >
            {[...chats, ...chats].map((chat, idx) => (
              <div key={idx} style={{ padding: '9px' }} className="w-[300px] h-[620px] md:w-[330px] md:h-[650px] shrink-0 bg-[#111] rounded-[3rem] shadow-2xl relative border border-[#222] flex flex-col pointer-events-none select-none">
                <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[28%] h-[20px] bg-[#111] rounded-[1rem] z-20 flex items-center justify-end pr-3">
                  <div className="w-2 h-2 rounded-full bg-[#222] ring-1 ring-[#333]" />
                </div>
                <div className="flex-1 flex flex-col rounded-[2.4rem] overflow-hidden relative">
                  <div className="flex-1 overflow-hidden relative bg-[#efeae2]">
                    <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover' }} />
                    <div className="absolute inset-0 flex flex-col justify-end px-3 py-2 z-10">
                      {chat.msgs.map((msg, j) => (
                        <WhatsAppBubble key={j} text={msg.text} time={msg.time} isSender={msg.from === "r"} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#f0f2f5] px-3 pb-3 pt-2 flex items-center gap-2 relative z-20">
                    <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2 min-w-0 shadow-sm">
                      <span className="text-[#8696a0] text-[12px] flex-1">Mensagem</span>
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#54656f] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32"/></svg>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-md">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── VENDA (BLOCK 05) ────────────────────────────────────────────────────────
const InteractiveTabletMockup = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });
  const [glare, setGlare] = useState({ x: 30, y: 20 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!bodyRef.current) return;
    const rect = bodyRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({ rotX: -((y - cy) / cy) * 10, rotY: ((x - cx) / cx) * 14 });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <a href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D" target="_blank" rel="noopener noreferrer"
      className="relative w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] mx-auto shrink-0 block mb-12 md:mb-0"
      onMouseMove={handleMouseMove} onMouseEnter={() => setHovering(true)} onMouseLeave={() => { setHovering(false); setTilt({ rotX: 0, rotY: 0 }); setGlare({ x: 30, y: 20 }); }}
      style={{ transform: `perspective(900px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${hovering ? 1.03 : 1}, ${hovering ? 1.03 : 1}, 1)`, transition: hovering ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out', transformStyle: 'preserve-3d' }}
    >
      <div ref={bodyRef} className="relative bg-[#1a1a1a] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl" style={{ padding: '14px 12px 14px 12px' }}>
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#111] ring-[1.5px] ring-[#3a3a3a] z-10" />
        <div className="relative w-full aspect-[3/4] rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-white">
          <img src="/image/capa-do-livro.webp" alt="O Caminho" className="w-full h-full object-contain bg-white" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`, transition: hovering ? 'background 0.08s ease' : 'background 0.4s ease' }} />
        </div>
      </div>
    </a>
  );
};

const BlockVenda = () => {
  return (
    <section className="bg-white pt-12 md:pt-16 pb-20 md:pb-24 w-full px-6 lg:px-12 flex items-center justify-center overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24 h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px]"
        >
          <InteractiveTabletMockup />
        </motion.div>
        
        <div className="flex-1 space-y-6 text-center md:text-left flex flex-col justify-center">
          <div className="space-y-1 mb-6">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="pb-3"
              >
                <span className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]">
                  Um convite para observar a
                </span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="pb-3"
              >
                <span className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]">
                  própria <span className="font-medium italic">mochila</span>,
                </span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="pb-3"
              >
                <span className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]">
                  dar <span className="font-medium italic">sentido</span> ao que pesa e
                </span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="pb-3"
              >
                <span className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]">
                  continuar o <span className="font-medium italic">caminho</span>
                </span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                className="pb-3"
              >
                <span className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]">
                  com mais <span className="font-medium italic">presença.</span>
                </span>
              </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="pt-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6">
              <a href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D" target="_blank" rel="noopener noreferrer"
                 className="inline-flex flex-col md:flex-row items-center justify-center bg-[#F04E23] text-white px-12 py-5 uppercase text-xs md:text-sm tracking-[0.2em] md:tracking-[0.25em] font-bold hover:bg-[#d6431e] hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#F04E23]/30 transition-all duration-300 rounded-[8px] gap-3">
                <Flame className="w-5 h-5 text-white" strokeWidth={2} fill="currentColor" />
                Venha caminhar comigo!
              </a>
              <div className="text-3xl md:text-4xl lg:text-[2.5rem] text-[#F04E23]">
                R$ 29,90
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center md:justify-start gap-8">
               <div className="flex items-center gap-3">
                   <Lock className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                   <div className="flex flex-col text-left">
                       <span className="text-[10px] uppercase tracking-widest text-[#F04E23] font-semibold">Pagamento</span>
                       <span className="text-sm font-semibold text-black">100% Seguro</span>
                   </div>
               </div>
               <div className="w-px h-8 bg-gray-300 hidden md:block" />
               <div className="flex items-center gap-3">
                   <ShieldCheck className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                   <div className="flex flex-col text-left">
                       <span className="text-[10px] uppercase tracking-widest text-[#F04E23] font-semibold">Garantia SSL</span>
                       <span className="text-sm font-semibold text-black">7 Dias Incondicional</span>
                   </div>
               </div>
               <div className="w-px h-8 bg-gray-300 hidden md:block" />
               <div className="flex items-center gap-3">
                   <Star className="w-6 h-6 text-yellow-500" strokeWidth={1.5} fill="currentColor" />
                   <div className="flex flex-col text-left">
                       <span className="text-[10px] uppercase tracking-widest text-[#F04E23] font-semibold">Avaliação Premium</span>
                       <span className="text-sm font-semibold text-black">Nota 5 Estrelas</span>
                   </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ────────────────────────────────────────────────────────────────────
const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="group border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full text-left py-6 flex items-start justify-between focus:outline-none">
        <span className={`font-medium text-lg pr-8 transition-colors ${open ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>{q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${open ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-400 group-hover:border-black group-hover:text-black'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-8 text-gray-500 font-light leading-relaxed pr-12 text-lg">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BlockFAQ = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const faqs = [
    { q: "O E-book está disponível em qual formato?", a: "O livro digital está no formato PDF de alta qualidade, garantindo fluidez em qualquer dispositivo (Celular, Tablet, Kindle ou Computador)." },
    { q: "Para quem este livro é ideal?", a: "Para pessoas aceleradas, sentindo que a vida está no piloto automático, e que precisam de provocações reais para encontrar clareza." },
    { q: "O livro é longo? Toma muito do meu tempo?", a: "O e-book foi pensado para quem não tem tempo e foi direto ao ponto. Crônicas curtas e leituras de rápida absorção mas com alta profundidade." },
    { q: "É mais um livro de autoajuda?", a: "Não. Não ensino nenhum tipo de método, promessa em 10 passos ou hacks de produtividade. São vivências reais tiradas na lama e nas montanhas, apenas experiências." },
    { q: "Tenho alguma garantia na compra?", a: "Sim, absolutamente. 7 dias de garantia incondicional assegurada pela Hotmart. O risco é ZERO." }
  ];

  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(titleBoxRef.current, {
        y: () => {
          if (!listRef.current || !titleBoxRef.current) return 0;
          return Math.max(0, listRef.current.offsetHeight - titleBoxRef.current.offsetHeight);
        },
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=120",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white pt-8 md:pt-12 pb-24 md:pb-32 px-6 lg:px-12 relative">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        <div ref={titleBoxRef} className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-4 leading-[1.1]">Perguntas<br /><span className="font-medium italic">Frequentes</span></h2>
          <p className="text-gray-500 font-light text-lg">Para que você inicie essa leitura com total tranquilidade.</p>
        </div>
        <div ref={listRef} className="w-full md:w-2/3 space-y-0">
          {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ─────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-6 px-6 border-t border-gray-100 flex flex-col items-center gap-3 bg-white">
    <div className="flex items-center gap-3">
      <a href="https://www.instagram.com/roberto_pascoal/" target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-black transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
      <a href="https://www.linkedin.com/in/roberto-pascoal/" target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-black transition-colors"><Linkedin size={18} strokeWidth={1.5} /></a>
      <a href="https://www.facebook.com/roberto.pascoal.9" target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-black transition-colors"><FacebookIcon className="w-[18px] h-[18px]" /></a>
      <a href="mailto:atendimento@dazprodutora.com.br" className="p-2.5 text-gray-400 hover:text-black transition-colors"><Mail size={18} strokeWidth={1.5} /></a>
    </div>
    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">© {new Date().getFullYear()} Roberto Pascoal — E-book</p>
  </footer>
);

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function Livro() {
  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white bg-white">
      <NavbarAlt />
      <BlockHero />
      <BlockConselho />
      <BlockAutor />
      <BlockEbookConteudo />
      <BlockDepoimentos />
      <BlockVenda />
      <BlockFAQ />
      <Footer />
    </div>
  );
}
