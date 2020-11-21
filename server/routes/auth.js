const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const bcryptSalt = 10;

router.post('/signup', async (req, res) => {
    const {username, email, password, cookingLevel} = req.body
    
    if (!username || !email || !password || !cookingLevel) {
        res.status(400).json({message: 'All fields are mandatory. Please provide your username, email, password and cooking level.'})
        return;
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if(!regex.test(password)) {
        res.status(500).json({message: 'Password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter.'})
        return;
    }

    try {
        const userFound = await User.findOne({$or: [{username, email}]})
        if(userFound) {
            res.status(400).json({message: 'Username and email need to be unique. Either username or email is already used.'})
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)

        const user = await User.create({username: username, email: email, password: hashPass, cookingLevel: cookingLevel})

        req.session.user = user
        res.status(200).json(user)
        return;
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: 'Something is wrong.'})
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400).json({message: 'Please enter both email and password.'})
        return;
    }

    try {
        const user = await User.findOne({email})

        if(!user){
            res.status(400).json({message: 'Email is not registered. Try with other email.'})
            return;
        } else {
                const passwordCorrect = await bcrypt.compare(password, user.password)
                if(passwordCorrect) {
                    res.status(200).json({
                        user: req.session.user,
                        message: 'User is logged in'
                    })
                } else {
                    res.status(400).json({message: 'Please enter correct email and password.'})
                }
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: 'Something went wrong.'})
    }
})

router.get('/loggedin', (req, res) => {
    console.log('loggedinRoute',req.session)
    if(req.session.user){
        res.status(200).json({
            user: req.session.user, 
            message: 'User logged in.'
        })
    } else {
        res.status(400).json({message: 'No user in session.'})
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({message: 'User logged out.'})
})

module.exports = router