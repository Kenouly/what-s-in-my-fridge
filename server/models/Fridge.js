const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fridgeSchema = new Schema({
    ingredients: String,
    typeofMeal: String,
})

const Fridge = mongoose.model('Fridge', fridgeSchema)

module.exports = Fridge