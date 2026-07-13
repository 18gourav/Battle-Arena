import express from "express";
import connectDb from "./db/db.js";
import dotenv from "dotenv"

const app = express();

connectDb();

app.get('/', (req,res) => {
    res.send("hello battle arena is started")
} )

const port = process.env.PORT || 5000;

app.listen(port,(req,res) =>{
    console.log(`the app is listening on port ${port}`)
})

dotenv.config({
    path: './env'
});