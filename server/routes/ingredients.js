const express = require('express')
const router = express.Router()
const axios = require('axios')
const IngredientsContainer = require('../models/IngredientsContainer')
const Ingredient = require('../models/Ingredient')
const Recipes = require('../models/Recipes')
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
// how to get the quantitty (amount) and measure (unit): match quantity >= amount and measure = unit
// not enough results when missedIngredientCount = 0
router.post('/:id/recipes', (req, res) => {
    const {id} = req.params
    IngredientsContainer.findById(id).populate({path: 'ingredients', model: 'Ingredient'}).exec()
    .then(response => {
        const name = response.ingredients.map((ingredient) => ingredient.name)
        console.log('container', name)
        // res.status(200).json(name)
        const recipesUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${name}&number=30&apiKey=${process.env.API_KEY}`
        return axios.get(recipesUrl)
            .then(responseFromApi=> {
                    const recipes = responseFromApi.data
                    const filteredRecipes = recipes.filter((recipe) => recipe.missedIngredientCount < 3);
                    // 5fd26088b00220fe15652898
                    console.log('filtered', filteredRecipes)

                    // our example code:

                    // this was our condition
                    // const myingredients = [6, 'apples']; Apple || apple
                    // const ingredient = myingredients[1].toLowerCase();

                    // Loop through each recepie
                    // const filteredRecp = myrecp.map(myrcp => {
                    //   // we are finding the used ingredient (e.g. apple)
                    //   // sends us the position of the object (e.g 0)
                    //   const usedIngIndex = myrcp.usedIngredients.findIndex(ui => 
                    //       ui.name === myingredients[1]
                    //   );
                      
                    // Find the usedIngredient. find() returns an object (of the ingredient)
                    //   const usedIngObj =  myrcp.usedIngredients.find(ui => 
                    //       ui.name === myingredients[1]
                    //   );
                    
                    // If the missing amount is below zero, return 0 else return the correct math
                    //   const missingAmount = usedIngObj.amount - myingredients[0] <= 0 ? 
                        // 0 : 
                        // usedIngObj.amount - myingredients[0];
                      
                    // Locating the object recepie, and updating of a specific
                    // index the value with new values and added "missingAmount"
                    //   myrcp.usedIngredients[usedIngIndex] = {
                    //       ...myrcp.usedIngredients[usedIngIndex],
                    //     missingAmount
                    //   }
                        
                    //   return myrcp;
                    // });



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