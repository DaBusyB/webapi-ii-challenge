const express = require('express')

const Posts = require('../data/db.js')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        console.log('inside get')

        const posts = await Posts.find(req.query)
        
        res.status(200).json(posts)
    } catch(error) {
        console.log(error)
        res.status(500).json({
            error: 'The posts information could not be retrieved'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        console.log('inside get by id')

        const post = await Posts.findById(req.params.id)

        post ? res.status(200).json(post) :  res.status(404).json({error: 'The post with the spicified ID does not exist.'})
    } catch (error) {
        res.status(500).json({
            error: 'The post information could notbe retrieved.'
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        console.log('inside put')

        const post = await Posts.update(req.params.id, req.body)
        
        // if(!post.title || !post.contents) {
        //     res.status(400).json({errorMessage: 'Please provide title AND contents for the post.'}) 
        // }

        post ? res.status(200).json(post) :
        res.status(404).json({message: 'The post with the specified ID does not exist.'});

    } catch (error) {
        res.status(500).json({ error: 'The post information could not be modified.'})
    }
})  

router.post('/', async (req, res) => {
    try {
        console.log('inside post')

        const post = await Posts.insert(req.body)

        post ? res.status(201).json(post) : res.status(400).json({error: 'Please provide title AND contents for the post.'})
    } catch (error) {
        res.status(500).json({
            error: 'There was an error while saving the post to the database.'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        console.log('inside delete')
        const post = await Posts.remove(req.params.id)

        post > 0 ? res.status(201).json(post) : res.status(404).json({ message: 'The post with the specified ID does not exist'}) 
    } catch (error) {
        res.status(500).json({ error: 'The post could not be removed.' })
    }
})

router.get('/:id/comments', async (req, res) => {
    const {id} = req.params

    try {
        const comments = await Posts.findPostComments(id)

        comments.length > 0 ? res.json(comments) : res.status(404).json({message: 'The post with the specified ID does not exist.'})
    } catch (err) {
        res.status(500).json({err})
    }
})

router.post('/:id/comments', async (req, res) => {
    const commentInfo = {...req.body, post_id: req.params.id}

    try {
        const newComment = await Posts.insertComment(commentInfo)

        res.status(201).json(newComment)
    } catch (err) {
        res.status(500).json({err: 'There was an error while saving the comment to the database.'})
    }
})

module.exports = router