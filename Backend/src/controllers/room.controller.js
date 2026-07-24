import { Question } from "../models/Question.model.js";
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
    const {roomCode} = req.params;

    const room = await Room.findOne({roomCode});

    if(!room){
        return res.status(201).json({
            message:"Room not found"
        })
    }

    //now check if only one player is there
    if(room.status !== "waiting"){
        return res.status(400).json({
            message:"Room has already started"
        })
    }

    //now check if 2 players are already in lobby
    if(room.players.length >= 2){
        return res.status(400).json({
            message:"Room is full"
        })
    }

    //now room is in waiting and room does not have 2 or more than 2
    room.players.push(req.user?._id);

    //now assign ques to the lobby
    if(room.players.length == 2){
        const randomQues = await Question.aggregate([
            {
                $sample:{
                    size:1
                }
            }
        ])

        if(randomQues.length == 0){
            return res.status(400).json({
                message:"Question not available"
            })
        }

        room.question = randomQues[0]._id;
        room.status = "playing";
    }

    await room.save();

    return res.status(200).json({
        message:"Room players started playing",
        room
    })
}