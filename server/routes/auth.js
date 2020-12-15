const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const bcryptSalt = 10;
const ObjectId = require('mongodb').ObjectID;
const uploadCloud = require('../configs/cloudinary')

router.post('/signup', async (req, res) => {
    const {username, email, password, cookingLevel, favRecipes} = req.body
    
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

        const user = await User.create({username: username, email: email, password: hashPass, cookingLevel: cookingLevel, favRecipes: favRecipes})

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
                    req.session.user = user
                    res.status(200).json(req.session.user)
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
    console.log('user', req.session.user)
    if(req.session.user){
        res.status(200).json(req.session.user)
    } else {
        res.status(400).json({message: 'No user in session.'})
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({message: 'User logged out.'})
})


router.post('/:id/edit', (req, res)  => {
    const user = req.session.user
    const {cookingLevel} = req.body;
    User.findByIdAndUpdate(
        { _id: ObjectId(req.params.id)},
        {$set: { cookingLevel }},
        {new: true}
    )
        .then((user) => {
            console.log(user);
                req.session.user = user
                res.status(200).json({'updated user': user});
            })
        .catch(err => {
            console.log(err)
    })
});

router.post('/profile-picture', uploadCloud.single('picture'), (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'user not logged' })
  }

  const { username } = req.session.user

  User.findOneAndUpdate({ username: username }, { imageUrl: req.file.path }, {returnOriginal: false})

    .then((user) => {
        req.session.user.imageUrl = req.file.path
        console.log('image', user)
        console.log(req.file.path)
         res.status(200).json(user)
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong with uploading your profile picture.'})
    })
})

module.exports = router