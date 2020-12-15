import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_BACKENDURL,
      withCredentials: true,
    });
    this.service = service;
  }

    signup = (username, email, password, cookingLevel) => {
        return this.service.post('/auth/signup', {username, email, password, cookingLevel})
        .then((response) => response.data)
    }

    login = (email, password) => {
        return this.service.post('/auth/login', {email, password})
        .then((response) => response.data)
    }

    logout = () => {
        return this.service.get('/auth/logout')
        .then((response) => response.data)
    }

    loggedin = () => {
        return this.service.get('/auth/loggedin')
        .then((response) => response.data)
    }

    edit = (userId, cookingLevel) => {
      return this.service.post(`/auth/${userId}/edit`, {cookingLevel})
      .then((response) => response.data)
    }

    imageUpload = (image) => {
      return this.service.post('/auth/profile-picture', image)
      .then((response => response.data))
    } 

    createRequest = () => {
      return this.service.post('/ingredients/create')
      .then((response) => response.data)
    }

    addIngredients = (containerId, name, quantity, measure) => {
      return this.service.post(`/ingredients/${containerId}/ingredients`, {name, quantity, measure})
      .then((response => response.data))
    }

    populateIngredients = (containerId, ingredients) => {
      return this.service.post(`/ingredients/${containerId}/all-ingredients`, {ingredients})
      .then((response => response.data))
    }

    deleteIngredient = (ingredientId) => {
      return this.service.post(`/ingredients/${ingredientId}/delete-ingredient`)
      .then((response => response.data))
    }

    findRecipes = (containerId, recipes) => {
      return this.service.post(`/ingredients/${containerId}/recipes`, {recipes})
      .then((response => response.data))
    }

    getRecipeDetails = (recipeId, details) => {
      return this.service.post(`/ingredients/${recipeId}/recipe-details`, {details})
      .then((response => response.data))
    }
}

export default AuthService