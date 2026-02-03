import mongoose from "mongoose";

// Creating the otp model
const checkoutOtp = new mongoose.Schema({
    email : {type : String , required : true},
    code : {type : String , required : true},
    createdAt : { 
        type : Date , default : Date.now , expires: 600 //autoexpires in 10 minutes
    }
});

export const OTPMODEL = mongoose.model('Otp', checkoutOtp);

