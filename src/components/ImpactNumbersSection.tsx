import { useEffect, useRef } from 'react';
import { BookOpen, Users, MapPin, Clock } from 'lucide-react';

declare const gsap: any;

const stats = [
  { icon: BookOpen, value: 50, prefix: '+', suffix: '', label: 'bibliotecas comunitárias' },
  { icon: Users, value: 10000, prefix: '+', suffix: '', label: 'livros doados' },
  { icon: MapPin, value: 30, prefix: '+', suffix: '', label: 'cidades alcançadas' },
  { icon: Clock, value: 15, prefix: '+', suffix: ' anos', label: 'de missão' },
];

const ImpactNumbersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined' && (window as any).ScrollTrigger) {
        clearInterval(waitForGsap);
        initAnimation();
      }
    }, 100);

    const initAnimation = () => {
      if (!sectionRef.current) return;
      const ST = (window as any).ScrollTrigger;

      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            const formatted = stat.value >= 1000
              ? Math.floor(obj.val).toLocaleString('pt-BR')
              : Math.floor(obj.val).toString();
            el.textContent = `${stat.prefix}${formatted}${stat.suffix}`;
          },
        });
      });

      // Fade in cards
      gsap.from(sectionRef.current.querySelectorAll('.impact-card'), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => { clearInterval(waitForGsap); clearTimeout(timeout); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-40 px-6 md:px-16 lg:px-24"
      style={{ background: 'hsl(220, 20%, 8%)' }}
    >
      <h2
        className="text-center text-sm md:text-base uppercase tracking-[0.3em] mb-20"
        style={{ color: 'hsl(38, 70%, 55%)' }}
      >
        Educação que transforma
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="impact-card flex flex-col items-center text-center gap-4">
              <Icon size={28} strokeWidth={1.5} style={{ color: 'hsl(38, 70%, 55%)' }} />
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                className="text-4xl md:text-5xl lg:text-6xl font-light"
                style={{ color: 'hsl(0, 0%, 95%)' }}
              >
                0
              </span>
              <span
                className="text-xs md:text-sm uppercase tracking-[0.15em]"
                style={{ color: 'hsl(220, 10%, 55%)' }}
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Linha decorativa */}
      <div
        className="mx-auto mt-20 h-px w-24"
        style={{ background: 'hsl(38, 70%, 55%, 0.4)' }}
      />
    </section>
  );
};

export default ImpactNumbersSection;
