import React, { useRef, useEffect, useState } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Mail, Compass, Eye, Map, Sparkles, ChevronDown, ShieldCheck, Lock, Flame, Star, MessageCircle, ArrowRight, BookOpen, ChevronRight, PlayCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => (
  <footer className="py-6 px-6 border-t border-gray-100 flex flex-col items-center gap-3 bg-white">
    <div className="flex items-center gap-3">
      <a href="https://www.instagram.com/roberto_pascoal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 text-gray-400 hover:text-black transition-colors hover:scale-110 duration-200"><Instagram size={18} strokeWidth={1.5} /></a>
      <a href="https://www.linkedin.com/in/roberto-pascoal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 text-gray-400 hover:text-black transition-colors hover:scale-110 duration-200"><Linkedin size={18} strokeWidth={1.5} /></a>
      <a href="https://www.facebook.com/roberto.pascoal.9" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2.5 text-gray-400 hover:text-black transition-colors hover:scale-110 duration-200"><FacebookIcon className="w-[18px] h-[18px]" /></a>
      <a href="mailto:atendimento@dazprodutora.com.br" aria-label="E-mail" className="p-2.5 text-gray-400 hover:text-black transition-colors hover:scale-110 duration-200"><Mail size={18} strokeWidth={1.5} /></a>
    </div>
    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">© {new Date().getFullYear()} Roberto Pascoal — E-book</p>
  </footer>
);

// --- BLOCO 01: Hero Intro (Animado com Scroll Pin como solicitado!) ---
const Block01 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    const dur = 0.8;
    
    // First Phrase
    tl.fromTo(p1Ref.current, { opacity: 1, y: 0 }, { opacity: 0, y: -40, duration: dur, ease: 'power2.in' });
    
    // Second Phrase 
    tl.fromTo(p2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '-=0.2');

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={containerRef} className="bg-white relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden border-b border-gray-100">
      
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-12 text-center pointer-events-none">
        
        {/* Título Invisível inicial (P1) */}
        <div ref={p1Ref} className="absolute inset-0 flex flex-col items-center justify-center max-w-4xl mx-auto">
           <h1 className="text-4xl md:text-6xl lg:text-[4.75rem] font-light tracking-tight text-black leading-[1.15] text-balance">
             Para onde você está indo com <span className="font-medium italic">tanta pressa?</span>
           </h1>
        </div>

        {/* Frase 2 (P2) */}
        <div ref={p2Ref} className="absolute inset-0 flex flex-col items-center justify-center max-w-4xl mx-auto opacity-0">
           <span className="text-4xl md:text-6xl lg:text-[4.75rem] font-light tracking-tight text-black leading-[1.15] text-balance">
             E o que você carrega escondido<br/> <span className="font-medium italic">na sua mochila?</span>
           </span>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
         <span className="text-xs uppercase tracking-widest text-black font-medium">Role para baixo</span>
         <div className="w-[1px] h-12 bg-black overflow-hidden relative">
            <motion.div className="w-full h-1/2 bg-white" animate={{ y: [0, 80] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
         </div>
      </div>
    </section>
  );
};

// --- BLOCO CARROSSEL ---
const BlockCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const originalImages = [
        "/image/pascoal-criancas.webp",
        "/image/gemini-3.webp",
        "/image/roberto-pascoal-criancas-sala.webp"
    ];
    const images = [...originalImages, ...originalImages];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <section className="relative w-full h-[100vh] bg-white overflow-hidden flex flex-col items-center justify-center border-b border-gray-100">
             <div className="relative w-full h-full flex items-center justify-center max-w-[1600px] mx-auto">
                {images.map((img, i) => {
                    let diff = (i - currentIndex) % images.length;
                    if (diff > images.length / 2) diff -= images.length;
                    if (diff < -images.length / 2) diff += images.length;

                    let position = "hidden";
                    if (diff === 0) position = "center";
                    else if (diff === -1) position = "left";
                    else if (diff === 1) position = "right";

                    const variants = {
                        center: { x: "0%", scale: 1, opacity: 1, zIndex: 30, filter: "blur(0px)" },
                        left: { x: "-55%", scale: 0.8, opacity: 0.6, zIndex: 20, filter: "blur(4px)" },
                        right: { x: "55%", scale: 0.8, opacity: 0.6, zIndex: 20, filter: "blur(4px)" },
                        hidden: { x: diff > 0 ? "80%" : "-80%", scale: 0.6, opacity: 0, zIndex: 10, filter: "blur(8px)" }
                    };

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-[85%] md:w-[65%] lg:w-[50%] aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                            initial={false}
                            animate={position}
                            variants={variants}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => {
                                if (position === "left") prev();
                                else if (position === "right") next();
                            }}
                        >
                            <img src={img} className="w-full h-full object-cover select-none pointer-events-none" draggable={false} alt="Carrossel Pascoal" />
                            <div className="absolute inset-0 bg-white/20 transition-opacity duration-500 pointer-events-none" style={{ opacity: diff === 0 ? 0 : 1 }} />
                        </motion.div>
                    );
                })}
             </div>

             <div className="absolute bottom-8 flex flex-col items-center gap-4 z-40">
                 <div className="flex items-center justify-center gap-6">
                     <button onClick={prev} className="p-2 text-gray-300 hover:text-black transition-colors" aria-label="Previous">
                         <ChevronRight className="w-5 h-5 rotate-180" strokeWidth={1.5} />
                     </button>
                     <div className="flex gap-2">
                         {originalImages.map((_, i) => (
                             <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === (currentIndex % originalImages.length) ? "w-6 bg-black" : "w-1.5 bg-gray-300"}`} />
                         ))}
                     </div>
                     <button onClick={next} className="p-2 text-gray-300 hover:text-black transition-colors" aria-label="Next">
                         <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                     </button>
                 </div>
             </div>
        </section>
    );
};

// --- BLOCO 02: Identificação ---
const Block02 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const imgBoxRef = useRef<HTMLDivElement>(null);

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

    // Animação Clip-Path simulando a página Sobre-Mim
    tl.fromTo(imgBoxRef.current, 
      { clipPath: 'inset(100% 0 0 0)', scale: 1.05 },
      { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.5, ease: 'power2.out' }
    );

    tl.fromTo(p1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=1");
    tl.to({}, { duration: 0.3 });
    tl.fromTo(p2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
    tl.to({}, { duration: 0.5 });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={containerRef} className="bg-white w-full h-[100vh] flex items-center justify-center overflow-hidden px-4 md:px-6 lg:px-12">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 h-full">
        
        {/* Nova imagem vertical */}
        <div className="w-full md:w-1/2 max-w-[420px] aspect-[4/5] relative overflow-hidden shrink-0 mt-8 md:mt-0 rounded-2xl">
          <div ref={imgBoxRef} className="absolute inset-0 w-full h-full">
            <img src="/image/Foto-catedral.jpg" alt="Roberto Vertical" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col justify-center gap-10">
          <div ref={p1Ref} className="opacity-0">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2] tracking-tight text-balance">
              Um e-book para quem continua caminhando, mesmo com medos e dúvidas.
            </h2>
          </div>
          <div ref={p2Ref} className="opacity-0">
            <p className="text-2xl md:text-3xl text-black font-semibold leading-[1.3] tracking-tight">
              Com coragem suficiente para não parar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- BLOCO 03: Posicionamento (Drone Background) ---
const Block03 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top top', end: '+=200%', scrub: 1, pin: true, anticipatePin: 1 } });
    const dur = 0.8; const hold = 0.4; const fadeOut = 0.4;

    tl.fromTo(p1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' });
    tl.to({}, { duration: hold });
    tl.to(p1Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });
    
    tl.fromTo(p2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold });
    tl.to(p2Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });

    tl.fromTo(p3Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold });
    tl.to(p3Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });

    tl.fromTo(p4Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold * 1.5 });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const phraseClass = "absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 pointer-events-none";
  const textClass = "text-3xl md:text-5xl lg:text-[4rem] font-light text-white leading-[1.2] max-w-4xl tracking-tight text-balance shadow-black/50 drop-shadow-lg";

  return (
    <section ref={containerRef} className="relative bg-[#0a0a0a] w-full h-[100vh] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video src="/video/Drone monte Roraima.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 w-full h-full">
        <div ref={p1Ref} className={phraseClass}><span className={textClass}>Este não é um e-book de<br/> <span className="font-medium italic">quem chegou lá.</span></span></div>
        <div ref={p2Ref} className={phraseClass}><span className={textClass}>É para quem busca<br/> <span className="font-medium italic text-gray-300">mais sentido, mais clareza…</span></span></div>
        <div ref={p3Ref} className={phraseClass}><span className={textClass}>e encontra em si<br/> coragem para se ouvir.</span></div>
        <div ref={p4Ref} className={phraseClass}><span className={textClass}>Para quem se escolhe…<br/> e <span className="font-medium">continua caminhando.</span></span></div>
      </div>

      {/* Scroll indicator Bottom Right */}
      <div className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-2 opacity-60">
         <span className="text-[10px] uppercase tracking-widest text-white font-medium" style={{ writingMode: 'vertical-rl' }}>Deslize</span>
         <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative mt-2">
            <motion.div className="w-full h-1/2 bg-white" animate={{ y: [0, 80] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
         </div>
      </div>
    </section>
  );
};

// --- BLOCO 04: Proposta (Grid) ---
const Block04 = () => {
  const items = [
    { icon: <Map className="w-8 h-8 md:w-10 md:h-10 text-gray-800 stroke-[1.5]" />, text: "Refletir sobre o que \nrealmente está carregando." },
    { icon: <Eye className="w-8 h-8 md:w-10 md:h-10 text-gray-800 stroke-[1.5]" />, text: "Entender por que a pressa \nte afasta do que importa." },
    { icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-gray-800 stroke-[1.5]" />, text: "Encontrar mais clareza \npara seguir com o que já tem." },
    { icon: <Compass className="w-8 h-8 md:w-10 md:h-10 text-gray-800 stroke-[1.5]" />, text: "Perceber que não precisa \nestar pronto para continuar." }
  ];

  return (
    <section className="bg-white py-16 md:py-20 px-6 lg:px-12 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto flex flex-col relative z-10 w-full justify-center">
        <motion.div 
          className="w-full mb-12 lg:mb-16 flex flex-col items-start lg:items-center text-left lg:text-center mt-8"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight text-black">
            Que tal uma caminhada para...
          </h2>
        </motion.div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mt-4">
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col text-left group"
              initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.15, type: 'spring', stiffness: 100 }}
            >
              <div className="mb-6 w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-lg md:text-xl text-gray-600 leading-snug font-light whitespace-pre-line">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Interactive Mockup Component 
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
  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => { setHovering(false); setTilt({ rotX: 0, rotY: 0 }); setGlare({ x: 30, y: 20 }); };

  return (
    <a href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D" target="_blank" rel="noopener noreferrer"
      className="relative w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] mx-auto shrink-0 block mb-12 md:mb-0"
      onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
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


// ============================================
// CONVERSION BLOCKS (V3)
// ============================================

const BlockSumario = () => {
    const chapters = [
        "A Ilusão do Chegar Lá: Entendendo por que corremos tanto",
        "O Peso da Mochila: Medos, dores e traumas refletidos no corpo",
        "Retratos do Caminho: Histórias reais na África e em Santiago",
        "A Coragem Escondida: Provocações para se ouvir intimamente",
        "Nesta Estrada não tem Fórmula: Como seguir sem estar pronto"
    ];

    return (
        <section className="bg-white py-20 px-6 lg:px-12">
            <div className="max-w-4xl mx-auto flex flex-col items-start lg:items-center">
                <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-16 text-left lg:text-center leading-tight">
                    Um breve olhar <br/> <span className="font-medium italic">o que vai encontrar</span>
                </h2>
                <div className="w-full flex flex-col">
                    {chapters.map((cap, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                            className="py-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors duration-300 md:px-4"
                        >
                            <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-full bg-black text-white relative shadow-md">
                                <span className="text-[8px] uppercase tracking-[0.2em] font-semibold text-white/70 absolute top-2.5">Cap</span>
                                <span className="text-2xl font-light mt-1.5 leading-none">0{i+1}</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-light tracking-tight text-black leading-snug">{cap}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Mockup CSS Realistic WhatsApp Balloon
const WhatsAppBubble = ({ text, time, isSender }: { text: string, time: string, isSender: boolean }) => {
    const bubbleColor = isSender ? 'bg-[#E7FFDB]' : 'bg-white';
    const alignClass = isSender ? 'items-end' : 'items-start';
    const borderRadius = isSender ? 'rounded-xl rounded-tr-sm' : 'rounded-xl rounded-tl-sm';
    const textColor = '#111B21';

    return (
        <div className={`flex mb-4 w-full flex-col ${alignClass}`}>
            <div className={`${bubbleColor} text-[${textColor}] px-3 py-2 ${borderRadius} max-w-[85%] relative shadow-[0_1px_1px_rgba(0,0,0,0.1)]`}>
                
                {/* Seta do balao whatsapp CSS */}
                {isSender ? (
                   <div className={`absolute top-0 -right-2 w-0 h-0 border-[10px] border-transparent border-t-[#E7FFDB] border-l-[#E7FFDB]`} style={{ borderTopWidth: '0px' }}></div>
                ) : (
                   <div className={`absolute top-0 -left-2 w-0 h-0 border-[10px] border-transparent border-t-white border-r-white`} style={{ borderTopWidth: '0px' }}></div>
                )}
                
                <p className="text-[14px] leading-[1.3] font-normal mb-1 pb-3 whitespace-pre-wrap text-left">
                    {text}
                </p>
                <div className="w-full flex justify-end items-center absolute bottom-1 right-2 gap-1">
                    <span className="text-[#667781] text-[10px] tabular-nums">{time}</span>
                    {isSender && (
                        <svg viewBox="0 0 16 15" width="16" height="15" className="fill-[#53bdeb]"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path></svg>
                    )}
                </div>
            </div>
        </div>
    );
};

const BlockDepoimentos = () => {
    const prints = [
        { sender: "E aí, o que achou da leitura?", reply: "Roberto!! Eu comprei imaginando que era mais um livro de auto-ajuda com fórmulas.\n\nFoi a coisa mais genuína que eu li esse ano. Aquela crônica da África me pegou muito.", time: "14:15" },
        { sender: "Já conseguiu finalizar o E-book?", reply: "Sabe aquele peso nas costas que a gente carrega sem saber o porquê? Pois é...\n\nSeu livro deveria ser leitura obrigatória pra qualquer pessoa.", time: "09:03" },
        { sender: "Gostou do último Capítulo?", reply: "Terminei o E-book ontem a noite... e confesso que perdi o sono.\n\nFaz a gente repensar tudo. É um soco no estômago gostoso de levar.", time: "10:42" },
        { sender: "Oi! Tudo bem? Passando para saber o que achou da narrativa.", reply: "Me vi no seu texto. Impressionante.\n\nEssa de 'não chegar' mas não parar de caminhar... mudou o meu dia. Obrigado.", time: "18:22" },
        { sender: "A leitura ajudou a organizar as ideias?", reply: "Li em uma tarde só. Maravilhoso!\n\nObrigada por compartilhar os medos tbm. Dá um alívio enorme ver que não estamos sozinhos nisso.", time: "21:10" }
    ];

    return (
        <section className="bg-gray-50 py-24 md:py-32 px-4 lg:px-12 border-t border-b border-gray-200 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest text-[#25D366] font-semibold mb-6 flex items-center gap-2"> <MessageCircle className="w-4 h-4"/> Experiência dos Leitores</span>
                <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-20 text-center leading-tight">
                   O que estão comentando no <br/> <span className="font-medium italic text-black">WhatsApp?</span>
                </h2>
                
                {/* INFINITE CAROUSEL WITH WHATSAPP MOCKUPS */}
                <div className="w-full relative flex overflow-x-hidden group">
                    
                    {/* Fade overlay gradients */}
                    <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                    <motion.div 
                        className="flex gap-8 whitespace-nowrap min-w-max pr-8 py-4"
                        animate={{ x: [0, "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    >
                        {/* Repeat twice for seamless infinite scroll */}
                        {[...prints, ...prints].map((chat, i) => (
                            <div key={i} style={{ padding: '10px' }} className="w-[280px] h-[550px] md:w-[320px] md:h-[580px] shrink-0 bg-black rounded-[2.5rem] shadow-xl relative border-[1px] border-black flex flex-col justify-end">
                                
                                {/* Fake iPhone notch / Dynamic Island */}
                                <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[30%] h-[24px] bg-black rounded-[1rem] z-20 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#111] ring-1 ring-[#222] absolute right-4" />
                                </div>
                                
                                <div className="w-full h-full bg-[#efeae2] rounded-[1.8rem] px-4 pt-16 pb-6 relative overflow-hidden flex flex-col justify-start" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover', backgroundBlendMode: 'multiply' }}>
                                    <WhatsAppBubble text={chat.sender} time={chat.time} isSender={true} />
                                    <WhatsAppBubble text={chat.reply} time={chat.time} isSender={false} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
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
        <section ref={containerRef} className="bg-white py-24 md:py-32 px-6 lg:px-12 relative">
             <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-start">
                <div ref={titleBoxRef} className="w-full md:w-1/3">
                    <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-4 leading-[1.1]">Perguntas<br/><span className="font-medium italic">Frequentes</span></h2>
                    <p className="text-gray-500 font-light text-lg">Para que você inicie essa leitura com total tranquilidade.</p>
                </div>
                <div ref={listRef} className="w-full md:w-2/3 space-y-6">
                    {faqs.map((faq, i) => ( <FAQItem key={i} question={faq.q} answer={faq.a} /> ))}
                </div>
             </div>
        </section>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="group border-b border-gray-200">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left py-6 flex items-start justify-between focus:outline-none focus:ring-0">
                <span className={`font-medium text-lg pr-8 transition-colors ${isOpen ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>{question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${isOpen ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-400 group-hover:border-black group-hover:text-black'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="pb-8 text-gray-500 font-light leading-relaxed pr-12 text-lg">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// --- BLOCO 05: Fechamento ---
const Block05 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    const dur = 0.8;
    
    // Revela textos sequencialmente
    tl.fromTo(line1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' });
    tl.fromTo(line2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, "-=0.4");
    tl.fromTo(line3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, "-=0.4");

    // Anima o bloco CTA (Botao e Garantias) logo em seguida, sem hold extra
    tl.fromTo(ctaRef.current, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: dur, ease: 'power2.out' }, "-=0.2");
    
    tl.to({}, { duration: 0.5 }); // short unpin hold

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 h-[100vh] w-full px-6 lg:px-12 flex items-center justify-center border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-24 h-full">
        
        {/* ESQUERDA: Tablet Mockup */}
        <InteractiveTabletMockup />

        {/* DIREITA: Text Area */}
        <div className="flex-1 space-y-6 text-center md:text-left flex flex-col justify-center">
          
          <div className="space-y-1 mb-6">
              <div ref={line1Ref} className="opacity-0 pb-3">
                <span className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]">
                  Um convite genuíno para
                </span>
              </div>
              <div ref={line2Ref} className="opacity-0 pb-3">
                <span className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]">
                  organizar o que você carrega e 
                </span>
              </div>
              <div ref={line3Ref} className="opacity-0 pb-3">
                <span className="block text-3xl md:text-4xl lg:text-[2.75rem] font-medium italic text-black leading-[1.2]">
                  seguir com mais clareza.
                </span>
              </div>
          </div>

          <div ref={ctaRef} className="opacity-0 pt-8 border-t border-gray-200">
            
            <a href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D" target="_blank" rel="noopener noreferrer"
               className="inline-flex flex-col md:flex-row items-center justify-center bg-[#F04E23] text-white px-12 py-5 uppercase text-xs md:text-sm tracking-[0.2em] md:tracking-[0.25em] font-bold hover:bg-[#d6431e] hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#F04E23]/30 transition-all duration-300 rounded-[8px] gap-3">
              <Flame className="w-5 h-5 text-white" strokeWidth={2} fill="currentColor" />
              Conquiste Seu E-book Agora
            </a>

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

          </div>
        </div>
      </div>
    </section>
  );
};

export default function Livro() {
  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white bg-white">
      <NavbarAlt />
      <Block01 />
      <BlockCarousel />
      <Block02 />
      <Block03 />
      <Block04 />
      <BlockSumario />
      <BlockDepoimentos />
      <Block05 />
      <BlockFAQ />
      <Footer />
    </div>
  );
}
