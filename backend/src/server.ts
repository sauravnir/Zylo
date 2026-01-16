import express , {Application , Response , Request} from "express"
import cors from "cors"

const app : Application = express();

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // optional
    credentials: true,
}));


app.use(express.json());

// api.get is for managing the routing 
app.get("/api/health", (req:Request ,  res : Response)=>{
    res.status(200).json({
        status:"ok",
        message:"The server is running",
    });
});

app.get("/",(req:Request, res:Response)=>{
    res.status(200).json({
        status:"ok", 
        message:'Haina ra'
    })
})

const PORT = 5000 ; 

app.listen(PORT , () =>{
    console.log("Port 5000 running ")
})



