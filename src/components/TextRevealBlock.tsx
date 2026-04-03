import { useEffect, useRef } from 'react';

declare const gsap: any;

interface TextRevealBlockProps {
  text: string;
  className?: string;
}

const TextRevealBlock = ({ text, className = '' }: TextRevealBlockProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const waitForGsap = setInterval(() => {
      if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        clearInterval(waitForGsap);

        const loadScrollTrigger = (): Promise<void> =>
          new Promise((res, rej) => {
            if (gsap.plugins?.scrollTrigger || (window as any).ScrollTrigger) {
              if ((window as any).ScrollTrigger) gsap.registerPlugin((window as any).ScrollTrigger);
              res();
              return;
            }
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            s.onload = () => {
              setTimeout(() => {
                gsap.registerPlugin((window as any).ScrollTrigger);
                res();
              }, 100);
            };
            s.onerror = () => rej();
            document.head.appendChild(s);
          });

        loadScrollTrigger().then(() => initAnimation());
      }
    }, 100);

    const initAnimation = () => {
      if (!textRef.current || !sectionRef.current) return;

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
    };

    const timeout = setTimeout(() => clearInterval(waitForGsap), 15000);
    return () => {
      clearInterval(waitForGsap);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-background flex items-center justify-center py-32 md:py-48 px-6 md:px-16 lg:px-24 ${className}`}
    >
      <p
        ref={textRef}
        className="text-reveal-text font-sans max-w-5xl text-center leading-[1.15]"
      >
        {text}
      </p>
    </section>
  );
};

export default TextRevealBlock;
