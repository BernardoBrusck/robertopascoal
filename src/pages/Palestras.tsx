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
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light tracking-[0.2em] max-w-5xl mx-auto text-white drop-shadow-lg">
            <span className="block mb-2 md:mb-4">SENTIDO, PRESENÇA</span>
            <span className="block">& EXECUÇÃO.</span>
          </h1>
        </motion.div>
      </section>

      {/* Block 02: Texto Palestra 01 */}
      <section className="py-24 md:py-36 px-6 lg:px-12 bg-white flex justify-center">
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
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center bg-[#f8f8f8]">
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
          <img
            src="/image/roberto-pascoal-retrato-2.webp"
            alt="Roberto Palestrando"
            className="w-full h-[130%] -top-[15%] relative object-cover grayscale opacity-20"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

        <motion.div {...fadeIn} className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-light tracking-tight leading-[1.1] text-black">
            Autoconhecimento <br />
            <span className="italic font-medium">é estratégia</span> <br />
            <span className="text-lg md:text-2xl uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 font-normal block mt-10">
              para significância, execução e resultados.
            </span>
          </h2>
        </motion.div>
      </section>

      {/* Block 04: Texto Palestra 02 */}
      <section className="py-24 md:py-36 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-16">
          <motion.div {...fadeIn} className="w-px h-16 bg-gray-300" />

          <motion.div {...fadeIn} className="space-y-12">
            <h3 className="text-xs uppercase tracking-[0.4em] text-gray-400 font-semibold">
              Mais do que inspirar. Provocar movimento.
            </h3>
            <p className="text-2xl md:text-4xl font-light leading-[1.6] text-black max-w-3xl">
              Com histórias reais, imagens impactantes e uma narrativa envolvente, a palestra gera um efeito claro:
            </p>

            <div className="flex flex-col gap-4 text-xl md:text-3xl font-light italic text-gray-600">
              <p>As pessoas se reconhecem</p>
              <p>Se responsabilizam</p>
              <p>E voltam para a prática com mais clareza e direção</p>
            </div>

            <div className="pt-12">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-800">
                Porque não se trata de fazer mais. <br />
                <span className="font-medium text-black">Se trata de fazer melhor e com sentido.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Block 06: Para quem é & Temas */}
      <section className="py-24 md:py-36 px-6 lg:px-12 bg-gray-50 border-t border-b border-gray-100 flex justify-center">
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
                  <div className="text-xs font-semibold mt-1">0{i + 1}</div>
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
      <section className="py-24 md:py-36 px-6 lg:px-12 bg-white flex justify-center">
        <div className="max-w-7xl w-full space-y-20">
          <motion.div {...fadeIn} className="flex flex-col items-center text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold">Experiência</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">O que dizem <span className="italic font-medium">quem já viveu</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                text: "Uma palestra que mexe com a alma e nos faz repensar nossa liderança de forma prática. É como se ele falasse diretamente com as dores e angústias que guardamos no corporativo.",
                author: "Diretora Executiva",
                company: "Multinacional de Tecnologia"
              },
              {
                text: "Roberto traz uma verdade que raramente vemos. Essencial para times de alta performance que esqueceram o porquê fazem o que fazem.",
                author: "Gerente de RH",
                company: "Grande Varejista"
              },
              {
                text: "Impactante, real e transformador. O conteúdo fica com a gente muito depois da palestra acabar. Os feedbacks da equipe foram os melhores do ano.",
                author: "Organizador",
                company: "Fórum de Liderança"
              }
            ].map((dep, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col justify-between space-y-8"
              >
                <div className="text-4xl text-gray-300 font-serif leading-none h-6">"</div>
                <p className="text-xl italic text-gray-700 font-light leading-[1.8]">{dep.text}</p>
                <div className="pt-6 border-t border-gray-100">
                  <p className="font-medium text-black">{dep.author}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mt-2">{dep.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 11: Vídeos */}
      <section className="py-24 md:py-32 px-6 lg:px-12 bg-[#0a0a0a] flex justify-center text-white">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeIn} className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-[1.2]">
              Assista e sinta <br /> <span className="italic font-medium text-gray-400">a provocação.</span>
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-400 leading-[1.8] max-w-lg">
              Recortes de momentos em que a plateia se conecta não com o palestrante, mas com suas próprias jornadas.
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="space-y-4">
              <div className="relative aspect-video bg-black shadow-2xl border border-white/10">
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
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium ml-2">TEDx</p>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-4">
              <div className="relative aspect-video bg-black shadow-2xl border border-white/10">
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
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium ml-2">Caldeirão do Huck</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 10: Provocação Final */}
      <section className="py-32 md:py-48 px-6 bg-white text-center flex flex-col items-center justify-center">
        <motion.div {...fadeIn} className="max-w-4xl space-y-16">
          <h2 className="text-3xl md:text-5xl font-light leading-[1.4] tracking-tight">
            Se você busca uma palestra que não apenas inspire, <br className="hidden md:block" />
            <span className="italic font-medium text-gray-500">mas gere reflexão, alinhamento e ação…</span>
          </h2>
          <div className="pt-4 flex flex-col items-center">
            <div className="w-[1px] h-20 bg-black mb-12" />
            <p className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tighter">Vamos conversar.</p>
          </div>
        </motion.div>
      </section>

      {/* Block 12: Formulário */}
      <section id="orcamento" className="py-24 md:py-36 px-6 lg:px-12 bg-gray-50 border-t border-gray-100 flex justify-center">
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
