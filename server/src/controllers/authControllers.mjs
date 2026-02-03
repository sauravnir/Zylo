import { OTPMODEL } from "../models/CheckoutOtp.mjs";

// Send OTP Controller
export const sendOtp = async (request, response) => {
  const { email } = request.body;
  if (!email)
    return response.status(400).json({ message: "Email is required." });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    // Deleting any exisiting otp first if there is one
    await OTPMODEL.deleteMany({email});
    await OTPMODEL.create({ email: email, code: otp });
    response.status(200).json({ success: true, message: `OTP Created.${otp}` });
  } catch (error) {
    response.status(200).json({ message: error.message });
  }
};

// Verify OTP Controller
export const verifyOtp = async (request, response) => {
  const { email, otp } = request.body;
  if (!email || !otp) {
    return response.status(400).json({ message: "Both Email and OTP are required." });
  }
  try {
    const record = await OTPMODEL.findOne({ email, code: otp });
    if (record) {
      await OTPMODEL.deleteOne({ email , code:otp });
      return response.status(200).json({ success: true, message: "OTP Verified" });
    } else {
      return response.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }
  } catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }
};
