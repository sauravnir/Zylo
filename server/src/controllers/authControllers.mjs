import { OTPMODEL } from "../models/CheckoutOtp.mjs";
import {ORDERSMODEL} from "../models/Order.mjs";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import transporter from "../config/transporter.mjs";
import {v4 as uuidv4} from "uuid";

// Initializing Resend to send mails
const resend = new Resend(process.env.RESEND_API_KEY);

// Send OTP Controller
export const sendOtp = async (request, response) => {
  const { email } = request.body;

  // Creating a otp
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    // Deleting any exisiting otp first if there is one
    await OTPMODEL.deleteMany({ email });
    await OTPMODEL.create({ email: email, code: otp });

    // Sending the otp to the client's email Id
    const { data, error } = await resend.emails.send({
      from: "Zylo Studios <no-reply@info.studioszylo.com>",
      to: email,
      subject: "Your Zylo Verification Code",
      html: `
            <div style="font-family: helvetica">
                <h2 style="color: #2b2b2b ; font-weight: bold ; font-size:20px">Verify your purchase</h2>
                <p>Your verification code is:</p>
                <h1 style="letter-spacing: 5px; color: #000">${otp}</h1>
                <p style="color: #9b9b9b">This code expires in 10 minutes.</p>
            </div>
        `,
    });

    
    if (error) {
      return response.status(400).json({ error });
    }
    response.status(200).json({ success: true, message: `OTP Created` });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Verify OTP Controller
export const verifyOtp = async (request, response) => {
  const { email, otp, orderData } = request.body;
  if (!email || !otp) {
    return response.status(400).json({ message: "Missing fields" });
  }
  try {
    // Verifying the email and code.
    const record = await OTPMODEL.findOne({ email, code: otp });

    if (!record) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Generating a secure token for the order
    const newToken = uuidv4();
    
    // Saving the details in the database with the payload received
    const newOrder = new ORDERSMODEL({
      orderToken : newToken,
      customerData : orderData.customerData,
      items : orderData.items,
      orderSummary : orderData.orderSummary,
    });
    
    // Fetch the orderNumbe from the saved data 
    const savedData = await newOrder.save();
    const savedOrderNumber = savedData.orderNumber ;

    // Sending emails through resend
    const { data, error } = await resend.emails.send({
      from: "Zylo Studios Order <orders@info.studioszylo.com>", 
      to: process.env.EMAIL_USER, 
      subject: `New Order! ${savedOrderNumber}`,
      html: `
    <div style="font-family: sans-serif; color: #333;">
      <h2>New Order Received from Zylo.</h2>
      <p><strong>Customer:</strong> ${orderData.customerData.firstName} ${orderData.customerData.lastName}</p>
      <p><strong>Address:</strong> ${orderData.customerData.address}, ${orderData.customerData.city}</p>
      <p><strong>Phone:</strong> ${orderData.customerData.phone}</p>
      <p><strong>Payment:</strong> ${orderData.customerData.payment_method}</p>
      <hr />
      
      <h3>Order Items:</h3>
      <ul>
        ${orderData.items
          .map(
            (item) => `
          <li style="margin-bottom: 10px;">
            <strong>${item.title}</strong><br />
            Qty: ${item.itemCartQuantity} | Size: ${item.productSize} | Price: ${orderData.orderSummary.symbol}${item.price} | Color: ${item.productColor}
          </li>
        `,
          )
          .join("")}
      </ul>
      
      <hr />
        <p><strong>Order Note:</strong>${orderData.customerData.orderNote}</p>
      <p><strong>Subtotal:</strong> ${orderData.orderSummary.symbol}${orderData.orderSummary.subTotal}</p>
      <p><strong>Shipping:</strong> ${orderData.orderSummary.symbol}${orderData.orderSummary.shippingAmount}</p>
      <h2 style="color: #000;">Total: ${orderData.orderSummary.symbol}${orderData.orderSummary.totalAmount}</h2>
    </div>
  `,
    });

    if (error) {
      console.error("Resend error:", error);
    } else {
      console.log("Order email sent successfully:", data.id);
    }

    // Deleting the otp record.
    await OTPMODEL.deleteOne({ email, code: otp });

    return response
      .status(200)
      .json({ success: true, message: "OTP Verified & Order Logged" , orderToken : newToken});
  } catch (error) {
    console.error("Email sending error:", error);
    return response
      .status(500)
      .json({ success: false, message: error.message, stack: error.stack });
  }
};
