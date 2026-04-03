import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

declare const gsap: any;

const projects = [
  {
    title: 'Bibliotecas Comunitárias',
    category: 'Educação Social',
    color: '#E8E4DF',
    description: 'Criação e manutenção de bibliotecas em comunidades carentes, proporcionando acesso ao conhecimento e incentivando o hábito da leitura desde a infância.',
    src: '',
  },
  {
    title: 'Doação de Livros',
    category: 'Acesso ao Conhecimento',
    color: '#E2E6DE',
    description: 'Campanhas de arrecadação e distribuição de livros para escolas, presídios e comunidades sem acesso a materiais educativos.',
    src: '',
  },
  {
    title: 'Palestras Transformadoras',
    category: 'Inspiração',
    color: '#E4DDE2',
    description: 'Palestras motivacionais em escolas, empresas e eventos, compartilhando histórias reais de superação através da educação.',
    src: '',
  },
  {
    title: 'Expedições Educacionais',
    category: 'Ação Social',
    color: '#DDDEE4',
    description: 'Viagens para regiões remotas do Brasil levando materiais escolares, livros e oficinas de capacitação para educadores locais.',
    src: '',
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
      className="group flex w-full items-center justify-between border-t border-border/40 py-6 md:py-8 px-4 md:px-8 cursor-pointer transition-all duration-300 hover:opacity-50"
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

  useEffect(() => {
    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined') {
        clearInterval(waitForGsap);
        init();
      }
    }, 100);

    const init = () => {
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
      (modalContainer.current as any).__cleanup = () =>
        window.removeEventListener('mousemove', handleMouseMove);
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => {
      clearInterval(waitForGsap);
      clearTimeout(timeout);
      if (modalContainer.current && (modalContainer.current as any).__cleanup) {
        (modalContainer.current as any).__cleanup();
      }
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
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              {project.src ? (
                <img
                  src={project.src}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="text-xs font-light">Foto</span>
                </div>
              )}
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

function DetailModal({
  project,
  onClose,
}: {
  project: typeof projects[0] | null;
  onClose: () => void;
}) {
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
        className="relative w-[90vw] max-w-3xl max-h-[85vh] overflow-y-auto bg-background border border-border/30 rounded-lg p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Header */}
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-light mb-3">
          {project.category}
        </p>
        <h2
          className="font-medium text-foreground mb-6"
          style={{
            fontSize: 'clamp(24px, 3vw, 42px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h2>
        <p
          className="text-muted-foreground font-light leading-relaxed mb-10 max-w-lg"
          style={{ fontSize: 'clamp(14px, 1.2vw, 17px)' }}
        >
          {project.description}
        </p>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-md flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <div className="flex flex-col items-center gap-1.5 text-muted-foreground/50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span className="text-[10px] font-light">Foto {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

const ServicesSection = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
          <DetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
