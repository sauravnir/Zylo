import rateLimit from "express-rate-limit";

// Creating the rate limit middleware 
export const handleOTPLimit = rateLimit({
    windowMs: 5 * 60 * 1000, //5 minutes window
    limit: 5, //Limiting to 5 requests per window i.e 5 min
    standardHeaders: true,
    legacyHeaders:true,
    message:{
        staus:429,
        message:"Too many code request attempts. Please try again after 5 minutes."
    }
});