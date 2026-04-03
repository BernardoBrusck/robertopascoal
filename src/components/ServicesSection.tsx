import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

declare const gsap: any;

const projects = [
  {
    title: 'Bibliotecas Comunitárias',
    category: 'Educação Social',
    color: '#D4A373',
    src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80',
  },
  {
    title: 'Doação de Livros',
    category: 'Acesso ao Conhecimento',
    color: '#A3B18A',
    src: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
  },
  {
    title: 'Palestras Transformadoras',
    category: 'Inspiração',
    color: '#B5838D',
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
  },
  {
    title: 'Expedições Educacionais',
    category: 'Ação Social',
    color: '#6D6875',
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
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
}: {
  index: number;
  title: string;
  category: string;
  setModal: (m: { active: boolean; index: number }) => void;
}) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className="group flex w-full items-center justify-between border-t border-border py-12 px-4 md:px-10 cursor-pointer transition-all duration-300 hover:opacity-50"
    >
      <h3 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.03em] text-foreground transition-all duration-400 group-hover:translate-x-[-10px]">
        {title}
      </h3>
      <p className="text-sm md:text-base uppercase tracking-[0.15em] text-muted-foreground font-light transition-all duration-400 group-hover:translate-x-[10px]">
        {category}
      </p>
    </div>
  );
}

function Modal({
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
      // Store cleanup ref
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
        className="fixed z-[3] pointer-events-none overflow-hidden"
        style={{ width: 400, height: 300 }}
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
              <img
                src={project.src}
                alt={project.title}
                className="h-auto w-full object-cover"
                style={{ maxHeight: '100%' }}
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        className="fixed z-[3] flex items-center justify-center rounded-full bg-accent pointer-events-none"
        style={{ width: 80, height: 80 }}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      />
      <motion.div
        ref={cursorLabel}
        className="fixed z-[3] flex items-center justify-center rounded-full pointer-events-none text-foreground text-sm font-light"
        style={{ width: 80, height: 80 }}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
      >
        Ver
      </motion.div>
    </>
  );
}

const ServicesSection = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section className="relative w-full py-32 md:py-40 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-foreground">
            O que fazemos.
          </h2>
          <p className="max-w-md text-base md:text-lg text-muted-foreground font-light leading-relaxed">
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
            />
          ))}
          {/* Bottom border */}
          <div className="border-t border-border" />
          <Modal modal={modal} projects={projects} />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
