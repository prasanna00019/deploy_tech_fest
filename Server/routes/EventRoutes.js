import express from 'express';
import { createEvent, deleteEventById, getAllEvents,
getEventDetailsofSpecificEvent, updateEventById } from '../controllers/EventControllers.js';
const  router= express.Router();
router.post('/create-event',createEvent);
router.get('/all-events',getAllEvents);
router.get('/get-event-by-id/:id',getEventDetailsofSpecificEvent);
router.delete('/delete-event/:id',deleteEventById);
router.put('/update-event/:id',updateEventById);
export default router;