const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>
{
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"secret_this_should_be_longer_than_it_is")
        next();
    }
    catch(error)
    {
        res.status(401).json({
            message:"Invalid token"
        });
    }
};

/*
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_URL;

module.exports=(req,res,next) =>
{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        console.log(secretKey);
        jwt.verify(token, secretKey)
        next();
    }
    catch(error)
    {
        res.status(401).json({
            message:"Invalid token"
        })
    }
}
*/

