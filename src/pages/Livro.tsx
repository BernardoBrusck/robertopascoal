import React, { useRef, useEffect } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroAct = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=120%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    const dur = 0.8;
    const hold = 0.3;
    const fadeOut = 0.4;

    tl.fromTo(p1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' });
    tl.to({}, { duration: hold });
    tl.to(p1Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });

    tl.fromTo(p2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold });
    tl.to(p2Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });

    tl.fromTo(p3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold });
    tl.to(p3Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });

    tl.fromTo(p4Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold });
    tl.to(p4Ref.current, { opacity: 0, y: -20, duration: fadeOut, ease: 'power2.in' });

    tl.fromTo(finalRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: dur * 1.5, ease: 'power2.out' }, '<0.2');
    tl.to({}, { duration: hold * 2 }); 

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const phraseClass = "absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0 pointer-events-none drop-shadow-xl";
  const textClass = "text-xl md:text-2xl lg:text-3xl font-light text-white/90 text-center leading-[1.3] max-w-2xl tracking-tight italic text-balance";
  const finalClass = "text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-white text-center text-balance";

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-black flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/roberto-pascoal-criancas-indigenas.webp" 
          alt="Crianças Indígenas"
          className="w-full h-full object-cover opacity-100 object-center"
          referrerPolicy="no-referrer"
        />
        {/* Overlay sutil para leitura sem perder o contexto vibrante da foto */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 w-full h-full">
        <div ref={p1Ref} className={phraseClass}><span className={textClass}>Eu ainda estou no caminho.</span></div>
        <div ref={p2Ref} className={phraseClass}><span className={textClass}>Ainda tenho dúvidas.</span></div>
        <div ref={p3Ref} className={phraseClass}><span className={textClass}>Ainda tenho medos.</span></div>
        <div ref={p4Ref} className={phraseClass}><span className={textClass}>Ainda carrego pesos.</span></div>
        <div ref={finalRef} className={phraseClass}><span className={finalClass}>Mas sigo.</span></div>
      </div>
    </section>
  );
};

const EssenceAct = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);

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

    tl.fromTo(
      [p1Ref.current, p2Ref.current, p3Ref.current], 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.15, ease: 'power2.out' }
    );
    tl.to({}, { duration: 0.5 });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={containerRef} className="bg-white w-full h-[100vh] flex items-center justify-center overflow-hidden px-6 lg:px-12 border-b border-gray-100">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 h-full">
        {/* Texts */}
        <div className="relative flex-1 w-full max-w-[550px] min-h-[200px] flex flex-col justify-center gap-8 z-10">
          <div ref={p1Ref} className="opacity-0">
            <span className="text-2xl md:text-3xl font-light text-black/70 text-left leading-[1.4] tracking-tight block">
              E foi nesse movimento...<br/>
              <span className="font-serif text-black font-medium">que este livro nasceu.</span>
            </span>
          </div>
          <div ref={p2Ref} className="opacity-0">
            <span className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black text-left leading-tight tracking-tight block text-balance">
              Este não é um livro sobre chegar.<br/>
              <span className="font-serif text-black/80 font-medium drop-shadow-sm">É sobre caminhar.</span>
            </span>
          </div>
          <div ref={p3Ref} className="opacity-0 space-y-4 pt-4">
             <p className="text-xl md:text-2xl font-light text-black/80 tracking-tight flex items-start gap-3">
               <span className="text-black/40 mt-1.5">•</span> Sobre viver o processo.
             </p>
             <p className="text-xl md:text-2xl font-light text-black/80 tracking-tight flex items-start gap-3">
               <span className="text-black/40 mt-1.5">•</span> Sobre continuar, mesmo sem estar pronto.
             </p>
             <p className="text-xl md:text-2xl font-light text-black/80 tracking-tight flex items-start gap-3">
               <span className="text-black/40 mt-1.5">•</span> Sobre se reconhecer no meio da estrada.
             </p>
          </div>
        </div>

        {/* Images: Layout Estilo Polaroid (5 Fotos Espalhadas) */}
        <div className="relative w-full max-w-[400px] lg:max-w-[550px] h-[55vh] md:h-[70vh] shrink-0 hidden sm:flex items-center justify-center pointer-events-auto mt-10 md:mt-0">
            
            {/* Polaroid 1 (Topo Esquerda) */}
            <div className="absolute top-[2%] left-[-2%] w-[40%] bg-white p-2 md:p-3 pb-8 md:pb-10 shadow-xl z-10 transform rotate-[10deg] hover:z-[60] hover:scale-[1.05] transition-all duration-400">
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <img src="/image/roberto-pascoal-comunidade-isolada.webp" alt="Tribo isolada" className="w-full h-full object-cover grayscale-[15%]" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Polaroid 2 (Topo Direita) */}
            <div className="absolute top-[6%] right-[0%] w-[38%] bg-white p-2 md:p-3 pb-8 md:pb-10 shadow-lg z-20 transform -rotate-[12deg] hover:z-[60] hover:scale-[1.05] transition-all duration-400">
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <img src="/image/roberto-pascoal-leitura-indigena.webp" alt="Leitura na tribo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Polaroid 3 (Centro Principal) */}
            <div className="absolute top-[28%] left-[26%] w-[48%] bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] z-50 transform rotate-[2deg] hover:z-[60] hover:scale-[1.05] transition-all duration-400">
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <img src="/image/pascoal-crianças.webp" alt="Crianças Indígenas" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Polaroid 4 (Fundo Esquerda) */}
            <div className="absolute bottom-[-5%] left-[-5%] w-[42%] bg-white p-2 md:p-3 pb-8 md:pb-10 shadow-xl z-30 transform -rotate-[10deg] hover:z-[60] hover:scale-[1.05] transition-all duration-400">
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <img src="/image/roberto-pascoal-indigena-interacao.webp" alt="Interação na tribo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Polaroid 5 (Fundo Direita) */}
            <div className="absolute bottom-[0%] right-[0%] w-[42%] bg-white p-2 md:p-3 pb-8 md:pb-10 shadow-2xl z-40 transform rotate-[12deg] hover:z-[60] hover:scale-[1.05] transition-all duration-400">
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <img src="/image/roberto-pascoal-criancas-indigenas.webp" alt="Povo indígena" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

        </div>
      </div>
    </section>
  );
};

const TargetAct = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const conclusionRef = useRef<HTMLDivElement>(null);

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

    itemsRef.current.forEach((item, i) => {
      if(!item) return;
      tl.fromTo(item, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, i * 0.6);
    });

    const lastTime = itemsRef.current.length * 0.6;
    tl.fromTo(conclusionRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5 }, lastTime);
    tl.to({}, { duration: 0.8 }); 

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  const items = [
    "por vezes, se sente perdido, mas não parou",
    "busca mais sentido do que respostas prontas",
    "já entendeu que a vida não é linear",
    "está cansado de fórmulas e quer verdade"
  ];

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-white flex flex-col md:flex-row overflow-hidden border-b border-gray-100">
        {/* Left Side: Dramatic Image */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-full relative shrink-0">
          <img src="/image/roberto-pascoal-indigena-interacao.webp" alt="Interação Indígena" className="w-full h-full object-cover grayscale-[15%]" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        {/* Right Side: Clean Text */}
        <div className="w-full md:w-1/2 h-[60vh] md:h-full flex items-center justify-start pl-8 md:pl-12 lg:pl-20 pr-8 md:pr-16 bg-[#fafafa]">
            <div className="max-w-lg w-full space-y-10">
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black text-balance">
                  Este livro é <span className="font-serif italic font-medium text-black">para você</span> que:
                </h2>
                
                <div className="space-y-5">
                  {items.map((text, i) => (
                    <div 
                      key={i} 
                      ref={el => { itemsRef.current[i] = el; }}
                      className="opacity-0"
                    >
                      <p className="text-xl md:text-2xl font-light tracking-tight text-black flex items-start gap-4 md:gap-5 leading-tight">
                        <span className="text-gray-400 font-serif font-medium mt-1 md:mt-0 text-xl md:text-2xl w-8 shrink-0">0{i+1}.</span>
                        <span>{text}</span>
                      </p>
                    </div>
                  ))}
                </div>
                
                <div 
                   ref={conclusionRef}
                   className="opacity-0 pt-6 border-t border-gray-300"
                >
                  <p className="text-xl md:text-2xl font-light text-black tracking-tight text-balance leading-[1.3]">
                    Se isso faz sentido…<br />
                    <span className="font-serif font-medium italic text-black">estamos no mesmo caminho.</span>
                  </p>
                </div>
            </div>
        </div>
    </section>
  );
};

const PromessaAct = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-white py-16 md:py-20 px-6 md:px-12">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.2] tracking-tight text-gray-900 mb-10 md:mb-14 text-balance"
        >
          Ao longo das páginas,<br />
          você caminhará comigo por:
        </motion.h2>

        <ul className="w-full flex flex-col items-center space-y-3 md:space-y-4 mb-14 md:mb-20 text-balance">
            {[
              "medos, dores e traumas comuns",
              "histórias reais na África, Caminho de Santiago, Monte Roraima e num Brasil profundo",
              "reflexões, dúvidas e uma coragem bem escondida",
              "aprendizados vividos e não teóricos",
              "provocações para olhar para dentro"
            ].map((item, i) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="text-lg md:text-xl lg:text-[1.35rem] font-light text-gray-600 tracking-tight leading-snug"
              >
                {item}
              </motion.li>
            ))}
        </ul>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-3 md:gap-5 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] md:tracking-[0.25em]"
        >
            <span className="text-gray-400">Sem atalhos</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-gray-400">Sem promessas</span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-black/80" />
            <span className="text-black px-1 border-b-[1.5px] border-black pb-0.5">Só caminho</span>
        </motion.div>
      </div>
    </section>
  );
};

const EncorajamentoAct = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src="/image/roberto-pascoal-professor-africa.webp" alt="Roberto em Ação" className="w-full h-full object-cover object-top opacity-100" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20 text-white"
      >
        <p className="text-xl md:text-2xl font-light leading-[1.6] tracking-tight mb-16 text-gray-200 opacity-90 text-balance">
          Não é sobre estar pronto.<br />
          É sobre continuar, estando inacabado e ao mesmo tempo,<br className="hidden md:block" />
          totalmente suficiente.
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic font-light leading-[1.2] text-balance drop-shadow-md">
          Porque talvez…<br />
          a vida não seja sobre chegar.
        </h2>
        <span className="not-italic font-sans font-medium uppercase tracking-[0.25em] text-xs md:text-sm mt-10 block text-white/50">
          Mas sobre não desistir de caminhar.
        </span>
      </motion.div>
    </section>
  );
};

const ConversaoAct = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-16 md:space-y-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-[1.3] text-gray-800 text-balance">
            Se esse caminho fez sentido para você…<br />
            talvez seja hora de dar o próximo passo.
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="relative inline-block group mx-auto w-full max-w-3xl"
        >
          {/* Subtle glow / background for the product */}
          <div className="absolute inset-0 bg-[#f9f9f9] rounded-3xl -m-6 md:-m-12 z-0 scale-95 group-hover:scale-100 transition-transform duration-700 ease-out" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
            <div className="w-48 md:w-56 aspect-[3/4] shrink-0 bg-white shadow-2xl rounded-sm transform md:-rotate-3 group-hover:rotate-0 transition-transform duration-700 ease-out">
              <img src="/image/capa-do-livro.webp" alt="O Caminho depois da pressa" className="w-full h-full object-cover rounded-sm" referrerPolicy="no-referrer" />
            </div>
            
            <div className="text-center md:text-left space-y-8 flex-1 flex flex-col justify-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">O Caminho Depois da Pressa</h3>
                <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">Versão Digital (E-book)</p>
              </div>
              <button className="inline-flex items-center justify-center gap-4 w-full md:w-auto px-10 py-5 bg-black text-white rounded-[2px] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-black/80 transition-all duration-300 mx-auto md:mx-0">
                Ler Agora
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Livro = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <NavbarAlt />
      <HeroAct />
      <EssenceAct />
      <TargetAct />
      <PromessaAct />
      <EncorajamentoAct />
      <ConversaoAct />

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs uppercase tracking-[0.2em] text-gray-400 mt-auto">
        © {new Date().getFullYear()} Roberto Pascoal — O Livro
      </footer>
    </div>
  );
};

export default Livro;
