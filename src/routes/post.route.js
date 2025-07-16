import express from "express"
import {
      createPost,
      updatePost,
      deletePost,
      getPost,
      getPosts,
      deleteFile,
      getFilePreview
     } from "../controllers/post.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"


const router = express.Router()

router.use(verifyJWT)

router.route("/create-post").post(createPost)
router.route("/update-post/:postId").post(upload.single("featuredImage"),updatePost)
router.route("/delete-post/:postId").post(deletePost)
router.route("/get-post/:postId").get(getPost)
router.route("/all-posts").get(getPosts)
router.route("/getfile-preview/:postId").get(getFilePreview)
// router.route("/delete-featured-image/:postId")

export default router

















