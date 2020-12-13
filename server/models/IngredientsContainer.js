const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientsContainerSchema = new Schema({
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: "Ingredient"
    }]
})

const IngredientsContainer = mongoose.model('IngredientsContainer', ingredientsContainerSchema)

module.exports = IngredientsContainer

