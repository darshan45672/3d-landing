'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Floating Particles Component
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  const count = 200
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 15
      pos[i + 1] = (Math.random() - 0.5) * 15
      pos[i + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Rotating Geometric Shapes
function GeometricShapes() {
  const group = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={group}>
      {/* Icosahedron */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#818cf8"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Octahedron */}
      <mesh position={[3, -2, -2]} scale={0.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a5b4fc"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      
      {/* Tetrahedron */}
      <mesh position={[-3, 1, -1]} scale={0.6}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#c7d2fe"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#818cf8" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a5b4fc" />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />
          
          <FloatingParticles />
          <GeometricShapes />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center py-16">
        {/* Main Heading */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight">
          <span className="block">Create</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Innovation
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
          Building the future with cutting-edge technology
          <br />
          and exceptional design
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20 relative z-50">
          <button className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white text-xl font-bold rounded-full shadow-2xl border-2 border-white">
            Explore Work
          </button>
          
          <button className="w-full sm:w-auto px-12 py-5 bg-purple-600 text-white text-xl font-bold rounded-full border-2 border-white">
            Get Started
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { value: '10+', label: 'Years' },
            { value: '200+', label: 'Projects' },
            { value: '95%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-indigo-600/50 transition-all">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-24 flex flex-col items-center gap-3 text-gray-500 animate-bounce">
          <span className="text-sm uppercase tracking-widest">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
