'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const CATEGORY_COLORS: Record<string, string> = {
  programming: 'from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-300 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]',
  frontend: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]',
  backend: 'from-green-500/20 to-green-500/5 border-green-500/30 text-green-300 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]',
  database: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]',
  devops: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-300 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]',
  ai: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',
  business: 'from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-300 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]',
};

const CATEGORY_LABELS: Record<string, string> = {
  programming: 'Programming',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  ai: 'AI / ML',
  business: 'Business',
};

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 bg-[#030014] relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Tech Arsenal</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-purple] to-[--neon-cyan] mx-auto rounded-full mb-8" />
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onMouseEnter={() => setActiveCategory(key)}
                onMouseLeave={() => setActiveCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border bg-gradient-to-br backdrop-blur-sm",
                  CATEGORY_COLORS[key],
                  activeCategory && activeCategory !== key ? "opacity-30 scale-95" : "opacity-100 scale-100"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 md:gap-6">
          {SKILLS.map((skill, index) => {
            const isFaded = activeCategory && activeCategory !== skill.category;
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { 
                  opacity: isFaded ? 0.3 : 1, 
                  scale: isFaded ? 0.95 : 1 
                } : { 
                  opacity: 0, 
                  scale: 0.8 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: isInView ? index * 0.05 : 0,
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className={cn(
                  "px-6 py-4 rounded-xl border bg-gradient-to-br backdrop-blur-md cursor-default transition-all duration-300 flex items-center justify-center min-w-[120px]",
                  CATEGORY_COLORS[skill.category]
                )}
                onMouseEnter={() => setActiveCategory(skill.category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <span className="font-semibold tracking-wide">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
