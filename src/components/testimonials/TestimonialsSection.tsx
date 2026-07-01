'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';

function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="perspective-1000 w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ 
          rotateX: rotation.x, 
          rotateY: rotation.y,
          y: Math.sin(Date.now() / 1000 + index) * 10 // Subte float based on time
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass p-8 rounded-2xl h-full flex flex-col border border-white/5 hover:border-[--neon-cyan]/30 transition-colors transform-style-3d group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[--neon-cyan] rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        
        <div className="flex items-center gap-4 mb-6 relative translate-z-20">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[--neon-cyan] to-[--neon-purple] flex items-center justify-center font-bold text-lg border-2 border-white/10 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            {testimonial.avatar}
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
            <p className="text-[--neon-cyan] text-sm font-medium">{testimonial.role}</p>
          </div>
        </div>

        <div className="relative translate-z-10 flex-1">
          <svg className="w-8 h-8 text-[--neon-purple]/40 absolute -top-2 -left-2 -z-10 transform -scale-x-100 group-hover:text-[--neon-purple]/60 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-gray-300 italic leading-relaxed pl-4">
            "{testimonial.content}"
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-[#030014] to-[#0a0520] relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">What People Say</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-pink] to-[--neon-purple] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
