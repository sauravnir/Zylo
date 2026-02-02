import express from "express";
import { sendOtp , verifyOtp } from "../controllers/authControllers.mjs";

// Initializing the router 
const router = express.Router();

// Defining the routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp',verifyOtp);

export default router;