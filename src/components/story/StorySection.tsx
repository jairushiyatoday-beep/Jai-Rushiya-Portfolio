'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const STORY_CARDS = [
  {
    title: 'The Beginning',
    content: 'Started with curiosity and a passion for technology. Dove deep into programming, algorithms, and the art of building software.',
    icon: (
      <svg className="w-6 h-6 text-[--neon-cyan]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-[--neon-cyan]'
  },
  {
    title: 'The Evolution',
    content: 'Mastered full-stack development, explored AI/ML, and built real-world applications that solve meaningful problems.',
    icon: (
      <svg className="w-6 h-6 text-[--neon-purple]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: 'from-[--neon-purple]'
  },
  {
    title: 'The Vision',
    content: 'Now building intelligent products, automating businesses, and designing experiences that push the boundaries of what\'s possible.',
    icon: (
      <svg className="w-6 h-6 text-[--neon-pink]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: 'from-[--neon-pink]'
  }
];

export default function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="story" className="relative min-h-screen py-32 overflow-hidden bg-[#030014]">
      {/* Background Neural Network SVG */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="net" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-[--neon-purple]" />
              <line x1="50" y1="50" x2="150" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-[--neon-cyan]" />
              <line x1="50" y1="50" x2="50" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-[--neon-cyan]" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#net)" />
        </svg>
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 pointer-events-none font-mono text-sm opacity-[0.03] text-white overflow-hidden">
        <div className="absolute top-[10%] left-[5%] rotate-12">const ai = new Intelligence();</div>
        <div className="absolute top-[40%] right-[10%] -rotate-6">function automate(task) {'{'} return magic; {'}'}</div>
        <div className="absolute bottom-[20%] left-[15%] rotate-3">import {'{'} Future {'}'} from 'tomorrow';</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">My Journey</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
          {STORY_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
              className="flex-1"
            >
              <div className="h-full glass-strong p-8 rounded-2xl relative overflow-hidden group">
                <div className={cn("absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b to-transparent opacity-50 group-hover:opacity-100 transition-opacity", card.color)} />
                <div className="mb-6 p-4 bg-white/5 rounded-full inline-block">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[--neon-cyan] transition-colors">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {card.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
