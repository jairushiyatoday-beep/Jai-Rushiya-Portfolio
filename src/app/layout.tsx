import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const SITE_URL = 'https://jairushiya.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Jai Rushiya — AI Engineer | Full Stack Developer | Automation Specialist',
  description: 'Building intelligent AI-powered products, scalable web applications, and automation systems using Next.js, React, TypeScript, Node.js, Three.js, and Artificial Intelligence.',
  keywords: [
    'Jai Rushiya', 'AI Engineer', 'Full Stack Developer', 'Next.js Developer',
    'React Developer', 'TypeScript', 'Portfolio', 'Automation Specialist',
    'Machine Learning', 'Generative AI', 'Web Developer', 'Software Engineer',
  ],
  authors: [{ name: 'Jai Rushiya', url: SITE_URL }],
  creator: 'Jai Rushiya',
  openGraph: {
    title: 'Jai Rushiya — AI Engineer | Full Stack Developer',
    description: 'Building intelligent AI-powered products, scalable web applications, and automation systems.',
    url: SITE_URL,
    siteName: 'Jai Rushiya Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jai Rushiya — AI Engineer | Full Stack Developer',
    description: 'Building intelligent AI-powered products and automation systems.',
    creator: '@jairushiya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jai Rushiya',
  url: SITE_URL,
  email: 'jairushiya.today@gmail.com',
  jobTitle: 'AI Engineer & Full Stack Developer',
  description: 'AI Engineer, Full Stack Developer, and Automation Specialist building intelligent products.',
  sameAs: [
    'https://www.linkedin.com/in/jairushiya/',
    'https://github.com/jairushiyatoday-beep',
  ],
  knowsAbout: [
    'Artificial Intelligence', 'Machine Learning', 'Full Stack Development',
    'Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'Automation',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-[#030014] text-white overflow-x-hidden antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
