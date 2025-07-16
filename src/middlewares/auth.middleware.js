import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

const verifyJWT = asyncHandler(async (req,_,next) => {
     try
     {
        const token = req.cookies?.accessToken || req.headers("Authrization").replace("Barear ","")
        if(!token)
        {
            throw new ApiError(404,"error while getting the token")
        }

        const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        if(!decodedToken)
        {
            throw new ApiError(404,'this token is used')
        }

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user)
        {
            throw new ApiError(404,'Error while getting the user...')
        }

        req.user = user
        next()
     }
     catch(error)
     {
        throw new ApiError(404,'Error while verifyin the token')
     }
})


export {verifyJWT}






















