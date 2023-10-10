const mongoose = require('mongoose')

const userschema = mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        fullName: {type: String, required: true},
        phoneNumber: {type: String, required: true}
    }
)

module.exports = mongoose.model('User', userschema)

/*
const mongoose = require('mongoose')
const Joi = require('joi')

const userschema = mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        fullName: {type: String, required: true},
        phoneNumber: {type: String, required: true}
    }
)

const User = mongoose.model('User', userschema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),        
        password: Joi.string().min(3).max(50).required(),
        fullName: Joi.string().max(50).required(),
        phoneNumber: Joi.string().max(10).required(),
    })
    return schema.validate(user);
}

module.exports = {User, validateUser};
*/