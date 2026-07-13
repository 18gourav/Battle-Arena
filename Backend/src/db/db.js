import mongoose from "mongoose"
import { db_name } from "../constant.js"

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`);
        console.log(`data base connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;