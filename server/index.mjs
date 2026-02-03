import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from "./src/config/dbConfig.mjs";
import authRoutes from "./src/routes/authRoutes.mjs"

// Initializing dotenv file
dotenv.config();
// Connecting to the database
dbConnect();
// Creating an express app instance
const app = express();

// Setting up middlewares
app.use(express.json()); //Parses all the responses into JSON
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // required to use cookies / sessions
})); 
const PORT = process.env.PORT

// Creating global routes for OTP
app.use('/api/auth' , authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
