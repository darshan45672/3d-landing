'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const particleCount = 80
    const particles: HTMLDivElement[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      // Random initial position
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 6 + 2
      const opacity = Math.random() * 0.8 + 0.4
      
      particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0.2) 70%);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 10px rgba(255,255,255,0.5);
      `
      
      canvasRef.current.appendChild(particle)
      particles.push(particle)
      
      // Animate each particle
      const duration = gsap.utils.random(10, 20)
      const xMove = gsap.utils.random(-30, 30)
      const yMove = gsap.utils.random(-30, 30)
      
      gsap.to(particle, {
        x: `${xMove}vw`,
        y: `${yMove}vh`,
        opacity: gsap.utils.random(0.3, 0.9),
        scale: gsap.utils.random(0.5, 1.5),
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      })
    }

    // Create larger glowing orbs
    for (let i = 0; i < 8; i++) {
      const orb = document.createElement('div')
      orb.className = 'orb'
      
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 300 + 150
      
      orb.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(100, 200, 255, 0.4) 0%, rgba(150, 100, 255, 0.2) 50%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        filter: blur(60px);
      `
      
      canvasRef.current.appendChild(orb)
      
      // Animate orbs
      gsap.to(orb, {
        x: gsap.utils.random(-150, 150),
        y: gsap.utils.random(-150, 150),
        scale: gsap.utils.random(0.8, 1.8),
        opacity: gsap.utils.random(0.5, 1),
        duration: gsap.utils.random(15, 25),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    // Cleanup
    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
