import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaCalendarAlt, FaInfoCircle, FaHotel, FaUser, FaPhone, FaBars, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("authToken");
  const initials = localStorage.getItem("userInitials");

  useEffect(() => {
    if (token && initials) {
      setIsAuthenticated(true);
      setUserInitials(initials);
    } else {
      setIsAuthenticated(false);
      setUserInitials("");
    }
  }, [token, initials]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowLogoutConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInitials");
    setIsAuthenticated(false);
    setUserInitials("");
    setDropdownOpen(false);
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-violet-400 text-3xl font-extrabold tracking-wide">Tech Fest</div>
        <div className="hidden md:flex space-x-8">
          {[{ name: "Home", href: "/", icon: <FaHome /> }, { name: "Events", href: "/events", icon: <FaCalendarAlt /> }, { name: "About Us", href: "/about-us", icon: <FaInfoCircle /> }, { name: "Accommodation", href: "/accommodation", icon: <FaHotel /> }].map((link) => (
            <a key={link.name} href={link.href} className="flex items-center space-x-2 text-violet-400 hover:text-violet-500 text-lg font-semibold">
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
        <div className="hidden md:flex space-x-4 relative">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 bg-gradient-to-r from-violet-400 to-violet-500 text-white px-4 py-2 rounded-lg shadow-lg transition-transform hover:scale-105">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white font-semibold text-lg">{userInitials}</div>
                <FaChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                  {!showLogoutConfirm ? (
                    <>
                      <button onClick={() => setShowLogoutConfirm(true)} className="w-full flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-100 rounded-t-lg">
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                      <button onClick={() => { navigate("/about-us"); setDropdownOpen(false); }} className="w-full flex items-center space-x-2 px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-b-lg">
                        <FaPhone />
                        <span>Contact Us</span>
                      </button>
                    </>
                  ) : (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
                        <div className="flex space-x-4 justify-center">
                          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Yes</button>
                          <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">No</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Button onClick={() => navigate("/login")} className="px-6 py-3 bg-gradient-to-r from-violet-400 to-violet-500 text-white rounded-xl hover:from-violet-500 hover:to-violet-600">
              <FaUser />
              <span>Login</span>
            </Button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-violet-400 text-2xl">
            <FaBars />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
