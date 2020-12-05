import React, { Component } from 'react'
import {Link} from 'react-router-dom';


export default class Ingredients extends Component {

    state = {
        ingredients: this.props.ingredients,
        suggestions: [],
        selectedIngredient: '',
        quantity: 0,
        measure: ' ',
        ingredientsList: [],
        errorMessage: '',
    }

    changeHandler = e => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    searchHandler = (e) => {
        let searchIngredient = e.target.value.toLowerCase()
        // console.log(searchIngredient)
        if (searchIngredient.length > 0) {
            const suggestions = this.state.ingredients.filter((ingredient) => {
                    return ingredient.name.toLowerCase().includes(searchIngredient)
                })
            this.setState({
                suggestions: suggestions.slice(0, 10),
                selectedIngredient: searchIngredient
            })
        } else {
            this.setState({
                suggestions: []
            })
        }
    }

    suggestionSelected = (value)  => {
        this.setState({
            selectedIngredient: value.name,
            suggestions: []
        })
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
                            key={item.name}>
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        )
    }

    submitFormHandler = e => {
        e.preventDefault()
        this.service.addIngredients(this.props.container._id, this.state.selectedIngredient, this.state.quantity, this.state.measure)
        .then(response => {
            console.log('response', response)
            this.setState({
                selectedIngredient: '',
                quantity: '',
                measure: '',
            })
            this.service.populateIngredients(this.props.container._id, this.state.ingredientsList)
            .then(response => {
                console.log(response)
                this.setState({
                    ingredientsList: [response, ...this.state.ingredientsList]
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

    render() {
        console.log(this.state)
        return (
            <div style={{paddingTop: '50px'}}>
                <form onSubmit={this.submitFormHandler}>
                    <label>Ingredient</label>
                    <input type="text" name="ingredient" onChange={this.searchHandler} value={this.state.selectedIngredient}/>
                    {this.renderSuggestions()}
                    <label>Quantity</label>
                    <input type="number" name="quantity" onChange={this.changeHandler} value={this.state.quantity}/>
                    <label>Measures</label>
                    <select onChange={this.changeHandler} name="measure" value={this.state.measure}>
                        <option >Select measure</option>
                        <option value='units'>units</option>
                        <option value='g'>g</option>
                        <option value='kg'>kg</option>
                        <option value='l'>l</option>
                    </select><br></br>
                    <button>Add</button>
                </form>
                {this.state.errorMessage}
                <div>
                    <h2>What's in my fridge?</h2>
                    {this.state.ingredientsList.map(item => {
                        return (
                            <li key={item.name}>
                                {item.quantity} {item.measure} x {item.name} <span><button>Remove</button></span>
                            </li>
                        )
                    })}
                </div>
                {/* <div>
                    <h2>What do I want to cook?</h2>
                    <input type="radio" name="typeOfMeal" value="apetizer"/>
                    <label>Apetizer</label><br></br>
                    <input type="radio" name="typeOfMeal" value="starter"/>
                    <label>Starter</label><br></br>
                    <input type="radio" name="typeOfMeal" value="main dish"/>
                    <label>Main dish</label><br></br>
                    <input type="radio" name="typeOfMeal" value="dessert"/>
                    <label>Dessert</label><br></br>
                </div> */}
                <Link to="/recipes">Find a recipe</Link>
            </div>
        )
    }

}

    // "dishTypes": [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    // ],