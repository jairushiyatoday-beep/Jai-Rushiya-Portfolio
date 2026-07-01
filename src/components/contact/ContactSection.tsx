'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ABOUT_TEXT, SITE_CONFIG } from '@/lib/constants';

function WorldMap() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
      <svg className="w-full h-full max-w-5xl" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-white" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
        <circle cx="680" cy="220" r="8" fill="var(--neon-cyan)" className="animate-pulse" />
        <circle cx="680" cy="220" r="20" fill="var(--neon-cyan)" opacity="0.3" className="animate-ping" />
      </svg>
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);
    formData.append('access_key', 'bf4c9d9d-7fa2-487d-82a5-443c2e12a9d0');
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) { router.push('/thank-you'); }
      else { setFormState('error'); setErrorMsg('Something went wrong. Please try again.'); }
    } catch {
      setFormState('error');
      setErrorMsg('Network error. Please check your connection.');
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#030014] relative overflow-hidden">
      <WorldMap />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[--neon-cyan] rounded-full blur-[100px] opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-[--neon-purple] rounded-full blur-[120px] opacity-20" />
      </div>
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">{ABOUT_TEXT.heading}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] mx-auto rounded-full mb-12" />
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            {ABOUT_TEXT.paragraphs.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}>{p}</motion.p>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Let&apos;s Build Something <span className="text-gradient">Extraordinary</span> Together.</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="glass-strong p-8 rounded-3xl space-y-6 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[--neon-cyan] rounded-full blur-[100px] opacity-10 pointer-events-none" />
                <input type="hidden" name="subject" value="New Contact Form Submission" />
                <div className="space-y-2 relative">
                  <label htmlFor="contact-name" className="text-sm font-medium text-gray-300 ml-1">Name</label>
                  <input type="text" id="contact-name" name="name" required autoComplete="name" aria-required="true" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[--neon-cyan] focus:ring-1 focus:ring-[--neon-cyan] transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2 relative">
                  <label htmlFor="contact-email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
                  <input type="email" id="contact-email" name="email" required autoComplete="email" aria-required="true" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[--neon-purple] focus:ring-1 focus:ring-[--neon-purple] transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 relative">
                  <label htmlFor="contact-message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
                  <textarea id="contact-message" name="message" rows={4} required aria-required="true" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[--neon-pink] focus:ring-1 focus:ring-[--neon-pink] transition-all resize-none" placeholder="Tell me about your project..."></textarea>
                </div>
                {formState === 'error' && errorMsg && (<div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{errorMsg}</div>)}
                <button type="submit" disabled={formState === 'loading'} className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    {formState !== 'loading' ? (<>Send Message <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>) : (<svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>)}
                  </span>
                </button>
              </form>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-8">
              <a href={`mailto:${SITE_CONFIG.email}`} className="group flex items-center gap-6 p-6 glass rounded-2xl hover:bg-white/5 border border-transparent hover:border-[--neon-cyan]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-[--neon-cyan]/10 text-[--neon-cyan] flex items-center justify-center group-hover:bg-[--neon-cyan] group-hover:text-[#030014] transition-colors group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                <div><h4 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Email</h4><p className="text-xl text-white font-medium group-hover:text-[--neon-cyan] transition-colors">{SITE_CONFIG.email}</p></div>
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="group flex items-center gap-6 p-6 glass rounded-2xl hover:bg-white/5 border border-transparent hover:border-[--neon-purple]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-[--neon-purple]/10 text-[--neon-purple] flex items-center justify-center group-hover:bg-[--neon-purple] group-hover:text-[#030014] transition-colors group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                <div><h4 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Phone</h4><p className="text-xl text-white font-medium group-hover:text-[--neon-purple] transition-colors">{SITE_CONFIG.phone}</p></div>
              </a>
              <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-6 glass rounded-2xl hover:bg-white/5 border border-transparent hover:border-[--neon-pink]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-[--neon-pink]/10 text-[--neon-pink] flex items-center justify-center group-hover:bg-[--neon-pink] group-hover:text-[#030014] transition-colors group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></div>
                <div><h4 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Connect</h4><p className="text-xl text-white font-medium group-hover:text-[--neon-pink] transition-colors">LinkedIn Profile</p></div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
