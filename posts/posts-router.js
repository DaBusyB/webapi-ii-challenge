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

router.post('/', async (req, res) => {
    try {
        console.log('inside post')

        const post = await Posts.insert(req.body)

        if (post) {
            res.status(201).json(post)
        } else {
            res.status(400).json({
                error: 'Please provide title AND contents for the post.'
            })
        }
         
        
    } catch (error) {
        res.status(500).json({
            error: 'There was an error while saving the post to the database.'
        })
    }
})

module.exports = router