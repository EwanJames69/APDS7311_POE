const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');
// Brute-force protection middleware
const ExpressBrute = require('express-brute');
// In store memory for persisting request counts
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

router.post('/signup', bruteforce.prevent, (req, res) => {
    bcrypt.hash(req.body.password,10)
    .then(hash => {
        const user = new User (
            {
                username: sanitizeHtml(req.body.username, {allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]}),
                password: sanitizeHtml(hash, {allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]}),
                fullName: sanitizeHtml(req.body.fullName, {allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]}),
                phoneNumber: sanitizeHtml(req.body.phoneNumber, {allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]})
            }
        );
        user.save()
        .then(result => {
            res.status(201).json({
                message: "User created",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });       
    });
})

router.post('/login', bruteforce.prevent, (req, res) => {
    User.findOne({ username: req.body.username })
    .then(user => {
        if(!user){
            return res.status(401).json({
                message: "Authentication Failure"
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err || !result){
                return res.status(401).json({
                    message: "Authentication Failure"
                });
            }
            const token = jwt.sign({ username: user.username, userid:user._id },
            'secret_this_should_be_longer_than_it_is',
            { expiresIn: '1h' });
            console.log("Login Successful");
            res.status(200).json({ token: token });
        });           
    })
    .catch(err => {
        return res.status(401).json({
            message: "Authentication Failure"
        });
    });
})

module.exports = router

/*
const router = require('express').Router();
const auth = require('../middleware/auth');
const { hashPassword } = require('../utils/hash');

// Create new user
router.post('/signup', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const isUnique = (await User.count({ username: req.body.username })) === 0;
    if (!isUnique){
        return res.status(400).json({ error: 'The username or password is not valid'});
    }

    try {
        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        await user.save();
    } catch (err) {
        return res.status(500).json(err);
    }
    res.sendStatus(201);
});

/*
// Get current user details
router.get('/', auth, async (req, res) => {
    res.send({ currentUser: req.user});
});

module.exports = router;
*/