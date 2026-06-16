"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// The particle count dictates the visual density
const PARTICLE_COUNT = 6000;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  // Generate random positions in a sphere
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 3.5 + Math.random() * 4;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  // Store original positions for spring-back effect
  const initialPositions = useMemo(() => positions.slice(), [positions]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Slow rotation of the entire field
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Convert normalized mouse coordinates (-1 to 1) to world coordinates
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      const px = positionsArray[i3];
      const py = positionsArray[i3 + 1];
      const pz = positionsArray[i3 + 2];

      const ix = initialPositions[i3];
      const iy = initialPositions[i3 + 1];
      const iz = initialPositions[i3 + 2];

      // Calculate distance to mouse cursor (in 2D plane projection)
      const dx = px - targetX;
      const dy = py - targetY;
      const distSq = dx * dx + dy * dy;

      // Interaction radius
      const influenceRadius = 1.5;
      
      if (distSq < influenceRadius * influenceRadius) {
        // Push particles away from the cursor
        const dist = Math.sqrt(distSq);
        const force = (influenceRadius - dist) / influenceRadius;
        
        positionsArray[i3] += (dx / dist) * force * 0.1;
        positionsArray[i3 + 1] += (dy / dist) * force * 0.1;
      } else {
        // Spring back to initial position slowly
        positionsArray[i3] += (ix - px) * 0.02;
        positionsArray[i3 + 1] += (iy - py) * 0.02;
        positionsArray[i3 + 2] += (iz - pz) * 0.02;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
        <Particles />
      </Canvas>
    </div>
  );
}
