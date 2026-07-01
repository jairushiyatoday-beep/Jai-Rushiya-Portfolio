'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { EXPERIENCE } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 bg-[#030014] relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] mx-auto rounded-full" />
        </motion.div>

        <div ref={containerRef} className="max-w-4xl mx-auto relative">
          {/* Center Line Background */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />
          
          {/* Animated Center Line */}
          <motion.div 
            className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[--neon-cyan] via-[--neon-purple] to-transparent md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:justify-between group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[11px] md:left-1/2 w-[10px] h-[10px] rounded-full bg-[--neon-cyan] md:-translate-x-1/2 mt-6 z-10 group-hover:scale-150 group-hover:bg-[--neon-purple] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-300" />
                  
                  {/* Glowing halo around dot */}
                  <div className="absolute left-[6px] md:left-1/2 w-[20px] h-[20px] rounded-full bg-[--neon-cyan]/30 md:-translate-x-1/2 mt-[19px] z-0 animate-pulse" />

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
                    <div className="glass-strong p-6 rounded-2xl border border-white/10 hover:border-[--neon-purple]/50 transition-colors duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden">
                      <div className={cn(
                        "absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[--neon-cyan] to-[--neon-purple] opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        isEven ? "right-0" : "left-0"
                      )} />
                      
                      <div className={cn("text-[--neon-cyan] font-mono text-sm mb-2", isEven ? "md:justify-end" : "justify-start")}>
                        {exp.period}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                      <h4 className="text-lg text-gray-300 mb-1">
                        {'companyUrl' in exp && exp.companyUrl ? (
                          <a href={exp.companyUrl as string} target="_blank" rel="noopener noreferrer" className="hover:text-[--neon-cyan] transition-colors underline decoration-white/20 underline-offset-2">
                            {exp.company}
                          </a>
                        ) : exp.company}
                      </h4>
                      {'duration' in exp && exp.duration && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[--neon-purple]/15 text-[--neon-purple] border border-[--neon-purple]/20 mb-4">
                          {exp.duration as string}
                        </span>
                      )}
                      {!('duration' in exp) && <div className="mb-4" />}
                      
                      <p className="text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
                        {exp.description}
                      </p>
                      
                      <ul className={cn(
                        "space-y-2 text-sm text-gray-300 flex flex-col",
                        isEven ? "md:items-end" : "items-start"
                      )}>
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx} className={cn(
                            "flex items-center gap-2",
                            isEven ? "md:flex-row-reverse" : "flex-row"
                          )}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[--neon-purple] flex-shrink-0" />
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
