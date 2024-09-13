const Stock = require("../model/stock.model")

const createPosts = async (req, res) => {
    const {stockSymbol, title, description, tags } = req.body

    try {
        const post = new Stock({
            stockSymbol,
            title,
            description,
            tags,
        })
        await post.save()

        res.status(201).json({
            success: true,
            postId: post._id,
            message: 'Post created successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
}

const getAllPosts = async (req, res) => {
    const {stockSymbol, tags, sortBy} = req.query

    let filters = {}

    if(stockSymbol) filters.stockSymbol = stockSymbol
    if(tags) {
        filters.tags = {$in: tags.split(',').map(tag => tag.trim())}
    }

    let sort = {}

    if(sortBy === "date") {
        sort = {createdAt: -1}
    }else if (sortBy === 'likes') {
        sort = { likesCount: -1 };
    }

    try {
        const posts = await Stock.find(filters).sort(sort).exec()
        res.status(200).json({
            success:true,
            posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }

}

const getSinglePosts = async (req, res) => {
    const {postId} = req.params
    const {userId} = req.body

    try {
        const post = await Stock.findById(postId).populate('comments.userId', "username").exec()

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        const formattedComments = post.comments.map(comment => ({
            commentId: comment._id,
            userId: comment.userId ? comment.userId._id : null, 
            comment: comment.comment,
            createdAt: comment.createdAt
        }));

        res.status(200).json({
            success: true,
            postId: post._id,
            stockSymbol: post.stockSymbol,
            title: post.title,
            description: post.description,
            likesCount: post.likesCount,
            comments: formattedComments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
}

const deletePosts = async (req, res) => {
    const {postId} = req.params

    const token = req.headers.authorization?.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const post = await Stock.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        if(post.userId.toString() !== decoded.userId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized',
            });
        }

        await post.remove()

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
}

module.exports = {
    createPosts, 
    getAllPosts, 
    getSinglePosts,
    deletePosts
}