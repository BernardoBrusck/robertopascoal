import { useState, useEffect, useRef, useCallback } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const startTime = useRef(0);
  const rafId = useRef(0);
  const DURATION = 2500;

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      // ease-out cubic
      const t = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);

      if (t < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setFading(true), 300);
      }
    },
    []
  );

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  useEffect(() => {
    if (fading) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [fading, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <p
        style={{
          fontSize: "clamp(20px, 2.5vw, 32px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          color: "hsl(var(--foreground))",
          marginBottom: "24px",
        }}
      >
        Roberto Pascoal
      </p>
      <div
        style={{
          width: "200px",
          height: "2px",
          backgroundColor: "hsl(var(--muted))",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "hsl(var(--foreground))",
            borderRadius: "1px",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
