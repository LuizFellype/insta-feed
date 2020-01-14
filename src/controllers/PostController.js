const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const { getPublicIdFromUrl } = require('../utils')

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dar4lebwj',
    api_key: '162325637922233',
    api_secret: 'csQKv4kJ7vqJCpECZ2T-Ro2FgCM'
});


module.exports = {
    async getAll(req, res) {
        const posts = await Post.find().sort('-createdAt')

        return res.json(posts)
    },

    async create(req, res) {
        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file

        await sharp(req.file.path).resize(500)
            .jpeg({ quality: 55 }).toFile(path.resolve(req.file.destination, 'resized', image))
        
        fs.unlinkSync(req.file.path)
        const imageResizedPAth = `${req.file.destination}/resized/${image}`
        
        cloudinary.uploader.upload(imageResizedPAth, async function (err, result) {
            if (err) return res.json({ errorMsg: 'Error to upload image to cloudnary.', err })

            const post = await Post.create({
                author, place, description, hashtags, image: result.secure_url
            })

            req.io.emit('post', post)

            fs.unlinkSync(imageResizedPAth)
            return res.json(post)
        })

    },
    async delete(req, res) {
        try {
            const {image} = await Post.findById(req.params.id)
            const public_id = getPublicIdFromUrl(image)

            cloudinary.uploader.destroy(public_id, async (err, result) => {
                await Post.deleteOne({ _id: req.params.id })
                
                if (err) return res.json({deleted: true, postId: req.params.id, errorMsg: 'Error to delete image to cloudnary.', err })

                // req.io.emit('delete', post)
    
                return res.json({deleted: true, postId: req.params.id })
            })
            
            
            
        } catch (error) {
            return res.json({ error })
        }


    }
}