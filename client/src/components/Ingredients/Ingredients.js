import React, {Component} from 'react';
import IngredientsService from '../../services/ingredientsService';
import './Ingredients.css'
import { FaHeart } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import Button from '../Button/Button';

export default class Ingredients extends Component {

    state = {
        container: this.props.container,
        ingredients: this.props.ingredients,
        suggestions: [],
        ingredientItem: {
            selectedIngredient: '',
            quantity: 0,
        },
        ingredientsList: [],
        recipesList: [],
        recipe: this.props.recipe,
        recipeIsVisible: false,
        errorMessage: '',
        favRecipes: []
    }

    service = new IngredientsService()

    componentDidMount() {
        this.service.createRequest()
        .then((response) => {
            //  console.log(response)
            if(!!response._id){
                this.setState({
                container: response
                })
            }
         })
        .catch((err) => {
            // console.log(err)
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
                // console.log('suggestions', suggestions)
            this.setState({
                suggestions: suggestions.slice(0, 5),
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

    // suggestionSelected = (value)  => {
    //     this.setState({
    //         ingredientItem: {
    //             ...this.state.ingredientItem,
    //             selectedIngredient: value.name
    //         },
    //         suggestions: []
    //     })
    // }

    suggestionSelected = (value) => {
        this.setState(prevState => ({
            ingredientItem : {
                ...prevState.ingredientItem,
                selectedIngredient: value.name
            },
             suggestions: []
        }));
    }

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
        this.service.addIngredients(this.state.container._id, this.state.ingredientItem.selectedIngredient, this.state.ingredientItem.quantity)
        .then(response => {
            // console.log(response)
            this.setState({
                ingredientItem: {
                    selectedIngredient: '',
                    quantity: 0,
                }
            })
            this.service.populateIngredients(this.state.container._id, this.state.ingredientsList)
            .then(response => {
                // console.log('ingredientsList', response)
                this.setState({
                    ingredientsList: [...response.ingredients]
                })
            })
            .catch(err => {
                // console.log(err)
            })
        })
        .catch(err => {
            // console.log(err)
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    deleteIngredient = (ingredientId) => {
        // console.log('ingredient', ingredientId)
        this.service.deleteIngredient(ingredientId)
        .then(response => {
            // console.log('newlist', response)
            this.setState({
                ingredientsList: response.ingredients
            })
        })
        .catch(err => {
            // console.log(err)
        })
    }

    findRecipes = (containerId) => {
        // console.log('containerId', containerId)
        this.service.findRecipes(containerId)
        .then(recipes => {
            // console.log(recipes)
            this.setState({
                recipesList: recipes
            })
        })
        .catch(err => {
            // console.log(err)
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    getTheRecipe = (recipeId) => {
        this.service.getRecipeDetails(recipeId)
        .then(recipe => {
            // console.log(recipe)
            this.setState({
                recipe: recipe,
                recipeIsVisible: !this.state.recipeIsVisible
            })
        })
    }

    addFavourites = (recipe) => {
        this.setState(prevState => ({
            favRecipes : [...prevState.favRecipes, recipe],
            recipeIsVisible: !this.state.recipeIsVisible
        }), () => 
        this.service.saveFavRecipes(recipe, this.props.user._id)
            .then(recipe => {
                // console.log(recipe)
            })
        )
    }

    render() {
        const {selectedIngredient, quantity} = this.state.ingredientItem
        // console.log(this.props.user)
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
                            <label>Quantity (units)</label>
                            <br></br>
                            <input type="number" name="quantity" onChange={this.changeHandler} value={quantity}/>
                            <br></br>
                            <Button type="secondary">Add</Button>
                        </form>
                    </div>
                    <div className="column">
                        <h3>List of ingredients</h3>
                        {this.state.ingredientsList.map((item) => {
                            return (
                                <li key={item._id}>
                                    {item.quantity} x {item.name} <span><Button type="octonary" onClick={() => this.deleteIngredient(item._id)}>Remove</Button></span>
                                </li>
                            )
                        })}
                        <Button type="quinary" onClick={() => this.findRecipes(this.state.container._id)}>Find a recipe</Button>
                    </div>
                {this.state.errorMessage}
                </div>
                <div>
                    <div className='recipes-list'>
                    {this.state.recipesList.map((item) => {
                        if(!item) {
                            return (
                                <div>

                                </div>
                            )
                        }
                        return (
                            <div key={item.id} className="one-recipe">
                                <div>
                                    <h3>{item.title}</h3>
                                </div>
                                <img src={item.image} alt="" />
                                <div>
                                    <h4>Missing ingredients:</h4>
                                    <div className="missing-ingredients">
                                        {item.usedIngredients.map((usedIngredient, index) => {
                                        if(usedIngredient.missingAmount === 0) {
                                            return ""
                                        } 
                                        return (
                                            <li key={index}>
                                                {usedIngredient.missingAmount} {usedIngredient.originalName}
                                            </li>
                                        )
                                    })}
                                    {item.missedIngredients.map((ingredient, index) => {
                                        return (
                                            <li key={index}>
                                                {ingredient.original}
                                            </li>
                                        )
                                    })}
                                    </div>
                                </div>
                                <Button type="tertiary" onClick={() => this.getTheRecipe(item.id)}>View recipe</Button>
                            </div>
                        )
                    })}
                    </div>
                    <div>
                    {this.state.recipeIsVisible &&
                        <div className="recipe-details">
                            <div className="close-popup">
                                <Button type="septanary" onClick={() => this.getTheRecipe(this.state.recipe.id)}>X</Button>
                            </div>
                            <div className="recipe-popup">
                                <div>
                                    <img src={this.state.recipe.image} alt={this.state.recipe.name} />
                                </div>
                                <div className="recipe-info">
                                    <h4>{this.state.recipe.title}</h4>
                                    <p>Preparation: {this.state.recipe.readyInMinutes} minutes<span> / For {this.state.recipe.servings} person(s)</span></p>
                                    <p>{this.state.recipe.instructions}</p>
                                </div>
                            </div>
                            <Button type="secondary" onClick={()=> window.open(this.state.recipe.sourceUrl, "_blank")}>Read more</Button>
                            <FaHeart className="icon" onClick={() => this.addFavourites(this.state.recipe)} />
                            <a href={`mailto:?subject=Check out this awesome recipe!&body=${this.state.recipe.sourceUrl}`}><IoMdMail className="icon" /></a>
                        </div>
                    }
                    </div>
                </div>
        </div>
        )
    }

}
