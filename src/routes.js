const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const routes = new express.Router()
const upload = multer(uploadConfig)

routes.get('/', (req,res) => res.json({funfando: true}))

routes.get('/posts', PostController.getAll)
routes.post('/posts', upload.single('image'), PostController.create)
routes.post('/posts/:id/delete', PostController.delete)
routes.post('/posts/:id/like', LikeController.increase)
routes.post('/posts/:id/unlike', LikeController.decrease)

module.exports = routes
