import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StarEffect = () => {
  const [stars, setStars] = useState([]);
  const idCounter = useRef(0); // Add a counter reference

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create multiple stars with different properties
    const newStars = Array.from({ length: 3 }).map((_, index) => {
      idCounter.current += 1; // Increment counter for each star
      return {
        id: `star-${idCounter.current}`, // Use counter for unique IDs
        x,
        y,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 0.8 + 0.6,
        delay: index * 0.1,
      };
    });

    setStars(prev => [...prev, ...newStars]);

    // Remove stars after animation
    setTimeout(() => {
      setStars(prev => prev.filter(star => !newStars.find(n => n.id === star.id)));
    }, 2000);
  };

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: star.x,
              y: star.y,
              rotate: 0
            }}
            animate={{ 
              opacity: [0, 1, 0.5, 0],
              scale: [0, star.size, star.size * 1.2, star.size * 1.5],
              rotate: [0, 45, 90, 180]
            }}
            transition={{ 
              duration: star.duration,
              delay: star.delay,
              ease: [0.4, 0, 0.2, 1], // Custom easing
              times: [0, 0.2, 0.6, 1]
            }}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              backgroundColor: 'white',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: `
                0 0 ${2 + star.size}px #fff,
                0 0 ${4 + star.size * 2}px #fff,
                0 0 ${6 + star.size * 3}px rgba(255,255,255,0.8),
                0 0 ${8 + star.size * 4}px rgba(255,255,255,0.6)
              `,
              willChange: 'transform, opacity',
              pointerEvents: 'none'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StarEffect;  