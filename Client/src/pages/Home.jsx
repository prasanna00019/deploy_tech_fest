import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import Events from "../components/ui/Events";
import SponsorsPage from "./Sponsors";
import spaceBg from "../assets/images/space-bg.png";
import themeIllustration from "../assets/images/theme-illustration.jpg";
import StarEffect from "../components/ui/StarEffect";
import jayesh from "../assets/images/jayesh.jpg"
import ayaan from "../assets/images/ayaan.jpg"
import namra from "../assets/images/namra.jpg"
import prasanna from "../assets/images/prasanna.jpg"
import om from "../assets/images/om.jpg"
import hemanshu from "../assets/images/hemanshu.jpg"
import ayaan1 from "../assets/images/ayaan1.jpg"

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem("authToken");
  const initials = localStorage.getItem("userInitials");

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (token && initials) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [token, initials]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${spaceBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
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
              Explore the frontiers of technology in our space-themed tech
              extravaganza
            </p>
            {!isAuthenticated && (
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 relative z-20"
                onClick={() => navigate("/register")}
              >
                Register Now
              </Button>
            )}
          </motion.div>
        </section>

        {/* Events Section */}       
        <Events />

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
              <motion.div {...fadeInUp} className="space-y-6 text-gray-200">
                <p className="text-lg">
                  Embark on a journey through the cosmos at Techno Festival
                  2025. This year's theme explores the boundless possibilities
                  of space technology and innovation reaching Beyond the Stars.
                </p>
                <p className="text-lg">
                  From artificial intelligence in space exploration to
                  sustainable space habitats, discover how technology is shaping
                  our future among the stars.
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-4xl mx-auto">
              {[
                {
                  name: "Ayaan Himani",
                  position: "Technical Lead",
                  image: ayaan,
                  linkedin:"http://www.linkedin.com/in/ayaan-himani-1a4923287",
                },
                {
                  name: "Namra Patel",
                  position: "Backend Developer",
                  image: namra,
                  linkedin:"http://www.linkedin.com/in/namra-patel-nsa",
                },
                {
                  name: "Jayesh Belsare",
                  position: "Frontend Developer",
                  image: jayesh,
                  linkedin:"http://www.linkedin.com/in/jayeshbelsare",
                },
                {
                  name: "Om Patel",
                  position: "Backend Developer",
                  image: om,
                  linkedin:"https://www.linkedin.com/in/om-patel-36aa25257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                },
                {
                  name: "Hemanshu Tala",
                  position: "Frontend Developer",
                  image: hemanshu,
                  linkedin:"https://www.linkedin.com/in/hemanshu-tala-679955288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                },
                {
                  name: "Prasanna Halakarnimath",
                  position: "Backend Developer",
                  image: prasanna,
                  linkedin:"https://www.linkedin.com/in/prasanna-h-28b07b27b",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-1 transition-transform duration-300 transform group-hover:scale-105">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <FaLinkedin className="text-3xl text-white hover:text-blue-500 transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-purple-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-300 text-sm bg-purple-600/10 rounded-full px-4 py-1 inline-block">
                    {member.position}
                  </p>
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
        <SponsorsPage />
      </div>
    </div>
  );
};

export default Home;
