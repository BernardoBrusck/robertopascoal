import React, { useState, useRef, useEffect } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import HeroSection from "@/components/HeroSection";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Volume2, VolumeX, Instagram, Linkedin, Mail } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { AboutSection } from '@/components/AboutSection';
import { ValuePropositionSection } from "@/components/ValuePropositionSection";
import { EbookSection } from "@/components/EbookSection";
import { ParallaxManifesto } from "@/components/ParallaxManifesto";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const zoomParallaxImages = [
  // 0: Centro — imagem principal
  { src: '/image/foto-05-beto-opt.webp', alt: 'Beto infância', width: 1200, height: 800 },

  // 1–6: Primeiro anel de polaroides (originais)
  { src: '/image/roberto-crianca.webp', alt: 'Roberto Criança', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/eu-e-minha-irma-opt.webp', alt: 'Eu e minha irmã', width: 1200, height: 800, isPolaroid: true, zIndex: 50 },
  { src: '/infancia/infancia_02_6kurik6k.webp', alt: 'Boa Vontade', width: 800, height: 1000, isPolaroid: true, zIndex: 10 },
  { src: '/image/foto-10-mae-beto-opt.webp', alt: 'Mãe e Beto', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/infancia-upscale.webp', alt: 'Roberto criança sala de aula', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/roberto-infancia-crianca.webp', alt: 'Roberto infância pote', width: 800, height: 600, isPolaroid: true },

  // 7–12: Segundo anel (novas imagens /infancia — preenche os espaços brancos)
  { src: '/infancia/infancia_01_100pxh10.webp', alt: 'Infância Roberto', width: 800, height: 1000, isPolaroid: true },
  { src: '/infancia/infancia_03_7wp27m7w.webp', alt: 'Infância memória', width: 800, height: 1000, isPolaroid: true },
  { src: '/infancia/infancia_05_cuwnp7cu.webp', alt: 'Infância família', width: 800, height: 1000, isPolaroid: true },
  { src: '/infancia/infancia_07_lzpitqlz.webp', alt: 'Infância recordação', width: 800, height: 1000, isPolaroid: true },
  { src: '/infancia/infancia_08_p7cwiop7.webp', alt: 'Infância criança', width: 800, height: 1000, isPolaroid: true },
  { src: '/infancia/infancia_10_s8ogq5s8.webp', alt: 'Infância retrato', width: 800, height: 1000, isPolaroid: true },
  { src: '/infancia/infancia_06_k5ysvwk5.webp', alt: 'Infância nova', width: 800, height: 1000, isPolaroid: true },
  { src: '/infancia/infancia_04_bmdj8qbm.webp', alt: 'Infância memória 4', width: 800, height: 1000, isPolaroid: true, objectPosition: 'left' },
  { src: '/infancia/infancia_09_qjhp5bqj.webp', alt: 'Infância memória 9', width: 800, height: 1000, isPolaroid: true },
];

const Home = () => {
  const isMobile = useIsMobile();

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
    if (isMobile) {
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

    const content = `E talvez…\nseja exatamente nessa parte do caminho\nque a gente se encontra com a gente mesmo.`;
    
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
            className="absolute md:relative inset-0 md:inset-auto w-full md:w-[75%] h-full md:h-[75vh] rounded-none md:rounded-[2rem] border-[0px] overflow-hidden flex items-center justify-center"
            style={{ willChange: isMobile ? "clip-path" : "auto" }}
          >
            <video
              ref={videoRef}
              src="/video/Drone monte Roraima.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Máscara escura fixa para legibilidade do texto */}
            <div ref={overlayRef} className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

          {/* Texts overlaying everything, centered, absolute position */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none gap-0">
            {/* Phrase 1 Wrapper */}
            <div ref={phrase1Ref} className="opacity-0 flex items-center justify-center px-4 mx-auto max-w-4xl">
              <span 
                className="text-2xl md:text-3xl lg:text-4xl font-light text-white text-center leading-none tracking-[0.5px]"
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.8), 0px 4px 16px rgba(0,0,0,0.8), 0px 8px 32px rgba(0,0,0,0.9)" }}
              >
                É sobre olhar para o que se carrega…<br className="hidden md:block" />
                o peso da própria mochila…
              </span>
            </div>

            {/* Phrase 2 Wrapper */}
            <div ref={phrase2Ref} className="opacity-0 flex items-center justify-center px-4 mx-auto max-w-4xl">
              <span 
                className="text-2xl md:text-3xl lg:text-4xl font-light text-white text-center leading-none tracking-[0.5px]"
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
        <section ref={sectionRef3} className="py-16 md:pb-20 px-6 lg:px-12 w-full flex items-center justify-center relative">
          <p
            ref={textRef3}
            className="font-sans text-xl md:text-4xl lg:text-4xl leading-snug md:leading-none font-light max-w-4xl text-center tracking-[0.5px]"
          >
            {/* Text Reveal Block 3 */}
          </p>
        </section>

        <section className="relative w-full">
          <ZoomParallax images={zoomParallaxImages} />
        </section>
      </div>

      {/* Block 03.5: Sobre Mim */}
      <AboutSection />

      {/* Block 04: Proposta de Valor */}
      <ValuePropositionSection />

      {/* Block 04.5: Parallax Manifesto (Sentido, Autoconhecimento, etc.) */}
      <ParallaxManifesto />

      {/* Block 05: E-book (Tablet Fixo + Textos Scrubbed) */}
      <EbookSection />

      {/* Block 06: Final (Animado) */}
      <section className="py-20 md:py-16 px-5 md:px-6 bg-white flex flex-col items-center justify-center text-center overflow-hidden gap-8 relative">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[2px] leading-snug md:leading-none flex flex-wrap justify-center gap-x-2 md:gap-x-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
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
          <span className="w-full hidden md:block" />
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

      <footer className="py-6 px-6 border-t border-gray-100 flex flex-col items-center gap-3">
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
          © {new Date().getFullYear()} Roberto Pascoal — O Caminho
        </p>
      </footer>
    </div>
  );
};

export default Home;
