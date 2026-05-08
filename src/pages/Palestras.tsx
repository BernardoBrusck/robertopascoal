import React, { useEffect, useRef } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { CheckCircle2, MapPin, Calendar, Users, Clock, Building2, User, Mail, Phone, MessageSquare, ArrowRight } from "lucide-react";

export default function Palestras() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  };

  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#orcamento') {
      setTimeout(() => {
        const el = document.getElementById('orcamento');
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 500);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <NavbarAlt />

      {/* Block 01: Hero Abertura */}
      <section className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
          <video
            src="/video/Palestra.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-75"
          />
          {/* Fades escuros apenas no vídeo (topo e base) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>
        <motion.div
          {...fadeIn}
          className="relative z-10 text-center px-6 w-full flex flex-col items-center"
        >
          <h1 className="text-3xl md:text-5xl lg:text-[3rem] font-light tracking-[0.2em] max-w-5xl mx-auto text-white drop-shadow-lg">
            <span className="block mb-2 md:mb-4">SENTIDO, PRESENÇA</span>
            <span className="block">& EXECUÇÃO.</span>
          </h1>
        </motion.div>
      </section>

      {/* Block 02: Texto Palestra 01 */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <motion.div {...fadeIn} className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-[2.75rem] lg:text-5xl font-light tracking-tight text-black">
              <span className="block leading-[1.2]">Palestras de</span>
              <span className="block font-medium italic leading-[1.2] mb-2 md:mb-1">alto impacto</span>
              <span className="block italic leading-[1.2]">
                <span className="font-light">sobre </span><span className="font-medium">consciência,</span><br />
                <span className="font-medium">direção</span><span className="font-light"> e </span><span className="font-medium">execução</span><br />
                <span className="font-light">com </span><span className="font-medium">sentido.</span>
              </span>
            </h2>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex-1 space-y-8 text-lg md:text-xl text-gray-700 font-light leading-[1.8]">
            <p>
              A partir de experiências reais liderando projetos em alguns dos territórios mais remotos da África e do Brasil, Pascoal conduz uma reflexão profunda e prática sobre:
            </p>
            <ul className="space-y-4 text-black font-normal text-base md:text-lg">
              {[
                "Autoconhecimento como estratégia",
                "Autorresponsabilidade como base de liderança",
                "Foco com alma",
                "Propósito aplicado ao dia a dia",
                "Resiliência e tomada de decisão em cenários desafiadores"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center mt-1">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Block 03: Parallax + Frase */}
      <section className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
          <img
            src="/image/foto-roberto-04.webp"
            alt="Roberto Palestrando"
            className="w-full h-[120%] top-[-10%] relative object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Overlay escuro na imagem inteira para garantir contraste com o texto */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        
        {/* Fade escuro apenas na borda inferior */}
        <div className="absolute bottom-0 inset-x-0 h-32 md:h-56 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <motion.div {...fadeIn} className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-light tracking-[0.2em] leading-[1.1] text-white">
            Autoconhecimento <br />
            <span className="tracking-[0.2em]">é estratégia</span> <br />
            <span className="text-lg md:text-2xl uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-300 font-normal block mt-10">
              para significância, performance e resultados.
            </span>
          </h2>
        </motion.div>
      </section>

      {/* Block 04: Texto Palestra 02 */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-16">
          <motion.div {...fadeIn} className="space-y-12">
            <h3 className="text-xs uppercase tracking-[0.4em] text-gray-400 font-semibold">
              Mais do que inspirar. Provocar um movimento consciente.
            </h3>
            <p className="text-2xl md:text-4xl font-light leading-[1.6] text-black max-w-3xl">
              Com histórias reais, imagens impactantes e uma narrativa envolvente, a palestra resulta nos seguintes resultados:
            </p>

            <div className="flex flex-col gap-4 text-xl md:text-3xl font-light italic text-gray-600">
              <p>As pessoas se reconhecem</p>
              <p>Se responsabilizam</p>
              <p>Se apropriam de prática com mais clareza e direção</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Block 04b: Provocação com Imagem */}
      <section className="relative h-[70vh] md:h-[90vh] w-full px-6 lg:px-12 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/image/foto-roberto-09-expanded.webp"
            alt="Roberto Pascoal"
            className="w-full h-full object-cover object-[center_39%]"
          />
          <div className="absolute inset-0 bg-black/50" /> {/* Escurecer a imagem para leitura */}
        </div>

        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
          <motion.div {...fadeIn}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-gray-200">
              Porque não se trata de fazer mais. <br />
              Se trata de fazer com sentido. <br />
              <span className="font-medium text-white">Consequentemente, fazer melhor.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Block 06: Para quem é & Temas */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          <motion.div {...fadeIn} className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Para quem é essa palestra</h2>
            <div className="space-y-8">
              {[
                "Empresas que desejam fortalecer cultura e propósito.",
                "Lideranças que buscam mais consciência e responsabilidade.",
                "Times que precisam de direção, engajamento e energia real.",
                "Eventos que querem ir além do conteúdo e gerar transformação."
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start border-b border-gray-200 pb-6">
                  <div className="text-2xl md:text-4xl font-light text-black/30 mt-[-4px] md:mt-[-8px]">0{i + 1}</div>
                  <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Temas abordados</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Autoconhecimento", "Autorresponsabilidade", "Foco com Alma",
                "Motivação com sentido", "Vendas com propósito",
                "Superação e resiliência", "Resultados sustentáveis"
              ].map((tema, i) => (
                <span
                  key={i}
                  className="px-5 py-3 border border-gray-300 text-sm tracking-wider text-gray-700 font-medium hover:bg-black hover:text-white hover:border-black transition-colors duration-300"
                >
                  {tema}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Block 05: Depoimentos (Refined) */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-7xl w-full space-y-20">
          <motion.div {...fadeIn} className="flex flex-col items-center text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold">Experiência</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">O que dizem <span className="italic font-medium">quem já viveu</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                text: "O trabalho realizado pelo Pascoal impacta positiva e sustentavelmente as comunidades. Ele emprega o empreendedorismo social de forma séria e empática, fazendo a diferença. Suas palestras aproximam a audiência dessa essencial e profunda conscientização.",
                author: "Luciane Schwalbe",
                company: "Consultora/Professora UNISINOS",
                image: "/image/Luciane.webp"
              },
              {
                text: "Você pode viver um propósito e ser protagonista em qualquer lugar, seja empreendendo ou atuando em uma grande empresa. A palestra de Roberto Pascoal nos fez refletir intensamente sobre isso: o verdadeiro sentido de nossas ações e as nossas responsabilidades.",
                author: "Fernanda Vanolli Schulte",
                company: "Sustentabilidade - Tigre",
                image: "/image/Fernanda.webp"
              },
              {
                text: "A palestra de Roberto Pascoal proporcionou a reflexão sobre outros caminhos para empreender, além dos tradicionais. Potencializando uma vida com mais propósito, significância e protagonismo para gerar oportunidades e qualidade de vida para quem mais precisa.",
                author: "Simone Brandão",
                company: "Coord. Moda SENAI/SC",
                image: "/image/Simone.webp"
              }
            ].map((dep, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col h-full space-y-8"
              >
                <div className="text-4xl text-gray-300 font-serif leading-none h-6">"</div>
                <p className="text-lg md:text-xl italic text-gray-700 font-light leading-[1.8] flex-grow">
                  {dep.text}
                </p>
                <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    {dep.image ? (
                      <img src={dep.image} alt={dep.author} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-medium text-black">{dep.author}</p>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-gray-500 mt-1">{dep.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 06: Logos Carousel */}
      <section className="py-8 md:py-12 bg-white relative flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <motion.div {...fadeIn} className="text-center mb-20 relative z-20">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight">Palestras <span className="italic font-medium">realizadas</span></h2>
        </motion.div>
        
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
        `}</style>

        <div className="animate-marquee items-center gap-16 md:gap-24 px-8 md:px-12">
          {[
            { file: "anage-select.3fef92eb.svg", link: "https://www.anageimoveis.com.br/" },
            { file: "fiesc-senai-1.webp", link: "https://fiesc.com.br/pt-br/" },
            { file: "img_92821242827122_ciepe__BANNER_site1.webp", link: "https://unidavi.edu.br/ciepe" },
            { file: "logo-sebrae.webp", link: "https://digital.sebraesp.com.br/" },
            { file: "TEDx-Logo.webp", link: "https://tedxblumenau.com.br/" },
            { file: "tigre-logo-2.webp", link: "https://www.tigre.com.br/" },
            { file: "Univali.webp", link: "https://www.univali.br/" },
            { file: "anage-select.3fef92eb.svg", link: "https://www.anageimoveis.com.br/" },
            { file: "fiesc-senai-1.webp", link: "https://fiesc.com.br/pt-br/" },
            { file: "img_92821242827122_ciepe__BANNER_site1.webp", link: "https://unidavi.edu.br/ciepe" },
            { file: "logo-sebrae.webp", link: "https://digital.sebraesp.com.br/" },
            { file: "TEDx-Logo.webp", link: "https://tedxblumenau.com.br/" },
            { file: "tigre-logo-2.webp", link: "https://www.tigre.com.br/" },
            { file: "Univali.webp", link: "https://www.univali.br/" },
            { file: "anage-select.3fef92eb.svg", link: "https://www.anageimoveis.com.br/" },
            { file: "fiesc-senai-1.webp", link: "https://fiesc.com.br/pt-br/" },
            { file: "img_92821242827122_ciepe__BANNER_site1.webp", link: "https://unidavi.edu.br/ciepe" },
            { file: "logo-sebrae.webp", link: "https://digital.sebraesp.com.br/" },
            { file: "TEDx-Logo.webp", link: "https://tedxblumenau.com.br/" },
            { file: "tigre-logo-2.webp", link: "https://www.tigre.com.br/" },
            { file: "Univali.webp", link: "https://www.univali.br/" },
            { file: "anage-select.3fef92eb.svg", link: "https://www.anageimoveis.com.br/" },
            { file: "fiesc-senai-1.webp", link: "https://fiesc.com.br/pt-br/" },
            { file: "img_92821242827122_ciepe__BANNER_site1.webp", link: "https://unidavi.edu.br/ciepe" },
            { file: "logo-sebrae.webp", link: "https://digital.sebraesp.com.br/" },
            { file: "TEDx-Logo.webp", link: "https://tedxblumenau.com.br/" },
            { file: "tigre-logo-2.webp", link: "https://www.tigre.com.br/" },
            { file: "Univali.webp", link: "https://www.univali.br/" }
          ].map((logo, i) => (
            <a 
              key={i} 
              href={logo.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
              draggable="false"
            >
              <img 
                src={`/logos/${logo.file}`} 
                alt="Logo Instituição" 
                className="h-10 md:h-12 object-contain opacity-100 grayscale-0 group-hover:grayscale group-hover:opacity-50 transition-all duration-700"
                draggable="false"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Block 11: Vídeos */}
      <section className="pt-16 md:pt-24 pb-4 md:pb-8 px-6 lg:px-12 bg-white flex justify-center text-black">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <motion.div {...fadeIn} className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black">
              Respira fundo e <span className="italic font-medium">aperte o play!</span>
            </h2>
          </motion.div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
              <div className="relative aspect-video bg-gray-100 shadow-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/QaNPAbncsVw"
                  title="Caldeirão Roberto Pascoal"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <div className="relative aspect-video bg-gray-100 shadow-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/paB2pg9pB98"
                  title="TEDx Roberto Pascoal"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 11b: Notícias Carousel */}
      <section className="pt-4 md:pt-8 pb-8 md:pb-12 bg-white relative flex flex-col justify-center overflow-hidden">
        <motion.div {...fadeIn} className="text-center mb-6 relative z-20">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold">Na mídia</span>
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <style>{`
          .animate-marquee-noticias {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
          .animate-marquee-noticias:hover {
            animation-play-state: paused;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        
        {/* Usamos overflow-x-auto nativo para permitir arrastar no mobile, e no desktop ele pausa com hover */}
        <div className="relative w-full overflow-x-auto flex z-0 hide-scrollbar cursor-grab active:cursor-grabbing">
          <div className="animate-marquee-noticias flex gap-4 md:gap-8 items-center px-4 md:px-8">
            {[
              { file: "Captura de tela 2026-05-07 211432.png", link: "https://www.metropoles.com/brasil/projeto-roraima-povos-indigenas" },
              { file: "Captura de tela 2026-05-07 211621.png", link: "https://g1.globo.com/sc/santa-catarina/videos-jornal-do-almoco-joinville/video/ong-omunga-vai-retomar-alfabetizacao-de-criancas-e-adolescentes-em-atalaia-do-norte-11378591.ghtml" },
              { file: "Captura de tela 2026-05-07 212135.png", link: "https://www.gov.br/cultura/pt-br/assuntos/noticias/projeto-viabilizado-pela-lei-rouanet-estimula-leitura-e-preservacao-dos-saberes-originarios-no-extremo-norte-do-pais" },
              { file: "Captura de tela 2026-05-07 212210.png", link: "https://www.estadao.com.br/viagem/viagens-plasticas/disparates-do-sertao/?srsltid=AfmBOooNkR1f6ZLy8TonQa6mxALORYPUxSRoxAZsZUa0aYzOL0ruJPJk" },
              { file: "Captura de tela 2026-05-07 212552.png", link: "https://revistapegn.globo.com/Negocio-social/noticia/2019/02/ele-criou-um-negocio-social-que-constroi-bibliotecas-em-areas-de-vulnerabilidade.html" },
              { file: "Captura de tela 2026-05-07 212633.png", link: "https://tedxblumenau.com.br/speakers/roberto-pascoal-2/" },
              { file: "Captura de tela 2026-05-07 212901.png", link: "https://globoplay.globo.com/v/8176263/" },
              { file: "Captura de tela 2026-05-07 214747.png", link: "https://www.nsctotal.com.br/colunistas/rejane-gambin/fazendo-do-mundo-um-lugar-melhor" },
              // Duplicate for infinite scroll
              { file: "Captura de tela 2026-05-07 211432.png", link: "https://www.metropoles.com/brasil/projeto-roraima-povos-indigenas" },
              { file: "Captura de tela 2026-05-07 211621.png", link: "https://g1.globo.com/sc/santa-catarina/videos-jornal-do-almoco-joinville/video/ong-omunga-vai-retomar-alfabetizacao-de-criancas-e-adolescentes-em-atalaia-do-norte-11378591.ghtml" },
              { file: "Captura de tela 2026-05-07 212135.png", link: "https://www.gov.br/cultura/pt-br/assuntos/noticias/projeto-viabilizado-pela-lei-rouanet-estimula-leitura-e-preservacao-dos-saberes-originarios-no-extremo-norte-do-pais" },
              { file: "Captura de tela 2026-05-07 212210.png", link: "https://www.estadao.com.br/viagem/viagens-plasticas/disparates-do-sertao/?srsltid=AfmBOooNkR1f6ZLy8TonQa6mxALORYPUxSRoxAZsZUa0aYzOL0ruJPJk" },
              { file: "Captura de tela 2026-05-07 212552.png", link: "https://revistapegn.globo.com/Negocio-social/noticia/2019/02/ele-criou-um-negocio-social-que-constroi-bibliotecas-em-areas-de-vulnerabilidade.html" },
              { file: "Captura de tela 2026-05-07 212633.png", link: "https://tedxblumenau.com.br/speakers/roberto-pascoal-2/" },
              { file: "Captura de tela 2026-05-07 212901.png", link: "https://globoplay.globo.com/v/8176263/" },
              { file: "Captura de tela 2026-05-07 214747.png", link: "https://www.nsctotal.com.br/colunistas/rejane-gambin/fazendo-do-mundo-um-lugar-melhor" }
            ].map((noticia, i) => (
              <a 
                key={i} 
                href={noticia.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block flex-shrink-0"
                draggable="false"
              >
                <img 
                  src={`/jornal-midia/${noticia.file}`} 
                  alt="Notícia" 
                  className="h-64 md:h-80 lg:h-96 w-auto object-cover border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  draggable="false"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Block 11c: Logos Jornais Estáticos */}
      <section className="pb-16 md:pb-24 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-5xl w-full flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {[
            { file: "Jovem_Pan_logo.svg", link: "https://jovempan.com.br/" },
            { file: "Logotipo_G1.png", link: "https://g1.globo.com/sc/santa-catarina/videos-jornal-do-almoco-joinville/video/ong-omunga-vai-retomar-alfabetizacao-de-criancas-e-adolescentes-em-atalaia-do-norte-11378591.ghtml" },
            { file: "NSC-Laranja-solido.png", link: "https://www.nsctotal.com.br/colunistas/rejane-gambin/fazendo-do-mundo-um-lugar-melhor" },
            { file: "Rictv.webp", link: "https://ric.com.br/" },
            { file: "TV_Globo_logo_(April_2025).png", link: "https://globoplay.globo.com/v/8176263/" },
            { file: "CBN_logo.svg", link: "https://cbn.globoradio.globo.com/" }
          ].map((logo, i) => (
            <a 
              key={i} 
              href={logo.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <img 
                src={`/jornal-midia/logo-jornal/${logo.file}`} 
                alt="Jornal Logo" 
                className="h-8 md:h-12 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Block 10: Provocação Final */}
      <section className="py-20 md:py-32 px-6 bg-white text-center flex flex-col items-center justify-center">
        <motion.div {...fadeIn} className="max-w-4xl space-y-16">
          <h2 className="text-3xl md:text-5xl font-light leading-[1.4] tracking-tight">
            Se você busca uma palestra que não apenas inspire, <br className="hidden md:block" />
            <span className="italic font-medium text-gray-500">mas gere reflexão, alinhamento e ação…</span>
          </h2>
          <div className="pt-8 flex flex-col items-center">
            <p className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter">Vamos conversar.</p>
          </div>
        </motion.div>
      </section>

      {/* Block 12: Formulário */}
      <section id="orcamento" className="py-16 md:py-24 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-3xl w-full">
          <motion.div {...fadeIn} className="mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">Solicitar <span className="italic font-medium">Orçamento</span></h2>
            <p className="text-gray-500 font-light text-lg md:text-xl leading-[1.6]">
              Quanto mais detalhes, mais assertivo será nosso retorno. Capriche na descrição da sua oportunidade.
            </p>
          </motion.div>

          <motion.form {...fadeIn} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField label="Nome da Empresa" />
              <FormField label="Agência (Se aplicar)" />
              <FormField label="Nome do contato" />
              <FormField label="E-mail" type="email" />
              <FormField label="Telefone" type="tel" />
              <FormField label="Cidade do Evento" />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Estado" />
                <FormField label="Data" type="date" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Hora" type="time" />
                <FormField label="Público Est." />
              </div>
            </div>
            <FormField label="Outros palestrantes (se aplicar)" />

            <div className="space-y-3 pt-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold ml-1">
                Descrição da Oportunidade
              </label>
              <textarea
                className="w-full bg-white border border-gray-200 p-5 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all min-h-[160px] text-black font-light resize-y"
                placeholder="Conte-nos mais sobre o seu evento, objetivos e o que espera da palestra..."
              />
            </div>

            <div className="pt-8">
              <button className="w-full md:w-auto px-12 py-5 bg-black text-white text-xs uppercase tracking-[0.3em] font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-4 group">
                Enviar Solicitação
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white text-center flex flex-col items-center gap-4">
        <div className="w-12 h-[1px] bg-gray-200" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
          © {new Date().getFullYear()} Roberto Pascoal — Palestras
        </span>
      </footer>
    </div>
  );
}

const FormField = ({ label, type = "text" }: { label: string, type?: string }) => (
  <div className="space-y-3">
    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold ml-1">
      {label}
    </label>
    <input
      type={type}
      className="w-full bg-white border border-gray-200 px-5 py-4 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-black font-light"
    />
  </div>
);
