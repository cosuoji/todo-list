import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import todoRoute from "./routes/todoRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";


const app = express();
const PORT = 9000
const MONGODB_URI = "mongodb+srv://test_user:password123456@bookstore.gvhx48w.mongodb.net/?retryWrites=true&w=majority&appName=bookstore"
app.use(express.json())
app.use(express.urlencoded())


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


app.set("view engine", 'ejs')
app.set("views", "./views")
app.use(express.static(__dirname + "/public"))


app.use("/", authRoute)
app.use("/todos", todoRoute)

//catch other routes
app.all("*", (req, res)=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})

//connect to Database
mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB")
        app.listen(PORT, _ =>{
            console.log("blogging app is running on PORT", PORT)
        })
    })
