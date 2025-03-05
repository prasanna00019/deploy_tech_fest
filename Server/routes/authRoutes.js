import { Router } from "express";
import { register, login, sendOtp, verifyOtp }  from "../controllers/authController.js";


const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/send-otp", sendOtp);
authRoutes.post("/verify-otp", verifyOtp);

export default authRoutes;