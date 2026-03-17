'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Tech skills data
const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'JavaScript', icon: '💛' },
  { name: 'Three.js', icon: '🎮' },
  { name: 'GSAP', icon: '🎯' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📦' },
  { name: 'AWS', icon: '☁️' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Marquee animation
    if (marqueeRef.current) {
      const marquee = marqueeRef.current
      const skillSetWidth = marquee.scrollWidth / 4

      gsap.to(marquee, {
        x: -skillSetWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % skillSetWidth}px`,
        },
      })
    }
  }, [])

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return

    // Enable GPU acceleration
    gsap.set(sectionRef.current, { force3D: true, willChange: 'transform, opacity' })

    // Slide in from bottom with scale - optimized
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'top center',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
      opacity: 0,
      y: 150,
      scale: 0.95,
      ease: 'none',
      force3D: true,
    })

    // Stagger animation for content blocks - smooth
    gsap.from('.about-card', {
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top 75%',
        end: 'top 35%',
        scrub: 0.5,
      },
      opacity: 0,
      y: 60,
      stagger: {
        each: 0.1,
        ease: 'power1.out',
      },
      ease: 'power2.out',
      force3D: true,
    })

    return () => {
      gsap.set(sectionRef.current, { willChange: 'auto' })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-pink-300">Me</span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - About Me */}
          <div className="about-card space-y-6">
            <div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-pink-300 mb-4">
                Darshan Dinesh Bhandary
              </h3>
              <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-8">
                Crafting digital experiences that push the boundaries of creativity and technology
              </p>
            </div>
            <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed">
              A passionate developer and designer with expertise in creating immersive web experiences. 
              I combine creativity with technical excellence to bring ideas to life. Specializing in 3D web development, 
              interactive animations, and modern UI/UX design, I craft solutions that are both beautiful and performant.
            </p>
          </div>

          {/* Right Column - Photo */}
          <div className="about-card group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity" />
            <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-gray-800 group-hover:border-blue-500/50 transition-all">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop" 
                alt="Darshan Dinesh Bhandary" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Skills Marquee */}
        <div className="relative w-full overflow-hidden mt-16">
          <div
            ref={marqueeRef}
            className="flex gap-8 w-fit"
          >
            {[...Array(4)].map((_, setIndex) =>
              skills.map((skill, index) => (
                <div
                  key={`skill-${setIndex}-${index}`}
                  className="flex-shrink-0 px-8 py-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-6xl select-none">{skill.icon}</span>
                    <span className="text-xl font-semibold text-white whitespace-nowrap select-none">
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
