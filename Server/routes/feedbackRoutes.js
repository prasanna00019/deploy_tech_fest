import { Router } from "express";
import { postFeedback, getFeedback, deleteFeedback } from "../controllers/feedbackController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const feedbackRts = Router();

feedbackRts.post("/postFeedback", verifyToken, postFeedback);
feedbackRts.get("/getFeedback", getFeedback);
feedbackRts.delete("/deleteFeedback/:feedbackId", verifyToken, deleteFeedback);

export default feedbackRts;