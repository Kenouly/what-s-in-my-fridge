const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient