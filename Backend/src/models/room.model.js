import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema({
    roomCode:{
        type:String,
        required:true,
        unique:true
    },
    players:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    status:{
        type:String,
        enum:[
            'waiting',
            'playing',
            'finished'
        ],
        default:'waiting'
    },
    mode:{
        type:String,
        enum:[
            'private',
            'matchmaking'
        ],
        required:true
    },
    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:true
    },
    duration:{
        type:Number,
        enum:[15,20,25,30]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    startedAt: {
        type: Date,
        default: null
    },
    endedAt: {
        type: Date,
        default: null
    }
},
{timestamps:true}
)

export const Room = mongoose.model("Room",RoomSchema)