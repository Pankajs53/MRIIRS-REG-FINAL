const express = require("express");
const app = express();
const dotenv = require("dotenv"); 
const database = require("./config/database");
const cors = require("cors");

// routes
const patientRoutes = require("./routes/Patient")
const adminRoutes = require("./routes/Admin")
const doctorRoutes = require("./routes/Doctor")
const userRoutes = require("./routes/User")
const formRoutes = require("./routes/Forms")


dotenv.config();
const PORT = process.env.PORT || 5000;
database.dbConnect();
app.use(express.json());

app.use(
    cors({
        origin:["http://localhost:3000","https://sunny-scone-33074e.netlify.app"],
        credentials:true,
    })
)

// routes
app.use("/api/v1/patient",patientRoutes); 
app.use("/api/v1/admin",adminRoutes);
app.use("/api/v1/doctor",doctorRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/form",formRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"SERVER UP AND RUNNING...:)"
    })
})

app.listen(PORT,(req,res)=>{
    console.log(`APP RUNNING AT PORT ${PORT}`)
})
