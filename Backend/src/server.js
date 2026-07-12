import express from "express";

const app = express();

app.get('/', (req,res) => {
    res.send("hello battle arena is started")
} )

app.listen(5000,(req,res) =>{
    console.log("the app is listening on port 5000")
})