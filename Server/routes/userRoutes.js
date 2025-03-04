import { Router } from "express";
import veriftoken from "../middlewares/authMiddleware.js";
import { getUserProfile, updateUserProfile, changePassword } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/profile", veriftoken, getUserProfile);
userRoutes.put("/profile", veriftoken, updateUserProfile);
userRoutes.get("/change-password", veriftoken, changePassword);

export default userRoutes;