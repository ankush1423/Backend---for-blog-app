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

router.route("/create-post").post(upload.single("feturedImage"),createPost)
router.route("/update-post/:postId").patch(upload.single("feturedImage"),updatePost)
router.route("/delete-post/:postId").delete(deletePost)
router.route("/get-post/:postId").get(getPost)
router.route("/all-posts").get(getPosts)
router.route("/getfile-preview/:postId").get(getFilePreview)
// router.route("/delete-featured-image/:postId")

export default router


















