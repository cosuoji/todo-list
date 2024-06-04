import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import todoRoute from "./routes/todoRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import logger from "./logger/logger.js"
import httpLogger from "./logger/httplogger.js";
import multer from 'multer'
import v2 from "./integrations/cloudinary.js";
import fs from "fs"
import morgan from "morgan";
import redis from "./integrations/redis.js";



//upload destination multer
const upload = multer({dest: 'uploads/'})


const app = express();
const PORT = 9000
const MONGODB_URI = "mongodb+srv://test_user:password123456@bookstore.gvhx48w.mongodb.net/?retryWrites=true&w=majority&appName=bookstore"
app.use(express.json())
app.use(express.urlencoded())
//app.use(httpLogger)
app.use(morgan('dev'))


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


app.set("view engine", 'ejs')
app.set("views", "./views")
app.use(express.static(__dirname + "/public"))


app.use("/", authRoute)
app.use("/todos", todoRoute)

app.post('/file/upload', upload.single('file'), async (req, res)=>{
    try{
     const cloudinaryResponse = await v2.uploader.upload(req.file.path)

    fs.unlink(req.file.path, err=>{
        if(err){
            console.error(err)
            return
        }
    })

     return res.json({
        data: cloudinaryResponse,
        message: "file uploaded",
        error: null
    })

    }

    catch(error){
        return res.status(500).json({
            data: null,
            error: "Server error",
            errorData: error
        })
    }


})

//catch other routes
app.all("*", (req, res )=>{
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
            logger.info("to do app is running on PORT", PORT)
        })
    })
redis.connect()