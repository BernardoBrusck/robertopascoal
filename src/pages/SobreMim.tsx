import React from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, useScroll, useTransform } from "framer-motion";

const SobreMim = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const keywords = [
    "Sentido",
    "Território",
    "Força de Realização",
    "Humanidade",
    "Foco com Alma"
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <NavbarAlt />

      {/* Hero Section (Minimalista estilo Editorial) */}
      <section className="pt-40 md:pt-48 pb-10 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8 md:space-y-10"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-[10px] md:text-sm uppercase text-gray-500 font-medium block"
          >
            Empreendedor Social &nbsp;&bull;&nbsp; Palestrante &nbsp;&bull;&nbsp; Escritor
          </motion.span>
          <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-light tracking-tighter text-black leading-none">
            Roberto <span className="font-serif italic font-medium -ml-1 md:-ml-4">Pascoal</span>
          </h1>
        </motion.div>
      </section>

      {/* Imagem Destaque (Com Parallax Interno) */}
      <section className="relative w-full px-4 md:px-8 lg:px-12 mb-24 max-w-[1400px] mx-auto">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
           className="relative aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
        >
          {/* Usamos absolute com altura um pouco maior que o pai para o efeito de rolagem da imagem */}
          <motion.img 
            style={{ y: y1 }}
            src="/image/roberto-pascoal-retrato.webp" 
            alt="Roberto Pascoal" 
            className="absolute -top-[10%] left-0 w-full h-[120%] object-cover object-[center_30%]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Keywords Section */}
      <section className="py-24 px-6 border-b border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-8">
          {keywords.map((word, i) => (
            <motion.span 
              key={word}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 font-medium"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Story Part 1: Origins */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn} className="space-y-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600">
              Lá atrás, depois de viver na correria, em busca de boas posições corporativas e de me formar em Publicidade e Propaganda, eu senti que faltava algo.
            </p>
            <p className="text-3xl md:text-4xl font-light tracking-tight">
              Faltava sentido.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Então, aos 27 anos, parti para uma jornada mundo afora. Fiz o Caminho de Santiago de Compostela, em 2007. Morei em países africanos por quatro anos. E, depois, vivi um mochilão de um ano pelas regiões mais distantes e vulneráveis do Brasil.
            </p>
          </motion.div>
          <div className="relative">
            <motion.div style={{ y: y2 }} className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <img src="/image/tatuagem-concha-caminho.webp" alt="Caminho de Santiago" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-100 -z-10" />
          </div>
        </div>
      </section>

      {/* Highlight Quote */}
      <section className="py-32 px-6 bg-gray-50 text-center">
        <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif italic font-medium tracking-tight">
            “Tudo o que eu buscava mundo afora… estava mundo adentro. Dentro de mim.”
          </h2>
        </motion.div>
      </section>

      {/* Story Part 2: Omunga */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <motion.div style={{ y: y1 }} className="aspect-[16/10] rounded-sm overflow-hidden shadow-xl">
              <img src="/image/roberto-pascoal-comunidade-isolada.webp" alt="Omunga em campo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <img src="/image/omunga-logo.png" alt="Logo Omunga" className="absolute -bottom-8 -right-8 h-12 opacity-20 grayscale" />
          </div>
          <motion.div {...fadeIn} className="order-1 lg:order-2 space-y-8">
            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-400">Um novo caminho</h3>
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              Me tornei empreendedor social. Fundei a OMUNGA, Grife Social e Instituto, um empreendimento social que incentiva a cultura da leitura, amplia a visão de mundo e desenvolve potencialidades humanas.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Distribuímos livros, criamos espaços literários, realizamos ações de desenvolvimento de professores no seu próprio território e contribuímos para a valorização e perpetuação de memórias. Sempre, unicamente, para atender crianças e professores das regiões mais distantes e isoladas do Brasil.
            </p>
            <p className="text-2xl font-medium">E, eu me preenchi. Me encontrei.</p>
          </motion.div>
        </div>
      </section>

      {/* Story Part 3: Depth */}
      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto space-y-16">
          <motion.div {...fadeIn} className="space-y-12 text-2xl md:text-4xl font-light leading-tight">
            <p>Se não há uma travessia de barco pela Amazônia… horas no lombo de um búfalo na Ilha do Marajó… ou dias de caminhada aos pés do Monte Roraima… <span className="text-gray-500 italic">parece que falta algo.</span></p>
            
            <p>Se não há um ancião ou uma anciã para compartilhar saberes antigos… <span className="text-gray-500 italic">o caminho perde profundidade.</span></p>
            
            <p>Se não encontro o olhar curioso de uma criança diante de um livro pela primeira vez… <span className="text-gray-500 italic">a travessia perde brilho.</span></p>
            
            <p>E, se eu não posso compartilhar o que vivo e o que aprendo… <span className="text-gray-500 italic">a jornada deixa de ser encontro e se torna apenas caminho solitário.</span></p>
          </motion.div>
        </div>
      </section>

      {/* Story Part 4: Today */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn} className="space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              Sou empreendedor social, palestrante e um escritor em construção. Vivo entre expedições, Florianópolis, com seus pores do sol e um certo “beach office”, e Joinville, no escritório da OMUNGA, reencontrando pessoas que amo.
            </p>
            <div className="space-y-2 text-gray-400 italic">
              <p>Já fui uma criança inocente, medrosa e feliz.</p>
              <p>Já fui um adolescente inseguro e curioso.</p>
              <p>Já vivi uma vida corporativa precoce.</p>
              <p>Já me perdi no mundo, tentando me encontrar.</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <motion.img {...fadeIn} src="/image/roberto-pascoal-retrato-2.webp" className="w-full aspect-square object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
            <motion.img {...fadeIn} transition={{ delay: 0.2 }} src="/image/roberto-pascoal-retrato-3.webp" className="w-full aspect-square object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500 mt-8" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="py-48 px-6 bg-gray-50 text-center">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Hoje…</h2>
          <div className="space-y-4 text-xl md:text-2xl font-light text-gray-600">
            <p>Busco aquilo que me preenche.</p>
            <p>O que amplia minha consciência.</p>
            <p>O que me torna mais humano.</p>
            <p className="text-black font-medium text-3xl md:text-4xl pt-4">E sigo caminhando.</p>
          </div>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Com coragem, persistência e resiliência. E, principalmente… com fé na humanidade, mesmo quando, por vezes, ela parece se perder.
          </p>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs uppercase tracking-[0.2em] text-gray-400">
        © {new Date().getFullYear()} Roberto Pascoal — Sobre Mim
      </footer>
    </div>
  );
};

export default SobreMim;
