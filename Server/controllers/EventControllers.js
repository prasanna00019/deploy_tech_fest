import db from "../db";
export const createEvent = async (req, res) => {
    try {
      // Destructuring request body
      const {
        Event_name,
        Event_description,
        Event_photo_link,
        Event_coordinator_contact,
        format,
        Event_fees,
        Event_date,
        Event_location,
        userIDs,
      } = req.body;
  
      // Validate input
      if (!Event_name || !Event_date || !Event_location) {
        return res.status(400).json({ message: "Event name, date, and location are required" });
      }
      const existingEvent = db.query(
        "SELECT * FROM Events WHERE LOWER(Event_Name) = LOWER($1)",
        [Event_name]
      );
      if (existingEvent.rows.length > 0) {
        return res.status(400).json({ message: "An event with this name already exists" });
      }
      const newEvent = db.query(
        "INSERT INTO Events (Event_Name, Event_Description, Event_photo_link, Event_coordinator_contact, format, Event_fees, Event_Date, Event_Location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [Event_name, Event_description, Event_photo_link, Event_coordinator_contact, format, Event_fees, Event_date, Event_location]
      );  
      res.status(201).json({ message: "Event created successfully", event: newEvent.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  export const getAllEvents = async (req, res) => {
    try {
      // Fetch all events
      const eventsQuery =  db.query("SELECT * FROM Events ORDER BY Event_Date ASC");
      const events = eventsQuery.rows;
      // Fetch participants for each event
      for (let event of events) {
        const participantsQuery =  db.query(
          "SELECT Users.User_ID, Users.User_Name FROM Event_Participants JOIN Users ON Event_Participants.User_ID = Users.User_ID WHERE Event_Participants.Event_ID = $1",
          [event.event_id]
        );
        event.participants = participantsQuery.rows; // Attach participants to event object
      }
      res.status(200).json({ events });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const updateEventById = async (req, res) => {
    try {
      const { id } = req.params; // Get event ID from request parameters
      const {
        Event_name,
        Event_description,
        Event_photo_link,
        Event_date,
        Event_location,
        Event_fees,
        Event_coordinator_contact,
        format,
        participated_user_ids
      } = req.body;
      //Check if event exists
      const eventCheck =  db.query("SELECT * FROM Events WHERE Event_ID = $1", [id]);
      if (eventCheck.rows.length === 0) {
        return res.status(404).json({ message: "Event not found" });
      }
      // Step 2: Update event details
      const updatedEvent = db.query(
        `UPDATE Events 
         SET 
           Event_name = COALESCE($1, Event_name),
           Event_description = COALESCE($2, Event_description),
           Event_photo_link = COALESCE($3, Event_photo_link),
           Event_date = COALESCE($4, Event_date),
           Event_location = COALESCE($5, Event_location),
           Event_fees = COALESCE($6, Event_fees),
           Event_coordinator_contact = COALESCE($7, Event_coordinator_contact),
           format = COALESCE($8, format)
         WHERE Event_ID = $9 
         RETURNING *`,
        [Event_name, Event_description, Event_photo_link, Event_date, Event_location, Event_fees, Event_coordinator_contact, format, id]
      );  
      res.status(200).json({
        message: "Event updated successfully",
        event: updatedEvent.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const deleteEventById = async (req, res) => {
    try {
      const { id } = req.params; // Extract event ID from request parameters
      // Step 1: Check if the event exists
      const eventCheck =  db.query("SELECT * FROM Events WHERE Event_ID = $1", [id]);
      if (eventCheck.rows.length === 0) {
        return res.status(404).json({ message: "Event not found" });
      }
      // Step 2: Delete the event's participants first (if applicable)
     db.query("DELETE FROM Event_Participants WHERE Event_ID = $1", [id]);
      // Step 3: Delete the event
     db.query("DELETE FROM Events WHERE Event_ID = $1", [id]);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

    export const getEventDetailsofSpecificEvent = async (req, res) => {
        try {
          const { id } = req.body; // Extract event ID from request body
          // Step 1: Check if the event exists
          const eventQuery =  db.query("SELECT * FROM Events WHERE Event_ID = $1", [id]);
          if (eventQuery.rows.length === 0) {
            return res.status(404).json({ message: "Event not found" });
          }
          const event = eventQuery.rows[0]; // Extract event details
          // Step 2: Fetch participants for the event (if applicable)
          const participantsQuery =  db.query(
            "SELECT Users.User_ID, Users.User_Name FROM Event_Participants JOIN Users ON Event_Participants.User_ID = Users.User_ID WHERE Event_Participants.Event_ID = $1",
            [id]
          );
          event.participants = participantsQuery.rows; // Attach participants to event object
          res.status(200).json({ event });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal Server Error" });
        }
      };