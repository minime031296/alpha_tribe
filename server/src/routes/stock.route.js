const {Router} = require('express')
const {createPosts, getAllPosts, getSinglePosts, deletePosts} = require('../controller/postController')
const generateToken = require('../utils/GenerateToken')
const { addComment, deleteComment } = require('../controller/commentController')
const { addLike, removeLike } = require('../controller/likeController')

const stockRouter = Router()

stockRouter.post('/posts', generateToken, createPosts)
stockRouter.get('/posts', getAllPosts)
stockRouter.get('/posts/:postId', getSinglePosts)
stockRouter.delete('/posts/:postId',generateToken, deletePosts)
stockRouter.post('/posts/:postId/comments',generateToken, addComment)
stockRouter.delete('/posts/:postId/comments/:commentId',generateToken, deleteComment)
stockRouter.post('/posts/:postId/like',generateToken, addLike)
stockRouter.delete('/posts/:postId/like',generateToken, removeLike)

module.exports = stockRouter