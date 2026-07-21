import express from "express";
import connectDb from "./db/db.js";
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";

const app = express();

connectDb();

app.use(express.json());
app.use(cookieParser());

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

//routes
app.use("/api/users",userRoutes)