'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import CosmicEntity from './CosmicEntity'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Constellation Lines Component
function ConstellationLines() {
  const linesRef = useRef<THREE.LineSegments>(null!)
  const particleCount = 30
  const maxDistance = 3

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const linePos: number[] = []
    
    // Generate random particle positions
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12
      pos[i + 1] = (Math.random() - 0.5) * 12
      pos[i + 2] = (Math.random() - 0.5) * 8
    }

    // Create lines between nearby particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < maxDistance) {
          linePos.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
          linePos.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2])
        }
      }
    }

    return { positions: pos, linePositions: new Float32Array(linePos) }
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      linesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05
    }
  })

  return (
    <>
      {/* Constellation Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>
    </>
  )
}

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
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
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
        color="#a78bfa"
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
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={group}>
      {/* Icosahedron */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#c084fc"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Octahedron */}
      <mesh position={[3, -2, -2]} scale={0.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      
      {/* Tetrahedron */}
      <mesh position={[-3, 1, -1]} scale={0.6}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#f0abfc"
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
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return

    // Set initial state
    gsap.set(containerRef.current, { 
      opacity: 1, 
      scale: 1,
      force3D: true, 
      willChange: 'transform, opacity' 
    })
    gsap.set(contentRef.current, { 
      y: 0,
      force3D: true, 
      willChange: 'transform' 
    })

    // Fade out hero section as you scroll - optimized
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
      opacity: 0,
      scale: 0.95,
      ease: 'none',
      force3D: true,
    })

    // Parallax effect on content - smooth
    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
      y: -100,
      ease: 'none',
      force3D: true,
    })

    return () => {
      gsap.set([containerRef.current, contentRef.current], { willChange: 'auto' })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#a78bfa" />
          <pointLight position={[-10, -10, -5]} intensity={0.7} color="#22d3ee" />
          <pointLight position={[0, -5, 3]} intensity={0.5} color="#f0abfc" />
          <directionalLight position={[0, 5, 5]} intensity={0.5} />
          
          <ConstellationLines />
          <GeometricShapes />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 text-center py-16 mt-28">
        {/* Main Heading */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight">
          <span className="block">Create</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-pink-300">
            Innovation
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
          Building the future with cutting-edge technology
          <br />
          and exceptional design
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20 relative z-50">
          <button className="w-full sm:w-auto px-12 py-5 bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 text-white text-xl font-bold rounded-full shadow-lg shadow-purple-500/50 border border-purple-300/30 hover:shadow-xl hover:shadow-purple-400/60 hover:scale-105 transition-all duration-300">
            Explore Work
          </button>
          
          <button className="w-full sm:w-auto px-12 py-5 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white text-xl font-bold rounded-full shadow-lg shadow-blue-500/50 border border-blue-300/30 hover:shadow-xl hover:shadow-blue-400/60 hover:scale-105 transition-all duration-300">
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-400/50 transition-all">
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
        <div className="mt-24 flex flex-col items-center gap-3 text-gray-400 animate-bounce">
          <span className="text-sm uppercase tracking-widest">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* UFO - Fixed to Hero Section */}
      <CosmicEntity />
    </section>
  )
}
