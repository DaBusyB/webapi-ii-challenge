const express = require('express')

const PostsRouter = require('./posts/posts-router.js')

const server = express()

server.use(express.json())

server.use('api/posts', PostsRouter)

server.get('/', (req, res) => {
    res.send(`
        <h1>Brandi's Post API</h1>
        <p>Is this thing on?</p>
    `)
})

module.exports = server