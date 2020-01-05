const Post = require('../models/Post')

module.exports = {
    async increase(req, res) {
        const post = await Post.findById(req.params.id)

        post.like += 1
        await post.save()

        req.io.emit('like', post)

        return res.json(post)
    },
    async decrease(req, res) {
        const post = await Post.findById(req.params.id)

        if (post.like === 0) return post
        
        post.like -= 1
        await post.save()

        req.io.emit('like', post)

        return res.json(post)
    }
}