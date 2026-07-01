'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TAGLINES } from '@/lib/constants';

export default function RotatingTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-10 flex items-center justify-center overflow-hidden w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute text-xl md:text-2xl font-light italic text-[--neon-cyan] neon-text"
        >
          "{TAGLINES[index]}"
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
