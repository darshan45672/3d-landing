'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLLIElement[]>([])

  const toggleMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)

    if (newState) {
      // Show menu overlay
      if (menuRef.current) {
        menuRef.current.style.pointerEvents = 'auto'
      }

      // Animate hamburger to X and menu items
      const tl = gsap.timeline()
      
      // Fade in menu background
      tl.to(menuRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Transform hamburger to X
      tl.to(line1Ref.current, {
        y: 8,
        duration: 0.3,
        ease: 'power2.inOut',
      }, '<')
      .to(line3Ref.current, {
        y: -8,
        duration: 0.3,
        ease: 'power2.inOut',
      }, '<')
      .to(line2Ref.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, '<')
      .to(line1Ref.current, {
        rotation: 45,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      .to(line3Ref.current, {
        rotation: -45,
        duration: 0.3,
        ease: 'power2.inOut',
      }, '<')

      // Animate menu items in with stagger
      .from(menuItemsRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.2')
      
    } else {
      // Animate menu items out
      const tl = gsap.timeline({
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.pointerEvents = 'none'
          }
        }
      })
      
      // Fade out menu items
      tl.to(menuItemsRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
      })

      // Fade out menu background
      .to(menuRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, '-=0.2')

      // Transform X back to hamburger
      .to([line1Ref.current, line3Ref.current], {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      }, '<')
      .to(line1Ref.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      }, '<')
      .to(line3Ref.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      }, '<')
      .to(line2Ref.current, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      }, '<')
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Left - Brand Name */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              YOUR BRAND
            </h1>
          </div>

          {/* Center - Logo/Icon */}
          <div className="flex-1 flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                className="w-full h-full"
                fill="white"
              >
                <path d="M20 5 L35 15 L35 25 L20 35 L5 25 L5 15 Z" />
              </svg>
            </div>
          </div>

          {/* Right - Menu */}
          <div className="flex-1 flex items-center justify-end gap-4">
            {/* Animated Menu Button */}
            <button
              onClick={toggleMenu}
              className="relative w-12 h-12 flex items-center justify-center group"
              aria-label="Menu"
            >
              {/* Glowing border */}
              <span className="absolute inset-0 rounded-xl border border-white/30 group-hover:border-indigo-400/70 transition-colors duration-300" />
              <span className="absolute inset-0 rounded-xl bg-white/5 group-hover:bg-indigo-500/10 transition-colors duration-300" />
              {/* Corner accents */}
              <span className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-indigo-400/80 rounded-tl" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 border-t border-r border-indigo-400/80 rounded-tr" />
              <span className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b border-l border-indigo-400/80 rounded-bl" />
              <span className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-indigo-400/80 rounded-br" />
              {/* Hamburger lines */}
              <div className="relative flex flex-col gap-1.5 w-5 items-center justify-center">
                <span
                  ref={line1Ref}
                  className="w-5 h-0.5 bg-white block origin-center"
                />
                <span
                  ref={line2Ref}
                  className="w-3.5 h-0.5 bg-indigo-300 block self-start"
                />
                <span
                  ref={line3Ref}
                  className="w-5 h-0.5 bg-white block origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg pointer-events-none opacity-0"
      >
        <div className="flex items-center justify-center h-full px-8">
          <nav className="text-center">
            <ul className="space-y-8">
              <li ref={(el) => { if (el) menuItemsRef.current[0] = el }}>
                <a
                  href="#"
                  className="text-5xl md:text-7xl font-black text-white hover:text-lime-400 transition-colors inline-block"
                >
                  HOME
                </a>
              </li>
              <li ref={(el) => { if (el) menuItemsRef.current[1] = el }}>
                <a
                  href="#"
                  className="text-5xl md:text-7xl font-black text-white hover:text-lime-400 transition-colors inline-block"
                >
                  ABOUT
                </a>
              </li>
              <li ref={(el) => { if (el) menuItemsRef.current[2] = el }}>
                <a
                  href="#"
                  className="text-5xl md:text-7xl font-black text-white hover:text-lime-400 transition-colors inline-block"
                >
                  WORK
                </a>
              </li>
              <li ref={(el) => { if (el) menuItemsRef.current[3] = el }}>
                <a
                  href="#"
                  className="text-5xl md:text-7xl font-black text-white hover:text-lime-400 transition-colors inline-block"
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
