import mongoose from 'mongoose'
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find()
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const addPost = async (req, res) => {
    try {
        const newPost = new PostMessage(req.body)
        await newPost.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        const post = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
        res.status(202).json(updatedPost)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
        await PostMessage.findByIdAndRemove(_id)
        res.status(204).json({ message: 'Post deleted successfully' })
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
        const post = await PostMessage.findById(_id)
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true })
        res.status(202).json(updatedPost)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}