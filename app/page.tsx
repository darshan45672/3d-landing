'use client'

import Navbar from './components/Navbar'
import AnimatedBackground from './components/AnimatedBackground'
import HeroSection from './components/HeroSection'
import ShootingStar from './components/ShootingStar'
import ClickBlast from './components/ClickBlast'
import CosmicEntity from './components/CosmicEntity'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <Navbar />
      <HeroSection />
      <ShootingStar />
      <ClickBlast />
      <CosmicEntity />
    </div>
  );
}

