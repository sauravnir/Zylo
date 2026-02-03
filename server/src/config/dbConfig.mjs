import mongoose from "mongoose";

// Creating a database connection config
const dbConnect = async () =>{
    try {
        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) {
            throw new Error("URI not defined in .env file")
        }
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`Database connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

export default dbConnect;