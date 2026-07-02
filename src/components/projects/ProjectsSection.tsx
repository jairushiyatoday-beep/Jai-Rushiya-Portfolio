'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROJECTS } from '@/lib/constants';
import Link from 'next/link';
import MagneticButton from '../hero/MagneticButton';

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const project = PROJECTS[0]; // RojKhata

  return (
    <section id="projects" className="py-32 bg-[#030014] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[--neon-purple] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-cyan] to-[--neon-pink] mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass-strong rounded-3xl p-6 md:p-12 flex flex-col lg:flex-row gap-12 items-center group transition-transform duration-500 hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] neon-border">
            
            {/* Left Info */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap gap-2">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[--neon-purple]/20 text-[--neon-purple] border border-[--neon-purple]/30">
                  {project.category}
                </div>
                {'status' in project && project.status && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {project.status}
                  </div>
                )}
              </div>
              
              <h3 className="text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[--neon-cyan] group-hover:to-[--neon-purple] transition-all duration-300">
                {project.title}
              </h3>
              
              <p className="text-xl text-gray-300 font-medium">
                {project.subtitle}
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                {project.description}
              </p>

              {/* First Prototype Highlight */}
              {'firstPrototype' in project && project.firstPrototype && (
                <div className="flex items-center gap-2 text-sm text-[--neon-cyan]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>First Prototype Released: {project.firstPrototype}</span>
                </div>
              )}

              {/* Development Timeline */}
              {'timeline' in project && project.timeline && (
                <div className="flex items-center gap-0 pt-2 overflow-x-auto">
                  {project.timeline.map((phase: any, i: number) => (
                    <div key={phase.phase} className="flex items-center">
                      <div className="flex flex-col items-center min-w-[80px]">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                          phase.status === 'complete' ? 'bg-[--neon-cyan]/20 border-[--neon-cyan] text-[--neon-cyan]' :
                          phase.status === 'active' ? 'bg-[--neon-purple]/20 border-[--neon-purple] text-[--neon-purple] animate-pulse' :
                          'bg-white/5 border-white/20 text-gray-500'
                        }`}>
                          {phase.status === 'complete' ? '✓' : i + 1}
                        </div>
                        <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">{phase.phase}</span>
                        <span className="text-[10px] text-gray-500 font-mono">{phase.date}</span>
                      </div>
                      {i < project.timeline.length - 1 && (
                        <div className={`w-8 h-[2px] -mt-5 ${
                          phase.status === 'complete' ? 'bg-[--neon-cyan]/50' : 'bg-white/10'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <MagneticButton href={project.liveUrl} variant="primary" className="py-3 px-6 text-sm">
                  Live Demo
                </MagneticButton>
                <MagneticButton href={project.githubUrl} variant="secondary" className="py-3 px-6 text-sm">
                  Source Code
                </MagneticButton>
              </div>
            </div>

            {/* Right Mockup 3D */}
            <div className="flex-1 w-full h-[400px] md:h-[500px] relative perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center transform-style-3d group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] transition-transform duration-700 ease-out">
                
                {/* Desktop Mockup */}
                <div className="absolute w-[85%] h-[70%] bg-[#0f172a] rounded-xl border border-white/20 shadow-2xl overflow-hidden transform translate-z-0 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-500">
                  <div className="h-6 bg-[#1e293b] flex items-center px-3 gap-1.5 relative z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <img 
                    src="https://i.ibb.co/B2T3YF8G/Screenshot-2026-07-02-140625.png" 
                    alt="RojKhata Desktop Dashboard" 
                    className="w-full h-[calc(100%-24px)] object-cover object-top relative z-10" 
                  />
                </div>

                {/* Mobile Mockup */}
                <div className="absolute -right-6 -bottom-6 w-[32%] h-[70%] overflow-visible transform translate-z-10 group-hover:translate-z-20 group-hover:-translate-y-6 group-hover:-rotate-3 transition-all duration-500">
                  <img 
                    src="https://i.ibb.co/C5y1C69Z/Chat-GPT-Image-Jul-2-2026-03-47-44-PM-removebg-preview.png" 
                    alt="RojKhata Mobile App" 
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] relative z-10" 
                  />
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
