import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUsers, FaClipboardList } from "react-icons/fa";
import { HOST } from "@/utils/constants";

const Dashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    // Fetch Total Events
    fetch(`${HOST}/api/event/all-events`)
      .then((response) => response.json())
      .then((data) => {
        if (data.events && Array.isArray(data.events)) {
          setTotalEvents(data.events.length);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch Total Users
    fetch(`${HOST}/api/user/getAllUsers`)
      .then((response) => response.json())
      .then((data) => {
        if (data.users && Array.isArray(data.users)) {
          setTotalUsers(data.users.length);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch Total Registrations
    fetch(`${HOST}/api/event/getAllRegistrations`)
      .then((response) => response.json())
      .then((data) => {
        if (data.registrations && Array.isArray(data.registrations)) {
          setTotalRegistrations(data.registrations.length);
        }
      })
      .catch((error) => console.error("Error fetching registrations:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "Total Events",
            count: totalEvents,
            percent: "+2 from last month",
            icon: <FaCalendarAlt className="text-blue-500 text-3xl" />,
          },
          {
            title: "Total Users",
            count: totalUsers,
            percent: "+18% from last month",
            icon: <FaUsers className="text-green-500 text-3xl" />,
          },
          {
            title: "Total Registrations",
            count: totalRegistrations,
            percent: "+12% from last month",
            icon: <FaClipboardList className="text-purple-500 text-3xl" />,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-bold text-gray-700">{stat.title}</h2>
              <p className="text-3xl font-semibold text-gray-900">{stat.count}</p>
              <p className="text-sm text-green-500 mt-1">{stat.percent}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
