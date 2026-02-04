import express from "express";
import { sendOtp , verifyOtp } from "../controllers/authControllers.mjs";
import { handleOTPLimit } from "../middlewares/rateLimit.mjs";
// Initializing the router 
const router = express.Router();

// Defining the routes
router.post('/send-otp',handleOTPLimit,sendOtp);
router.post('/verify-otp',verifyOtp);

export default router;