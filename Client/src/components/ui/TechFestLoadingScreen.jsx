import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cpu, Zap, Code, Server, Wifi } from "lucide-react"

export default function TechFestLoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const duration = 4000 // 4 seconds for the loading animation
  const LOADING_SCREEN_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

  useEffect(() => {
    // Always show the loading screen initially
    setIsVisible(true)

    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, duration / 100)

    // Hide loading screen after duration
    const timer = setTimeout(() => {
      setIsVisible(false)

      // Store in localStorage when the loading screen was last shown
      try {
        window.localStorage.setItem("techFestLoadingLastShown", Date.now().toString())
      } catch (error) {
        console.error("Could not save to localStorage:", error)
      }
    }, duration + 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  // Check if we should show the loading screen
  useEffect(() => {
    try {
      const lastShown = window.localStorage.getItem("techFestLoadingLastShown")
      const currentTime = Date.now()

      // If never shown before or more than 24 hours have passed
      if (!lastShown || (currentTime - parseInt(lastShown, 10) > LOADING_SCREEN_INTERVAL)) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    } catch (error) {
      console.error("Could not access localStorage:", error)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Circuit board pattern background */}
      <CircuitBackground />

      {/* Star field */}
      <StarField />

      {/* Floating tech icons */}
      <div className="relative w-full h-full">
        <FloatingIcons />
      </div>

      {/* Central content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* TechFest Destination */}
        <motion.div
          className="text-white text-5xl font-bold mb-20 tracking-wider"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          TECHFEST 2025
        </motion.div>

        {/* Rocket Journey Container */}
        <motion.div 
          className="relative w-full h-64 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Journey Path */}
          <motion.div
            className="absolute w-3/4 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* Rocket Animation */}
          <motion.div
            className="relative z-10"
            initial={{ x: "-150%", scale: 0.6, opacity: 0 }}
            animate={{ 
              x: "0%", 
              scale: 1, 
              opacity: 1,
              rotate: [0, 5, -5, 0] // Slight wobble animation
            }}
            transition={{ 
              duration: 2, 
              delay: 1.5,
              type: "spring",
              stiffness: 50
            }}
          >
            <RocketAnimation />
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mt-10">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Loading percentage */}
        <motion.div 
          className="text-white text-sm mt-2 font-mono" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
        >
          {`LOADING... ${progress}%`}
        </motion.div>
      </div>

      {/* Data stream particles */}
      <DataParticles />
    </motion.div>
  )
}

// Rocket animation component
function RocketAnimation() {
  return (
    <div className="relative w-full h-full">
      {/* Orbit circles */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border border-purple-500 border-opacity-30"></div>
      </motion.div>

      <motion.div
        className="absolute inset-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border border-blue-400 border-opacity-40"></div>
      </motion.div>

      {/* Rocket */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rocket body */}
          <motion.path
            d="M40 10L30 25H50L40 10Z"
            fill="#f43f5e"
            animate={{ fill: ["#f43f5e", "#ec4899", "#f43f5e"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.path
            d="M30 25V50C30 55.5228 34.4772 60 40 60C45.5228 60 50 55.5228 50 50V25H30Z"
            fill="#f97316"
            animate={{ fill: ["#f97316", "#fb923c", "#f97316"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Windows */}
          <circle cx="40" cy="35" r="4" fill="#38bdf8" />
          <circle cx="40" cy="45" r="3" fill="#38bdf8" />

          {/* Rocket flames */}
          <motion.path
            d="M35 60L32 70M40 60L40 72M45 60L48 70"
            stroke="#fb923c"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              stroke: ["#fb923c", "#fbbf24", "#fb923c"],
              pathLength: [0.3, 1, 0.3],
              pathOffset: [0, 0.5, 1],
            }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          />
        </svg>

        {/* Flame particles */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-orange-300"
              style={{
                left: `${Math.random() * 20 - 10}px`,
                bottom: `${Math.random() * 5}px`,
              }}
              animate={{
                y: [0, 20 + Math.random() * 10],
                opacity: [1, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 1 + Math.random() * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Circuit board background
function CircuitBackground() {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern
          id="circuit-pattern"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <path
            d="M10 10 L90 10 L90 30 L70 30 L70 70 L30 70 L30 30 L10 30 Z"
            fill="none"
            stroke="rgba(56, 189, 248, 0.5)"
            strokeWidth="1"
          />
          <circle cx="10" cy="10" r="3" fill="rgba(56, 189, 248, 0.5)" />
          <circle cx="90" cy="10" r="3" fill="rgba(56, 189, 248, 0.5)" />
          <circle cx="10" cy="30" r="3" fill="rgba(56, 189, 248, 0.5)" />
          <circle cx="30" cy="30" r="3" fill="rgba(56, 189, 248, 0.5)" />
          <circle cx="70" cy="30" r="3" fill="rgba(56, 189, 248, 0.5)" />
          <circle cx="90" cy="30" r="3" fill="rgba(56, 189, 248, 0.5)" />
          <circle cx="30" cy="70" r="3" fill="rgba(56, 189, 248, 0.5)" />
          <circle cx="70" cy="70" r="3" fill="rgba(56, 189, 248, 0.5)" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
  )
}

// Floating tech icons
function FloatingIcons() {
  const icons = [
    { Icon: Cpu, delay: 0 },
    { Icon: Zap, delay: 1 },
    { Icon: Code, delay: 2 },
    { Icon: Server, delay: 3 },
    { Icon: Wifi, delay: 4 },
  ]

  return (
    <>
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-400 opacity-30"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8, 1],
            opacity: [0, 0.3, 0.2, 0.3],
            y: [0, -20, 0, 20, 0],
            x: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Icon size={40} />
        </motion.div>
      ))}
    </>
  )
}

// Data particles flowing through the screen
function DataParticles() {
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-5%",
            opacity: 0.6 + Math.random() * 0.4,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [`${Math.random() * 10 - 5}px`, `${Math.random() * 20 - 10}px`, `${Math.random() * 10 - 5}px`],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i + 100}
          className="absolute w-1 h-1 rounded-full bg-purple-400"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-5%",
            opacity: 0.6 + Math.random() * 0.4,
          }}
          animate={{
            y: ["0vh", "-105vh"],
            x: [`${Math.random() * 10 - 5}px`, `${Math.random() * 20 - 10}px`, `${Math.random() * 10 - 5}px`],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </>
  )
}

// Star field background
function StarField() {
  return (
    <>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  )
}
