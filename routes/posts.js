const router = require('express').Router();
const Post  = require('../models/posts')
const checkauth = require('../check-auth')
const sanitizeHtml = require('sanitize-html');

// Creating Post
router.post('', checkauth, (req, res) => {
    const post = new Post (
        {
            title: sanitizeHtml(req.body.title, {allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]}),
            description: sanitizeHtml(req.body.description, {allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]}),
            departmentCode: sanitizeHtml(req.body.departmentCode, {allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]})
        }
    )
    post.save().then(() => {
        res.status(201).json({
            message: 'Post created',
            post:post
        })
    })
})

// Fetching Posts
router.get('', (req, res) => {
    Post.find().then((posts) => {
        res.json(
            {
                message: 'Posts found',
                posts:posts
            }
        )
    })
})

// Deleting Posts
router.delete('/:id', checkauth, (req, res) => {
    Post.deleteOne({_id: req.params.id})
    .then((result) =>
    {
        res.status(200).json({message: "Post Deleted"})
    })
})

module.exports = router