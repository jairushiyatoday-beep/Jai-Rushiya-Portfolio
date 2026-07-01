'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles() {
  const count = 300;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    const colors = [new THREE.Color('#00f0ff'), new THREE.Color('#a855f7'), new THREE.Color('#ec4899')];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.random() * 12 + 2;
      temp.push({
        t,
        factor: Math.random() * 0.015,
        speed: Math.random() * 0.006 + 0.003,
        x: Math.cos(t) * r,
        y: (Math.random() - 0.5) * 15,
        z: Math.sin(t) * r,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return temp;
  }, []);

  const colorArray = useMemo(() => {
    const array = new Float32Array(count * 3);
    particles.forEach((p, i) => p.color.toArray(array, i * 3));
    return array;
  }, [particles]);

  useFrame(() => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      const t = (particle.t += particle.speed);
      const a = Math.cos(t) + Math.sin(t) * particle.factor;
      const b = Math.sin(t) + Math.cos(t) * particle.factor;
      dummy.position.set(particle.x + a, particle.y + b, particle.z + a);
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

function HolographicPanels() {
  return (
    <group>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8} position={[-4, 2, -6]}>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial color="#000000" emissive="#00f0ff" emissiveIntensity={0.15} transparent opacity={0.2} side={THREE.DoubleSide} wireframe />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={1} position={[5, -1, -4]}>
        <mesh rotation={[0, -Math.PI / 6, 0]}>
          <planeGeometry args={[2, 3]} />
          <meshStandardMaterial color="#000000" emissive="#a855f7" emissiveIntensity={0.15} transparent opacity={0.2} side={THREE.DoubleSide} wireframe />
        </mesh>
      </Float>
      <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.8} position={[-2, -3, -5]}>
        <mesh rotation={[-Math.PI / 8, 0, 0]}>
          <planeGeometry args={[4, 1]} />
          <meshStandardMaterial color="#000000" emissive="#ec4899" emissiveIntensity={0.15} transparent opacity={0.2} side={THREE.DoubleSide} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function GlowingSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
      <mesh position={[0, 0, -3]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshPhysicalMaterial
          color="#030014"
          emissive="#00f0ff"
          emissiveIntensity={0.08}
          metalness={0.8}
          roughness={0.2}
          transmission={0.9}
          thickness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        <pointLight color="#a855f7" intensity={1.5} distance={5} />
      </mesh>
    </Float>
  );
}

function SceneMouseReact() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    target.current.x = (state.pointer.y * Math.PI) / 15;
    target.current.y = (state.pointer.x * Math.PI) / 15;
    group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.03;
    group.current.rotation.y += (target.current.y - group.current.rotation.y) * 0.03;
  });

  return (
    <group ref={group}>
      <FloatingParticles />
      <HolographicPanels />
      <GlowingSphere />
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-transparent" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <fog attach="fog" args={['#030014', 6, 22]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} color="#00f0ff" intensity={0.8} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.8} />
        <SceneMouseReact />
      </Canvas>
    </div>
  );
}
