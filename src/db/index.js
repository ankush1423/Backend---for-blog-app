import mongoose from "mongoose";


const connectDB = async() => {
    try
    {
       await mongoose.connect(process.env.MONGODB_URI)
    }
    catch(error)
    {
       console.log("ERROR :: while connecting to the database ",error)
       process.exit()
    }
}

export default connectDB













