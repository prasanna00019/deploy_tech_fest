import { Router } from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import { changePassword, getUserById, DeleteUserById } from "../controllers/userController.js";
const userRoutes = Router();

userRoutes.get("/profile/:id", verifyToken, getUserById);
userRoutes.get("/change-password", verifyToken, changePassword);
userRoutes.delete('/delete-user/:id',DeleteUserById);

export default userRoutes;