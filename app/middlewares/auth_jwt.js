const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')
const db = require('../models')

const User = db.user

verifyToken = (req, res, next) => {
    let token = req.headers["x-acess-token"];

    if (!token){
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "Unauthorized!"
            })
        }
        req.userId = decoded.userId;
        next();
    })
}


const auth_jwt = {
    verifyToken: verifyToken
}

module.exports = auth_jwt