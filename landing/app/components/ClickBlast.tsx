'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export default function ClickBlast() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      
      // Create blast container
      const blastContainer = document.createElement('div')
      blastContainer.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 9998;
      `
      document.body.appendChild(blastContainer)

      // Number of particles
      const particleCount = 50
      const particles: HTMLDivElement[] = []

      // Create particles with varied shapes and physics
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        const size = gsap.utils.random(3, 15)
        const hue = gsap.utils.random(180, 280) // Blue to purple range
        const isCircle = Math.random() > 0.3
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: ${isCircle ? '50%' : gsap.utils.random(0, 30) + '%'};
          background: ${
            isCircle 
              ? `radial-gradient(circle, hsl(${hue}, 100%, 80%) 0%, hsl(${hue}, 100%, 60%) 40%, hsl(${hue}, 90%, 40%) 100%)`
              : `linear-gradient(${gsap.utils.random(0, 360)}deg, hsl(${hue}, 100%, 70%), hsl(${hue + 20}, 100%, 50%))`
          };
          box-shadow: 
            0 0 ${size * 2}px hsl(${hue}, 100%, 70%),
            inset 0 0 ${size / 2}px rgba(255,255,255,0.5);
          left: 0;
          top: 0;
          filter: blur(${Math.random() > 0.7 ? 0.5 : 0}px);
        `
        
        blastContainer.appendChild(particle)
        particles.push(particle)

        // Random angle for explosion with some clustering
        const baseAngle = (i / particleCount) * Math.PI * 2
        const angleVariation = gsap.utils.random(-0.3, 0.3)
        const angle = baseAngle + angleVariation
        
        // Varied distances for more realistic spread
        const distance = gsap.utils.random(60, 250)
        const targetX = Math.cos(angle) * distance
        const targetY = Math.sin(angle) * distance + gsap.utils.random(-30, 30) // Add gravity effect
        
        // Rotation for dynamic movement
        const rotation = gsap.utils.random(-720, 720)
        
        // Animate particle outward with physics
        const tl = gsap.timeline()
        tl.to(particle, {
          x: targetX * 0.3,
          y: targetY * 0.3,
          rotation: rotation * 0.3,
          duration: 0.2,
          ease: 'power4.out',
        })
        .to(particle, {
          x: targetX,
          y: targetY + gsap.utils.random(20, 60), // Gravity pulls down
          rotation: rotation,
          opacity: 0,
          scale: gsap.utils.random(0.1, 0.3),
          duration: gsap.utils.random(0.6, 1.4),
          ease: 'power2.in',
        }, '-=0.1')
      }

      // Multiple shockwave rings
      for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div')
        const delay = i * 0.1
        ring.style.cssText = `
          position: absolute;
          width: 30px;
          height: 30px;
          border: ${4 - i}px solid rgba(${147 + i * 30}, ${197 - i * 20}, 253, ${0.9 - i * 0.2});
          border-radius: 50%;
          left: -15px;
          top: -15px;
          box-shadow: 
            0 0 ${30 - i * 5}px rgba(147, 197, 253, ${0.8 - i * 0.2}),
            inset 0 0 ${20 - i * 5}px rgba(255, 255, 255, ${0.3 - i * 0.1});
        `
        blastContainer.appendChild(ring)

        gsap.to(ring, {
          width: 350 + i * 50,
          height: 350 + i * 50,
          left: -(175 + i * 25),
          top: -(175 + i * 25),
          opacity: 0,
          borderWidth: 0,
          duration: 0.9 + i * 0.2,
          ease: 'power2.out',
          delay: delay,
        })
      }

      // Create center flash with multiple layers
      const flash = document.createElement('div')
      flash.style.cssText = `
        position: absolute;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, 
          rgba(255, 255, 255, 1) 0%, 
          rgba(200, 220, 255, 0.9) 20%,
          rgba(147, 197, 253, 0.6) 50%, 
          transparent 80%);
        border-radius: 50%;
        left: -20px;
        top: -20px;
        box-shadow: 
          0 0 50px rgba(255, 255, 255, 1),
          0 0 100px rgba(147, 197, 253, 0.8),
          0 0 150px rgba(96, 165, 250, 0.5);
        filter: blur(2px);
      `
      blastContainer.appendChild(flash)

      const flashTl = gsap.timeline()
      flashTl.to(flash, {
        scale: 2,
        opacity: 0.7,
        duration: 0.1,
        ease: 'power2.out',
      })
      .to(flash, {
        scale: 5,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      })

      // Add sparks
      for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div')
        spark.style.cssText = `
          position: absolute;
          width: 2px;
          height: ${gsap.utils.random(15, 35)}px;
          background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(147,197,253,0.5), transparent);
          left: 0;
          top: 0;
          border-radius: 2px;
          box-shadow: 0 0 5px rgba(255,255,255,0.8);
        `
        blastContainer.appendChild(spark)

        const sparkAngle = (i / 12) * Math.PI * 2
        const sparkDistance = gsap.utils.random(100, 180)
        
        gsap.to(spark, {
          x: Math.cos(sparkAngle) * sparkDistance,
          y: Math.sin(sparkAngle) * sparkDistance,
          opacity: 0,
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(0.5, 0.9),
          ease: 'power3.out',
        })
      }

      // Cleanup after animation
      setTimeout(() => {
        blastContainer.remove()
      }, 2000)
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return null
}
