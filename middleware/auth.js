/*
const jwt = require ('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

function auth (req,res,next){
    const token = req.header('x-auth-token');
    let id;
    
    try{
        console.log(token);
        const userId = jwt.verify(token, secretKey)
        id = userId;
    } catch(err){
        console.log(token);
        console.log(secretKey);
        console.log(id);
        return res.sendStatus(401);
    }

    if(id){
        req.user = {id};
        return next();
    }

res.sendStatus(401);
}

module.exports = auth;
*/