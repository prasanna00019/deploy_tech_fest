import db from "../db.js";
export const createEvent = async (req, res) => {
    try {
        const {
            Event_name,
            Event_description,
            Event_timeline,
            Event_rules,
            Event_photo_link,
            Event_location,
            MaxTeam_Size,
            Event_fees,
            Event_coordinator_description,
            Event_registration_deadline 
        } = req.body;

        // Validate required fields
        if (!Event_name || !Event_description || !Event_timeline || !Event_rules || !Event_photo_link || !Event_location || !MaxTeam_Size || !Event_fees || !Event_coordinator_description || !Event_registration_deadline ) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Check if the event with the same name already exists (case insensitive)
        db.query(
            "SELECT * FROM Events WHERE LOWER(Event_Name) = LOWER(?)",
            [Event_name],
            (err, results) => {
                if (err) {
                    console.error("Error checking existing event:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                if (results.length > 0) {
                    return res.status(409).json({ error: "An event with this name already exists" });
                }

                // Insert new event
                const insertQuery = `
                    INSERT INTO Events 
                    (Event_name, Event_description, Event_photo_link, Event_coordinator_description, MaxTeam_Size, Event_fees, Event_timeline, Event_Location, Event_registration_deadline, Event_rules) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                db.query(
                    insertQuery,
                    [Event_name, Event_description, Event_photo_link, Event_coordinator_description, MaxTeam_Size, Event_fees, Event_timeline, Event_location, Event_registration_deadline, Event_rules],
                    (err, result) => {
                        if (err) {
                            console.error("Error creating event:", err);
                            return res.status(500).json({ error: "Failed to create event" });
                        }

                        res.status(201).json({
                            message: "Event created successfully",
                            eventId: result.insertId
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.error("Event creation error:", error);
        res.status(500).json({ error: "Event creation failed" });
    }
};
export const getRandomEvents = (req, res) => {
    try {
        const query = "SELECT * FROM Events ORDER BY RAND() LIMIT 3"; // Fetch 3 random events

        db.query(query, (err, result) => {
            if (err) {
                console.error("❌ SQL Query Error:", err);
                return res.status(500).json({ message: "Database Error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "No events found" });
            }
            return res.status(200).json({ events: result });
        });

    } catch (err) {
        console.error("❌ Error fetching random events:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getAllEvents = (req, res) => {
  try {
    // Fetch all events from the database
    db.query("SELECT * FROM Events", (err, events) => {
      if (err) {
        console.error("Error fetching events:", err);
        return res.status(500).json({ message: "Database Error" });
      }
      if (events.length === 0) {
        return res.status(404).json({ message: "No events found" });
      }
        return res.status(200).json({ events: events });
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEventById = (req, res) => {
    try {
        const { id } = req.params; // Get event ID from request parameters
        const {
            Event_name,
            Event_description,
            Event_timeline,
            Event_rules,
            Event_photo_link,
            Event_location,
            MaxTeam_Size,
            Event_fees,
            Event_coordinator_description,
            Event_registration_deadline 
        } = req.body;

        // Step 1: Check if the event exists
        db.query("SELECT * FROM Events WHERE Event_ID = ?", [id], (err, results) => {
            if (err) {
                console.error("Error checking event:", err);
                return res.status(500).json({ message: "Database Error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Event not found" });
            }

            // Step 2: Update event details (only update non-null fields)
            const updateQuery = `
                UPDATE Events 
                SET 
                    Event_name = IFNULL(?, Event_name),
                    Event_description = IFNULL(?, Event_description),
                    Event_photo_link = IFNULL(?, Event_photo_link),
                    Event_timeline = IFNULL(?, Event_timeline),
                    Event_location = IFNULL(?, Event_location),
                    Event_fees = IFNULL(?, Event_fees),
                    Event_coordinator_description = IFNULL(?, Event_coordinator_description),
                    MaxTeam_Size = IFNULL(?, MaxTeam_Size),
                    Event_rules = IFNULL(?, Event_rules),
                    Event_registration_deadline = IFNULL(?, Event_registration_deadline)
                WHERE Event_ID = ?
            `;

            db.query(
                updateQuery,
                [Event_name, Event_description, Event_photo_link, Event_timeline, Event_location, Event_fees, Event_coordinator_description, MaxTeam_Size, Event_rules, Event_registration_deadline, id],
                (err, updateResult) => {
                    if (err) {
                        console.error("Error updating event:", err);
                        return res.status(500).json({ message: "Failed to update event" });
                    }

                    res.status(200).json({
                        message: "Event updated successfully",
                        affectedRows: updateResult.affectedRows,
                    });
                }
            );
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
  export const deleteEventById = (req, res) => {
      try {
          const { id } = req.params; 
          // Step 1: Check if the event exists
          db.query("SELECT * FROM Events WHERE Event_ID = ?", [id], (err, results) => {
              if (err) {
                  console.error("Error checking event:", err);
                  return res.status(500).json({ message: "Database Error" });
              }
              if (results.length === 0) {
                  return res.status(404).json({ message: "Event not found" });
              }
              // Step 2: Delete the event
              db.query("DELETE FROM Events WHERE Event_ID = ?", [id], (err, deleteResult) => {
                  if (err) {
                      console.error("Error deleting event:", err);
                      return res.status(500).json({ message: "Failed to delete event" });
                  }
                  res.status(200).json({ message: "Event deleted successfully" });
              });
          });
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal Server Error" });
      }
  };
  export const getEventDetailsofSpecificEvent = (req, res) => {
    try {
        const { id } = req.params;
        // Step 1: Check if the event exists
        db.query("SELECT * FROM Events WHERE Event_ID = ?", [id], (err, eventResults) => {
            if (err) {
                console.error("Error fetching event:", err);
                return res.status(500).json({ message: "Database Error" });
            }

            if (eventResults.length === 0) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json({ event: eventResults[0] });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
