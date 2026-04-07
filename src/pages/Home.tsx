import React, { useState, useRef, useEffect } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import HeroSection from "@/components/HeroSection";
import { motion, AnimatePresence } from "framer-motion";
import { Footprints, Backpack, Compass, Heart, ArrowDown, Volume2, VolumeX } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomParallax } from "@/components/ui/zoom-parallax";

gsap.registerPlugin(ScrollTrigger);

const zoomParallaxImages = [
  { src: '/image/roberto-pascoal-criancas-sala.webp', alt: 'Roberto com Crianças na Sala', width: 1200, height: 800 }, // Center
  { src: '/image/roberto-crianca.webp', alt: 'Roberto Criança', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/Eu-e-minha-irmã.webp', alt: 'Eu e minha irmã', width: 1200, height: 800, isPolaroid: true },
  { src: '/image/Foto-05-Beto-Pag-11.webp', alt: 'Beto infância', width: 1200, height: 800, isPolaroid: true },
  { src: '/image/Foto-10-Mãe-e-Beto-Pg-14.webp', alt: 'Mãe e Beto', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/roberto-pascoal-explorador.webp', alt: 'Explorador', width: 800, height: 1200, isPolaroid: true },
  { src: '/image/roberto-pascoal-indigena-interacao.webp', alt: 'Interação Indígena', width: 800, height: 600, isPolaroid: true },
];

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const sectionRef3 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLParagraphElement>(null);

  // GSAP Text Reveal Effect - Block 02
  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const linesData = [
      { text: "É sobre olhar para o que se", classes: "font-sans font-semibold tracking-tighter" },
      { text: "carrega… o peso da própria mochila.", classes: "font-serif italic font-light opacity-90" },
      { text: "E, ainda assim,", classes: "font-sans font-medium tracking-tight mt-4" },
      { text: "escolher seguir em frente...", classes: "font-sans font-bold tracking-tighter" },
      { text: "para se reconectar consigo mesmo.", classes: "font-serif italic font-light opacity-90" }
    ];

    let htmlContent = '';
    linesData.forEach((line) => {
      const words = line.text.split(' ');
      words.forEach(w => {
        if (!w.trim()) return;
        htmlContent += `<span class="inline-block pb-1 pr-[0.1em] ${line.classes}" style="color: hsl(220, 10%, 85%)">${w}</span> `;
      });
      htmlContent += '<br/>';
    });

    textRef.current.innerHTML = htmlContent;

    const words = textRef.current.querySelectorAll('span');

    const anim = gsap.to(words, {
      color: 'hsl(220, 30%, 15%)',
      stagger: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 45%',
        scrub: 1,
      },
    });

    return () => { 
      anim.scrollTrigger?.kill();
      anim.kill(); 
    };
  }, []);

  // GSAP Text Reveal Effect - Block 03
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

      {/* Block 02: Conexão (Vídeo Vertical e Texto) */}
      <section id="conexao" ref={sectionRef} className="py-24 md:py-32 px-6 lg:px-12 bg-white w-full overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16">
          
          {/* Left Vertical Video */}
          <div className="relative w-full max-w-[320px] md:max-w-[450px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10 group cursor-pointer shrink-0">
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

          {/* Right Text com RevealGSAP */}
          <div className="flex text-left pl-0 max-w-[650px]">
            <p 
              ref={textRef} 
              className="text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.1] text-left"
            >
              {/* GSAP preenche as spans misturadas aqui */}
            </p>
          </div>

        </div>
      </section>

      {/* Block 03: Memórias - Text Title and Zoom Parallax */}
      <div className="bg-background">
        <section ref={sectionRef3} className="py-24 md:py-48 px-6 lg:px-12 w-full flex items-center justify-center">
          <p 
            ref={textRef3} 
            className="font-sans text-3xl md:text-5xl lg:text-5xl leading-[1.3] font-light max-w-4xl text-center tracking-tight"
          >
            {/* Text Reveal Block 3 */}
          </p>
        </section>

        <section className="relative w-full">
          <ZoomParallax images={zoomParallaxImages} />
        </section>
      </div>

      {/* Block 04: Proposta de Valor */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            {...fadeIn}
            className="text-3xl md:text-4xl font-light text-center mb-24"
          >
            E se pudéssemos caminhar juntos?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <ValueItem 
              icon={<Footprints className="w-8 h-8" />}
              title="Uma jornada real"
              text="Sem máscaras. Da infância à África… à Santiago de Compostela… aos lugares onde poucos chegam."
            />
            <ValueItem 
              icon={<Backpack className="w-8 h-8" />}
              title="O que carregamos"
              text="O que evitamos. O que ainda não entendemos. Mas seguimos."
            />
            <ValueItem 
              icon={<Compass className="w-8 h-8" />}
              title="Sem fórmulas"
              text="Sem atalhos. Só o passo seguinte."
            />
            <ValueItem 
              icon={<Heart className="w-8 h-8" />}
              title="Companhia"
              text="Você não está sozinho. Caminhar junto, torna a estrada mais leve."
            />
          </div>
        </div>
      </section>

      {/* Block 05: Livro */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="order-2 lg:order-1 space-y-8">
            <div className="space-y-2 text-xl md:text-2xl font-light text-gray-600">
              <p>A quem busca mais sentido.</p>
              <p>A quem deseja mais clareza.</p>
              <p>A quem tem coragem de se ouvir.</p>
              <p>A quem, enfim, se escolhe.</p>
            </div>
            <div className="pt-8 border-t border-gray-200">
              <p className="text-2xl md:text-3xl font-medium">Este livro não é uma resposta.</p>
              <p className="text-2xl md:text-3xl font-light italic">É um caminho.</p>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight pt-4">
              O Caminho depois da pressa.
            </h3>
          </motion.div>
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[3/4] bg-white p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/image/capa-do-livro.webp" 
                alt="Capa do Livro" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 z-[-1] bg-gray-200 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Block 06: Final */}
      <section className="py-48 px-6 bg-white flex items-center justify-center text-center">
        <motion.h2 
          {...fadeIn}
          className="text-4xl md:text-6xl font-light tracking-tighter"
        >
          Nunca pronto, <br className="md:hidden" />
          <span className="font-medium italic">mas sempre suficiente.</span>
        </motion.h2>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs uppercase tracking-[0.2em] text-gray-400">
        © {new Date().getFullYear()} Roberto Pascoal — O Caminho
      </footer>
    </div>
  );
};

const ValueItem = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center space-y-6"
  >
    <div className="p-4 rounded-full bg-gray-50 text-gray-400">
      {icon}
    </div>
    <div className="space-y-3">
      <h3 className="text-lg font-medium tracking-tight uppercase text-gray-400 text-[10px] tracking-[0.2em]">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed font-light">
        {text}
      </p>
    </div>
  </motion.div>
);

export default Home;
