import express from "express"
import {
       registerUser,
       loginUser,
       logOutUser,
       getUser,
       refreshAccessToken
      } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logOutUser)
router.route("/refresh-access-token").get(verifyJWT,refreshAccessToken)
router.route("/current-user").get(verifyJWT,getUser)

export default router

















