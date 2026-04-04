import { useEffect, useRef } from 'react';
import { loadGsapWithScrollTrigger } from '@/lib/loadGsap';

interface TextRevealBlockProps {
  text: string;
  className?: string;
}

const TextRevealBlock = ({ text, className = '' }: TextRevealBlockProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadGsapWithScrollTrigger().then(({ gsap }) => {
      if (cancelled || !textRef.current || !sectionRef.current) return;

      const content = textRef.current.textContent || '';
      textRef.current.innerHTML = content
        .split(' ')
        .map(word => `<span class="text-reveal-word">${word}</span>`)
        .join(' ');

      const words = textRef.current.querySelectorAll('.text-reveal-word');

      gsap.set(words, { color: 'hsl(220, 10%, 85%)' });

      gsap.to(words, {
        color: 'hsl(220, 20%, 10%)',
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
        },
      });
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-background flex items-center justify-center py-32 md:py-48 px-6 md:px-16 lg:px-24 ${className}`}
    >
      <p
        ref={textRef}
        className="text-reveal-text text-reveal-text--sm font-sans max-w-5xl text-center leading-[1.3]"
      >
        {text}
      </p>
    </section>
  );
};

export default TextRevealBlock;
