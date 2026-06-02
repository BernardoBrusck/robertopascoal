import React, { useEffect, useRef, useState } from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { CheckCircle2, MapPin, Calendar, Users, Clock, Building2, User, Mail, Phone, MessageSquare, ArrowRight, Paperclip, Trash2, UploadCloud, FileText, Check, Loader2, Play } from "lucide-react";

export default function Palestras() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

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
            className="w-full h-full object-cover opacity-90"
          />
          {/* Fades escuros apenas no vídeo (topo e base) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>
        <motion.div
          {...fadeIn}
          className="relative z-10 text-center px-6 w-full flex flex-col items-center"
        >
          <h1 className="text-3xl md:text-5xl lg:text-[3rem] font-light tracking-[0.2em] max-w-5xl mx-auto text-white drop-shadow-lg">
            <span className="block mb-2 md:mb-4">SENTIDO, PRESENÇA</span>
            <span className="block">& EXECUÇÃO</span>
          </h1>
        </motion.div>
      </section>

      {/* Block 02: Texto Palestra 01 */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-white flex justify-center">
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
              A partir de experiências reais vividas desde o Caminho de Santiago de Compostela até a África, passando por algumas das regiões mais distantes do Brasil, como o Sertão, Amazônia e o Monte Roraima, Pascoal conduz uma reflexão profunda e prática sobre:
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
      <section ref={parallaxRef} className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            style={{ y: yParallax, scale: 1.15 }}
            src="/image/foto-roberto-04.webp"
            alt="Roberto Palestrando"
            className="absolute inset-0 w-full h-full object-cover object-top will-change-transform transform-gpu"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Overlay escuro na imagem inteira para garantir contraste com o texto */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        
        {/* Fade escuro apenas na borda inferior */}
        <div className="absolute bottom-0 inset-x-0 h-32 md:h-56 bg-gradient-to-t from-black to-transparent     pointer-events-none" />

        <motion.div {...fadeIn} className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-12">
            <h2 className="flex flex-col items-center gap-8 text-white text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.2em]">
              <span>AUTOCONHECIMENTO</span>
              <span>É ESTRATÉGIA</span>
            </h2>
            <p className="text-sm md:text-base uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-300 font-normal">
              para mais sentido, performance e resultados.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Block 04: Texto Palestra 02 */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-16">
          <motion.div {...fadeIn} className="space-y-12">
        
            <p className="text-2xl md:text-4xl font-light text-black max-w-3xl" style={{ lineHeight: '1.8' }}>
              Com histórias reais, imagens impactantes e uma narrativa envolvente, a palestra resulta nos seguintes resultados:
            </p>

            <div className="flex flex-col gap-4 text-xl md:text-3xl font-light italic text-gray-600 leading-[1.8]">
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
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-200" style={{ lineHeight: '1.9' }}>
              Porque não se trata de fazer mais. <br />
              Se trata de fazer com mais significancia. <br />
              <span className="font-medium text-white">Consequentemente, fazer melhor.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Block 06: Para quem é */}
      <section className="pt-12 md:pt-16 pb-6 md:pb-8 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-3xl w-full">

          <motion.div {...fadeIn} className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-center">Para quem é essa palestra</h2>
            <div className="space-y-8 max-w-xl mx-auto">
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

        </div>
      </section>

      {/* Block 05: Depoimentos (Refined) */}
      <section className="pt-6 md:pt-8 pb-12 md:pb-16 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-7xl w-full space-y-10">
          <motion.div {...fadeIn} className="flex flex-col items-center text-center space-y-2">
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
      <section className="pt-12 md:pt-16 pb-4 md:pb-6 px-6 lg:px-12 bg-white flex justify-center text-black">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <motion.div {...fadeIn} className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black">
              Respira fundo e <span className="italic font-medium">aperte o play!</span>
            </h2>
          </motion.div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              { id: "QaNPAbncsVw", title: "Caldeirão Roberto Pascoal", delay: 0.1 },
              { id: "paB2pg9pB98", title: "TEDx Roberto Pascoal", delay: 0.2 }
            ].map((video) => (
              <motion.div key={video.id} {...fadeIn} transition={{ delay: video.delay }} className="group">
                <div className="relative aspect-video bg-gray-100 shadow-xl overflow-hidden rounded-xl border border-gray-100">
                  {activeVideos[video.id] ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      onClick={() => setActiveVideos((prev) => ({ ...prev, [video.id]: true }))}
                      className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-300 flex items-center justify-center" />
                      <div className="absolute z-10 w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                        <Play className="w-6 h-6 fill-black ml-1 text-black" />
                      </div>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 10: Provocação Final */}
      <section className="pt-12 md:pt-16 pb-4 md:pb-6 px-6 bg-white text-center flex flex-col items-center justify-center">
        <motion.div {...fadeIn} className="max-w-4xl space-y-8">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight" style={{ lineHeight: '1.7' }}>
            Se você busca uma palestra <br className="hidden md:block" /> que não apenas inspire, <br className="hidden md:block" />
            <span className="italic font-medium text-gray-500">mas gere reflexão,<br></br> alinhamento e ação…</span>
          </h2>
          <div className="pt-4 flex flex-col items-center">
            <p className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter">Vamos conversar.</p>
          </div>
        </motion.div>
      </section>

      {/* Block 11b: Notícias Carousel */}
      <section className="pt-4 md:pt-8 pb-8 md:pb-12 bg-white relative flex flex-col justify-center overflow-hidden">
  
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
        
        <div className="relative w-full overflow-hidden flex z-0 hide-scrollbar">
          <div className="animate-marquee-noticias flex gap-4 md:gap-8 items-center px-4 md:px-8">
            {[
              { file: "Captura de tela 2026-05-07 211432.png", link: "https://www.metropoles.com/brasil/projeto-roraima-povos-indigenas" },
              { file: "Captura de tela 2026-05-07 211621.png", link: "https://g1.globo.com/sc/santa-catarina/videos-jornal-do-almoco-joinville/video/ong-omunga-vai-retomar-alfabetizacao-de-criancas-e-adolescentes-em-atalaia-do-norte-11378591.ghtml" },
              { file: "Captura de tela 2026-05-07 212135.png", link: "https://www.gov.br/cultura/pt-br/assuntos/noticias/projeto-viabilizado-pela-lei-rouanet-estimula-leitura-e-preservacao-dos-saberes-originarios-no-extremo-norte-do-pais" },
              { file: "Captura de tela 2026-05-07 212552.png", link: "https://revistapegn.globo.com/Negocio-social/noticia/2019/02/ele-criou-um-negocio-social-que-constroi-bibliotecas-em-areas-de-vulnerabilidade.html" },
              { file: "Captura de tela 2026-05-07 212633.png", link: "https://tedxblumenau.com.br/speakers/roberto-pascoal-2/" },
              { file: "Captura de tela 2026-05-07 212901.png", link: "https://globoplay.globo.com/v/8176263/" },
              { file: "Captura de tela 2026-05-07 214747.png", link: "https://www.nsctotal.com.br/colunistas/rejane-gambin/fazendo-do-mundo-um-lugar-melhor" },
              // Duplicate for infinite scroll
              { file: "Captura de tela 2026-05-07 211432.png", link: "https://www.metropoles.com/brasil/projeto-roraima-povos-indigenas" },
              { file: "Captura de tela 2026-05-07 211621.png", link: "https://g1.globo.com/sc/santa-catarina/videos-jornal-do-almoco-joinville/video/ong-omunga-vai-retomar-alfabetizacao-de-criancas-e-adolescentes-em-atalaia-do-norte-11378591.ghtml" },
              { file: "Captura de tela 2026-05-07 212135.png", link: "https://www.gov.br/cultura/pt-br/assuntos/noticias/projeto-viabilizado-pela-lei-rouanet-estimula-leitura-e-preservacao-dos-saberes-originarios-no-extremo-norte-do-pais" },
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
                  className="h-48 md:h-56 lg:h-64 w-auto object-cover border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  draggable="false"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Block 11c: Logos Jornais Estáticos */}
      <section className="pb-8 md:pb-10 px-6 lg:px-12 bg-white flex justify-center">
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

      {/* Block 12: Formulário */}
      <section id="orcamento" className="pt-4 md:pt-6 pb-12 md:pb-16 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-3xl w-full">
          {submitSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white text-neutral-900 p-10 md:p-12 rounded-2xl text-center space-y-6 max-w-xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-150/60"
            >
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-900">
                <Check className="w-8 h-8 text-neutral-900" />
              </div>
              <h3 className="text-3xl font-light tracking-tight text-neutral-900">Mensagem Enviada!</h3>
              <p className="text-neutral-500 font-light leading-relaxed text-sm md:text-base max-w-md mx-auto">
                Sua solicitação de orçamento foi enviada com sucesso para <span className="text-neutral-900 font-normal">roberto@robertopascoal.com</span>. Retornaremos o contato o mais breve possível.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFormData({
                      nome: '',
                      email: '',
                      assunto: '',
                      mensagem: ''
                    });
                  }}
                  className="px-8 py-4 bg-neutral-950 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-900 transition-all rounded-xl shadow-md"
                >
                  Enviar outra mensagem
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <motion.div {...fadeIn} className="space-y-4 text-center">
                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black">Solicitar <span className="italic font-medium">Orçamento</span></h2>
                <p className="text-neutral-500 font-light text-base md:text-lg max-w-xl mx-auto leading-[1.6]">
                  Preencha os campos abaixo para enviar sua mensagem e solicitar uma proposta personalizada para o seu evento.
                </p>
              </motion.div>

              <motion.form 
                onSubmit={handleSubmit} 
                {...fadeIn} 
                className="max-w-3xl mx-auto space-y-6 text-black bg-white p-6 md:p-10 rounded-2xl border border-gray-150/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-800">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-neutral-500 focus:bg-white focus:ring-1 focus:ring-neutral-500/25 px-4 py-3.5 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none text-sm transition-all"
                      placeholder="Como gostaria de ser chamado?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-800">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-neutral-500 focus:bg-white focus:ring-1 focus:ring-neutral-500/25 px-4 py-3.5 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none text-sm transition-all"
                      placeholder="seu-email@empresa.com.br"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-800">
                    Assunto
                  </label>
                  <input
                    type="text"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-neutral-500 focus:bg-white focus:ring-1 focus:ring-neutral-500/25 px-4 py-3.5 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none text-sm transition-all"
                    placeholder="Ex: Orçamento para Palestra de Liderança"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-800">
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50/50 border border-gray-200/80 focus:border-neutral-500 focus:bg-white focus:ring-1 focus:ring-neutral-500/25 px-4 py-3.5 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none text-sm min-h-[160px] resize-y leading-relaxed transition-all"
                    placeholder="Detalhe o formato do evento, público estimado, datas prováveis e os objetivos que deseja alcançar..."
                    required
                  />
                </div>

                {/* Submission Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-neutral-950 text-white hover:bg-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando Mensagem...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            </div>
          )}
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
