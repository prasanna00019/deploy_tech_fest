import React, { useEffect, useRef } from 'react';

const SponsorsShowcase = ({ sponsors }) => {
  if (!sponsors?.length) return null;

  // Duplicate sponsors multiple times to ensure smooth looping
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContent = scrollRef.current;
    if (!scrollContent) return;

    // Calculate the duration based on content width
    const duration = (scrollContent.scrollWidth / 2) * 0.02; // Adjust speed here
    scrollContent.style.animationDuration = `${duration}s`;
  }, [sponsors]);

  return (
    <div className="w-full py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-4xl font-bold text-center text-white mb-4 opacity-90">
          Our Sponsors
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="scroll-container">
          <div ref={scrollRef} className="scroll-content">
            {duplicatedSponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                className="flex-shrink-0 w-80 h-80 bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm relative group mx-4"
                aria-hidden={index >= sponsors.length}
              >
                <img
                  src={sponsor.logo || "/api/placeholder/250/150"}
                  alt={sponsor.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/30 text-white text-center py-2 opacity-100 transition-opacity duration-500 group-hover:opacity-0">
                  {sponsor.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }
        .scroll-content {
          display: flex;
          width: max-content;
          animation: scrollLoop linear infinite;
        }
        @keyframes scrollLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default SponsorsShowcase;