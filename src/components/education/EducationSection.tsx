'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { EDUCATION } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-32 bg-gradient-to-b from-[#0a0520] to-[#030014] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] mx-auto rounded-full" />
        </motion.div>

        <div ref={containerRef} className="max-w-4xl mx-auto relative">
          {/* Center Line Background */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />
          
          {/* Animated Center Line */}
          <motion.div 
            className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[--neon-purple] via-[--neon-cyan] to-transparent md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16">
            {EDUCATION.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:justify-between group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[11px] md:left-1/2 w-[10px] h-[10px] rounded-full bg-[--neon-purple] md:-translate-x-1/2 mt-6 z-10 group-hover:scale-150 group-hover:bg-[--neon-cyan] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.8)] transition-all duration-300" />
                  
                  {/* Halo */}
                  <div className="absolute left-[6px] md:left-1/2 w-[20px] h-[20px] rounded-full bg-[--neon-purple]/30 md:-translate-x-1/2 mt-[19px] z-0 animate-pulse" />

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={cn(
                      "w-full md:w-[45%] pl-10 md:pl-0",
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
                    )}
                  >
                    <div className="glass-strong p-6 rounded-2xl border border-white/10 hover:border-[--neon-purple]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden group/card">
                      {/* Accent bar */}
                      <div className={cn(
                        "absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[--neon-purple] to-[--neon-cyan] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300",
                        isEven ? "right-0" : "left-0"
                      )} />

                      {/* Graduation cap icon */}
                      <div className="mb-4 inline-block p-3 bg-[--neon-purple]/10 rounded-xl">
                        <svg className="w-6 h-6 text-[--neon-purple]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zM12 14v7" />
                        </svg>
                      </div>
                      
                      <div className={cn("text-[--neon-cyan] font-mono text-sm mb-2")}>
                        {edu.period}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-1 group-hover/card:text-[--neon-purple] transition-colors">{edu.degree}</h3>
                      <h4 className="text-base text-gray-300 mb-4">{edu.institution}</h4>
                      
                      <p className="text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
                        {edu.description}
                      </p>
                      
                      <ul className={cn(
                        "space-y-2 text-sm text-gray-300 flex flex-col",
                        isEven ? "md:items-end" : "items-start"
                      )}>
                        {edu.highlights.map((highlight, idx) => (
                          <li key={idx} className={cn(
                            "flex items-center gap-2",
                            isEven ? "md:flex-row-reverse" : "flex-row"
                          )}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[--neon-cyan] flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
