import React from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const Livro = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <NavbarAlt />

      {/* Block 01: Abertura (Vídeo/Hero) */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 2 }}
            src="/image/roberto-pascoal-caminhada-brasil.webp" 
            alt="Caminhando no mato"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </div>
        <motion.div 
          {...fadeIn}
          className="relative z-10 text-center px-6 text-white"
        >
          <div className="space-y-4 text-2xl md:text-3xl font-light tracking-wide italic opacity-90">
            <p>Eu ainda estou no caminho.</p>
            <p className="pt-4">Ainda tenho dúvidas.</p>
            <p>Ainda tenho medos.</p>
            <p>Ainda carrego pesos.</p>
          </div>
          <h1 className="mt-12 text-5xl md:text-7xl font-medium tracking-tighter">
            Mas sigo.
          </h1>
        </motion.div>
      </section>

      {/* Block 02: Complemento */}
      <section className="py-48 px-6 bg-white flex items-center justify-center text-center">
        <motion.h2 
          {...fadeIn}
          className="text-3xl md:text-5xl font-light tracking-tight leading-tight max-w-4xl"
        >
          E foi nesse movimento…<br />
          <span className="font-serif italic font-medium">que este livro nasceu.</span>
        </motion.h2>
      </section>

      {/* Block 03: Essência */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <motion.div {...fadeIn} className="aspect-[3/4] rounded-sm overflow-hidden">
              <img src="/image/foto-roberto-07.webp" alt="Ação 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="aspect-[3/4] rounded-sm overflow-hidden mt-12">
              <img src="/image/roberto-pascoal-explorador.webp" alt="Ação 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
          <motion.div {...fadeIn} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Este não é um livro sobre chegar.
            </h2>
            <p className="text-5xl md:text-6xl font-serif italic font-medium text-gray-400">
              É sobre caminhar.
            </p>
            <div className="space-y-4 text-xl text-muted-foreground font-light leading-relaxed">
              <p>• Sobre viver o processo.</p>
              <p>• Sobre continuar, mesmo sem estar pronto.</p>
              <p>• Sobre se reconhecer no meio da estrada.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Block 04: Identificação */}
      <section className="relative py-32 px-6 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="/image/slide-01-caminho.webp" alt="Caminho sombrio" className="w-full h-full object-cover blur-sm" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Este livro é para você que:
            </h2>
            <div className="space-y-6 text-xl md:text-2xl font-light">
              <p className="flex items-start gap-4">
                <span className="text-gray-500 mt-1">•</span>
                <span>por vezes, se sente perdido, mas não parou</span>
              </p>
              <p className="flex items-start gap-4">
                <span className="text-gray-500 mt-1">•</span>
                <span>busca mais sentido do que respostas prontas</span>
              </p>
              <p className="flex items-start gap-4">
                <span className="text-gray-500 mt-1">•</span>
                <span>já entendeu que a vida não é linear</span>
              </p>
              <p className="flex items-start gap-4">
                <span className="text-gray-500 mt-1">•</span>
                <span>está cansado de fórmulas e quer verdade</span>
              </p>
            </div>
            <div className="pt-12 border-t border-white/10">
              <p className="text-2xl md:text-3xl font-light italic">
                Se isso faz sentido…<br />
                <span className="font-medium not-italic text-white">estamos no mesmo caminho.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Block 05: O que vai encontrar */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              Ao longo das páginas,<br />
              você caminhará comigo por:
            </h2>
            <ul className="space-y-6">
              {[
                "medos, dores e traumas comuns",
                "histórias reais na África, Caminho de Santiago, Monte Roraima e num Brasil profundo",
                "reflexões, dúvidas e uma coragem bem escondida",
                "aprendizados vividos e não teóricos",
                "provocações para olhar para dentro"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  {...fadeIn} 
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 text-lg text-gray-600"
                >
                  <Check className="w-5 h-5 mt-1 text-black flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="pt-8 space-y-2 text-xl font-medium uppercase tracking-[0.2em] text-gray-300">
              <p>Sem atalhos.</p>
              <p>Sem promessas.</p>
              <p className="text-black">Só caminho.</p>
            </div>
          </motion.div>
          <motion.div {...fadeIn} className="relative aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden shadow-2xl">
            <img src="/image/roberto-pascoal-hero-montanha.webp" alt="Páginas ao vento" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[18px] border-l-white border-b-[12px] border-b-transparent ml-1" />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Block 06: Encorajamento */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/image/foto-roberto-09.webp" alt="Roberto emblemático" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div {...fadeIn} className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white">
          <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12">
            Não é sobre estar pronto.<br />
            É sobre continuar, estando inacabado e ao mesmo tempo, totalmente suficiente.
          </p>
          <h2 className="text-3xl md:text-5xl font-serif italic">
            Porque talvez…<br />
            a vida não seja sobre chegar.<br />
            <span className="not-italic font-sans font-medium uppercase tracking-tighter mt-4 block">Mas sobre não desistir de caminhar.</span>
          </h2>
        </motion.div>
      </section>

      {/* Block 07: Conversão */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <motion.div {...fadeIn} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Se esse caminho fez sentido para você…<br />
              talvez seja hora de dar o próximo passo.
            </h2>
          </motion.div>
          
          <motion.div 
            {...fadeIn}
            className="relative inline-block group"
          >
            <div className="absolute -inset-4 bg-gray-50 rounded-xl scale-95 group-hover:scale-100 transition-transform duration-500" />
            <div className="relative flex flex-col md:flex-row items-center gap-12 p-8">
              <div className="w-48 h-64 bg-white shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img src="/image/capa-do-livro.webp" alt="Capa do Livro" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="text-left space-y-8">
                <div>
                  <h3 className="text-2xl font-medium">O Caminho depois da pressa</h3>
                  <p className="text-muted-foreground">Versão Digital (E-book)</p>
                </div>
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-sm text-sm uppercase tracking-[0.2em] font-medium hover:bg-gray-800 transition-colors">
                  Quero começar essa leitura
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs uppercase tracking-[0.2em] text-gray-400">
        © {new Date().getFullYear()} Roberto Pascoal — O Livro
      </footer>
    </div>
  );
};

export default Livro;
