'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import LoadingScreen from './LoadingScreen'
import ShootingStar from './ShootingStar'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowContent(true), 100)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useGSAP(
    () => {
      if (!isLoading && showContent && contentRef.current && loadingRef.current) {
        const tl = gsap.timeline()

        // Create zoom-in portal effect
        tl.to(loadingRef.current, {
          scale: 3,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })

        // Simultaneously zoom content from behind
        tl.fromTo(
          contentRef.current,
          {
            opacity: 0,
            scale: 0.5,
            filter: 'blur(20px)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out',
          },
          '<' // Start at the same time
        )

        // Animate content elements after zoom (excluding buttons)
        tl.from(
          contentRef.current.querySelectorAll('h1, p'),
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.5'
        )

        // Cleanup loading screen
        tl.call(() => {
          if (loadingRef.current) {
            loadingRef.current.style.display = 'none'
          }
        })
      }
    },
    { dependencies: [isLoading, showContent], scope: containerRef }
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Global Shooting Star Effect */}
      <ShootingStar />
      
      {/* Loading Screen */}
      <div
        ref={loadingRef}
        className={`fixed inset-0 z-50 ${isLoading ? '' : 'pointer-events-none'}`}
      >
        <LoadingScreen />
      </div>

      {/* Main Content */}
      {showContent && (
        <div ref={contentRef} style={{ opacity: 0 }}>
          {children}
        </div>
      )}
    </div>
  )
}
