import { Room } from "../models/room.model.js";

const createPrivateRoom = async(req,res) => {
    const {duration} = req.body;
    
    if(!duration){
        return res.status(400).json({
            message:"Duration is req"
        })
    }

    const roomCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();


    const roomCreate = await Room.create({
        roomCode,
        players:[req.user?._id],
        status:"waiting",
        mode:"private",
        duration,
        createdBy:req.user?._id
    })

    //now check if room is cfeated or not
    const checkRoom = await Room.findById(roomCreate._id)

    if(!checkRoom){
        return res.status(500).json({
            message:"Failed to create a room"
        })
    }

    return res.status(201).json({
        message:"Room Succesfully created",
        checkRoom
    })
}

const joinRoom = async(req,res) => {
    
}