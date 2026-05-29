import express from "express";
import {ORDERSMODEL} from "../models/Order.mjs";
// Initializing the router
const router = express.Router();


// Fetching the orders from the database to view in Thank-You page in the client panel.
router.get('/checkoutOrders/:token', async ( request , response)=>{
    try{
        // Fetching the order details of the user using the order token stored in the db 
        const order = await ORDERSMODEL.findOne({orderToken : request.params.token}) ;
        if( !order){
            return response.status(404).json({message : "Order not found"});
        } 
        // Sending the found order details as a response to the client 
        return response.status(200).json({success : true,  order});
    }
    catch (error) {
        return response.status(500).json({message : error.message});
    }
})

export default router;