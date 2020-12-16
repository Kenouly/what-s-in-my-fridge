const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    recipe: [
        
    ]
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe