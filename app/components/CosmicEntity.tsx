'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function UFO() {
  const ufoRef = useRef<THREE.Group>(null!)
  const propulsionRef = useRef<THREE.Mesh>(null!)
  const particlesRef = useRef<THREE.Points>(null!)
  
  useFrame((state) => {
    if (ufoRef.current) {
      // Floating motion
      ufoRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3
      ufoRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      ufoRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.06
    }

    if (propulsionRef.current) {
      // Pulsing propulsion beam
      const pulse = Math.sin(state.clock.getElapsedTime() * 4) * 0.4 + 0.6
      propulsionRef.current.scale.set(pulse, 1, pulse)
      ;(propulsionRef.current.material as THREE.MeshStandardMaterial).opacity = pulse * 0.5
      ;(propulsionRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 3
    }

    if (particlesRef.current) {
      // Rotate particles for swirl effect
      particlesRef.current.rotation.y += 0.02
    }
  })

  return (
    <group ref={ufoRef} position={[0, 0, 0]} scale={1.09}>
      {/* Main dome (top part) */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[1.2, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#9ca3af"
          metalness={0.95}
          roughness={0.15}
          emissive="#60a5fa"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Glass cockpit with detail */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          metalness={0.05}
          roughness={0.05}
          transparent
          opacity={0.6}
          emissive="#60a5fa"
          emissiveIntensity={0.8}
          transmission={0.2}
          thickness={0.3}
        />
      </mesh>

      {/* Main saucer body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[2.2, 1.8, 0.5, 64]} />
        <meshStandardMaterial
          color="#6b7280"
          metalness={0.9}
          roughness={0.2}
          emissive="#3b82f6"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Bottom disc with panels */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.15, 64]} />
        <meshStandardMaterial
          color="#4b5563"
          metalness={0.95}
          roughness={0.15}
          emissive="#22d3ee"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Accent lights around the saucer */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const color = '#06b6d4'
        return (
          <mesh key={i} position={[x, -0.05, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
        )
      })}

      {/* Propulsion beam cone - smooth gradient */}
      <mesh ref={propulsionRef} position={[0, -1.5, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[1.2, 0.1, 2.5, 32, 20, true]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={3}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer glow layer */}
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[1.4, 0.2, 2.8, 32, 20, true]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.5}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner bright core */}
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={5}
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Energy rings */}
      {[0, 0.5, 1, 1.5].map((offset, i) => (
        <mesh key={i} position={[0, -0.8 - offset, 0]}>
          <torusGeometry args={[0.3 + offset * 0.3, 0.05, 16, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={3 - i * 0.5}
            transparent
            opacity={0.6 - i * 0.1}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Propulsion particles */}
      <points ref={particlesRef} position={[0, -1.5, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={new Float32Array(Array.from({ length: 150 }, (_, i) => {
              const angle = (i % 3 === 0) ? Math.random() * Math.PI * 2 : 0
              const radius = (i % 3 === 0) ? Math.random() * 0.8 : 0
              return i % 3 === 0 
                ? Math.cos(angle) * radius 
                : i % 3 === 1 
                  ? -Math.random() * 1.5
                  : Math.sin(angle) * radius
            }))}
            itemSize={3}
            args={[new Float32Array(Array.from({ length: 150 }, (_, i) => {
              const angle = (i % 3 === 0) ? Math.random() * Math.PI * 2 : 0
              const radius = (i % 3 === 0) ? Math.random() * 0.8 : 0
              return i % 3 === 0 
                ? Math.cos(angle) * radius 
                : i % 3 === 1 
                  ? -Math.random() * 1.5
                  : Math.sin(angle) * radius
            })), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#22d3ee"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Main point lights from UFO */}
      <pointLight position={[0, -0.6, 0]} intensity={4} distance={10} color="#06b6d4" decay={2} />
      <pointLight position={[0, 0.8, 0]} intensity={2} distance={5} color="#60a5fa" />
    </group>
  )
}

export default function CosmicEntity() {
  return (
    <div className="absolute bottom-8 right-8 w-[350px] h-[350px] pointer-events-none z-10">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.3} />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1.5} 
        />
        <directionalLight position={[-3, 3, 3]} intensity={0.5} />
        {/* Rim lights for edge definition */}
        <pointLight position={[3, 0, 3]} intensity={1.5} distance={8} color="#60a5fa" />
        <pointLight position={[-3, 0, 3]} intensity={1.5} distance={8} color="#06b6d4" />
        <pointLight position={[0, 0, -5]} intensity={1} distance={10} color="#3b82f6" />
        <UFO />
      </Canvas>
    </div>
  )
}
