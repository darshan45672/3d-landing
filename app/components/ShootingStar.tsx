'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ShootingStar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trailPositions = useRef<Array<{ x: number; y: number }>>([])
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const trailCount = 20
    const container = containerRef.current
    if (!container) return

    // Create trail particles
    const trails: HTMLDivElement[] = []
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div')
      const size = 10 - i * 0.4
      const opacity = 1 - i * 0.045
      
      trail.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, rgba(147,197,253,${opacity * 0.8}) 40%, rgba(96,165,250,${opacity * 0.5}) 70%, transparent 100%);
        pointer-events: none;
        box-shadow: 0 0 ${15 - i * 0.6}px rgba(255,255,255,${opacity * 0.8}), 0 0 ${25 - i}px rgba(147,197,253,${opacity * 0.5});
        filter: blur(${i * 0.1}px);
        opacity: ${opacity};
      `
      container.appendChild(trail)
      trails.push(trail)
      trailPositions.current.push({ x: 0, y: 0 })
    }

    // Main star
    const star = document.createElement('div')
    star.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: radial-gradient(circle, #ffffff 0%, #93c5fd 30%, #60a5fa 60%, transparent 100%);
      pointer-events: none;
      box-shadow: 
        0 0 20px rgba(255,255,255,1),
        0 0 40px rgba(147,197,253,0.8),
        0 0 60px rgba(96,165,250,0.6),
        0 0 80px rgba(59,130,246,0.4);
      filter: blur(0.5px);
      z-index: 10001;
    `
    container.appendChild(star)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Update main star position immediately
      gsap.set(star, {
        x: e.clientX - 7,
        y: e.clientY - 7,
      })

      // Update trail positions with delay
      trailPositions.current.unshift({ x: e.clientX, y: e.clientY })
      trailPositions.current = trailPositions.current.slice(0, trailCount)

      trails.forEach((trail, index) => {
        const pos = trailPositions.current[index]
        if (pos) {
          const delay = index * 0.015
          gsap.to(trail, {
            x: pos.x - (5 - index * 0.2),
            y: pos.y - (5 - index * 0.2),
            duration: 0.4,
            ease: 'power2.out',
            delay: delay,
          })
        }
      })
    }

    // Show cursor effect
    const handleMouseEnter = () => {
      document.body.style.cursor = 'none'
      if (container) container.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      document.body.style.cursor = 'auto'
      if (container) container.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Keep visible when mouse re-enters
    window.addEventListener('mouseenter', handleMouseEnter)

    // Initialize
    handleMouseEnter()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.body.style.cursor = 'auto'
      trails.forEach(trail => trail.remove())
      star.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 10000,
        opacity: 0,
        transition: 'opacity 0.3s',
      }}
    />
  )
}
