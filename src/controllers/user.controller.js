import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

const genrateAccessRefreshToken = async(userId) => {
   try
   {
      const user = await User.findById(userId)
      if(!user)
      {
         throw new ApiError(404,"error while getting the user...")
      }
      const accessToken = await user.genrateAccessToken()
      const refreshToken = await user.genrateRefreshToken()
      if(!accessToken || !refreshToken)
      {
         throw new ApiError(404,"error while genrating the tokens...")
      }
      
      user.refreshToken = refreshToken
      await user.save({validateBeforeSave:false})

      return {accessToken,refreshToken}

   }
   catch(error)
   {
      throw new ApiError(404,"error while genrating the access token and refresh token")
   }
}

export const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password)
    {
        throw new ApiError(404,"all feilds are mandatory")
    }

    const user = await User.create({
         name,
         email,
         password
    })

    if(!user)
    {
        throw new ApiError(404,"error while regiistering the user")
    }
    
    return res 
           .status(201)
           .json(
              new ApiResponse(
                  201,
                  user,
                  "user register successFully"
               )
           )
})

export const loginUser = asyncHandler(async(req,res) => {
     const {email,password} = req.body
     if(!email || !password)
     {
        throw new ApiError(404,'all feilds are mandatory')
     }

     const user = await User.findOne({email})
     if(!user)
     {
        throw new ApiError(404,'there is no user with this email...')
     }

     const isPasswordCorrect = await user.isPasswordCorrect(password)
     if(!isPasswordCorrect)
     {
        throw new ApiError(404,'please provide the correct password...')
     }

     const {accessToken,refreshToken} = await genrateAccessRefreshToken(user._id)
     if(!accessToken || !refreshToken)
     {
        throw new ApiError(404,"error while getting the accesstoken and refresh token")
     }

     const options = {
         httpOnly : true,
         secure : true
     }

     return res
            .status(201)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json(
               new ApiResponse(
                  201,
                  user,
                  "user fetched successFully",
                  true
               )
            )
})

export const getUser = asyncHandler(async(req,res) => {
     return res
            .status(201)
            .json(
               new ApiResponse(
                   201,
                   req?.user,
                   "user fetched successFully"
               )
            )
})

export const refreshAccessToken = asyncHandler(async(req,res) => {
    const incomingToken = req.cookies?.refreshToken
    if(!incomingToken)
    {
       throw new ApiError(401,"error while getting the incoming token...")
    }
    const decodedToken = await jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET)
    if(!decodedToken)
    {
       throw new ApiError(201,"unauthorised token...")
    }
    const accessToken = await req?.user?.genrateAccessToken()
    if(!accessToken)
    {
       throw new ApiError(401,"Error while generating the access token...")
    }

    const options = {
       httpOnly : true,
       secure : true
    }

    return res
           .status(201)
           .cookie("accessToken",accessToken,options)
           .cookie("refreshToken",incomingToken,options)
           .json(
              new ApiResponse(
                 201,
                 {},
                 "access Token refresh SuccessFully..."
              )
           )
})

export const logOutUser = asyncHandler(async(req,res) => {
     await User.findByIdAndUpdate(
        req?.user?._id,
        {
           $unset : {
              refreshToken : 1
           }
        },
        {
          new : true
        }
     )
      
     const options = {
         httpOnly : true,
         secure : true
     }

     return res
            .status(201)
            .clearCookie("accessToken",options)
            .clearCookie("refreshToken",options)
            .json(
                new ApiResponse(
                    201,
                    {},
                    "user loggedOut SuccessFully"
                )
            )
          
})































