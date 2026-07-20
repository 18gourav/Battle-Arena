import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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

export const User = new mongoose.model('User',UserSchema)