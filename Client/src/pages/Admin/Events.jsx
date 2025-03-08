import React, { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "@/utils/constants";

const Events = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    axios
      .get(`${HOST}/api/event/all-events`)
      .then((response) => {
        setEvents(response.data.events); // Assuming events are in response.data.events
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">Events</h1>
        <p className="text-gray-600 mb-4">Manage your techfest events.</p>

        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search events..."
            className="border p-2 rounded w-1/3"
          />
          <div className="flex gap-2">
            <select className="border p-2 rounded">
              <option>All Status</option>
            </select>
          </div>
        </div>

        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Fees</th>
              <th className="p-3 text-left">Max Team Size</th>
    
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <img
                      src={event.Event_photo_link}
                      alt={event.Event_name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium">{event.Event_name}</td>
                  <td className="p-3">{event.Event_timeline}</td>
                  <td className="p-3">{event.Event_location}</td>
                  <td className="p-3">₹{event.Event_fees}</td>
                  <td className="p-3">{event.MaxTeam_Size}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
