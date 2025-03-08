import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about-us" },
    { name: "Accommodation", path: "/accommodation" },
  ];

  const socialLinks = [
    { Icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=61563070520264&mibextid=ZbWKwL" },
    { Icon: FaYoutube, url: "https://youtube.com/@saciitram?si=PCO-3SO4KcdC6TXi" },
    { Icon: FaInstagram, url: "https://www.instagram.com/saciitram?igsh=MWFwODZkN3Yzdm44cw==" },
    { Icon: FaLinkedinIn, url: "https://www.linkedin.com/in/student-activity-center-iitram-2b80a331a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  ];

  return (
    <footer className="relative w-full z-50 bg-black text-gray-300 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-white text-3xl font-extrabold tracking-wide">
              FLUX
            </h2>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Innovating the future, one step at a time. Join us in making
              technology accessible and powerful.
            </p>
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-5">
              {socialLinks.map(({ Icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
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
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="hover:text-blue-400 transition duration-300 flex items-center space-x-2 w-full text-left"
                  >
                    <span className="text-blue-500">➤</span>
                    <span>{item.name}</span>
                  </button>
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
                <span>
                  Institute of Infrastructure, Technology, Research, and
                  Management (IITRAM), Ahmedabad, India
                </span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-3">
                <FaEnvelope className="text-blue-400 text-lg" />
                <span>President.ssenate@iitram.ac.in</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-3">
                <FaPhoneAlt className="text-blue-400 text-lg" />
                <span>+91 9925061044</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center border-t border-gray-700 mt-10 pt-4 text-gray-500 text-sm">
          © {new Date().getFullYear()} FLUX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
