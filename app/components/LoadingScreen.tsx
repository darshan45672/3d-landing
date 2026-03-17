'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      // Animate portal circles growing from center - slower and bigger
      tl.from('.portal-ring', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.25,
        ease: 'power2.out',
      })

      // Animate decorative lines from center
      tl.from(
        '.line',
        {
          scaleX: 0,
          transformOrigin: 'center',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=1'
      )

      // Logo animations - entire logo zooms in first
      tl.from(
        textRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.8'
      )
      // Then animate logo parts sequentially
      .from(
        '.logo-outer-ring',
        {
          scale: 0,
          rotation: -180,
          duration: 1,
          ease: 'back.out(1.5)',
        },
        '-=0.8'
      )
      .from(
        '.logo-inner-shape',
        {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(2)',
          stagger: 0.1,
        },
        '-=0.7'
      )
      .from(
        '.logo-center',
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.5'
      )

      // Animate main circle
      tl.from(
        circleRef.current,
        {
          scale: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.8'
      )

      // Continuous animations
      // Much bigger breathing/zoom effect on portal rings
      gsap.to('.portal-ring', {
        scale: 2,
        opacity: 0.6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: 'power2.inOut',
      })

      // Gentle breathing/zoom effect on entire logo
      gsap.to(textRef.current, {
        scale: 1.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

      // Rotate outer ring
      gsap.to('.logo-outer-ring', {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
      })

      // Counter-rotate inner shapes
      gsap.to('.logo-inner-shape', {
        rotation: -360,
        duration: 6,
        repeat: -1,
        ease: 'none',
        stagger: 0.2,
      })

      // Pulse center
      gsap.to('.logo-center', {
        scale: 1.2,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })

      // Rotate portal
      gsap.to(portalRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Portal/Tunnel Effect - Multiple concentric circles */}
      <div ref={portalRef} className="absolute inset-0 flex items-center justify-center">
        <div className="portal-ring absolute w-32 h-32 rounded-full border-2 border-white/10" />
        <div className="portal-ring absolute w-48 h-48 rounded-full border-2 border-white/8" />
        <div className="portal-ring absolute w-64 h-64 rounded-full border-2 border-white/6" />
        <div className="portal-ring absolute w-96 h-96 rounded-full border-2 border-white/4" />
        <div className="portal-ring absolute w-[32rem] h-[32rem] rounded-full border-2 border-white/2" />
      </div>

      {/* Decorative animated lines */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none">
        <div className="line h-[2px] w-32 bg-white/20" />
        <div className="line h-[2px] w-48 bg-white/30" />
        <div className="line h-[2px] w-64 bg-white/20" />
      </div>

      {/* Central animated circle */}
      <div
        ref={circleRef}
        className="absolute w-64 h-64 rounded-full border-2 border-white/20 bg-white/5"
      />

      {/* Animated Logo */}
      <div ref={textRef} className="relative z-10">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="drop-shadow-2xl"
        >
          {/* Outer rotating ring */}
          <circle
            className="logo-outer-ring"
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="10 5"
            opacity="0.6"
          />

          {/* Inner rotating triangles/shapes */}
          <polygon
            className="logo-inner-shape"
            points="150,80 110,140 190,140"
            fill="white"
            opacity="0.4"
          />
          <polygon
            className="logo-inner-shape"
            points="150,220 190,160 110,160"
            fill="white"
            opacity="0.4"
          />
          <polygon
            className="logo-inner-shape"
            points="80,150 140,110 140,190"
            fill="white"
            opacity="0.3"
          />
          <polygon
            className="logo-inner-shape"
            points="220,150 160,190 160,110"
            fill="white"
            opacity="0.3"
          />

          {/* Center pulsing circle */}
          <circle
            className="logo-center"
            cx="150"
            cy="150"
            r="30"
            fill="white"
            opacity="0.9"
          />
          <circle
            className="logo-center"
            cx="150"
            cy="150"
            r="20"
            fill="black"
            opacity="1"
          />
          <circle
            className="logo-center"
            cx="150"
            cy="150"
            r="10"
            fill="white"
            opacity="1"
          />
        </svg>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-16 flex flex-col items-center gap-2">
        <div className="w-1 h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </div>
  )
}

