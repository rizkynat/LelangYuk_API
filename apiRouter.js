//apiRouter.js
    
const express = require('express');
const apiRouter = express.Router();
    
const jsonwebtoken = require('jsonwebtoken');
const Users = require('./src/models/Users');
const { hashSync, genSaltSync, compareSync} = require('bcrypt')
const cookieParser = require('cookie-parser');

apiRouter.use(cookieParser);

apiRouter.post('/register', async (req, res, next) =>{
    try{
        const username = req.body.username
        const email = req.body.email
        let password = req.body.password

        if(!username || !email || !password){
            return res.sendStatus(400)
        }
        const salt = genSaltSync(10)
        password = hashSync(password, salt)

        const user = await Users.insertUsers(username, password, email);

        const jsontoken = jsonwebtoken.sign({user: user}, process.env.SECRET_KEY, {expiresIn: '30m'});
        // add secure: true, when uisng https
        res.cookie('token', jsontoken, {httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(Number(new Date()) + 30*60*1000)})

        res.json({token: jsontoken})
    }catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});

apiRouter.post('/login', async(req, res, next)=>{
    try{
        const email = req.body.email
        const password = req.body.password
        const user = await Users.getUsersByEmail(email);

        if(!user){
            return res.json({
                message: "Invalid email and password"
            })
        }

        const isValidPassword = compareSync(password, user.password)
        if(isValidPassword){
            user.password = undefined
            const jsontoken = jsonwebtoken.sign({user: user}, process.env.SECRET_KEY, {expiresIn: '30m'});
            // add secure: true, when uisng https
            res.cookie('token', jsontoken, { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(Number(new Date()) + 30*60*1000)})

            res.json({token: jsontoken});
        } else{
            return json({
                message: "Invalid email and password"
            })
        }

    }catch(e){
        console.log(e)
    }
});


module.exports = apiRouter;