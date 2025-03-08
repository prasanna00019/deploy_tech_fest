import { useState, useEffect } from "react";
import axios from "axios";
import { HOST } from "@/utils/constants";
import EventCards from "@/components/ui/EventCards";
import TechSpinner from "@/components/ui/TechSpinner";
import NotificationCard from "@/components/ui/NotificationCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${HOST}/api/event/all-events`);
        if (response.data.events) {
          setEvents(response.data);
        } else {
          throw new Error("No events found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0118]">
        <TechSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0118]">
        <NotificationCard type="error" message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0118]">
      <div className="pt-16 pb-20 px-4">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mt-6 mb-6">
          All Events
        </h1>
        <EventCards events={events} />
      </div>
    </div>
  );
};

export default Events;