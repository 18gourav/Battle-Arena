import { User } from "../models/user.model.js";

const userRegister = async(req,res) =>{
    //first take input from a user
    const {username,email,password} = req.body;

    //now check if that input is give or not
    if(
      [username, email,password].some((field => field?.trim() === ''))
    ){
      return res.status(400).json({
        message:"All field are required"
      })
   }

   //Now we have to check if that user already exist or not
   const existeduser = await User.findOne({
        $or:[{username},{email}]
   })

   if(existeduser){
    return res.status(400).json({
        message:"User already existed with this username or email"
    })
   }

   //now create user
   const user = await User.create({
        username,
        email,
        password
   })

   //check if user created or not
   const userCreated = await User.findById(user._id).select(
        '-password'
   )

   if(!userCreated){
        return res.status(500).json({
            message:"Failed to create user"
        })
   }

   return res.status(201).json({
        message:"User Created Succesfully",
        userCreated
   })
}

export {userRegister}