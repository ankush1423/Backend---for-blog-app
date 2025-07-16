import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import helmet from "helmet"

const app = express()

app.use(helmet())

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/posts",postRoutes)

export default app

















