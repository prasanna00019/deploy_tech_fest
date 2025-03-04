import EventsContainer from './EventCards';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Cosmic Hackathon",
      category: "Competition",
      date: "March 15-16, 2025",
      time: "48 Hours",
      venue: "Main Auditorium",
      description: "Join us for an exciting space-themed hackathon where you'll build innovative solutions!",
      image: "https://picsum.photos/200", // Add your image path
      price: "500",
      registerLink: "/register/hackathon",
      learnMoreLink: "/events/hackathon"
    },{
      id: 2,
      title: "Cosmic Hackathon",
      category: "Competition",
      date: "March 15-16, 2025",
      time: "48 Hours",
      venue: "Main Auditorium",
      description: "Join us for an exciting space-themed hackathon where you'll build innovative solutions!",
      image: "https://picsum.photos/200", // Add your image path
      price: "500",
      registerLink: "/register/hackathon",
      learnMoreLink: "/events/hackathon"
    },{
      id: 3,
      title: "Cosmic Hackathon",
      category: "Competition",
      date: "March 15-16, 2025",
      time: "48 Hours",
      venue: "Main Auditorium",
      description: "Join us for an exciting space-themed hackathon where you'll build innovative solutions!",
      image: "https://picsum.photos/200", // Add your image path
      price: "500",
      registerLink: "/register/hackathon",
      learnMoreLink: "/events/hackathon"
    },
    // {
    //   id: 4,
    //   title: "Cosmic Hackathon",
    //   category: "Competition",
    //   date: "March 15-16, 2025",
    //   time: "48 Hours",
    //   venue: "Main Auditorium",
    //   description: "Join us for an exciting space-themed hackathon where you'll build innovative solutions!",
    //   image: "https://picsum.photos/200", // Add your image path
    //   price: "500",
    //   registerLink: "/register/hackathon",
    //   learnMoreLink: "/events/hackathon"
    // },
    // Add more events...
  ];

  return (
    <div className="min-h-screen bg-black/40 backdrop-blur-sm py-12">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Featured Events
      </h1>
      <EventsContainer events={events} />
    </div>
  );
};

export default Events;