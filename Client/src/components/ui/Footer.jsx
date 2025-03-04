import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full z-50 bg-black text-gray-300 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-white text-3xl font-extrabold tracking-wide">Tech Fest</h2>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Innovating the future, one step at a time. Join us in making technology accessible and powerful.
            </p>
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-5">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-blue-500 transition-all duration-300 text-xl p-2 border border-gray-700 rounded-full hover:border-blue-500"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold border-b-2 border-blue-500 inline-block pb-1">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-gray-400 text-sm">
              {["Home", "Events", "About Us", "Contact"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-400 transition duration-300">
                    ➤ {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-xl font-semibold border-b-2 border-blue-500 inline-block pb-1">
              Contact Us
            </h3>
            <div className="mt-4 space-y-3 text-gray-400 text-sm">
              <p className="flex items-center justify-center md:justify-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 text-lg" />
                <span>123 Innovation Street, Ahmedabad, India</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-3">
                <FaEnvelope className="text-blue-400 text-lg" />
                <span>support@techfect.com</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-3">
                <FaPhoneAlt className="text-blue-400 text-lg" />
                <span>+91 98765 43210</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center border-t border-gray-700 mt-10 pt-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} Tech Fect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
