import db from "../db.js";

//(1) Register User or Team for an Event
export const registerForEvent = async (req, res) => {
    try {
        const { event_id, registrant_id, participants = [], payment_id, team_name, team_photolink, transaction_id } = req.body;

        if (!event_id || !registrant_id) {
            return res.status(400).json({ error: "Event ID and Registrant ID are required" });
        }

        db.beginTransaction((err) => {
            if (err) {
                console.error("Transaction error:", err);
                return res.status(500).json({ error: "Database transaction error" });
            }

            // Insert registration
            const regQuery = `
                INSERT INTO Event_Registration (event_id, registrant_id, payment_id, team_name, team_photolink, transaction_id)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(regQuery, [event_id, registrant_id, payment_id, team_name, team_photolink, transaction_id], (err, result) => {
                if (err) {
                    db.rollback();
                    console.error("Error inserting registration:", err);
                    return res.status(500).json({ error: "Failed to register" });
                }
                const registration_id = result.insertId;

                // Insert participants if it's a team registration
                if (participants.length > 0) {
                    const values = participants.map(participant_id => [registration_id, participant_id]);
                    const participantsQuery = `INSERT INTO Event_Participants (registration_id, participant_id) VALUES ?`;

                    db.query(participantsQuery, [values], (err) => {
                        if (err) {
                            db.rollback();
                            console.error("Error inserting participants:", err);
                            return res.status(500).json({ error: "Failed to register participants" });
                        }

                        db.commit();
                        res.status(201).json({ message: "Registration successful", registration_id });
                    });
                } else {
                    db.commit();
                    res.status(201).json({ message: "Registration successful", registration_id });
                }
            });
        });
    } catch (error) {
        console.error("Error in event registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//(2) Get Registrations for a Specific Event

export const getRegistrationsForEvent = (req, res) => {
    const { event_id } = req.params;
    
    if (!event_id) {
        return res.status(400).json({ error: "Event ID is required" });
    }

    const query = `
        SELECT er.registration_id, er.registrant_id, u.full_name AS registrant_name, u.email, u.phone,
               GROUP_CONCAT(ep.participant_id) AS participants, er.payment_id, er.admin_accepted, p.transaction_id
        FROM Event_Registration er
        LEFT JOIN users u ON er.registrant_id = u.user_id
        LEFT JOIN Event_Participants ep ON er.registration_id = ep.registration_id
        LEFT JOIN Payment p ON er.payment_id = p.payment_id
        WHERE er.event_id = ?
        GROUP BY er.registration_id
    `;

    db.query(query, [event_id], (err, results) => {
        if (err) {
            console.error("Error fetching registrations:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No registrations found for this event" });
        }

        res.status(200).json({ registrations: results });
    });
};

//(3) Get Events a User Has Registered For
export const getUserEvents = (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const query = `
        SELECT e.event_id, e.event_name, e.event_date, e.event_location, e.event_fees, e.format
        FROM Events e
        JOIN Event_Registration er ON e.event_id = er.event_id
        WHERE er.registrant_id = ?
        ORDER BY e.event_date ASC
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching user events:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No events found for this user" });
        }

        res.status(200).json({ events: results });
    });
};

