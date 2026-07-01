'use client';

import { useRef, useState, ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setIsTouch('ontouchstart' in window);
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isTouch) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    setPosition({
      x: (clientX - (left + width / 2)) * 0.2,
      y: (clientY - (top + height / 2)) * 0.2,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseClasses =
    'relative px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--neon-cyan] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014]';
  const primaryClasses =
    'bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] text-white hover:shadow-[0_0_25px_rgba(0,240,255,0.45)] active:scale-95';
  const secondaryClasses =
    'bg-transparent border border-white/20 text-white hover:border-[--neon-cyan] hover:text-[--neon-cyan] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] backdrop-blur-md active:scale-95';

  const buttonClasses = cn(
    baseClasses,
    variant === 'primary' ? primaryClasses : secondaryClasses,
    className
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={reducedMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={buttonClasses} onClick={onClick}>
          {children}
        </Link>
      ) : (
        <button className={buttonClasses} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
