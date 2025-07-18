import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Post} from "../models/post.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import mongoose, { isValidObjectId, mongo } from "mongoose"

export const createPost = asyncHandler(async(req,res) => {
     const {title,slug,content,status,userId} = req.body
     if(!title || !slug || !content || !status)
     {
        throw new ApiError(404,"all feilds are mandatory...")
     }
     
     if(!isValidObjectId(userId))
     {
        throw new ApiError(404,"please provide a valid ID for user...")
     }

     const featuredImageLocalPath = req.file?.path
     if(!featuredImageLocalPath)
     {
        throw new ApiError(404,"Error while uploading the feature image...")
     }

     const feturedImage = await uploadOnCloudinary(featuredImageLocalPath)
     if(!feturedImage.url)
     {
        throw new ApiError(404,"error while uploading a file to the cloudinary...")
     }
     console.log(feturedImage.url)
     const createdPost = await Post.create({
        title,
        slug,
        content,
        feturedImage : feturedImage?.url,
        status,
        userId : new mongoose.Types.ObjectId(userId)
     })

     if(!createdPost)
     {
        throw new ApiError(404,"error while creating a post...")
     }

     return res
            .status(201)
            .json(
                new ApiResponse(
                     201,
                     createdPost,
                     "post created successfully..."
                )
            )
})

export const updatePost = asyncHandler(async(req,res) => {
     const {postId} = req.params
     const {title,slug,content,status} = req.body
     if(!isValidObjectId(postId))
     {
        throw new ApiError(404,"please provide a valid Object Id...")
     }
     if(!title || !slug || !content || !status)
     {
        throw new ApiError("404","please provide the all feilds...")
     }
     
     const featuredImageLocalPath = req?.file?.path
     if(!featuredImageLocalPath)
     {
        throw new ApiError(404,"please provide the fetured image...")
     }

     const feturedImage = await uploadOnCloudinary(featuredImageLocalPath)
     if(!feturedImage?.url)
     {
        throw new ApiError(404,"error while uploading the fetured image in cloudinary...")
     }
     const post = await Post.findByIdAndUpdate(
        postId,
        {
            $set : {
              title,
              slug,
              content,
              status,
              feturedImage : feturedImage?.url
            }
        },
        {
            new : true
        }
     )

     if(!post)
     {
        throw new ApiError(404,"error while upating the post...")
     }

     return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    post,
                    "post updated SuccessFully"
                )
            )

})

export const deletePost = asyncHandler(async(req,res) => {
     const {postId} = req.params
     if(!isValidObjectId(postId))
     {
        throw new ApiError(401,"please provide a valid Object ID")
     }

     await Post.findByIdAndDelete(postId)

     return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    {},
                    "post deleted SuccessFully"
                )
            )
})

export const getPost = asyncHandler(async(req,res) => {
     const {postId} = req.params
     if(!isValidObjectId(postId))
     {
        throw new ApiError(404,"please provide a valid Object ID...")
     }

     const post = await Post.findById(postId)
     if(!post)
     {
        throw new ApiError(404,"error while getting the post...")
     }
     return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    post,
                    "post updated SuccessFully...",
                )
            )
})

export const getPosts = asyncHandler(async(req,res) => {
     const posts = await Post.find({})
     if(!posts)
     {
        throw new ApiError(404,"error while getting the posts...")
     }
     return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    posts,
                    "all posts fetced SucssessFully..."
                )
            )
})

export const deleteFile = asyncHandler(async(req,res) => {
     
})

export const getFilePreview = asyncHandler(async(req,res) => {
     const {postId} = req.params
     if(!isValidObjectId(postId))
     {
        throw new ApiError(404,"please provide a valid post Id...")
     }

     const post = await Post.findById(postId)
     if(!post)
     {
        throw new ApiError(404,"error while getting the post...")
     }
     return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    post.feturedImage,
                    "feturedImage fetched SuccessFully..."
                )
            )
}) 


// createPost
// updatePost
// deletePost
// getPost
// getPosts
// deleteFile      // from cloudinary
// getFilePreview  // the uploaded image








