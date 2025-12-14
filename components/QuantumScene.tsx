/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Box, Stars, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Manually define intrinsic elements to satisfy TypeScript in environments where 
// R3F types are not automatically picked up or are clashing.
// Augmenting both global JSX and React's internal JSX namespace to ensure compatibility across TS versions.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      coneGeometry: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      coneGeometry: any;
    }
  }
}

interface SceneColors {
    red: string;
    green: string;
    gold: string;
    cream: string;
    dark: string;
}

interface SceneProps {
    colors: SceneColors;
}

// Low Poly Christmas Tree Component
const ChristmasTree = ({ position, scale = 1, colors }: { position: [number, number, number]; scale?: number; colors: SceneColors }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
        // Gentle swaying
        groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() + position[0]) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Tree Layers */}
      <Cylinder args={[0, 0.8, 1.2, 8]} position={[0, 0.6, 0]} castShadow receiveShadow>
         <meshStandardMaterial color={colors.green} roughness={0.7} />
      </Cylinder>
      <Cylinder args={[0, 1.1, 1.2, 8]} position={[0, -0.2, 0]} castShadow receiveShadow>
         <meshStandardMaterial color={colors.green} roughness={0.7} />
      </Cylinder>
      <Cylinder args={[0, 1.4, 1.2, 8]} position={[0, -1.0, 0]} castShadow receiveShadow>
         <meshStandardMaterial color={colors.green} roughness={0.7} />
      </Cylinder>
      {/* Trunk */}
      <Cylinder args={[0.3, 0.3, 1, 6]} position={[0, -1.8, 0]}>
        <meshStandardMaterial color="#5C4033" />
      </Cylinder>
      {/* Star */}
      <Sphere args={[0.2, 16, 16]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color={colors.gold} emissive={colors.gold} emissiveIntensity={0.5} />
      </Sphere>
      {/* Ornaments */}
      <Sphere args={[0.1, 16, 16]} position={[0.5, -0.2, 0.5]}>
          <meshStandardMaterial color={colors.red} />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[-0.4, 0.4, 0.4]}>
          <meshStandardMaterial color={colors.gold} />
      </Sphere>
    </group>
  );
};

// 3D Gift Box Component
const GiftBox3D = ({ position, color, ribbonColor, rotation = [0,0,0] }: { position: [number, number, number]; color: string; ribbonColor: string; rotation?: [number, number, number] }) => {
    return (
        <group position={position} rotation={rotation as any}>
            <Box args={[1, 1, 1]}>
                <meshStandardMaterial color={color} roughness={0.3} />
            </Box>
            {/* Ribbon Vertical */}
            <Box args={[1.05, 1.05, 0.2]}>
                <meshStandardMaterial color={ribbonColor} metalness={0.8} />
            </Box>
             {/* Ribbon Horizontal */}
             <Box args={[0.2, 1.05, 1.05]}>
                <meshStandardMaterial color={ribbonColor} metalness={0.8} />
            </Box>
        </group>
    )
}

// Candy Cane Torus
const CandyTorus = ({ color }: { color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.2) * 0.2 + Math.PI / 2;
       ref.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Torus ref={ref} args={[3.2, 0.3, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.2} 
        roughness={0.1}
        metalness={0.1}
      />
    </Torus>
  );
}

export const HeroScene: React.FC<SceneProps> = ({ colors }) => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none transition-colors duration-500">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color={colors.gold} />
        <pointLight position={[-10, -10, -10]} intensity={1} color={colors.red} />
        
        {/* Snowflakes / Sparkles */}
        <Sparkles count={300} scale={12} size={3} speed={0.4} opacity={0.8} color="#FFFFFF" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Central Candy Element */}
          <CandyTorus color={colors.red} />
        </Float>
        
        {/* Floating Christmas Elements */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <ChristmasTree position={[-3.5, -1, -2]} scale={1} colors={colors} />
           <ChristmasTree position={[3.5, -1.5, -1]} scale={0.8} colors={colors} />
           
           <GiftBox3D position={[2, 2, -1]} color={colors.red} ribbonColor={colors.gold} rotation={[0.5, 0.5, 0]} />
           <GiftBox3D position={[-2, 2.5, -2]} color={colors.green} ribbonColor={colors.gold} rotation={[0.2, 0.1, 0.4]} />
           
           {/* Scattered Ornaments */}
           <Sphere args={[0.3, 32, 32]} position={[0, 3, 0]}>
                <MeshDistortMaterial color={colors.gold} speed={2} distort={0.4} />
           </Sphere>
        </Float>

        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export const ChristmasHatScene: React.FC<SceneProps> = ({ colors }) => {
  return (
    <div className="w-full h-full absolute inset-0 transition-colors duration-500" style={{ background: `linear-gradient(to bottom, ${colors.dark}, ${colors.green})` }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color={colors.gold} />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#fff" />
        <Environment preset="city" />
        
        <Sparkles count={40} scale={4} size={3} speed={0.3} opacity={0.6} color="#FFF" />

        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
          <group rotation={[0, 0, 0.15]} position={[0, -0.2, 0]}>
             {/* Base Fur */}
             <Torus args={[1.2, 0.35, 32, 64]} rotation={[Math.PI/2, 0, 0]} position={[0, -1, 0]}>
                <meshStandardMaterial color={colors.cream} roughness={1} />
             </Torus>
             
             {/* Hat Body */}
             <mesh position={[0, 0.2, 0]}>
                <coneGeometry args={[1.1, 2.5, 64]} />
                <meshStandardMaterial color={colors.red} roughness={0.3} />
             </mesh>

             {/* Tip Pom Pom */}
             <Sphere args={[0.35, 32, 32]} position={[0, 1.45, 0]}>
                <meshStandardMaterial color={colors.cream} roughness={1} />
             </Sphere>
          </group>
        </Float>
      </Canvas>
    </div>
  );
};
