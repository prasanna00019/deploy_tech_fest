import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventDetails from "@/components/ui/EventDetails";
import NotificationCard from "@/components/ui/NotificationCard";
import { HOST } from "@/utils/constants";

const Details = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `${HOST}/api/event/get-event-by-id/${eventId}`
        );
        const data = response.data;

        if (!data || !data.event) {
          throw new Error("Invalid event data received");
        }

        const eventData = data.event;

        setEvent({
          id: eventData.Event_ID || "N/A",
          title: eventData.Event_name || "Untitled Event",
          description: eventData.Event_description || "No description available.",
          timeline: eventData.Event_timeline || "TBA",
          rules: eventData.Event_rules ? eventData.Event_rules.split(',') : "No specific rules provided.",
          image: eventData.Event_photo_link 
            ? eventData.Event_photo_link 
            : "https://cdn4.iconfinder.com/data/icons/ui-beast-3/32/ui-49-4096.png", // Safe fallback
          venue: eventData.Event_location || "TBA",
          fee: eventData.Event_fees ? `₹${eventData.Event_fees}` : "Free",
          teamSize: eventData.MaxTeam_Size || "N/A",
          registrationDeadline: eventData.Event_registration_deadline || "TBA",
          coordinator: eventData.Event_coordinator_description || "Contact not available",
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <NotificationCard type="error" message={error} />;
  if (!event) return <NotificationCard type="error" message="Event not found" />;

  return <EventDetails event={event} />;
};

export default Details;
