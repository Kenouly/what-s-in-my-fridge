const express = require('express')
const router = express.Router()
const axios = require('axios')
const IngredientsContainer = require('../models/IngredientsContainer')
const Ingredients = require('../models/Ingredients')


//when start --> create requestId (session id)
router.post('/create', (req, res)=> {
    console.log('hello')
    IngredientsContainer.create({})
    .then(response =>{
        console.log('text', response)
        res.json(response)
    })
})

// list of ingredients
router.post('/:id/:ingredients', (req, res) => {
    const {name, quantity, measures} = req.body
    Ingredients.create(
    [ 
        {
        name,
        quantity,
        measures
        }
    ]
    )
})


module.exports = router