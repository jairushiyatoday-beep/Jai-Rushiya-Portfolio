'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicLayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    // Programmatic Bokeh Texture
    const createBokehTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Soft radial gradient for dreaming atmosphere
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const texture = createBokehTexture();

    // Particles Setup
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Particle metadata for animations
    const particlesData: Array<{
      x: number;
      y: number;
      z: number;
      speedX: number;
      speedY: number;
      phaseX: number;
      phaseY: number;
      ampX: number;
      ampY: number;
    }> = [];

    const colorOrange = new THREE.Color('#ff7c20'); // Warm cinematic orange
    const colorWhite = new THREE.Color('#ffffff'); // Dreamy white

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates inside a bounding box
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10 - 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color distribution: 60% warm orange, 40% white
      const isOrange = Math.random() < 0.6;
      const col = isOrange ? colorOrange : colorWhite;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      // Particle size
      sizes[i] = Math.random() * 0.8 + 0.3;

      // Animation parameters
      particlesData.push({
        x,
        y,
        z,
        speedX: Math.random() * 0.005 + 0.002,
        speedY: Math.random() * 0.005 + 0.002,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        ampX: Math.random() * 0.5 + 0.1,
        ampY: Math.random() * 0.8 + 0.2,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom Shader Material or standard PointsMaterial with blending
    // PointsMaterial is extremely fast and robust for basic dynamic layers
    const material = new THREE.PointsMaterial({
      size: 1.5,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 3; // Max 1.5 unit deviation
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2; // Max 1 unit deviation
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const positionsArray = geometry.attributes.position.array as Float32Array;

      // Update particle positions with sine wave oscillations
      for (let i = 0; i < particleCount; i++) {
        const data = particlesData[i];

        // Float up slowly
        data.y += data.speedY * 0.8;
        // Wrap around vertical boundaries
        if (data.y > 8) {
          data.y = -8;
        }

        // Apply horizontal sine oscillation
        const xOffset = Math.sin(elapsedTime * 0.5 + data.phaseX) * data.ampX;
        const yOffset = Math.cos(elapsedTime * 0.3 + data.phaseY) * data.ampY * 0.2;

        positionsArray[i * 3] = data.x + xOffset;
        positionsArray[i * 3 + 1] = data.y + yOffset;
      }

      geometry.attributes.position.needsUpdate = true;

      // Mouse Parallax Lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = -mouseY;
      camera.lookAt(0, 0, -2);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[2] pointer-events-none w-full h-full"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
}
