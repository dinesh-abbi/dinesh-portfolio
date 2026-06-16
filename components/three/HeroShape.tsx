// @ts-nocheck — R3F JSX elements (ambientLight, etc.) not yet in TS global JSX namespace for React 19
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function Shape() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Lerp rotation toward pointer
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      state.pointer.y * 0.4 + t * 0.08,
      0.04
    );
    mesh.current.rotation.y = THREE.MathUtils.lerp(
      mesh.current.rotation.y,
      state.pointer.x * 0.4 + t * 0.12,
      0.04
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#3b82f6"
          distort={0.35}
          speed={1.5}
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>
      {/* Solid inner orb */}
      <mesh scale={0.65}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#0d1422"
          emissive="#1e3a5f"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function HeroShape() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#60a5fa" />
      <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#f97316" />
      <Shape />
    </Canvas>
  );
}
