import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NotificationCard from "./ NotificationCard";
import { HOST } from "@/utils/constants";
import { motion } from "framer-motion";

const EventCards = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${HOST}/api/event/all-events`);

        if (!response.data.events || !Array.isArray(response.data.events)) {
          throw new Error("Invalid data format received");
        }

        setEvents(response.data.events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg animate-pulse">
        Loading events...
      </div>
    );

  if (error) return <NotificationCard type="error" message={error} />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.Event_ID}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-xl"
          >
            {/* Image Section */}
            <motion.div 
              className="relative h-48 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={event.Event_photo_link} 
                alt={event.Event_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
            </motion.div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <h3 className="text-xl font-bold text-white">{event.Event_name}</h3>
              
              {/* Event Details */}
              <div className="space-y-3 text-gray-300">
                <p>📅 {new Date(event.Event_date).toDateString()}</p>
                <p>📍 {event.Event_location}</p>
                {event.Event_fees && <p className="text-white font-semibold">💰 ₹{event.Event_fees}</p>}
                <p>📞 {event.Event_coordinator_contact}</p>
              </div>
              
              {/* Description */}
              <p className="text-gray-400 line-clamp-2">{event.Event_description}</p>
              
              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            onClick={() => window.location.href = event.registerLink}
          >
            Register Now
          </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2.5 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              onClick={() => window.location.href = `/event-details/${event.Event_ID}`}
              
            >
              Details
            </motion.button>
        
        </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventCards;
