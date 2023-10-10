const router = require('express').Router();
const Post  = require('../models/posts')
const checkauth = require('../check-auth')

// Creating Post
router.post('', checkauth, (req, res) => {
    const post = new Post (
        {
            title: req.body.title,
            description: req.body.description,
            departmentCode: req.body.departmentCode
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

/*
const router = require('express').Router();
const auth = require('../check-auth'); //middleware/auth
const { Post, validatePost } = require('../models/posts');

// Get all posts
router.get('/', auth, async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

// Create new post
router.post('/', auth, (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const post = new Post(req.body);
    post.save();

    res.send(post);
});

// Get a single post
router.get('/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) return res.send(post);
    res.sendStatus(404);
});

// Delete a single post
router.delete('/:id', auth, async (req, res) => {
    const result = await Post.deleteOne({ _id: req.params.id });
    res.send(result);
});

module.exports = router;
*/