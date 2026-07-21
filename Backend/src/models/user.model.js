import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

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

UserSchema.pre('save',async function(next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,10);
    next();
})

//now we will built a inbuilt function check our passowrd with hashed password
UserSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(this.password,password);
}

UserSchema.methods.generateAccessToken = function () {

    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    },
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRY
    }
)
}

export const User = new mongoose.model('User',UserSchema)