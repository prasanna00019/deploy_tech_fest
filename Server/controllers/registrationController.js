import db from "../db.js";

//(1) Register User or Team for an Event
export const registerForEvent = async (req, res) => {
    try {
        const { 
            event_id, 
            participants, 
            team_name = "", 
            team_photolink = "", 
            transaction_id,
            amount 
        } = req.body;

        // Input validation
        if (!event_id || !Array.isArray(participants) || !participants.length || !transaction_id) {
            return res.status(400).json({ 
                success: false,
                error: "Missing required fields" 
            });
        }

        try {
            // Start transaction
            await db.promise().query('START TRANSACTION');

            // 1. Get registrant's user_id (first participant)
            const [registrantResult] = await db.promise().query(
                'SELECT user_id FROM users WHERE email = ?',
                [participants[0]]
            );

            if (!registrantResult.length) {
                throw new Error('Registrant email not found');
            }
            const registrant_id = registrantResult[0].user_id;

            // Check if user has already registered for this event
            const [existingRegistrations] = await db.promise().query(
                `SELECT Registration_ID 
                 FROM Event_Registration 
                 WHERE Event_ID = ? AND Registrant_ID = ?`,
                [event_id, registrant_id]
            );
            
            if (existingRegistrations.length > 0) {
                return res.status(400).json({ 
                    success: false,
                    error: "You have already registered for this event" 
                });
            }

            // 2. Create Payment record
            const [paymentResult] = await db.promise().query(
                `INSERT INTO Payment (
                    Transaction_id, 
                    Amount, 
                    Image_link, 
                    Is_Cleared
                ) VALUES (?, ?, ?, FALSE)`,
                [transaction_id, amount, team_photolink]
            );
            const payment_id = paymentResult.insertId;

            // 3. Create Event Registration
            const [registrationResult] = await db.promise().query(
                `INSERT INTO Event_Registration (
                    Event_ID,
                    Registrant_ID,
                    Team_Name,
                    Team_photoLink,
                    Payment_ID,
                    Admin_accepted
                ) VALUES (?, ?, ?, "noIMG", ?, FALSE)`,
                [event_id, registrant_id, team_name, payment_id]
            );
            const registration_id = registrationResult.insertId;

            // 4. Process participants
            const participantPromises = participants.map(async (email) => {
                const [userResult] = await db.promise().query(
                    'SELECT user_id FROM users WHERE email = ?',
                    [email]
                );
                
                if (!userResult.length) {
                    throw new Error(`Participant with email ${email} not found`);
                }

                await db.promise().query(
                    'INSERT INTO Event_Participants (registration_id, participant_id) VALUES (?, ?)',
                    [registration_id, userResult[0].user_id]
                );

                return userResult[0].user_id;
            });

            await Promise.all(participantPromises);

            // Commit transaction
            await db.promise().query('COMMIT');

            // Send success response
            res.status(201).json({
                success: true,
                message: "Registration successful",
                data: {
                    registration_id,
                    payment_id,
                    registrant_id,
                    team_name,
                    participant_count: participants.length,
                    payment_status: 'PENDING'
                }
            });

        } catch (error) {
            // Rollback on any error
            await db.promise().query('ROLLBACK');
            throw error;
        }

    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({
            success: false,
            error: error.message || 'Registration failed'
        });
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

export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = (`
            SELECT 
                er.Registration_ID, 
                er.Event_ID, 
                e.Event_name, 
                e.Event_description,
                er.Registrant_ID, 
                u.full_name AS Registrant_Name, 
                u.email AS Registrant_Email, 
                er.Admin_accepted, 
                er.Team_Name, 
                er.Team_photoLink, 
                er.Payment_ID,
                p.Amount AS Payment_Amount, 
                p.Image_link AS Payment_Proof, 
                p.Is_Cleared AS Payment_Status,
                p.Transaction_id
            FROM Event_Registration er
            LEFT JOIN Events e ON er.Event_ID = e.Event_ID
            LEFT JOIN users u ON er.Registrant_ID = u.user_id
            LEFT JOIN Payment p ON er.Payment_ID = p.Payment_ID
            ORDER BY er.Registration_ID DESC;
        `);

        db.query(registrations, (err, results) => {
            if (err) {
                console.error("Error fetching registrations:", err);
                return res.status(500).json({ error: "Database error" });
            }

            res.status(200).json({ success: true, data: results });
        }
        );
    } catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateRegistration = async (req, res) => {
    try {
        const { admin_accepted, registration_id, payment_id } = req.body;

        if (!registration_id  || !payment_id) {
            return res.status(400).json({
                success: false,
                error: "Registration ID, payment ID and admin_accepted status are required!"
            });
        }

        // Begin transaction
        await db.promise().query('START TRANSACTION');

        try {
            // Update Event Registration
            const [regResult] = await db.promise().query(
                `UPDATE Event_Registration 
                 SET Admin_accepted = ? 
                 WHERE Registration_ID = ?`,
                [admin_accepted, registration_id]
            );

            if (regResult.affectedRows === 0) {
                throw new Error('Registration not found');
            }

            // Update Payment
            const [payResult] = await db.promise().query(
                `UPDATE Payment 
                 SET Is_Cleared = ? 
                 WHERE Payment_ID = ?`,
                [admin_accepted, payment_id]
            );

            if (payResult.affectedRows === 0) {
                throw new Error('Payment record not found');
            }

            // Commit transaction
            await db.promise().query('COMMIT');

            res.status(200).json({
                success: true,
                message: "Registration and payment status updated successfully",
                data: {
                    registration_id,
                    payment_id,
                    admin_accepted
                }
            });

        } catch (error) {
            // Rollback on any error
            await db.promise().query('ROLLBACK');
            throw error;
        }

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
};