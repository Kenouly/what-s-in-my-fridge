import axios from 'axios';

class IngredientsService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_BACKENDURL,
      withCredentials: true,
    });
    this.service = service;
  }

    createRequest = () => {
      return this.service.post('/ingredients/create')
      .then((response) => response.data)
    }

    addIngredients = (containerId, name, quantity, measure) => {
      return this.service.post(`/ingredients/${containerId}/ingredients`, {name, quantity, measure})
      .then(response => response.data)
    }

    populateIngredients = (containerId, ingredients) => {
      return this.service.post(`/ingredients/${containerId}/all-ingredients`, {ingredients})
      .then(response => response.data)
    }

    deleteIngredient = (ingredientId) => {
      return this.service.post(`/ingredients/${ingredientId}/delete-ingredient`)
      .then(response => response.data)
    }

    findRecipes = (containerId, recipes) => {
      return this.service.post(`/ingredients/${containerId}/recipes`, {recipes})
      .then(response => response.data)
    }

    getRecipeDetails = (recipeId, details) => {
      return this.service.post(`/ingredients/${recipeId}/recipe-details`, {details})
      .then((response) => response.data)
    }

    saveFavRecipes = (recipe, userId) => {
        return this.service.post('/ingredients/my-recipes', {recipe, userId})
        .then(response => response.data)
    }

    populateFavRecipes = (userId, recipes) => {
        return this.service.post(`/ingredients/${userId}/my-recipes`, {recipes})
        .then(response => response.data)
    }

    removeFavRecipe = (recipeId) => {
        console.log('hello')
        return this.service.post(`/ingredients/my-recipes/${recipeId}/remove`)
        .then(response => response.data)
    }
}

export default IngredientsService