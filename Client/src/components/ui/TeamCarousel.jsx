import { useState, useEffect } from "react";
import Jay from "../../assets/images/Jay.jpg";
import DG from "../../assets/images/dg.jpg";
import Tarang from "../../assets/images/tarang.jpg";
import Ashta from "../../assets/images/astha.jpg";
import Kushagra from "../../assets/images/Kushagra.png";
import Devanshi from "../../assets/images/Devanshi.jpg";
import pihu from "../../assets/images/pihu.png";
const allTeamMembers = [
  { id: 1, name: "Pihu Saharan", position: "President", image: pihu },
  { id: 2, name: "Jay Maganadiya", position: "Vice President", image: Jay  },
  { id: 3, name: "Kushagra Gupta", position: "Vice President", image: Kushagra  },
  { id: 4, name: "Tarang Lotwala", position: "Technical General Secretary", image: Tarang  },
  { id: 5, name: "Dhritiman Ghosh", position: "Technical General Secretary", image: DG  },
  { id: 6, name: "Aastha Motwani", position: "Technical General Secretary", image: Ashta  },
  { id: 7, name: "Devanshi Goswami", position: "Technical General Secretary", image: Devanshi  },
];

export default function TeamCarousel() {
  const [team, setTeam] = useState(allTeamMembers);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true); // Start animation

      setTimeout(() => {
        // Move first card to end after animation completes
        setTeam((prevTeam) => [...prevTeam.slice(1), prevTeam[0]]);
        setIsSliding(false); // Reset animation
      }, 500); // Duration of slide animation
    }, 3000); // Shift every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden w-full flex justify-center items-center relative">
      <div
        className={`flex gap-4 transition-transform duration-500 ease-in-out ${
          isSliding ? "-translate-x-0" : "translate-x-0"
        }`}
        style={{ width: "90%" }} // Ensures all cards are in the flex container
      >
        {team.map((member, index) => (
          <div
            key={member.id}
            className={`flex-shrink-0 bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 transition-all duration-300 ${
              index >= 5 ? "hidden md:flex" : ""
            }`}
          >
            <img src={member.image} alt={member.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 object-cover" />
            <h3 className="text-lg sm:text-xl font-semibold text-center">{member.name}</h3>
            <p className="text-center text-gray-400 text-sm sm:text-base">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}