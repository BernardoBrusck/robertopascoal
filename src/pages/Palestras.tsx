import React from 'react';
import { NavbarAlt } from "@/components/ui/navbar-alt";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Youtube, ExternalLink, CheckCircle2, MapPin, Calendar, Users, Clock, Building2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { useEffect } from "react";

const Palestras = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
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

      {/* Block 01: Abertura (TEDx Loop) */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
          {/* Placeholder for TEDx Video Loop */}
          <img 
            src="/image/palestra-roberto.webp" 
            alt="Roberto Pascoal TEDx" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div 
          {...fadeIn}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-3xl md:text-5xl font-light tracking-tight leading-tight max-w-4xl mx-auto text-white">
            Apenas executar... <br className="md:hidden" />
            <span className="italic font-serif">ou se conectar com o que faz?</span>
          </h1>
          <div className="mt-12 flex justify-center">
            <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm animate-pulse">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Block 02: Texto Palestra 01 */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div {...fadeIn} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light leading-tight">
              As palestras de Roberto Pascoal <span className="font-medium">não são sobre motivação.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">
              São sobre direção, consciência e execução com sentido.
            </p>
          </motion.div>
          <motion.div {...fadeIn} className="space-y-8 text-lg text-gray-600 leading-relaxed">
            <p>
              A partir de experiências reais liderando projetos em alguns dos territórios mais remotos da África e do Brasil como no sertão do Piauí, Amazônia, Ilha do Marajó e Monte Roraima, Roberto conduz uma reflexão profunda e prática sobre:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black font-medium">
              {[
                "Autoconhecimento como estratégia",
                "Autorresponsabilidade como base de liderança",
                "Foco com alma",
                "Propósito aplicado ao dia a dia",
                "Resiliência e tomada de decisão em cenários desafiadores"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-300" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Block 03: Parallax + Frase */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
          <img 
            src="/image/roberto-pascoal-retrato-2.webp" 
            alt="Roberto Palestrando" 
            className="w-full h-full object-cover grayscale opacity-30"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <motion.div {...fadeIn} className="relative z-10 text-center px-6 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-none">
            Autoconhecimento <br />
            <span className="italic font-serif">é estratégia</span> <br />
            <span className="text-2xl md:text-3xl uppercase tracking-[0.2em] text-gray-400 block mt-4">para significância, execução e resultados.</span>
          </h2>
        </motion.div>
      </section>

      {/* Block 04: Texto Palestra 02 */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <motion.h2 {...fadeIn} className="text-sm uppercase tracking-[0.4em] text-gray-400">
            Mais do que inspirar. Provocar movimento.
          </motion.h2>
          <motion.div {...fadeIn} className="space-y-8 text-2xl md:text-3xl font-light leading-relaxed">
            <p>Com histórias reais, imagens impactantes e uma narrativa envolvente, a palestra gera um efeito claro:</p>
            <div className="space-y-4 italic font-serif text-gray-500">
              <p>👉 As pessoas se reconhecem</p>
              <p>👉 Se responsabilizam</p>
              <p>👉 E voltam para a prática com mais clareza e direção</p>
            </div>
            <p className="pt-8 border-t border-gray-100 font-normal">
              Porque não se trata de fazer mais. <br />
              <span className="font-medium">Se trata de fazer melhor e com sentido.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Block 05: Depoimentos */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeIn} className="text-center text-3xl font-light mb-20">O que dizem quem já viveu a experiência</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Uma palestra que mexe com a alma e nos faz repensar nossa liderança de forma prática.",
                author: "Diretor Executivo",
                company: "Multinacional de Tecnologia"
              },
              {
                text: "Roberto traz uma verdade que raramente vemos no mundo corporativo. Essencial para times de alta performance.",
                author: "Gerente de RH",
                company: "Grande Varejista"
              },
              {
                text: "Impactante, real e transformador. O conteúdo fica com a gente muito depois da palestra acabar.",
                author: "Organizador de Eventos",
                company: "Fórum de Liderança"
              }
            ].map((dep, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-sm shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <p className="text-lg italic text-gray-600 leading-relaxed mb-8">"{dep.text}"</p>
                <div>
                  <p className="font-medium">{dep.author}</p>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{dep.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 06: Para quem é */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-light mb-16 text-center">Para quem é essa palestra</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Empresas que desejam fortalecer cultura e propósito",
              "Lideranças que buscam mais consciência e responsabilidade",
              "Times que precisam de direção, engajamento e energia real",
              "Eventos que querem ir além do conteúdo e gerar transformação"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-6 border border-gray-50 rounded-sm hover:border-gray-200 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-black" />
                <p className="text-lg font-light">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 07 & 08: Clientes e Mídia */}
      <section className="py-32 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-12">
            <motion.h2 {...fadeIn} className="text-sm uppercase tracking-[0.4em] text-gray-400">Onde já palestramos</motion.h2>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
              {/* Placeholder for Client Logos */}
              <Building2 className="w-12 h-12" />
              <Building2 className="w-12 h-12" />
              <Building2 className="w-12 h-12" />
              <Building2 className="w-12 h-12" />
              <Building2 className="w-12 h-12" />
            </div>
          </div>
          <div className="text-center space-y-12">
            <motion.h2 {...fadeIn} className="text-sm uppercase tracking-[0.4em] text-gray-400">Na Mídia</motion.h2>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
               <img src="/image/omunga-logo.png" alt="Media 1" className="h-8 grayscale" />
               <div className="text-xl font-serif italic">TEDx</div>
               <div className="text-xl font-bold tracking-tighter">G1</div>
               <div className="text-xl font-medium">Caldeirão</div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 09: Temas Abordados */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-light mb-16 italic font-serif">Temas abordados:</motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Autoconhecimento", "Autorresponsabilidade", "Foco com Alma", 
              "Motivação com sentido", "Vendas com propósito", 
              "Superação e resiliência", "Resultados sustentáveis"
            ].map((tema, i) => (
              <motion.span 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 bg-gray-50 rounded-full text-sm uppercase tracking-widest text-gray-500"
              >
                {tema}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Block 10: Provocação Final */}
      <section className="py-48 px-6 bg-black text-white text-center">
        <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-5xl font-light leading-tight">
            Se você busca uma palestra que não apenas inspire, <br />
            <span className="italic font-serif text-gray-400">mas gere reflexão, alinhamento e ação…</span>
          </h2>
          <div className="pt-8">
            <p className="text-5xl md:text-7xl font-medium tracking-tighter">Vamos conversar.</p>
          </div>
        </motion.div>
      </section>

      {/* Block 11: Vídeos */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/paB2pg9pB98" 
                title="TEDx Roberto Pascoal" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">TEDx</p>
          </div>
          <div className="space-y-4">
            <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/QaNPAbncsVw" 
                title="Caldeirão Roberto Pascoal" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Caldeirão</p>
          </div>
        </div>
      </section>

      {/* Block 12: Formulário */}
      <section id="orcamento" className="py-32 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-light tracking-tight">Solicitar Orçamento</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Quanto mais informações, mais assertivo será o nosso retorno. Capriche na descrição dessa oportunidade.
            </p>
          </motion.div>

          <motion.form {...fadeIn} className="bg-white p-8 md:p-12 shadow-xl rounded-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField label="Nome da Empresa" icon={<Building2 className="w-4 h-4" />} />
              <FormField label="Agência (Se aplicar)" icon={<Building2 className="w-4 h-4" />} />
              <FormField label="Nome do contato" icon={<User className="w-4 h-4" />} />
              <FormField label="E-mail" type="email" icon={<Mail className="w-4 h-4" />} />
              <FormField label="Telefone" type="tel" icon={<Phone className="w-4 h-4" />} />
              <FormField label="Cidade do Evento" icon={<MapPin className="w-4 h-4" />} />
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Estado" />
                <FormField label="Data" type="date" icon={<Calendar className="w-4 h-4" />} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Hora" type="time" icon={<Clock className="w-4 h-4" />} />
                <FormField label="Público Est." icon={<Users className="w-4 h-4" />} />
              </div>
            </div>
            <FormField label="Outros palestrantes (se aplicar)" icon={<User className="w-4 h-4" />} />
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Descrição da Oportunidade
              </label>
              <textarea 
                className="w-full bg-gray-50 border-none p-4 rounded-sm focus:ring-2 focus:ring-black transition-all min-h-[150px]"
                placeholder="Conte-nos mais sobre o seu evento..."
              />
            </div>
            <button className="w-full py-5 bg-black text-white rounded-sm text-sm uppercase tracking-[0.3em] font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-3 group">
              Solicitar Orçamento
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs uppercase tracking-[0.2em] text-gray-400">
        © {new Date().getFullYear()} Roberto Pascoal — Palestras
      </footer>
    </div>
  );
};

const FormField = ({ label, type = "text", icon }: { label: string, type?: string, icon?: React.ReactNode }) => (
  <div className="space-y-2">
    <label className="text-xs uppercase tracking-widest text-gray-400 font-medium flex items-center gap-2">
      {icon}
      {label}
    </label>
    <input 
      type={type}
      className="w-full bg-gray-50 border-none p-4 rounded-sm focus:ring-2 focus:ring-black transition-all"
    />
  </div>
);

export default Palestras;
