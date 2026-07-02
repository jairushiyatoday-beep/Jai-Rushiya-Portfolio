'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './VideoIntro.module.css';
import CinematicLayer from './CinematicLayer';
import MagneticButton from './MagneticButton';

const VIDEO_URL = 'https://www.image2url.com/r2/default/videos/1782980245879-3f834afc-cfc4-4cf7-8165-47214da817f7.mp4';

export default function VideoIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  
  // Animation refs
  const taglineRef = useRef<HTMLDivElement>(null);
  const name1Ref = useRef<HTMLSpanElement>(null);
  const name2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial GSAP Animations setup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          [name1Ref.current, name2Ref.current],
          { y: 40, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          videoFrameRef.current,
          { scale: 0.9, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to next section
  const scrollToNextSection = () => {
    const nextSec = document.getElementById('story');
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className={styles.heroContainer}
      role="banner"
      aria-label="Cinematic Video Hero"
    >
      {/* Three.js Bokeh Layer */}
      <CinematicLayer />

      {/* Ambient background blur video */}
      <video
        ref={bgVideoRef}
        className={styles.ambientVideo}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Cinematic dark gradients for contrast */}
      <div className={styles.overlayTop} aria-hidden="true" />
      <div className={styles.overlayRadial} aria-hidden="true" />
      <div className={styles.overlayBottom} aria-hidden="true" />

      {/* Layout Grid */}
      <div className={styles.contentGrid}>
        {/* Left Column: Typography Content */}
        <div className={styles.textContent}>
          <div ref={taglineRef} className={styles.tagline}>
            AI Engineer &amp; Full Stack Developer
          </div>

          <h1 className={styles.titleContainer}>
            <span ref={name1Ref} className={styles.titleLine}>
              Jai
            </span>
            <span ref={name2Ref} className={`${styles.titleLine} ${styles.titleGlow}`}>
              Rushiya
            </span>
          </h1>

          <p ref={subtitleRef} className={styles.subtitle}>
            Specializing in crafting premium AI-powered applications, scalable full-stack products, and modern cinematic user experiences.
          </p>

          <div ref={buttonsRef} className="flex flex-wrap gap-4">
            <MagneticButton href="#projects" variant="primary">
              Explore Projects
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Let&apos;s Connect
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Foreground Cinematic Video Frame */}
        <div className={styles.videoWrapper}>
          <div ref={videoFrameRef} className={styles.videoFrame}>
            {/* Using a picture element to switch between mobile and desktop images */}
            <picture>
              <source media="(max-width: 768px)" srcSet="https://i.ibb.co/pB8Lh6yw/Whats-App-Image-2026-06-27-at-6-40-24-PM.jpg" />
              <img
                src="https://i.ibb.co/B2T3YF8G/Screenshot-2026-07-02-140625.png"
                alt="App Opening Logo"
                className={styles.foregroundImage}
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNextSection}
        className={styles.scrollIndicator}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Explore</span>
        <div className={styles.scrollLine} />
      </button>
    </section>
  );
}
