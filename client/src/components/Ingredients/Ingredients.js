import React, { Component } from 'react'
import ingredientsFromJson from '../../ingredients.json';
import {Link} from 'react-router-dom';


export default class Ingredients extends Component {

    state = {
        ingredients: ingredientsFromJson,
        suggestions: [],
        selectedIngredient: '',
        quantity: 0,
        ingredientsList: [],
        measures: ''
    }

    changeHandler = e => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }


    searchHandler = (e) => {
        let searchIngredient = e.target.value.toLowerCase()
        console.log(searchIngredient)
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

    addHandler = (item) => {
        console.log(item)
        this.setState({
            quantity: item.quantity,
            ingredientsList: [item.name, ...this.state.ingredientsList]
    })
  }

    render() {
        console.log(this.state)
        return (
            <div style={{paddingTop: '50px'}}>
                <form>
                    <label>Ingredient</label>
                    <input type="text" name="ingredient" onChange={this.searchHandler} value={this.state.selectedIngredient}/>
                    {this.renderSuggestions()}
                    <label>Quantity</label>
                    <input type="number" name="quantity" onChange={this.changeHandler} value={this.state.quantity}/>
                    <label>Measures</label>
                    <select onChange={this.changeHandler} name="measures" value={this.state.measures}>
                        <option >Select measures</option>
                        <option value='units'>units</option>
                        <option value='g'>g</option>
                        <option value='kg'>kg</option>
                    </select><br></br>
                    <button onClick={() => this.addHandler()}>Add</button>
                </form>
                <div>
                    <h2>What's in my fridge?</h2>
                    <li>{this.state.quantity} {this.state.measures} x {this.state.selectedIngredient} <span><button>Remove</button></span></li>
                </div>
                <div>
                    <h2>What do I want to cook?</h2>
                    <input type="radio" name="typeOfMeal" value="apetizer"/>
                    <label>Apetizer</label><br></br>
                    <input type="radio" name="typeOfMeal" value="starter"/>
                    <label>Starter</label><br></br>
                    <input type="radio" name="typeOfMeal" value="main dish"/>
                    <label>Main dish</label><br></br>
                    <input type="radio" name="typeOfMeal" value="dessert"/>
                    <label>Dessert</label><br></br>
                </div>
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