import { useParams } from 'react-router-dom';
import EventDetails from '../components/ui/EventDetails';
import Hackathon from '../assets/images/hackathon.png';

const eventsData = [
  {
    id: "hackathon",
    title: "Cosmic Hackathon",
    image: Hackathon,
    description: `Join us for a 24-hour interstellar coding challenge where innovation meets the cosmos! The Cosmic Hackathon challenges participants to develop solutions for real-world space exploration problems.

    🚀 Key Focus Areas:
    • Space Navigation Systems
    • Resource Utilization in Space
    • Interplanetary Communication
    • Space Habitat Design

    Join us on this exciting journey to push the boundaries of space technology and innovation!`,
    prize: "Prize Pool: ₹1,00,000",
    timeline: "24-25 February 2025",
    venue: "Main Auditorium, IITRAM",
    teamSize: "2-4 members",
    registration: {
      deadline: "20 February 2025",
      fee: "₹500 per team",
      status: "Open"
    },
    rules: [
      "All team members must be currently enrolled students",
      "Cross-college teams are allowed",
      "Use of pre-built projects is strictly prohibited",
      "Projects must be original and developed during the hackathon",
      "Teams must present their solutions to the judges",
      "Code must be submitted to the designated repository",
      "All teams must comply with the code of conduct"
    ],
    coordinators: [
      {
        name: "Aarav Patel",
        contact: "+91 98765 43210",
        designation: "Technical Head",
        email: "aarav.p@iitram.ac.in"
      },
      {
        name: "Priya Sharma",
        contact: "+91 98765 43211",
        designation: "Event Coordinator",
        email: "priya.s@iitram.ac.in"
      }
    ]
  },
  {
    id: "robotics",
    title: "Space Robotics Challenge",
    image: "/images/robotics.jpg",
    description: `Build and program autonomous robots capable of completing missions inspired by real space exploration challenges. This competition pushes the boundaries of robotics engineering and autonomous systems.

    🤖 Challenge Rounds:
    • Lunar Surface Navigation
    • Resource Collection
    • Base Construction
    • Emergency Response

    Test your robotics skills in simulated extraterrestrial environments!`,
    prize: "Prize Pool: ₹75,000",
    timeline: "26 February 2025",
    venue: "Robotics Lab, IITRAM",
    teamSize: "3-5 members",
    registration: {
      deadline: "15 February 2025",
      fee: "₹1000 per team",
      status: "Open"
    },
    rules: [
      "Robots must fit within 40x40x40 cm dimensions",
      "Only battery-powered robots allowed",
      "Pre-built robots are allowed with modifications",
      "Teams must bring their own equipment",
      "Each round has a 5-minute time limit",
      "No wireless communication during runs",
      "Safety protocols must be followed"
    ],
    coordinators: [
      {
        name: "Dr. Vikram Singh",
        contact: "+91 98765 43212",
        designation: "Faculty Advisor",
        email: "vikram.s@iitram.ac.in"
      },
      {
        name: "Ravi Kumar",
        contact: "+91 98765 43213",
        designation: "Technical Coordinator",
        email: "ravi.k@iitram.ac.in"
      }
    ]
  },
  {
    id: "quantum",
    title: "Quantum Computing Workshop",
    image: "/images/quantum.jpg",
    description: `Dive into the future of computing with our intensive quantum computing workshop. Learn from industry experts and get hands-on experience with quantum simulators.

    📚 Workshop Modules:
    • Quantum Mechanics Basics
    • Quantum Circuits & Gates
    • Quantum Algorithms
    • Real-world Applications
    • Future of Quantum Computing

    Gain practical experience with quantum computing tools and frameworks!`,
    prize: "Certification & Internship Opportunities",
    timeline: "27 February 2025",
    venue: "Virtual Reality Center, IITRAM",
    teamSize: "Individual Participation",
    registration: {
      deadline: "22 February 2025",
      fee: "₹800 per participant",
      status: "Open"
    },
    rules: [
      "Participants must bring their own laptops",
      "Prior programming knowledge required",
      "All software must be installed before workshop",
      "Attendance mandatory for certification",
      "No recording of sessions allowed",
      "Active participation required",
      "Complete all hands-on exercises"
    ],
    coordinators: [
      {
        name: "Prof. Meera Iyer",
        contact: "+91 98765 43214",
        designation: "Workshop Lead",
        email: "meera.i@iitram.ac.in"
      },
      {
        name: "Arjun Menon",
        contact: "+91 98765 43215",
        designation: "Workshop Coordinator",
        email: "arjun.m@iitram.ac.in"
      }
    ]
  }
];

const Details = () => {
  const { eventId } = useParams();
  const event = eventsData.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <EventDetails event={event} />;
};

export default Details;