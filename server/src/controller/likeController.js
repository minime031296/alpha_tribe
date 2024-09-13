const addLike = async (req, res) => {
    const {postId} = req.params

    try {

        const post = await Stock.findById(postId)

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({ success: false, message: 'Post already liked' });
        }

        post.likes.push(userId);
        post.likesCount = post.likes.length;

        await post.save();

        res.json({ success: true, message: 'Post liked' });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        })
    }

}

const removeLike = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Stock.findById(postId);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

        if (!post.likes.includes(userId)) {
            return res.status(400).json({ success: false, message: 'Post not liked' });
        }

        post.likes = post.likes.filters(id => id.toString() !== userId.toString())
        post.likesCount = post.likes.length;

        await post.save();

        res.json({ success: true, message: 'Post unliked' });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
}

module.exports = {
    addLike,
    removeLike
}