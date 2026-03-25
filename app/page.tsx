'use client'

import Navbar from './components/Navbar'
import AnimatedBackground from './components/AnimatedBackground'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ClickBlast from './components/ClickBlast'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ClickBlast />
    </div>
  );
}


