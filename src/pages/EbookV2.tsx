import React, { useRef, useEffect, useState } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, useInView } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin, Mail, Footprints, Backpack, Compass, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Custom Footer for the page
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => (
  <footer className="py-6 px-6 border-t border-gray-100 flex flex-col items-center gap-3 bg-white">
    <div className="flex items-center gap-3">
      <a href="https://www.instagram.com/roberto_pascoal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 text-gray-400 hover:text-black transition-colors hover:scale-110 duration-200">
        <Instagram size={18} strokeWidth={1.5} />
      </a>
      <a href="https://www.linkedin.com/in/roberto-pascoal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 text-gray-400 hover:text-black transition-colors hover:scale-110 duration-200">
        <Linkedin size={18} strokeWidth={1.5} />
      </a>
      <a href="https://www.facebook.com/roberto.pascoal.9" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2.5 text-gray-400 hover:text-black transition-colors hover:scale-110 duration-200">
        <FacebookIcon className="w-[18px] h-[18px]" />
      </a>
      <a href="mailto:atendimento@dazprodutora.com.br" aria-label="E-mail" className="p-2.5 text-gray-400 hover:text-black transition-colors hover:scale-110 duration-200">
        <Mail size={18} strokeWidth={1.5} />
      </a>
    </div>
    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
      © {new Date().getFullYear()} Roberto Pascoal — E-book
    </p>
  </footer>
);

// --- BLOCO 01: Hero Intro (Framer Motion) ---
const Block01 = () => {
  return (
    <section className="bg-white min-h-[100vh] flex flex-col items-center justify-center px-6 lg:px-12 text-center border-b border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <h1 className="text-4xl md:text-6xl lg:text-[4.75rem] font-light tracking-tight text-black leading-[1.15] text-balance">
          Para onde você está indo com <span className="font-medium italic">tanta pressa?</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-3xl text-gray-600 font-light mt-8"
        >
          E o que você carrega na sua mochila?
        </motion.p>
      </motion.div>
    </section>
  );
};

// --- BLOCO 02: Identificação (GSAP Pin Scrub) ---
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

    // Image Box Parallax effect slightly
    tl.fromTo(imgBoxRef.current, 
      { scale: 0.95 },
      { scale: 1, duration: 1, ease: 'power1.out' }
    );

    // Text Reveal
    tl.fromTo(p1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");
    tl.to({}, { duration: 0.3 });
    tl.fromTo(p2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
    tl.to({}, { duration: 0.5 });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={containerRef} className="bg-white w-full h-[100vh] flex items-center justify-center overflow-hidden px-4 md:px-6 lg:px-12">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 h-full">
        {/* Real Image loaded */}
        <div ref={imgBoxRef} className="w-full md:w-1/2 max-w-[420px] aspect-[4/5] bg-[#f7f7f7] border border-gray-200 flex items-center justify-center rounded-[2px] shadow-lg shrink-0 relative overflow-hidden">
          <img src="/image/roberto-pascoal-explorador.webp" alt="Roberto Pascoal" className="w-full h-full object-cover" />
        </div>

        {/* Text Side */}
        <div className="flex-1 w-full flex flex-col justify-center gap-10">
          <div ref={p1Ref} className="opacity-0">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2] tracking-tight text-balance">
              Um e-book para quem continua caminhando, mesmo com medos e dúvidas.
            </h2>
          </div>
          <div ref={p2Ref} className="opacity-0">
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
              Com coragem suficiente para não parar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- BLOCO 03: Posicionamento (GSAP Depth Pin) ---
const Block03 = () => {
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
  const textClass = "text-3xl md:text-5xl lg:text-[4rem] font-light text-white leading-[1.2] max-w-4xl tracking-tight text-balance";

  return (
    <section ref={containerRef} className="relative bg-[#0a0a0a] w-full h-[100vh] overflow-hidden flex items-center justify-center">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video
          src="/video/Drone monte Roraima.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full h-full">
        <div ref={p1Ref} className={phraseClass}>
          <span className={textClass}>Este não é um e-book de<br/> <span className="font-medium italic">quem chegou lá.</span></span>
        </div>
        <div ref={p2Ref} className={phraseClass}>
          <span className={textClass}>É para quem busca<br/> <span className="font-medium italic text-gray-300">mais sentido, mais clareza…</span></span>
        </div>
        <div ref={p3Ref} className={phraseClass}>
          <span className={textClass}>e encontra em si<br/> coragem para se ouvir.</span>
        </div>
        <div ref={p4Ref} className={phraseClass}>
          <span className={textClass}>Para quem se escolhe…<br/> e <span className="font-medium">continua caminhando.</span></span>
        </div>
      </div>
    </section>
  );
};

// --- BLOCO 04: Proposta (Grid) ---
const Block04 = () => {
  const items = [
    {
      icon: <Footprints className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />,
      text: "Refletir sobre o que \nrealmente está carregando."
    },
    {
      icon: <Backpack className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />,
      text: "Entender por que a pressa \nte afasta do que importa."
    },
    {
      icon: <Compass className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />,
      text: "Encontrar mais clareza \npara seguir com o que já tem."
    },
    {
      icon: <Heart className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />,
      text: "Perceber que não precisa \nestar pronto para continuar."
    }
  ];

  return (
    <section className="bg-white py-24 md:py-32 px-6 lg:px-12 flex flex-col items-center justify-center relative border-b border-gray-100 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto flex flex-col relative z-10 w-full justify-center">
        
        <motion.div 
          className="w-full mb-12 lg:mb-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-[0.5px] leading-tight text-gray-900">
            Que tal uma caminhada para...
          </h2>
          <div className="w-16 h-px bg-black mt-8" />
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              className="flex flex-col text-left group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="text-black mb-6 group-hover:-translate-y-1 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light whitespace-pre-line transition-colors duration-300 group-hover:text-black">
                  {item.text}
                </p>
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
    setTilt({
      rotX: -((y - cy) / cy) * 10,
      rotY: ((x - cx) / cx) * 14,
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => {
    setHovering(false);
    setTilt({ rotX: 0, rotY: 0 });
    setGlare({ x: 30, y: 20 });
  };

  return (
    <a
      href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D"
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] mx-auto shrink-0 block mb-12 md:mb-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${hovering ? 1.03 : 1}, ${hovering ? 1.03 : 1}, 1)`,
        transition: hovering ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        ref={bodyRef}
        className="relative bg-[#1a1a1a] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl"
        style={{ padding: '14px 12px 14px 12px' }}
      >
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#111] ring-[1.5px] ring-[#3a3a3a] z-10" />
        <div className="relative w-full aspect-[3/4] rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-white">
          <img
            src="/image/capa-do-livro.webp"
            alt="Capa do E-book - O Caminho depois da pressa"
            className="w-full h-full object-contain bg-white"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`,
              transition: hovering ? 'background 0.08s ease' : 'background 0.4s ease',
            }}
          />
          <div className="absolute top-0 left-0 w-[2px] h-full pointer-events-none bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
        </div>
      </div>
    </a>
  );
};


// --- BLOCO 05: Fechamento ---
const Block05 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });

  return (
    <section ref={sectionRef} className="bg-[#fcfcfc] py-24 md:py-32 px-6 lg:px-12 overflow-hidden flex items-center justify-center relative">
      <div className="max-w-[1100px] mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* ESQUERDA: Tablet Mockup Iterative */}
        <InteractiveTabletMockup />

        {/* DIREITA: Text Area */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="overflow-hidden">
            <motion.span
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]"
            >
              Um convite para
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black leading-[1.2]"
            >
              olhar para dentro, reorganizar o que você carrega
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block text-3xl md:text-4xl lg:text-[2.75rem] font-medium italic text-black leading-[1.2]"
            >
              e seguir com mais presença.
            </motion.span>
          </div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="pt-8"
          >
            <a 
              href="https://hotmart.com/pt-br/marketplace/produtos/o-caminho-depois-da-pressa/E102970771D"
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-block bg-black text-white px-10 py-5 uppercase text-xs tracking-[0.25em] font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-[2px]"
            >
              Baixar E-book
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default function EbookV2() {
  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white bg-white">
      <NavbarAlt />
      <Block01 />
      <Block02 />
      <Block03 />
      <Block04 />
      <Block05 />
      <Footer />
    </div>
  );
}
