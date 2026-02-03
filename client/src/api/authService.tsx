import axiosInstance from "./axiosInstance";

// Creating requestOtp method
export const requestOtp = async (email : string)=>{
    const response = await axiosInstance.post('/auth/send-otp', {email});
    return response.data;
}    

// Creating verifyOtp method
export const verifyOtp= async(email:string , otp:string , orderData: any)=>{
    const response = await axiosInstance.post('/auth/verify-otp', {email , otp , orderData})
    return response.data;
}