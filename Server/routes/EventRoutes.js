import express from 'express';
import { createEvent, deleteEventById, getAllEvents,
getEventDetailsofSpecificEvent, getRandomEvents, updateEventById } from '../controllers/EventController.js';
import {registerForEvent,getRegistrationsForEvent,getUserEvents, getAllRegistrations, updateRegistration} from '../controllers/registrationController.js';
const router= express.Router();
router.post('/create-event',createEvent);
router.get('/all-events',getAllEvents);
router.get('/random-events',getRandomEvents);
router.get('/get-event-by-id/:id',getEventDetailsofSpecificEvent);
router.delete('/delete-event/:id',deleteEventById);
router.put('/update-event/:id',updateEventById);
// Register user or team for an event
router.post("/register", registerForEvent);
// Get registrations for a specific event
router.get("/:event_id/registrations", getRegistrationsForEvent);
// Get events a user has registered for
router.get("/user/:user_id/events", getUserEvents);
router.get("/getAllRegistrations", getAllRegistrations);
router.put("/updateRegistration", updateRegistration);
export default router;