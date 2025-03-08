import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaCalendarAlt, FaInfoCircle, FaHotel, FaUser, FaPhone, FaBars, FaSignOutAlt, FaChevronDown, FaTimes } from "react-icons/fa";
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
  const mobileMenuRef = useRef(null);

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
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          event.target.className !== "text-violet-400 text-2xl") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, mobileMenuRef]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const handleLogout = () => {
    // This function handles the actual logout process
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInitials");
    setIsAuthenticated(false);
    setUserInitials("");
    setDropdownOpen(false);
    setShowLogoutConfirm(false);
    setMenuOpen(false); // Close mobile menu when logging out
    navigate("/");
  };

  return (
    <>
      {/* Fixed navbar with bottom margin (mb-16) added */}
      <nav className="fixed bg-black/20 backdrop-blur-md top-0 left-0 w-full z-50 transition-all duration-300 mb-16">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="bg-gradient-to-r bg-clip-text text-transparent from-[#e0aaf2] via-[#affbfe] to-[#f9effe] animate-gradient bg-300% bg-left text-3xl font-extrabold tracking-wide">FLUX</div>
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
                    <button onClick={() => setShowLogoutConfirm(true)} className="w-full flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-100 rounded-t-lg">
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                    <button onClick={() => { navigate("/about-us"); setDropdownOpen(false); }} className="w-full flex items-center space-x-2 px-4 py-2 text-blue-500 hover:bg-blue-100 rounded-b-lg">
                      <FaPhone />
                      <span>Contact Us</span>
                    </button>
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
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="relative z-50 text-violet-400 hover:text-violet-500 transition-colors duration-300 p-2"
            >
              {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Enhanced Mobile menu with animation and glassmorphism */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-gradient-to-br from-violet-900/90 via-purple-800/90 to-indigo-900/90 backdrop-blur-md shadow-2xl transform transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-end p-6 border-b border-white/10">
              <div className="mr-auto bg-gradient-to-r bg-clip-text text-transparent from-[#e0aaf2] via-[#affbfe] to-[#f9effe] text-2xl font-extrabold">FLUX</div>
            </div>
            
            <div className="flex-1 overflow-y-auto py-8 px-6">
              <div className="space-y-8">
                {isAuthenticated && (
                  <div className="mb-8 p-4 rounded-xl bg-white/10 backdrop-blur-md flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-violet-400 to-violet-600 text-white font-bold text-xl shadow-lg mr-4">{userInitials}</div>
                    <div>
                      <p className="text-white/80 text-sm">Signed in as</p>
                      <p className="text-white font-semibold">User {userInitials}</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  {[{ name: "Home", href: "/", icon: <FaHome /> }, { name: "Events", href: "/events", icon: <FaCalendarAlt /> }, { name: "About Us", href: "/about-us", icon: <FaInfoCircle /> }, { name: "Accommodation", href: "/accommodation", icon: <FaHotel /> }].map((link, index) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      className="flex items-center space-x-4 text-white/90 hover:text-white text-lg font-medium group" 
                      onClick={() => setMenuOpen(false)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                        {link.icon}
                      </div>
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 space-y-4">
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => { navigate("/about-us"); setMenuOpen(false); }} 
                    className="flex items-center w-full space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-300"
                  >
                    <FaPhone />
                    <span>Contact Us</span>
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(true)} 
                    className="flex items-center w-full space-x-2 px-4 py-3 bg-red-500/70 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Button 
                  onClick={() => { navigate("/login"); setMenuOpen(false); }} 
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-violet-400 to-violet-600 text-white rounded-xl hover:from-violet-500 hover:to-violet-700 py-4 shadow-lg transition-all duration-300"
                >
                  <FaUser />
                  <span>Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
            <div className="flex space-x-4 justify-center">
              {/* Fixed the logout button to call handleLogout */}
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Yes</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;