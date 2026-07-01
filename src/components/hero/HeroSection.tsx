'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import RotatingTagline from './RotatingTagline';
import MagneticButton from './MagneticButton';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-transparent" />,
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Elegant reveal sequence (1–1.5s total)
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      )
      .fromTo(
        nameRef.current,
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
        0.1
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        taglineRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(
        buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      role="banner"
      aria-label="Hero section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <Scene3D />

      {/* Ambient glow particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[--neon-cyan] rounded-full animate-float opacity-60 blur-[1px]" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[--neon-purple] rounded-full animate-float-delayed opacity-40 blur-[1px]" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[--neon-pink] rounded-full animate-float opacity-50 blur-[1px]" />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-4 max-w-5xl">
        <h1
          ref={nameRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 text-gradient will-change-transform"
        >
          Jai Rushiya
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-white/70 font-medium tracking-wide mb-8"
        >
          AI Engineer · Full Stack Developer · Automation Specialist
        </p>

        <div ref={taglineRef} className="mb-12 w-full">
          <RotatingTagline />
        </div>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5 items-center justify-center">
          <MagneticButton href="#projects" variant="primary">
            Explore Projects
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            Let&apos;s Build Together
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        aria-hidden="true"
      >
        <span className="text-white/40 text-xs tracking-[0.3em] mb-2 font-mono uppercase">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
