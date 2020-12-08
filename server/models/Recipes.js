const mongoose = require('mongoose');
const Schema = mongoose.Schema

const recipesSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId
    },
    name: String
})

const Recipes = mongoose.model('Recipes', recipesSchema)

module.exports = Recipes