'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[--neon-cyan] rounded-full blur-[200px] opacity-15" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[--neon-purple] rounded-full blur-[200px] opacity-15" />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            const colors = ['bg-[--neon-cyan]', 'bg-[--neon-purple]', 'bg-[--neon-pink]', 'bg-[--neon-blue]'];
            const seed = i * 2654435761;
            const left = ((seed >>> 0) % 100);
            const delay = ((seed >>> 4) % 30) / 10;
            const duration = 2 + ((seed >>> 8) % 30) / 10;
            const size = 4 + ((seed >>> 12) % 8);
            return (
              <motion.div
                key={i}
                initial={{ y: -20, x: 0, opacity: 1 }}
                animate={{ 
                  y: '100vh', 
                  x: [0, (i % 2 === 0 ? 30 : -30), 0],
                  opacity: [1, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{ duration, delay, ease: 'linear' }}
                className={`absolute rounded-sm ${colors[i % colors.length]}`}
                style={{ left: `${left}%`, width: size, height: size }}
              />
            );
          })}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Animated check icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto mb-8 w-24 h-24 rounded-full bg-gradient-to-br from-[--neon-cyan] to-[--neon-purple] flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.4)]"
        >
          <motion.svg 
            className="w-12 h-12 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        </motion.div>

        {/* Thank you text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          <span className="text-gradient">Thank You!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-4 font-light"
        >
          Your message has been received.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-lg text-gray-400 mb-12 leading-relaxed"
        >
          <span className="text-white font-semibold">Jai Rushiya</span> will get back to you as soon as possible.
          <br />
          Looking forward to building something amazing together!
        </motion.p>

        {/* Back to home button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-[--neon-cyan] to-transparent"
        />
      </div>
    </div>
  );
}
