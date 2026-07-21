import { User } from "../models/user.model.js";

const GenerateToken = async(userId) => {
     const user = await User.findById(userId);

     const accessToken = user.generateAccessToken()

     return accessToken
}

const userRegister = async(req,res) =>{
    //first take input from a user
    const {username,email,password} = req.body;

    //now check if that input is give or not
    if(
      [username, email,password].some((field => !field || field.trim() === ""))
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

const userLogin = async(req,res) => {
     //first take input from user
     const{email,password} = req.body;

     if(!email){
          return res.status(400).json({
               message:"Email is mandatory to give"
          })
     }

     const findUser = await User.findOne({
          email
     })

     if(!findUser){
          return res.status(400).json({
               message:"First register with this email"
          })
     }

     const passwordMatch = await findUser.isPasswordCorrect(password)

     if(!passwordMatch){
          return res.status(401).json({
               message:"Password is incorrect"
          })
     }

     const accessToken
}

export {userRegister}