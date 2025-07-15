import connectDB from "./db/index.js"
import app from "./app.js";


const port = process.env.PORT || 8000



connectDB()
.then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY....")
    app.listen(port,() => console.log("our app listen at port ::: ",port))
})

























