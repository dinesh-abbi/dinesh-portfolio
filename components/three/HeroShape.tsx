// @ts-nocheck
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron, Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function Shape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current) return;

    if (!prefersReducedMotion) {
      const time = state.clock.getElapsedTime();
      
      // Pointer reactivity target
      const targetX = (state.pointer.y * Math.PI) / 6;
      const targetY = (state.pointer.x * Math.PI) / 6;

      // Combine continuous rotation with pointer target
      const finalX = time * 0.2 + targetX;
      const finalY = time * 0.15 + targetY;

      // Lerp towards target for smooth feel
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        finalX,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        finalY,
        0.05
      );
    }
  });

  return (
    <Float speed={prefersReducedMotion ? 0 : 2} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1, 16]} scale={1.8}>
        <MeshDistortMaterial
          color="#3b82f6"
          envMapIntensity={0.2}
          clearcoat={0.1}
          roughness={0.4}
          metalness={0.2}
          distort={prefersReducedMotion ? 0 : 0.3}
          speed={prefersReducedMotion ? 0 : 2}
          wireframe={true}
          transparent
          opacity={0.15}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroShape() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        frameloop={prefersReducedMotion ? "demand" : "always"}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Shape />
      </Canvas>
    </div>
  );
}
