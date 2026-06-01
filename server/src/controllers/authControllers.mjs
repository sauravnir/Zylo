import { OTPMODEL } from "../models/CheckoutOtp.mjs";
import { ORDERSMODEL } from "../models/Order.mjs";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

// Initializing Resend to send mails
const initResend = () =>{
  const resendApi = process.env.RESEND_API_KEY;   
  if(!resendApi){
    throw new Error("Cannot find Resend API key.");
  }
  return new Resend(resendApi);
}

// Defining the client url 
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
// Importing the logo to be used in the email template
// const logoUrl = `${clientUrl}/LogoWhite.png`;

// Send OTP Controller
export const sendOtp = async (request, response) => {
  const { email } = request.body;

  // Creating a otp
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    // Deleting any exisiting otp first if there is one
    await OTPMODEL.deleteMany({ email });
    await OTPMODEL.create({ email: email, code: otp });

    const resend = initResend();

    // Sending the otp to the client's email Id
    const { data, error } = await resend.emails.send({
      from: "Zylo Studios <no-reply@info.studioszylo.com>",
      to: email,
      subject: "Your Zylo Verification Code",
      html:`
<div style="background-color:#e1e1e1; padding:20px 10px; font-family:'Estrella', Helvetica, Arial, sans-serif; min-width:100%; margin:0;">
  
  <style>
    @font-face {
      font-family: 'Estrella';
      font-style: normal;
      font-weight: normal;
    }
  </style>

  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:580px; background-color:#fafbfc; border:1px solid #E5E5E5; border-collapse:collapse; table-layout:fixed;">
    
    <tr>
      <td bgcolor="#0c0c0c" style="padding:28px 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr>
            <td align="left" valign="middle">
              <span style="font-family:'Estrella', Helvetica, Arial, sans-serif; font-size:18px; font-weight:700; color:#ffffff; letter-spacing:0.08em; text-transform:uppercase; display:block; line-height:1;">
                zylo
              </span>
            </td>
            <td align="right" valign="middle" style="font-family:Helvetica, Arial, sans-serif; color:#9b9b9b; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; font-weight:500;">
              Verification
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" style="padding:40px 24px;">
        <p style="margin:0 0 8px; font-size:10px; letter-spacing:0.2em; color:#9b9b9b; text-transform:uppercase; text-align:center;">Verify Your Purchase</p>
        <p style="margin:0 0 32px; font-size:14px; color:#2b2b2b; letter-spacing:0.04em; text-align:center;">Enter this code to complete your order</p>

        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:28px; border-collapse:collapse;">
          <tr>
            <td align="center" valign="middle" style="border:1px solid #E5E5E5; padding:20px 30px; background-color:#ffffff; border-radius:2px;">
              <span style="font-size:32px; letter-spacing:0.3em; padding-left:0.3em; color:#0c0c0c; font-weight:600; font-family:Helvetica, Arial, monospace; display:block; line-height:1;">${otp}</span>
            </td>
          </tr>
        </table>

        <p style="margin:0; font-size:11px; letter-spacing:0.14em; color:#9b9b9b; text-transform:uppercase; text-align:center;">Expires in 10 minutes</p>
      </td>
    </tr>

    <tr>
      <td style="padding:20px 24px; border-top:1px solid #E5E5E5;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr>
            <td align="left" style="font-size:10px; letter-spacing:0.18em; color:#9b9b9b; text-transform:uppercase;">Zylo Studios</td>
            <td align="right">
              <a href="https://www.studioszylo.com" target="_blank" style="font-size:10px; color:#2E5BFF; letter-spacing:0.14em; text-decoration:none; font-weight:500;">studioszylo.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>
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
      orderToken: newToken,
      customerData: orderData.customerData,
      items: orderData.items,
      orderSummary: orderData.orderSummary,
    });

    // Fetch the orderNumber from the saved data
    const savedData = await newOrder.save();
    const savedOrderNumber = savedData.orderNumber;

    // fetching the orderToken to provide a link to the users
    const savedOrderToken = savedData.orderToken;
    const orderLink = `${clientUrl}/thank-you/${savedOrderToken}`;

     const resend = initResend();

    // Sending emails through resend
    const { data, error } = await resend.emails.send({
      from: "Zylo Studios Order <orders@info.studioszylo.com>",
      to: [process.env.EMAIL_USER, email],
      subject: `New Order! ${savedOrderNumber}`,
      html:`
<div style="background-color:#e1e1e1; padding:20px 10px; font-family:'Estrella', Helvetica, Arial, sans-serif; min-width:100%; margin:0;">
  
  <style>
    @font-face {
      font-family: 'Estrella';
      font-style: normal;
      font-weight: normal;
    }
  </style>

  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:580px; background-color:#fafbfc; border:1px solid #E5E5E5; border-collapse:collapse; table-layout:fixed;">
    
    <tr>
      <td bgcolor="#0c0c0c" style="padding:24px 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr>
            <td align="left" valign="middle">
              <span style="font-family:'Estrella', Helvetica, Arial, sans-serif; font-size:18px; font-weight:700; color:#ffffff; letter-spacing:0.08em; text-transform:uppercase; display:block; line-height:1;">
                zylo
              </span>
            </td>
            <td align="right" valign="middle" style="font-family:Helvetica, Arial, sans-serif; color:#9b9b9b; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; font-weight:500;">
              Order Confirmation
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:32px 24px 0; font-family:Helvetica, Arial, sans-serif;">
        <p style="margin:0 0 4px; font-size:10px; letter-spacing:0.2em; color:#9b9b9b; text-transform:uppercase;">New Order Received</p>
        <h2 style="margin:0 0 24px; font-size:22px; letter-spacing:0.1em; color:#0c0c0c; font-weight:500; line-height:1.2;">${orderData.customerData.firstName} ${orderData.customerData.lastName}</h2>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px; border-collapse:collapse; table-layout:fixed;">
          <tr>
            <td width="50%" valign="top" style="background-color:#fafbfc; border:1px solid #E5E5E5; padding:14px 16px;">
              <p style="margin:0 0 4px; font-size:10px; letter-spacing:0.18em; color:#9b9b9b; text-transform:uppercase;">Address</p>
              <p style="margin:0; font-size:13px; color:#2b2b2b; letter-spacing:0.04em; line-height:1.4;">${orderData.customerData.address}, ${orderData.customerData.city}</p>
            </td>
            <td width="50%" valign="top" style="background-color:#fafbfc; border:1px solid #E5E5E5; padding:14px 16px;">
              <p style="margin:0 0 4px; font-size:10px; letter-spacing:0.18em; color:#9b9b9b; text-transform:uppercase;">Phone</p>
              <p style="margin:0; font-size:13px; color:#2b2b2b; letter-spacing:0.04em; line-height:1.4;">${orderData.customerData.phone}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" valign="top" style="background-color:#fafbfc; border:1px solid #E5E5E5; padding:14px 16px;">
              <p style="margin:0 0 4px; font-size:10px; letter-spacing:0.18em; color:#9b9b9b; text-transform:uppercase;">Payment</p>
              <p style="margin:0; font-size:13px; color:#2b2b2b; letter-spacing:0.04em; line-height:1.4;">${orderData.customerData.payment_method}</p>
            </td>
            <td width="50%" valign="top" style="background-color:#fafbfc; border:1px solid #E5E5E5; padding:14px 16px;">
              <p style="margin:0 0 4px; font-size:10px; letter-spacing:0.18em; color:#9b9b9b; text-transform:uppercase;">Note</p>
              <p style="margin:0; font-size:13px; color:#2b2b2b; letter-spacing:0.04em; line-height:1.4;">${orderData.customerData.orderNote || "—"}</p>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 12px; font-size:10px; letter-spacing:0.2em; color:#9b9b9b; text-transform:uppercase;">Order Items</p>
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #E5E5E5; margin-bottom:28px; border-collapse:collapse;">
          <tr>
            <td bgcolor="#0c0c0c" style="padding:10px 16px; font-size:10px; letter-spacing:0.18em; color:#9b9b9b; text-transform:uppercase;">Product</td>
            <td bgcolor="#0c0c0c" align="right" style="padding:10px 16px; font-size:10px; letter-spacing:0.18em; color:#9b9b9b; text-transform:uppercase; width:80px;">Price</td>
          </tr>
          
          ${orderData.items
            .map((item, i) => {
              return `
          <tr>
            <td colspan="2" style="background-color:#fafbfc; padding:14px 16px; ${i < orderData.items.length - 1 ? "border-bottom:1px solid #E5E5E5;" : ""}">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td valign="top" align="left" style="padding-right:10px;">
                    <p style="margin:0 0 4px; font-size:13px; color:#0c0c0c; letter-spacing:0.12em; font-weight:500; line-height:1.4;">${item.title} — ${item.productColor}</p>
                    <p style="margin:0; font-size:11px; color:#9b9b9b; letter-spacing:0.14em;">QTY ${item.itemCartQuantity} &nbsp;·&nbsp; SIZE ${item.productSize}</p>
                  </td>
                  <td valign="middle" align="right" style="font-size:13px; color:#2b2b2b; font-weight:500; white-space:nowrap; width:80px;">
                    ${orderData.orderSummary.symbol} ${item.price}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
            })
            .join("")}
        </table>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #E5E5E5; padding-top:20px; border-collapse:collapse;">
          <tr>
            <td align="left" style="padding-bottom:8px; font-size:11px; letter-spacing:0.14em; color:#9b9b9b; text-transform:uppercase;">Subtotal</td>
            <td align="right" style="padding-bottom:8px; font-size:12px; color:#2b2b2b; font-weight:500;">${orderData.orderSummary.symbol} ${orderData.orderSummary.subTotal}</td>
          </tr>
          <tr>
            <td align="left" style="padding-bottom:20px; font-size:11px; letter-spacing:0.14em; color:#9b9b9b; text-transform:uppercase;">Shipping</td>
            <td align="right" style="padding-bottom:20px; font-size:12px; color:#2b2b2b; font-weight:500;">${orderData.orderSummary.symbol} ${orderData.orderSummary.shippingAmount}</td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td bgcolor="#0c0c0c" style="padding:18px 24px; font-family:Helvetica, Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr>
            <td align="left" style="font-size:10px; letter-spacing:0.22em; color:#9b9b9b; text-transform:uppercase;">Total</td>
            <td align="right" style="font-size:20px; color:#fff; font-weight:500; letter-spacing:0.1em;">${orderData.orderSummary.symbol} ${orderData.orderSummary.totalAmount}</td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:32px 24px 12px; font-family:Helvetica, Arial, sans-serif;">
        <p style="margin:0 0 12px; font-size:10px; letter-spacing:0.2em; color:#9b9b9b; text-transform:uppercase;">Customer Support</p>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fafbfc; border:1px solid #E5E5E5; border-collapse:collapse;">
          <tr>
            <td style="padding:18px 20px;">
              <p style="margin:0 0 12px; font-size:13px; color:#2b2b2b; line-height:1.6; letter-spacing:0.04em;">
                Need to review your order details online or trace its status? Click the link below to head back to your receipt overview page.
              </p>
              <p style="margin:0 0 16px;">
                <a href="${orderLink}" target="_blank" style="color:#2E5BFF; font-size:13px; font-weight:500; text-decoration:none; letter-spacing:0.06em; display:inline-block;">View Thank You & Order Status Page →</a>
              </p>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px dashed #E5E5E5; padding-top:12px; border-collapse:collapse;">
                <tr>
                  <td style="font-size:12px; color:#9b9b9b; line-height:1.5; letter-spacing:0.04em; padding-top:12px;">
                    Have questions regarding updates or customization files? Reach out directly to our production team at 
                    <a href="mailto:pratik@studioszylo.com" style="color:#0c0c0c; text-decoration:underline; font-weight:500;">pratik@studioszylo.com</a>.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:12px 24px 24px; font-family:Helvetica, Arial, sans-serif;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr>
            <td align="left" style="font-size:10px; letter-spacing:0.18em; color:#9b9b9b; text-transform:uppercase;">Zylo Studios</td>
            <td align="right">
              <a href="https://www.studioszylo.com" target="_blank" style="font-size:10px; color:#2E5BFF; letter-spacing:0.14em; text-decoration:none; font-weight:500;">studioszylo.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>
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

    return response.status(200).json({
      success: true,
      message: "OTP Verified & Order Logged",
      orderToken: newToken,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return response
      .status(500)
      .json({ success: false, message: error.message, stack: error.stack });
  }
}
