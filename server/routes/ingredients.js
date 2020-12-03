const express = require('express')
const router = express.Router()
const axios = require('axios')
const IngredientsContainer = require('../models/IngredientsContainer')
const Ingredient = require('../models/Ingredient')
const ObjectId = require('mongodb').ObjectID;


//when click on 'Find a recipe' --> create containerId (session id)
router.post('/create', (req, res)=> {
    // console.log('hello')
    IngredientsContainer.create({})
    .then(response =>{
        console.log(response)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
    })
})

// list of ingredients
router.post('/:id/ingredients', (req, res) => {
    const {name, quantity, measure} = req.body
    const {id} = req.params
    // console.log('hello')
    if (!name || !quantity|| !measure) {
        res.status(400).json({message: 'All fields are mandatory. Please provide ingredient, quantity and measure.'})
        return;
    }
    Ingredient.create({
        name,
        quantity,
        measure,
    })
    .then(response => {
         console.log('ingredients', response)
        IngredientsContainer.findByIdAndUpdate(
        { _id: ObjectId(req.params.id)},
        {$push: {ingredients: response}}
        )
        .then(res => {
            console.log({res})
        })
        res.status(200).json(response)
    })
    .catch(err => {
         console.log(err)
    })
})

router.post('/:id/all-ingredients', (req, res) => {
    // console.log('hello')
    const {id} = req.params
    IngredientsContainer.findById(id).populate({path: 'ingredients', model: 'Ingredient'}).exec()
        .then(response => {
            console.log('response',response)
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = router