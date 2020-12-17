const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favRecipesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: "Recipe"
    }]
})

const FavRecipes = mongoose.model('FavRecipes', favRecipesSchema)

module.exports = FavRecipes