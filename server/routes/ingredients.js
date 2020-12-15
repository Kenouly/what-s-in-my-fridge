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

// id = containerId
router.post('/:id/ingredients', (req, res) => {
    const {name, quantity, measure} = req.body
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
        {$push: {ingredients: response}},
        {new: true}
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

// id = containerId
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

// id = ingredientId
router.post('/:id/delete-ingredient', (req, res) => {
    const { id } = req.params;
    Ingredient.findByIdAndRemove(id)
        .then((ingredient) => {
            console.log('deletedIngredient', ingredient)
            return IngredientsContainer.findOneAndUpdate(
                {ingredients : id},
                {$pull: {ingredients: id} }, 
                {new: true}
                )
             .then(response => {
                 console.log('response', response)
                IngredientsContainer.findById(response._id).populate({path: 'ingredients', model: 'Ingredient'}).exec()
                    .then(response => {
                        console.log('newresponse',response)
                        res.status(200).json(response)
                    })
                    .catch(err => {
                        console.log(err)
                    })
             })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
})

// id = containerId
router.post('/:id/recipes', (req, res) => {
    const {id} = req.params
    IngredientsContainer.findById(id).populate({path: 'ingredients', model: 'Ingredient'}).exec()
    .then(response => {
        const name = response.ingredients.map((ingredient) => ingredient.name)
        // console.log('ingredients', name)
        const quantity = response.ingredients.map((ingredient) => ingredient.quantity)
        // console.log('quantity', quantity)
        const recipesUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${name}&number=500&ranking=1&apiKey=${process.env.API_KEY}`
        return axios.get(recipesUrl)
            .then(responseFromApi=> {
                    const recipes = responseFromApi.data
                    console.log({recipes})

                    //filter recipes with missedIngredientCount < 5 to get enough results
                    const missedIngredientsFiltered = recipes.filter(recipe => recipe.missedIngredientCount < 5)

                    //filter recipes with originalName includes in name
                    const filteredRecipes = missedIngredientsFiltered.filter(recipe => {
	                    const hasOriginalName = recipe.usedIngredients.filter(usedIngredient => 
  	                        name.includes(usedIngredient.originalName)
                        )
                        // console.log({hasOriginalName})
                        return hasOriginalName.length > 0
                    })
                    // console.log({filteredRecipes})
                    
                    // loop through the filteredRecipes
                    const updatedFilteredRecipes = filteredRecipes.map(recipe => {
                        // find the usedIngredient and send its position
                        const usedIngredientIndex = recipe.usedIngredients.findIndex((usedIngredient, index) => 
                            usedIngredient.originalName === name[index]
                        );
                        // console.log({usedIngredientIndex})

                        // find the usedIngredient (returns an object)
                        const usedIngredientObject =  recipe.usedIngredients.find((usedIngredient, index) => 
                            usedIngredient.originalName === name[index]
                        );
                        // console.log({usedIngredientObject})

                        // loop into the quantity and return 0 if the missing amount is below zero, else return the correct math
                        let missingAmount 
                        for(let i = 0; i < quantity.length; i++) {
                            if(!usedIngredientObject) {
                            return 
                            } else if(usedIngredientObject.amount - quantity[i] <=0) {
                                missingAmount =  0
                                } else {
                                    missingAmount = usedIngredientObject.amount - quantity[i]
                                }
                        }
                        // console.log({missingAmount})

                        // locate the usedIngredients and update a specific index value with the new value and add "missingAmount"
                        recipe.usedIngredients[usedIngredientIndex] = {
                            ...recipe.usedIngredients[usedIngredientIndex],
                            missingAmount
                        }
                        return recipe
                    })
                    console.log({updatedFilteredRecipes})

                if(filteredRecipes.length == 0) {
                    res.status(400).json({message: 'Sorry we cannot find any recipe. Please add more ingredients.'})
                } else {
                    res.status(200).json(filteredRecipes)
                }
            })
            .catch(err => {
                console.log(err)
            })
        .catch(err => {
            console.log(err)
        })
    })
})

// id = recipeId
router.post('/:id/recipe-details', (req, res) => {
    const {id} = req.params
    const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${process.env.API_KEY}`
    axios.get(recipeUrl)
        .then(responseFromApi => {
            console.log(responseFromApi)
            res.status(200).json(responseFromApi.data)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router