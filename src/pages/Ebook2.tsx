import React, { useRef, useEffect, useState } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutSection } from "@/components/AboutSection";
import { Instagram, Linkedin, Mail, ShieldCheck, Lock, Star, MessageCircle, ChevronDown, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BlockHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '+=120%', scrub: 1, pin: true, anticipatePin: 1 }
    });
    // Fade out p2, fade in p3
    tl.to(p2Ref.current, { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' });
    tl.fromTo(p3Ref.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '<0.1');
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
        {/* Pergunta 1 â€” aparece imediatamente no load */}
        <div ref={p2Ref} className={wrap}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className={`${base} text-3xl md:text-5xl lg:text-[4.5rem] max-w-5xl`}
          >
            Para onde vocÃª estÃ¡ indo<br /><span className="font-medium italic">com tanta pressa?</span>
          </motion.h1>
        </div>
        {/* Pergunta 2 â€” aparece no scroll */}
        <div ref={p3Ref} className={`${wrap} opacity-0`}>
          <p className={`${base} text-3xl md:text-5xl lg:text-[4.5rem] max-w-5xl`}>
            E o que vocÃª carrega<br /><span className="font-medium italic">escondido na sua mochila?</span>
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

// â”€â”€â”€ QUEM Ã‰ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Reutiliza o AboutSection jÃ¡ existente na Home
const BlockQuemE = () => (
  <div className="border-b border-gray-100">
    <AboutSection />
  </div>
);

// â”€â”€â”€ O LIVRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ideas = [
  { n: "01", title: "VocÃª nÃ£o se perdeu.", sub: "VocÃª se abandonou na pressa." },
  { n: "02", title: "VocÃª nÃ£o precisa de um novo caminho.", sub: "Precisa rever o que carrega." },
  { n: "03", title: "VocÃª nÃ£o precisa estar pronto.", sub: "Precisa parar de fugir." },
  { n: "04", title: "VocÃª nÃ£o precisa de respostas.", sub: "Precisa de coragem para permanecer." },
];

const BlockLivro = () => (
  <section className="bg-white py-24 md:py-32 px-6 lg:px-12 border-b border-gray-100">
    <div className="max-w-3xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
        className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-20 italic"
      >
        "Se vocÃª estÃ¡ procurando respostas rÃ¡pidasâ€¦ este livro pode te frustrar.{" "}
        <span className="text-black not-italic font-light">Mas se vocÃª estÃ¡ cansado de fingir que estÃ¡ tudo bemâ€¦ talvez ele seja para vocÃª."</span>
      </motion.p>

      <div className="flex flex-col">
        {ideas.map((idea, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="py-10 border-b border-gray-100 last:border-0 flex flex-col md:flex-row md:items-start gap-6 md:gap-12"
          >
            <span className="text-5xl md:text-7xl font-light text-gray-100 leading-none shrink-0 select-none md:w-24 text-right hidden md:block">{idea.n}</span>
            <span className="text-2xl font-light text-gray-300 md:hidden">{idea.n}</span>
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-black tracking-tight leading-tight mb-2">{idea.title}</h3>
              <p className="text-lg md:text-xl text-gray-400 font-light">{idea.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// â”€â”€â”€ WHATSAPP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

const BlockDepoimentos = () => (
  <section className="bg-gray-50 py-24 md:py-32 px-4 border-t border-b border-gray-200 overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <span className="text-xs uppercase tracking-widest text-[#25D366] font-semibold mb-6 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Experiência dos Leitores</span>
      <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-20 text-center leading-tight">
        O que estão comentando<br /><span className="font-medium italic">no WhatsApp?</span>
      </h2>
      <div className="w-full relative flex overflow-x-hidden">
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        <motion.div className="flex gap-8 whitespace-nowrap min-w-max pr-8 py-4" animate={{ x: [0, "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 55 }}>
          {[...chats, ...chats].map((chat, idx) => (
            <div key={idx} style={{ padding: '9px' }} className="w-[300px] h-[620px] md:w-[330px] md:h-[650px] shrink-0 bg-[#111] rounded-[3rem] shadow-2xl relative border border-[#222] flex flex-col">
              <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[28%] h-[20px] bg-[#111] rounded-[1rem] z-20 flex items-center justify-end pr-3">
                <div className="w-2 h-2 rounded-full bg-[#222] ring-1 ring-[#333]" />
              </div>
              <div className="flex-1 flex flex-col rounded-[2.4rem] overflow-hidden">
                <div className="bg-[#075E54] pt-9 pb-2 px-3 flex items-center gap-2 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs shrink-0">R</div>
                  <div><span className="text-white text-sm font-semibold block leading-none">Roberto Pascoal</span><span className="text-white/60 text-[10px]">online</span></div>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col justify-end px-3 py-2"
                  style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover', backgroundColor: '#efeae2', backgroundBlendMode: 'multiply' }}>
                  {chat.msgs.map((msg, j) => (
                    <WhatsAppBubble key={j} text={msg.text} time={msg.time} isSender={msg.from === "r"} />
                  ))}
                </div>
                <div className="bg-[#f0f2f5] px-2 py-1.5 flex items-center gap-1.5 shrink-0">
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2 min-w-0">
                    <span className="text-[#8696a0] text-[11px] flex-1">Mensagem</span>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#54656f] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32"/></svg>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#54656f] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
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

// â”€â”€â”€ COMPRA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const InteractiveMockup = () => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });
  const [glare, setGlare] = useState({ x: 30, y: 20 });
  const [hovering, setHovering] = useState(false);
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!bodyRef.current) return;
    const r = bodyRef.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setTilt({ rotX: -((y - r.height / 2) / (r.height / 2)) * 9, rotY: ((x - r.width / 2) / (r.width / 2)) * 12 });
    setGlare({ x: (x / r.width) * 100, y: (y / r.height) * 100 });
  };
  return (
    <a href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D" target="_blank" rel="noopener noreferrer"
      className="relative w-full max-w-[240px] md:max-w-[300px] mx-auto shrink-0 block"
      onMouseMove={onMove} onMouseEnter={() => setHovering(true)} onMouseLeave={() => { setHovering(false); setTilt({ rotX: 0, rotY: 0 }); }}
      style={{ transform: `perspective(900px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${hovering ? 1.03 : 1},${hovering ? 1.03 : 1},1)`, transition: hovering ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out', transformStyle: 'preserve-3d' }}
    >
      <div ref={bodyRef} className="relative bg-[#1a1a1a] rounded-[2rem] shadow-2xl" style={{ padding: '12px' }}>
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#111] ring-[1.5px] ring-[#3a3a3a] z-10" />
        <div className="relative w-full aspect-[3/4] rounded-[1.2rem] overflow-hidden bg-white">
          <img src="/image/capa-do-livro.webp" alt="O Caminho" className="w-full h-full object-contain bg-white" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.28) 0%, transparent 60%)`, transition: hovering ? 'background 0.08s' : 'background 0.4s' }} />
        </div>
      </div>
    </a>
  );
};

const BlockCompra = () => (
  <section className="bg-white py-24 md:py-32 px-6 lg:px-12 border-t border-gray-100">
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
      <InteractiveMockup />
      <div className="flex flex-col gap-8 flex-1 text-center lg:text-left">
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-black tracking-tight leading-tight">
          Este nÃ£o Ã© um livro<br />para te <span className="font-medium italic">consertar.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
          className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
          Ã‰ um livro para te acompanhar enquanto vocÃª se reconstrÃ³i.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.25 }}
          className="flex flex-col items-center lg:items-start gap-1">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">E-book Digital</span>
          <span className="text-5xl md:text-6xl font-light text-black tracking-tight">R$ 29<span className="text-3xl">,99</span></span>
          <span className="text-sm text-gray-400 font-light">Acesso imediato Â· PDF de alta qualidade</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-black text-white px-10 py-4 uppercase text-xs font-bold tracking-[0.25em] hover:bg-black/80 transition-all duration-300 w-full sm:w-auto">
            Garantir Meu E-book
          </a>
          <a href="/sobre-mim"
            className="inline-flex items-center justify-center border border-black/30 text-black px-10 py-4 uppercase text-xs font-semibold tracking-[0.25em] hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto">
            Conhecer o Autor
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2">
          {[
            { icon: <Lock className="w-5 h-5 text-gray-400" strokeWidth={1.5} />, label: "Pagamento", value: "100% Seguro" },
            { icon: <ShieldCheck className="w-5 h-5 text-gray-400" strokeWidth={1.5} />, label: "Garantia", value: "7 Dias Incondicional" },
            { icon: <Star className="w-5 h-5 text-yellow-400" strokeWidth={1.5} fill="currentColor" />, label: "AvaliaÃ§Ã£o", value: "Nota 5 Estrelas" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              {b.icon}
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-widest text-gray-400">{b.label}</span>
                <span className="text-sm font-semibold text-black">{b.value}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// â”€â”€â”€ FAQ â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
    { q: "O E-book estÃ¡ disponÃ­vel em qual formato?", a: "PDF de alta qualidade, compatÃ­vel com qualquer dispositivo: celular, tablet, Kindle ou computador." },
    { q: "Para quem este livro Ã© ideal?", a: "Para pessoas aceleradas, sentindo que a vida estÃ¡ no piloto automÃ¡tico, e que precisam de provocaÃ§Ãµes reais para encontrar clareza." },
    { q: "O livro Ã© longo? Toma muito do meu tempo?", a: "Foi pensado para quem nÃ£o tem tempo. CrÃ´nicas curtas de rÃ¡pida absorÃ§Ã£o, mas com alta profundidade." },
    { q: "Ã‰ mais um livro de autoajuda?", a: "NÃ£o. Sem mÃ©todo, sem promessa em 10 passos, sem hacks. SÃ£o vivÃªncias reais tiradas na lama e nas montanhas." },
    { q: "Tenho alguma garantia na compra?", a: "Sim. 7 dias de garantia incondicional pela Hotmart. O risco Ã© zero." },
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
    <section ref={containerRef} className="bg-white py-24 md:py-32 px-6 lg:px-12 border-t border-gray-100 relative">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        <div ref={titleBoxRef} className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-4 leading-[1.1]">Perguntas<br /><span className="font-medium italic">Frequentes</span></h2>
          <p className="text-gray-500 font-light text-lg">Para que vocÃª inicie essa leitura com total tranquilidade.</p>
        </div>
        <div ref={listRef} className="w-full md:w-2/3 space-y-0">
          {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
};

// â”€â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Footer = () => (
  <footer className="py-6 px-6 border-t border-gray-100 flex flex-col items-center gap-3 bg-white">
    <div className="flex items-center gap-3">
      <a href="https://www.instagram.com/roberto_pascoal/" target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-black transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
      <a href="https://www.linkedin.com/in/roberto-pascoal/" target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-black transition-colors"><Linkedin size={18} strokeWidth={1.5} /></a>
      <a href="https://www.facebook.com/roberto.pascoal.9" target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-black transition-colors"><FacebookIcon className="w-[18px] h-[18px]" /></a>
      <a href="mailto:atendimento@dazprodutora.com.br" className="p-2.5 text-gray-400 hover:text-black transition-colors"><Mail size={18} strokeWidth={1.5} /></a>
    </div>
    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Â© {new Date().getFullYear()} Roberto Pascoal â€” E-book</p>
  </footer>
);

// â”€â”€â”€ PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Ebook2() {
  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white bg-white">
      <NavbarAlt />
      <BlockHero />
      <BlockQuemE />
      <BlockLivro />
      <BlockDepoimentos />
      <BlockCompra />
      <BlockFAQ />
      <Footer />
    </div>
  );
}
