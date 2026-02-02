import API from "./server";

// Creating requestOtp method
export const requestOtp = async (email : string)=>{
    const response = await API.post('/auth/send-otp' , {email});
    return response.data;
}    

// Creating verifyOtp method
export const verifyOpt= async(email:string , otp:string)=>{
    const response = await API.post('/auth/verify-otp', {email , otp})
    return response.data;
}