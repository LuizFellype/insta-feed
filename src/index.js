const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

mongoose.connect('mongodb+srv://luiz:luiz@cluster0-azcve.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
    req.io = io

    next()
})
app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

server.listen(3030, ()=> console.log('Iniciou http://localhost:3030'))