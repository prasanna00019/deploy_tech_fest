import { useState, useEffect } from 'react';
import axios from 'axios';
import { HOST } from '@/utils/constants';
import EventsContainer from './EventCards';
import TechSpinner from './TechSpinner';
import NotificationCard from './NotificationCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${HOST}/api/event/random-events`);
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <TechSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/40 backdrop-blur-sm py-12">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Featured Events
      </h1>
      
      {error ? (
        <NotificationCard type="error" message={error} />
      ) : (
        <EventsContainer events={events} />
      )}
    </div>
  );
};

export default Events;