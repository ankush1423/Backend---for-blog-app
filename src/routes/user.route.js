import express from "express"
import {
       registerUser,
       loginUser,
       logOutUser,
       getUser,
       refreshAccessToken
      } from "../controllers/user.controller.js"

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logOutUser)
router.route("/refresh-access-token").get(refreshAccessToken)


export default router

















