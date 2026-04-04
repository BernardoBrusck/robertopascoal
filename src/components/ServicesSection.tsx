import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { X } from 'lucide-react';

declare const gsap: any;

const projects = [
  {
    title: 'Bibliotecas Comunitárias',
    category: 'Educação Social',
    color: '#E8E4DF',
    description:
      'Criação e manutenção de bibliotecas em comunidades carentes, proporcionando acesso ao conhecimento e incentivando o hábito da leitura desde a infância.',
    hoverImage: '/image/roberto-pascoal-comunidade-isolada.webp',
    galleryImages: [
      '/image/roberto-pascoal-comunidade-isolada.webp',
      '/image/roberto-pascoal-criancas-indigenas.webp',
      '/image/roberto-pascoal-leitura-indigena.webp',
      '/image/roberto-pascoal-projetos-africa.webp',
    ],
  },
  {
    title: 'Doação de Livros',
    category: 'Acesso ao Conhecimento',
    color: '#E2E6DE',
    description:
      'Campanhas de arrecadação e distribuição de livros para escolas, presídios e comunidades sem acesso a materiais educativos.',
    hoverImage: '/image/roberto-pascoal-leitura-indigena.webp',
    galleryImages: [
      '/image/roberto-pascoal-leitura-indigena.webp',
      '/image/capa do livro.webp',
      '/image/roberto-pascoal-criancas-indigenas.webp',
      '/image/200229_OMG_4225.webp',
    ],
  },
  {
    title: 'Palestras Transformadoras',
    category: 'Inspiração',
    color: '#E4DDE2',
    description:
      'Palestras motivacionais em escolas, empresas e eventos, compartilhando histórias reais de superação através da educação.',
    hoverImage: '/image/B0119027.webp',
    galleryImages: [
      '/image/B0119027.webp',
      '/image/FOTO ROBERTO 07.webp',
      '/image/FOTO ROBERTO 08 (2).webp',
      '/image/FOTO ROBERTO 09.webp',
    ],
  },
  {
    title: 'Expedições Educacionais',
    category: 'Ação Social',
    color: '#DDDEE4',
    description:
      'Viagens para regiões remotas do Brasil levando materiais escolares, livros e oficinas de capacitação para educadores locais.',
    hoverImage: '/image/roberto-pascoal-caminhada-brasil.webp',
    galleryImages: [
      '/image/roberto-pascoal-caminhada-brasil.webp',
      '/image/01 - África 07 por Max Schwoelk.webp',
      '/image/roberto-pascoal-professor-africa.webp',
      '/image/roberto-pascoal-indigena-interacao.webp',
    ],
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
};

/* ── Project row ── */
function Project({
  index,
  title,
  category,
  setModal,
  onClick,
}: {
  index: number;
  title: string;
  category: string;
  setModal: (m: { active: boolean; index: number }) => void;
  onClick: () => void;
}) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={onClick}
      className="group flex w-full items-center justify-between border-t border-border/40 py-6 md:py-8 cursor-pointer transition-all duration-300 hover:opacity-50"
    >
      <h3
        className="font-medium text-foreground transition-all duration-400 group-hover:translate-x-[-8px]"
        style={{
          fontSize: 'clamp(20px, 2.5vw, 36px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}
      >
        {title}
      </h3>
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-light">
        {category}
      </p>
    </div>
  );
}

/* ── Hover floating modal ── */
function HoverModal({
  modal,
  projects: items,
}: {
  modal: { active: boolean; index: number };
  projects: typeof projects;
}) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    const initGsap = () => {
      if (cancelled) return;
      if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;

      const xMoveContainer = gsap.quickTo(modalContainer.current, 'left', { duration: 0.8, ease: 'power3' });
      const yMoveContainer = gsap.quickTo(modalContainer.current, 'top', { duration: 0.8, ease: 'power3' });
      const xMoveCursor = gsap.quickTo(cursor.current, 'left', { duration: 0.5, ease: 'power3' });
      const yMoveCursor = gsap.quickTo(cursor.current, 'top', { duration: 0.5, ease: 'power3' });
      const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'left', { duration: 0.45, ease: 'power3' });
      const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'top', { duration: 0.45, ease: 'power3' });

      const handleMouseMove = (e: MouseEvent) => {
        const { pageX, pageY } = e;
        xMoveContainer(pageX);
        yMoveContainer(pageY);
        xMoveCursor(pageX);
        yMoveCursor(pageY);
        xMoveCursorLabel(pageX);
        yMoveCursorLabel(pageY);
      };

      window.addEventListener('mousemove', handleMouseMove);
      cleanupRef.current = () => window.removeEventListener('mousemove', handleMouseMove);
    };

    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined' && gsap.quickTo) {
        clearInterval(waitForGsap);
        initGsap();
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);

    return () => {
      cancelled = true;
      clearInterval(waitForGsap);
      clearTimeout(timeout);
      cleanupRef.current?.();
    };
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className="fixed z-[3] pointer-events-none overflow-hidden rounded-md"
        style={{ width: 300, height: 200 }}
      >
        <div
          className="w-full h-full absolute transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {items.map((project) => (
            <div
              key={project.title}
              className="w-full h-full"
            >
              <img
                src={project.hoverImage}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        className="fixed z-[3] flex items-center justify-center rounded-full bg-foreground pointer-events-none"
        style={{ width: 64, height: 64 }}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      />
      <motion.div
        ref={cursorLabel}
        className="fixed z-[3] flex items-center justify-center rounded-full pointer-events-none text-background text-xs font-light"
        style={{ width: 64, height: 64 }}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      >
        Ver
      </motion.div>
    </>
  );
}

/* ── Lightbox ── */
function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 cursor-pointer"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="w-[80vw] max-w-3xl aspect-[4/3] rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
}

/* ── Detail Modal (horizontal) ── */
function DetailModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          closeLightbox();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, onClose, closeLightbox]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-[92vw] max-w-5xl max-h-[85vh] overflow-y-auto bg-background border border-border/20 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Horizontal layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left: text */}
          <div className="flex-shrink-0 md:w-[40%] p-8 md:p-10 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-light mb-4">
              {project.category}
            </p>
            <h2
              className="font-medium text-foreground mb-5"
              style={{
                fontSize: 'clamp(22px, 2.5vw, 36px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h2>
            <p
              className="text-muted-foreground font-light leading-relaxed"
              style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}
            >
              {project.description}
            </p>
          </div>

          {/* Right: gallery */}
          <div className="flex-1 p-6 md:p-8 md:pl-0">
            <div className="grid grid-cols-2 gap-2.5">
              {project.galleryImages.map((src, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-md overflow-hidden cursor-pointer transition-opacity duration-200 hover:opacity-75"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            src={project.galleryImages[lightboxIndex]}
            alt={`${project.title} ${lightboxIndex + 1}`}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main section ── */
const ServicesSection = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2
            className="font-medium text-foreground mb-4"
            style={{
              fontSize: 'clamp(24px, 3.5vw, 48px)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            O que fazemos.
          </h2>
          <p
            className="max-w-md text-muted-foreground font-light leading-relaxed"
            style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}
          >
            Ações que levam educação, cultura e oportunidades para comunidades que mais precisam.
          </p>
        </div>

        {/* List */}
        <div className="relative">
          {projects.map((project, index) => (
            <Project
              key={project.title}
              index={index}
              title={project.title}
              category={project.category}
              setModal={setModal}
              onClick={() => setSelectedProject(project)}
            />
          ))}
          <div className="border-t border-border/40" />
          <HoverModal modal={modal} projects={projects} />
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <DetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
