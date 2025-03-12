import express from 'express'
import dotenv from "dotenv";
import { db } from './src/db.js';
import cors from 'cors'
import router from './src/routes/routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// connect db
db();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/api", router)

// check route
app.get("/", (req, res)=>{
    res.json({
        message: "Runs"
    })
})

app.listen(PORT, ()=>{
    console.log(`Running on ${PORT}`)
})



