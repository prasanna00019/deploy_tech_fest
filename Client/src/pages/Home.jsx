import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Events from "../components/ui/Events"
import SponsorsPage from "./Sponsors";
import spaceBg from "../assets/images/space-bg.png";
import themeIllustration from "../assets/images/theme-illustration.jpg";
import StarEffect from '../components/ui/StarEffect';


const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${spaceBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8">
          <StarEffect />
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#e0aaf2] via-[#affbfe] to-[#f9effe] animate-gradient bg-300% bg-left">
              FLUX'25
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Explore the frontiers of technology in our space-themed tech extravaganza
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Register Now
            </Button>
          </motion.div>
        </section>

        {/* Events Section */}
        {/* <motion.section 
          {...fadeInUp}
          className="min-h-screen flex items-center py-16 px-4 md:px-6 lg:px-8 bg-black/40 backdrop-blur-sm"
        >
          /*<div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              Featured Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Hackathon", desc: "24-hour coding challenge to solve space-related problems" },
                { title: "RoboWars", desc: "Battle of autonomous robots in simulated space conditions" },
                { title: "Space Talk", desc: "Conference with leading space technology experts" }
              ].map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:transform hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                  <p className="text-gray-300">{event.desc}</p>
                  <Button variant="outline" className="mt-4">Learn More</Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section> */}
        <Events/>

        {/* Theme Section */}
        <motion.section 
          {...fadeInUp}
          className="min-h-screen py-16 px-4 md:px-6 lg:px-8 backdrop-brightness-100"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
              Theme: Beyond the Stars
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div 
                {...fadeInUp}
                className="space-y-6 text-gray-200"
              >
                <p className="text-lg">
                  Embark on a journey through the cosmos at Techno Festival 2025. This year's theme explores
                  the boundless possibilities of space technology and innovation reaching Beyond the Stars.
                </p>
                <p className="text-lg">
                  From artificial intelligence in space exploration to sustainable space habitats,
                  discover how technology is shaping our future among the stars.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-lg overflow-hidden"
              >
                <img 
                  src={themeIllustration} 
                  alt="Space Theme" 
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          {...fadeInUp}
          className="min-h-screen py-16 px-4 md:px-6 lg:px-8 bg-black/40 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((member) => (
                <motion.div
                  key={member}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-purple-600/20">
                    <img
                      src={`/team-member-${member}.jpg`}
                      alt={`Team Member ${member}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-semibold">Team Member {member}</h3>
                  <p className="text-gray-300 text-sm">Position</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Sponsors Section */}
        {/* <motion.section 
          {...fadeInUp}
          className="min-h-screen py-16 px-4 md:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-500 text-center mb-12">
              Our Sponsors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
                <motion.div
                  key={sponsor}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-lg hover:bg-white/20 transition-colors duration-300"
                >
                  <img
                    src={`/sponsor-${sponsor}.png`}
                    alt={`Sponsor ${sponsor}`}
                    className="w-full h-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section> */}
        <SponsorsPage/>
      </div>
    </div>
  );
};

export default Home;