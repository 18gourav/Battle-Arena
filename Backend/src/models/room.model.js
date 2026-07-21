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
        ]
    },
    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }
})

export const Room = mongoose.model("Room",RoomSchema)