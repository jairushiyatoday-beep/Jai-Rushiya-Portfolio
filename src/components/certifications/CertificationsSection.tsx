'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CERTIFICATIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

function CertBadge({ text, color }: { text: string; color: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'bg-[--neon-cyan]/15 text-[--neon-cyan] border-[--neon-cyan]/30 shadow-[0_0_10px_rgba(0,240,255,0.3)]',
    purple: 'bg-[--neon-purple]/15 text-[--neon-purple] border-[--neon-purple]/30 shadow-[0_0_10px_rgba(168,85,247,0.3)]',
  };
  
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border animate-pulse",
      colorMap[color] || colorMap.cyan
    )}>
      <span className="w-2 h-2 rounded-full bg-current" />
      {text}
    </span>
  );
}

function CertCard({ cert, index }: { cert: typeof CERTIFICATIONS[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-strong p-8 rounded-2xl border border-white/5 hover:border-[--neon-cyan]/30 transition-colors transform-style-3d relative overflow-hidden group h-full"
      >
        {/* Glow on hover */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[--neon-cyan] rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />

        <div className="flex flex-col h-full relative z-10">
          {/* Header with badge */}
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-white/5 rounded-xl">
              <svg className="w-8 h-8 text-[--neon-cyan]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <CertBadge text={cert.badge} color={cert.badgeColor} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[--neon-cyan] transition-colors">{cert.title}</h3>
          
          {/* Issuer */}
          <p className="text-sm text-[--neon-purple] font-medium mb-4">{cert.issuer}</p>

          {/* Score if exists */}
          {'score' in cert && cert.score && (
            <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 uppercase tracking-wider">Score</span>
                <span className="text-2xl font-bold text-gradient">{cert.score}</span>
              </div>
              {'level' in cert && cert.level && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">Level</span>
                  <span className="text-lg font-semibold text-[--neon-cyan]">{cert.level}</span>
                </div>
              )}
            </div>
          )}

          {/* Issued date */}
          {'issued' in cert && cert.issued && (
            <div className="text-sm text-gray-400 mb-4 font-mono">
              Issued: {cert.issued}
            </div>
          )}

          {/* Description if exists */}
          {'description' in cert && cert.description && (
            <p className="text-gray-400 text-sm leading-relaxed">{cert.description}</p>
          )}

          {/* Certificate Image */}
          {'image' in cert && cert.image && (
            <div className="mt-4 rounded-xl overflow-hidden border border-white/10 group-hover:border-[--neon-purple]/30 transition-colors">
              <img 
                src={cert.image as string} 
                alt={cert.title} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
          )}

          {/* View Certificate Link */}
          {'certUrl' in cert && cert.certUrl && (
            <a 
              href={cert.certUrl as string} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[--neon-cyan]/10 text-[--neon-cyan] border border-[--neon-cyan]/20 hover:bg-[--neon-cyan]/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Certificate
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-32 bg-[#030014] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[--neon-purple] rounded-full blur-[200px] opacity-5 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[--neon-cyan] rounded-full blur-[200px] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {CERTIFICATIONS.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
