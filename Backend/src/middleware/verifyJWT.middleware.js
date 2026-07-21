import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

const verifyJWT = async(req,res,next) => {
    try {
        const token = req.cookies?.accessToken

        if(!token){
            return res.status(401).json({
                message:"Unauthorized access"
            })
        }

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decodedToken._id).select(
            '-password'
        )

        if(!user){
            return res.status(401).json({
                message:"invalid user"
            })
        }

        req.user = user;

        next()
    } catch (error) {
        return res.status(401).json({
            message:error?.message || "access denied"
        })
    }
}

export {verifyJWT}