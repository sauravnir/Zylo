import mongoose from "mongoose";
// Creates a unique string of characters
const { v4 : uuidv4 } = await import('uuid');

const Orders = new mongoose.Schema({
    orderToken : {type : String , default : uuidv4 , unique : true}, // Unique order token for each order 
    orderSequence : {type: Number}, //Stores sequential order number for each order
    orderNumber : {type : String}, // Stores the order number in the format ZYLO-00001
    customerData: Object, 
    items : Array, 
    orderSummary: Object, 
    status: {type : String , default : "Pending"},
    createdAt : {type : Date , default : Date.now},
})

// The following pre-save middleware will run before saving a new order which will check for orderSequence and iterate it into orderNumber

Orders.pre('save' , async function (){
    //Only ruinning if it is a brand new order placement
    if(this.isNew){
        try{
            // fetching the latest orderSequence from the db
            const latestOrder= await mongoose.model("Orders").findOne({},{},{sort:{orderSequence: -1}});

            // If any record exists then incrementing the new orderSequence by 1 else starting from 1000.
            if (latestOrder && latestOrder.orderSequence) {
                this.orderSequence = latestOrder.orderSequence + 1;
            } else {
                this.orderSequence = 1000;
            }
            
            // Generating orderNumber now; 
            this.orderNumber = `ZY-${this.orderSequence}`;
            
        } catch(error){
            return next(error);
        }
    }
    
});


export const ORDERSMODEL = mongoose.model('Orders',Orders);