import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export const PageTransition = ({ children }: { children: React.ReactElement }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // When the user navigates to a new route
    if (location.pathname !== displayLocation.pathname && !isTransitioning) {
      setIsTransitioning(true);
      
      // Lock scroll briefly to prevent visual bugs
      document.body.style.overflow = "hidden";

      // Reset blinds to start from the bottom (out of view)
      gsap.set(".gsap-blind", { yPercent: 100 });
      
      // 1. Animate Blinds UP to cover the screen
      gsap.to(".gsap-blind", {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.inOut",
        onComplete: () => {
          // 2. Change the route content underneath implicitly via state change
          setDisplayLocation(location);
          
          // Reset scroll
          window.scrollTo(0, 0);

          // 3. Animate Blinds UP and OFF the screen to reveal the next page
          gsap.to(".gsap-blind", {
            yPercent: -100,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.inOut",
            delay: 0.1, // brief pause so user feels the weight of the cut
            onComplete: () => {
              setIsTransitioning(false);
              document.body.style.overflow = "";
            }
          });
        }
      });
    }
  }, [location, displayLocation, isTransitioning]);

  // Initial page load reveal animation
  useEffect(() => {
    // Make sure blinds are covering screen initially
    gsap.set(".gsap-blind", { yPercent: 0 });
    
    // Animate out
    gsap.to(".gsap-blind", {
      yPercent: -100,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.inOut",
      delay: 0.4
    });
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[9999] pointer-events-none flex w-full h-[100dvh] overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="gsap-blind w-1/5 h-[105%] bg-white" 
            style={{ transform: "translateY(0%)", willChange: "transform" }}
          />
        ))}
      </div>
      
      {React.cloneElement(children, { location: displayLocation })}
    </>
  );
};
