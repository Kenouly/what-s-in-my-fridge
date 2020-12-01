const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ingredientsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    measure: {
        type: String,
        required: true,
    },

})

const Ingredients = mongoose.model('Ingredients', ingredientsSchema)

module.exports = Ingredients