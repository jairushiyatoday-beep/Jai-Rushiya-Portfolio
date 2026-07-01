'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <a href="#hero" className="skip-to-content">Skip to content</a>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "py-4 bg-[#030014]/80 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link 
            href="#hero" 
            onClick={(e) => handleClick(e, '#hero')}
            className="text-2xl font-bold font-mono tracking-tighter group"
          >
            <span className="text-white group-hover:text-[--neon-cyan] transition-colors">J</span>
            <span className="text-[--neon-cyan] group-hover:text-[--neon-purple] transition-colors">R</span>
            <span className="text-[--neon-purple] group-hover:text-[--neon-pink] transition-colors">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                aria-current={activeSection === link.href.substring(1) ? 'true' : undefined}
                className={cn(
                  "text-sm font-medium transition-colors relative group py-2",
                  activeSection === link.href.substring(1) ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300",
                  activeSection === link.href.substring(1) && "scale-x-100"
                )} />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 flex flex-col gap-1.5 items-end">
              <span className={cn("h-0.5 bg-white transition-all duration-300", isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6")} />
              <span className={cn("h-0.5 bg-white transition-all duration-300", isMobileMenuOpen ? "w-0 opacity-0" : "w-4")} />
              <span className={cn("h-0.5 bg-white transition-all duration-300", isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5")} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-label="Mobile navigation"
            onKeyDown={(e) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); }}
            className="fixed inset-0 z-30 bg-[#030014]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  onClick={(e) => handleClick(e, link.href)}
                  className={cn(
                    "text-2xl font-medium w-full text-center pb-4 border-b border-white/5",
                    activeSection === link.href.substring(1) ? "text-[--neon-cyan]" : "text-gray-300"
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
