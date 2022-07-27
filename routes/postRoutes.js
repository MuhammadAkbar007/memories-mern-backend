import { Router } from "express"
import { addPost, getPosts, updatePost, deletePost, likePost } from "../controllers/postControllers.js"

const router = Router()

router.get('/', getPosts)
router.post('/', addPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)

export default router