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

  // Refs for Block 02 (Cinematic Video Expand)
  const block2SectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);

  // Refs for Block 03
  const sectionRef3 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLParagraphElement>(null);

  // --- GSAP Cinematic Expand Effect - Block 02 ---
  useEffect(() => {
    if (!block2SectionRef.current || !videoWrapperRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block2SectionRef.current,
        start: "top top",
        end: "+=120%", // Reduced scroll area to pass the section faster
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Animação de zoom expansivo EXCLUSIVA para mobile
    if (window.innerWidth < 768) {
      tl.fromTo(videoWrapperRef.current, 
        { clipPath: "inset(25vh 10vw round 2rem)" },
        { clipPath: "inset(0vh 0vw round 0rem)", duration: 2, ease: "power2.inOut" }
      );
    }

    // 1. Bring in Phrase 1
    tl.fromTo(phrase1Ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Read time for phrase 1
    tl.to({}, { duration: 0.5 });

    // 4. Bring in Phrase 2
    tl.fromTo(phrase2Ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Read time for both phrases
    tl.to({}, { duration: 1 });

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
        return `<span class="inline-block pr-[0.1em] opacity-20" style="color: hsl(220, 30%, 15%); will-change: opacity">${token}</span>`;
      })
      .join('');

    const words = textRef3.current.querySelectorAll('span');

    const anim = gsap.to(words, {
      opacity: 1,
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

      {/* Block 02: Conexão (Vídeo Cinematográfico Pinned) */}
      <section
        id="conexao"
        ref={block2SectionRef}
        className="bg-white w-full h-[100vh] flex items-center justify-center relative overflow-hidden"
      >
        {/* Fixed Container that acts as the screen bounds while pinned */}
        <div className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden">

          {/* ======== CONFIGURAÇÃO DA CAIXA MOLDURA FIXA DO VÍDEO ======== */}
          {/* Para alterar as medidas dessa janela, modifique as classes:
              - Desktop modifique os com prefixo (md:): 'md:w-[75%]' , 'md:h-[75vh]', 'md:rounded-[2rem]'
              No celular (mobile) forçamos tela cheia ('absolute inset-0 w-full h-full') para que a animação GSAP de expansão aconteça na GPU.
          */}
          <div
            ref={videoWrapperRef}
            className="absolute md:relative inset-0 md:inset-auto w-full md:w-[75%] h-full md:h-[75vh] rounded-none md:rounded-[2rem] border-[0px] overflow-hidden flex items-center justify-center cursor-pointer group"
            style={{ willChange: window.innerWidth < 768 ? "clip-path" : "auto" }}
            onClick={() => setIsMuted(!isMuted)}
          >
            <video
              ref={videoRef}
              src="/video/caminhada.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Máscara escura fixa para legibilidade do texto */}
            <div ref={overlayRef} className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Ícone de Som - Canto inferior direito */}
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="flex bg-black/30 backdrop-blur-md border border-white/20 p-3 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                {isMuted ? (
                  <VolumeX className="w-6 h-6 text-white drop-shadow-md" />
                ) : (
                  <Volume2 className="w-6 h-6 text-white drop-shadow-md" />
                )}
              </div>
            </div>
          </div>

          {/* Texts overlaying everything, centered, absolute position */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none gap-6">
            {/* Phrase 1 Wrapper */}
            <div ref={phrase1Ref} className="opacity-0 flex items-center justify-center px-4 mx-auto max-w-4xl">
              <span 
                className="text-2xl md:text-3xl lg:text-4xl font-light text-white text-center leading-[1.3] tracking-tight"
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8), 0px 4px 16px rgba(0,0,0,0.8), 0px 8px 32px rgba(0,0,0,0.9)" }}
              >
                É sobre olhar para o que se carrega…<br className="hidden md:block" />
                o peso da própria mochila…
              </span>
            </div>

            {/* Phrase 2 Wrapper */}
            <div ref={phrase2Ref} className="opacity-0 flex items-center justify-center px-4 mx-auto max-w-4xl">
              <span 
                className="text-2xl md:text-3xl lg:text-4xl font-light text-white text-center leading-[1.3] tracking-tight"
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8), 0px 4px 16px rgba(0,0,0,0.8), 0px 8px 32px rgba(0,0,0,0.9)" }}
              >
                e, ainda assim,<br className="md:hidden" /> escolher seguir em frente.
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Block 03: Memórias - Text Title and Zoom Parallax */}
      <div className="bg-background relative">
        <section ref={sectionRef3} className="py-12 md:py-20 px-6 lg:px-12 w-full flex items-center justify-center relative">
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
      <section className="py-24 px-6 bg-white flex flex-col items-center justify-center text-center overflow-hidden gap-12 relative">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="/sobre-mim"
            className="inline-block px-10 py-4 bg-white text-black border border-black uppercase tracking-[0.2em] text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-500 rounded-[2px]"
          >
            Me conheça melhor
          </a>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs uppercase tracking-[0.2em] text-gray-400">
        © {new Date().getFullYear()} Roberto Pascoal — O Caminho
      </footer>
    </div>
  );
};

export default Home;
