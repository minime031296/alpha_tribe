const Stock = require("../model/stock.model")

const addComment = async (req, res) => {
    const {postId} = req.params
    const {comment} = req.body

    const post = await Stock.findById(postId)

    if(!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })
    }

    const newComment = {
        userId: decoded.userId,
        comment,
        createdAt: new Date()
    }
    post.comments.push(newComment)

    await post.save();

    return res.status(201).json({
        success: true,
        commentId: newComment._id,
        message: 'Comment added successfully'
    })
}

const deleteComment = async (req, res) => {
    const {postId, commentId} = req.body

    const post = await Stock.findById(postId)
    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }
    const comment = post.comments.id(commentId)
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: 'Comment not found',
        });
    }

    if(comment.userId.toString() !== decoded.userId) {
        return res.status(403).json({
            success: false,
            message: 'Unauthorized',
        });
    }

    comment.remove()
    await post.save()

    res.status(200).json({
        success: true,
        message: 'Comment deleted successfully',
    });
}

module.exports = {
    addComment,
    deleteComment
}