import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
     name : {
        type : String, 
        required : true, 
        min : 3, 
        max : 20 
     },
     email : {
        type : String,
        required : true,
        unique : true
     },
     password : {
        type : String,
        required : true
     },
     refreshToken : {
        type : String
     }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified(this.password)) return next()
    const genSalt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,genSalt)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken = function(){
    return jwt.sign(
      {
         _id : this._id,
         name : this.name,
         email : this.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn : process.env.ACCESS_TOKEN_EXPIRY
      }
    )
}

userSchema.methods.genrateRefreshToken = function(){
    return jwt.sign(
        {
           _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
           expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',userSchema)






















