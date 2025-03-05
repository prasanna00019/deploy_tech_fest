import { useState, useEffect } from "react";

const allTeamMembers = [
  { id: 1, name: "Jane Doe", position: "Event Coordinator", image: "./dummy1.png" },
  { id: 2, name: "John Smith", position: "Technical Lead", image: "./dummy2.png" },
  { id: 3, name: "Alice Johnson", position: "Marketing Manager", image: "./dummy3.png" },
  { id: 4, name: "Bob Williams", position: "Logistics Coordinator", image: "./dummy1.png" },
  { id: 5, name: "Eva Brown", position: "Sponsorship Manager", image: "./dummy2.png" },
  { id: 6, name: "Mike Davis", position: "Design Lead", image: "./dummy3.png" },
  { id: 7, name: "Sarah Lee", position: "Public Relations", image: "./dummy1.png" },
  { id: 8, name: "Tom Hardy", position: "Operations Manager", image: "./dummy2.png" },
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
