import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    rating:{
        type: Number,
        default:1200
    },
    losses:{
        type: Number,
        default: 0
    },
    wins:{
        type: Number,
        default:0
    }
},
{timestamps:true})

export const User = new mongoose.model('User',UserSchema)