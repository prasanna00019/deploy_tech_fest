import React, { useState } from "react";
import { FaHome, FaCalendarAlt, FaInfoCircle, FaHotel, FaUser, FaUserPlus, FaBars,FaPhone} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate(); 
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={'fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent'}>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left Section - Logo */}
        <div className="text-violet-400 text-3xl font-extrabold tracking-wide">Tech Fest</div>
        
        {/* Middle Section - Navigation Links */}
        <div className={'hidden md:flex space-x-8 transition-all duration-300 opacity-100'}>
          {[
            { name: "Home", href: "/", icon: <FaHome /> },
            { name: "Events", href: "#", icon: <FaCalendarAlt /> },
            { name: "About Us", href: "/about", icon: <FaInfoCircle /> },
            { name: "Accommodation", href: "/accommodation", icon: <FaHotel /> },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center space-x-2 text-violet-400 hover:text-violet-500 transition duration-300 text-lg font-semibold relative group"
            >
              {link.icon}
              <span>{link.name}</span>
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Section - Login/Register Buttons */}
        <div className="hidden md:flex space-x-4">
      <Button 
        onClick={() => navigate("/login")} // Redirect to Login page
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600 text-white rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        <FaUser />
        <span>Login</span>
      </Button>

      <Button 
        onClick={() => navigate("/about")} // Redirect to Register page
        variant="outline" 
        className="flex items-center space-x-2 px-6 py-3 border-violet-400 text-violet-400 hover:bg-violet-500 hover:text-white rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        <FaPhone />
        <span>Contact</span>
      </Button>
    </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-violet-400 text-2xl focus:outline-none">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-violet-900/90 p-6 space-y-4 flex flex-col items-center">
          {[
            { name: "Home", href: "/", icon: <FaHome /> },
            { name: "Events", href: "#", icon: <FaCalendarAlt /> },
            { name: "About Us", href: "/about", icon: <FaInfoCircle /> },
            { name: "Accommodation", href: "/accommodation", icon: <FaHotel /> },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center space-x-2 text-violet-400 hover:text-violet-500 transition duration-300 text-lg font-semibold"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
          
      <Button 
        onClick={() => navigate("/login")} // Redirect to Login page
        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600 text-white rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        <FaUser />
        <span>Login</span>
      </Button>

      <Button 
        onClick={() => navigate("/about")} // Redirect to Register page
        variant="outline" 
        className="w-full px-6 py-3 border-violet-400 text-violet-400 hover:bg-violet-500 hover:text-white rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        <FaPhone />
        <span>Contact</span>
      </Button>
  
        </div>
      )}
    </nav>
  );
};

export default Navbar;
