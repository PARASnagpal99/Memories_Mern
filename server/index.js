import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from 'cors' ;
import connectDB from "./db/connect.js";
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'


const app = express() ;
dotenv.config();
app.use(cors());

app.use(bodyParser.json({limit : "30mb" , extended : true})) ;
app.use(bodyParser.urlencoded({limit : "30mb" , extended : true})) ;
app.use('/posts' , postRoutes)
app.use('/user' , userRoutes)


const port = process.env.PORT || 4000 ;
const url = process.env.CONNECTION_URL

const start = async()=>{
    try{
        connectDB(url) ;
        app.listen(port , ()=>{
            console.log(`server is sucessfully running on port ${port}`)
        })
    }catch(error){
        console.log(error);
    }
}

start() ;