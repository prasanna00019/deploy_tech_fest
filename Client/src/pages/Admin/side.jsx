import React from "react";
import { FaHome, FaPlus, FaCalendarAlt, FaComment, FaClipboardList, FaUsers } from "react-icons/fa";

// Fix: Destructure props properly using curly braces
const Sidebar = ({ onComponentChange, activeComponent }) => {

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "create-event", label: "Create Event", icon: <FaPlus /> },
    { id: "events", label: "Events", icon: <FaCalendarAlt /> },
    { id: "feedback", label: "Feedback", icon: <FaComment /> },
    { id: "registrations", label: "Registrations", icon: <FaClipboardList /> },
    { id: "users", label: "Users", icon: <FaUsers /> }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mt-20">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onComponentChange(item.id)}
            className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors ${
              activeComponent === item.id ? "bg-purple-50 text-purple-600" : ""
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;