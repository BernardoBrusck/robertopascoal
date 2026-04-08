import React, { useState, useRef, useEffect } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import HeroSection from "@/components/HeroSection";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { EbookSection } from "@/components/EbookSection";

gsap.registerPlugin(ScrollTrigger);

const zoomParallaxImages = [
  { src: '/image/roberto-pascoal-criancas-sala.webp', alt: 'Roberto com Crianças na Sala', width: 1200, height: 800 }, // Center
  { src: '/image/roberto-crianca.webp', alt: 'Roberto Criança', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/Eu-e-minha-irmã.webp', alt: 'Eu e minha irmã', width: 1200, height: 800, isPolaroid: true },
  { src: '/image/Foto-05-Beto-Pag-11.webp', alt: 'Beto infância', width: 1200, height: 800, isPolaroid: true },
  { src: '/image/Foto-10-Mãe-e-Beto-Pg-14.webp', alt: 'Mãe e Beto', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/infancia-upscale.webp', alt: 'Roberto criança sala de aula', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/roberto-infancia-crianca.webp', alt: 'Roberto infância pote', width: 800, height: 600, isPolaroid: true },
];

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  
  // Refs for Block 02 Pinning
  const containerRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const phrase3Ref = useRef<HTMLDivElement>(null);
  const phrase4Ref = useRef<HTMLDivElement>(null);
  const phrase5Ref = useRef<HTMLDivElement>(null);

  // Refs for Block 03
  const sectionRef3 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLParagraphElement>(null);

  // --- GSAP Pinned Scroll Reveal Effect - Block 02 ---
  useEffect(() => {
    if (!containerRef.current) return;
    
    // As frases a serem animadas
    const phrases = [
      phrase1Ref.current, 
      phrase2Ref.current, 
      phrase3Ref.current, 
      phrase4Ref.current, 
      phrase5Ref.current
    ];

    if (phrases.some(p => !p)) return;

    // Timeline para a fixação (Pinning) da seção inteira
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",       // Ao tocar o topo
        end: "+=400%",          // O scroll dura 4 vezes o tamanho da tela
        scrub: 1,               // Animação atrelada ao scroll (suave = 1)
        pin: true,              // Prende o scroll
        anticipatePin: 1,
      }
    });

    // Sequência de entrada e saída
    phrases.forEach((phrase, i) => {
      // Entra do fundo para o meio
      tl.fromTo(phrase, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
      );
      
      // Pequena Pausa de leitura
      tl.to({}, { duration: 1.5 });
      
      // Sai subindo (exceto a última frase que pode desvanecer na liberação do pin)
      if (i < phrases.length - 1) {
        tl.fromTo(phrase, 
          { opacity: 1, y: 0 },
          { opacity: 0, y: -50, duration: 2, ease: "power2.in" }
        );
      } else {
        // Para a última frase, suaviza o sumiço enquanto libera a tela
        tl.to(phrase, { opacity: 0, y: -50, duration: 2, ease: "power2.in" });
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // --- GSAP Text Reveal Effect - Block 03 ---
  useEffect(() => {
    if (!textRef3.current || !sectionRef3.current) return;

    const content = `E talvez…\nseja exatamente nessa parte do caminho\nque a gente se encontra.`;
    
    textRef3.current.innerHTML = content
      .replace(/\n/g, '<br/>')
      .split(/(<br\/>|\s+)/)
      .map(token => {
        if (token === '<br/>') return token;
        if (!token.trim()) return token;
        return `<span class="inline-block pr-[0.1em]" style="color: hsl(220, 10%, 85%)">${token}</span>`;
      })
      .join('');

    const words = textRef3.current.querySelectorAll('span');

    const anim = gsap.to(words, {
      color: 'hsl(220, 30%, 15%)',
      stagger: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef3.current,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: 1,
      },
    });

    return () => { 
      anim.scrollTrigger?.kill();
      anim.kill(); 
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <NavbarAlt />

      {/* Block 01: Hero Abertura */}
      <HeroSection />

      {/* Block 02: Conexão (Vídeo Fixo e Texto Pinned) */}
      <section 
        id="conexao" 
        ref={containerRef} 
        className="bg-white w-full h-[100vh] flex items-center justify-center overflow-hidden px-4 md:px-6 lg:px-12 relative"
      >
        <div className="max-w-[1200px] w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20 h-full">
          
          {/* Left Vertical Video */}
          <div className="relative w-full max-w-[280px] md:max-w-[360px] lg:max-w-[400px] h-[60vh] md:h-[80vh] lg:h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10 group cursor-pointer shrink-0" onClick={() => setIsMuted(!isMuted)}>
            <video 
              src="/video/caminhada.mp4" 
              autoPlay 
              loop 
              muted={isMuted} 
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Interativo de Som */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-[2px]">
              {isMuted ? (
                <>
                  <VolumeX className="w-12 h-12 text-white mb-4 drop-shadow-md border border-white p-2 rounded-full backdrop-blur-md" />
                  <span className="text-white font-medium text-[10px] tracking-widest uppercase py-1 px-3 rounded-full bg-black/40">Ativar Som</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-12 h-12 text-white mb-4 drop-shadow-md border border-white p-2 rounded-full backdrop-blur-md" />
                  <span className="text-white font-medium text-[10px] tracking-widest uppercase py-1 px-3 rounded-full bg-black/40">Desativar Som</span>
                </>
              )}
            </div>
          </div>

          {/* Right Text - Empilhados via absolutismo para revelar em sequência */}
          <div className="relative flex-1 w-full max-w-[550px] min-h-[150px] md:min-h-[200px]">
            
            <div ref={phrase1Ref} className="absolute inset-0 flex items-center xl:justify-start justify-center opacity-0 pointer-events-none">
               <span className="text-3xl md:text-5xl lg:text-[3rem] font-light text-gray-600 text-center lg:text-left leading-tight">
                  É sobre olhar para o que se carrega...
               </span>
            </div>
            
            <div ref={phrase2Ref} className="absolute inset-0 flex items-center xl:justify-start justify-center opacity-0 pointer-events-none">
               <span className="text-3xl md:text-5xl lg:text-[3rem] font-light text-gray-600 text-center lg:text-left leading-tight">
                  o peso da própria mochila.
               </span>
            </div>
            
            <div ref={phrase3Ref} className="absolute inset-0 flex items-center xl:justify-start justify-center opacity-0 pointer-events-none">
               <span className="text-3xl md:text-5xl lg:text-[3rem] font-light text-gray-600 text-center lg:text-left leading-tight">
                  E, ainda assim,
               </span>
            </div>
            
            <div ref={phrase4Ref} className="absolute inset-0 flex items-center xl:justify-start justify-center opacity-0 pointer-events-none">
               <span className="text-3xl md:text-5xl lg:text-[3rem] font-light text-gray-600 text-center lg:text-left leading-tight">
                  escolher seguir em frente...
               </span>
            </div>
            
            <div ref={phrase5Ref} className="absolute inset-0 flex items-center xl:justify-start justify-center opacity-0 pointer-events-none">
               <span className="text-3xl md:text-5xl lg:text-[3rem] font-light text-gray-600 text-center lg:text-left leading-tight">
                  para se reconectar consigo mesmo.
               </span>
            </div>

          </div>

        </div>
      </section>

      {/* Block 03: Memórias - Text Title and Zoom Parallax */}
      <div className="bg-background">
        <section ref={sectionRef3} className="py-12 md:py-20 px-6 lg:px-12 w-full flex items-center justify-center">
          <p 
            ref={textRef3} 
            className="font-sans text-2xl md:text-4xl lg:text-4xl leading-[1.3] font-light max-w-4xl text-center tracking-tight"
          >
            {/* Text Reveal Block 3 */}
          </p>
        </section>

        <section className="relative w-full">
          <ZoomParallax images={zoomParallaxImages} />
        </section>
      </div>

      {/* Block 04: Proposta de Valor */}
      <ValuePropositionSection />

      {/* Block 05: E-book (Tablet Fixo + Textos Scrubbed) */}
      <EbookSection />

      {/* Block 06: Final (Animado) */}
      <section className="py-48 px-6 bg-white flex items-center justify-center text-center overflow-hidden">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight flex flex-wrap justify-center gap-x-2 md:gap-x-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Animação palavra por palavra para um efeito mais suave que letra-por-letra, ou mistura */}
          {["Nunca", "pronto,"].map((word, i) => (
            <motion.span 
              key={i} 
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              {word}
            </motion.span>
          ))}
          <br className="hidden md:block w-full" /> {/* Force break if needed or let flow */}
          {["mas", "sempre", "suficiente."].map((word, i) => (
            <motion.span 
              key={i + 2} 
              className="inline-block font-medium italic text-black"
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs uppercase tracking-[0.2em] text-gray-400">
        © {new Date().getFullYear()} Roberto Pascoal — O Caminho
      </footer>
    </div>
  );
};

export default Home;
