import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jai Rushiya — AI Engineer & Full Stack Developer',
    short_name: 'Jai Rushiya',
    description: 'Building intelligent AI-powered products, scalable web applications, and automation systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030014',
    theme_color: '#00f0ff',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
