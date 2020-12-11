import React, {Component} from 'react';
import AuthService from '../../services/authService';
import './Ingredients.css'


export default class Ingredients extends Component {

    state = {
        container: this.props.container,
        ingredients: this.props.ingredients,
        suggestions: [],
        ingredientItem: {
            selectedIngredient: '',
            quantity: 0,
            measure: '',
        },
        ingredientsList: [],
        recipesList: [],
        recipe: this.props.recipe,
        recipeIsVisible: false,
        errorMessage: '',
        favRecipes: []
    }

    service = new AuthService()

    componentDidMount() {
        this.service.createRequest()
        .then((response) => {
             console.log(response)
            if(!!response._id){
                this.setState({
                container: response
            })
        }
    })
    .catch((err) => {
      console.log(err)
    })
  }

    changeHandler = e => {
        const {name, value} = e.target
        this.setState({
            ingredientItem: {
                ...this.state.ingredientItem,
                [name] : value
            }
        })
    }

    searchHandler = (e) => {
        let searchIngredient = e.target.value.toLowerCase()
        // console.log(searchIngredient)
        if (searchIngredient.length > 0) {
            const suggestions = this.state.ingredients.filter((ingredient) => {
                    return ingredient.name.toLowerCase().includes(searchIngredient)
                })
                console.log('suggestions', suggestions)
            this.setState({
                suggestions: suggestions.slice(0, 10),
                ingredientItem: {
                    ...this.state.ingredientItem,
                    selectedIngredient: searchIngredient
                }
            })
        } else {
            this.setState({
                suggestions: []
            })
        }
    }

    suggestionSelected = (value)  => {
        this.setState({
            ingredientItem: {
                ...this.state.ingredientItem,
                selectedIngredient: value.name
            },
            suggestions: []
        })
    }

// this.setState(prevState => ({
//   ingredientsItem: {
//     ...prevState.ingredientsItem 
//   }
// }));

    renderSuggestions = () => {
        if(this.state.suggestions.length === 0) {
            return null
        }
        return (
            <ul>
                {this.state.suggestions.map(item => {
                    return (
                        <li
                            onClick={() => this.suggestionSelected(item)}
                            key={item.name}
                            className="suggestions"
                        >
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        )
    }


    submitFormHandler = e => {
        e.preventDefault()
        this.service.addIngredients(this.state.container._id, this.state.ingredientItem.selectedIngredient, this.state.ingredientItem.quantity, this.state.ingredientItem.measure)
        .then(response => {
            this.setState({
                ingredientItem: {
                    selectedIngredient: '',
                    quantity: 0,
                    measure: '',
                }
            })
            this.service.populateIngredients(this.state.container._id, this.state.ingredientsList)
            .then(response => {
                console.log('ingredientsList', response)
                this.setState({
                    ingredientsList: [...response.ingredients]
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    deleteIngredient = (ingredientId) => {
        console.log('ingredient', ingredientId)
        this.service.deleteIngredient(ingredientId)
        .then(response => {
            console.log('newlist', response)
            this.setState({
                ingredientsList: response.ingredients
            })
        })
    }

    findRecipes = (containerId) => {
        console.log('containerId', containerId)
        this.service.findRecipes(containerId)
        .then(recipes => {
            console.log(recipes)
            this.setState({
                recipesList: recipes
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    getTheRecipe = (recipeId) => {
        this.service.getRecipeDetails(recipeId)
        .then(recipe => {
            console.log(recipe)
            this.setState({
                recipe: recipe,
                recipeIsVisible: !this.state.recipeIsVisible
            })
        })
    }

    addFavourites = (recipeId) => {
        this.setState({
            favRecipes: [...this.state.favRecipes, recipeId],
            recipeIsVisible: !this.state.recipeIsVisible
        })
    }

    render() {
        const {selectedIngredient, quantity, measure } = this.state.ingredientItem
        console.log(this.state.favRecipes)
        return (
            <div>
                <div className="row">
                    <div className="column">
                        <form className="ingredients-form" onSubmit={this.submitFormHandler}>
                            <label>Ingredient</label>
                            <br></br>
                            <input type="text" name="ingredient" onChange={this.searchHandler} value={selectedIngredient}/>
                            {this.renderSuggestions()}
                            <br></br>
                            <label>Quantity</label>
                            <br></br>
                            <input type="number" name="quantity" onChange={this.changeHandler} value={quantity}/>
                            <br></br>
                            <label>Measures</label>
                            <br></br>
                            <select onChange={this.changeHandler} name="measure" value={measure}>
                                <option >Select measure</option>
                                <option value='units'>units</option>
                                <option value='g'>g</option>
                                <option value='kg'>kg</option>
                                <option value='l'>l</option>
                            </select>
                            <br></br>
                            <button>Add</button>
                        </form>
                    </div>
                    <div className="column">
                        <h3>List of ingredients</h3>
                        {this.state.ingredientsList.map(item => {
                            return (
                                <li key={item._id}>
                                    {item.quantity} {item.measure} x {item.name} <span><button onClick={() => this.deleteIngredient(item._id)}>Remove</button></span>
                                </li>
                            )
                        })}
                        <button onClick={() => this.findRecipes(this.state.container._id)}>Find a recipe</button>
                    </div>
                {this.state.errorMessage}
                </div>
                <div>
                    <div className="recipes-list">
                    {this.state.recipesList.map(item => {
                        return (
                            <div key={item.id} className="one-recipe">
                                <h3>{item.title}</h3>
                                <img src={item.image} alt=""></img>
                                <div>Missing ingredients: 
                                    {item.missedIngredients.map(ingredient => {
                                        return (
                                            <li key={ingredient.id}>
                                                {ingredient.name}
                                            </li>
                                        )
                                    })}
                                </div>
                                <button onClick={() => this.getTheRecipe(item.id)}>View recipe</button>
                            </div>
                        )
                    })}
                    </div>
                    <div>
                    {this.state.recipeIsVisible ?
                        <div className="recipe-details">
                            <div className="close-popup">
                                <p onClick={() => this.getTheRecipe(this.state.recipe.id)}>X</p>
                            </div>
                            <div>
                                <h4>Preparation: {this.state.recipe.readyInMinutes} minutes</h4>
                                <h4>For {this.state.recipe.servings} person(s)</h4>
                                <p>{this.state.recipe.instructions}</p>
                                <button onClick={()=> window.open(this.state.recipe.sourceUrl, "_blank")}>Read more</button>
                            </div>
                            <button onClick={() => this.addFavourites(this.state.recipe.id)}>Add to favourites</button>
                        </div>
                    : " "}
                    </div>
                </div>
        </div>
        )
    }

}