const db = require('../models')
const config = require('../configs/auth.config')
const User = db.user

var jwt = require('jsonwebtoken')
var bcrypt = require("bcrypt")

exports.signup = (req, res) => {
    // Save user to database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        console.log(user)
        res.send({message: "User was registered successfully!"})
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}

exports.signin = (req, res) => {
    console.log(req.body)
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(!user){
            return res.status(404).send({message: "User Not Found."})
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        var token = jwt.sign({id: user.id_users}, config.secret, {
            expiresIn: 86400 // 24 hours
        })

            res.status(200).send({
                id: user.id_users,
                username: user.username,
                email: user.email,
                accessToken: token
            })
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}