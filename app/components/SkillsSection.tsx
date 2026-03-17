'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

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

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current || !marqueeRef.current) return

    const section = sectionRef.current
    const marquee = marqueeRef.current

    // Get the width of one set of skills
    const skillSetWidth = marquee.scrollWidth / 4 // Since we have 4 sets

    // Create infinite horizontal scroll animation
    gsap.to(marquee, {
      x: -skillSetWidth,
      duration: 20,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % skillSetWidth}px`,
      },
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => gsap.to(marquee, { timeScale: 1, duration: 0.5 }),
        onLeave: () => gsap.to(marquee, { timeScale: 0.5, duration: 0.5 }),
        onEnterBack: () => gsap.to(marquee, { timeScale: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to(marquee, { timeScale: 0.5, duration: 0.5 }),
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Tech Skills
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex gap-8 w-fit"
        >
          {/* Render skills multiple times for continuous effect */}
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
    </section>
  )
}
