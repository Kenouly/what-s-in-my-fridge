import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService';


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
        errorMessage: '',
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

    //need to remove ingredient_id
    deleteIngredient = (ingredientId) => {
        console.log(ingredientId)
        this.service.deleteIngredient(ingredientId)
        .then(response => {
            console.log('delete', response)
            this.setState({
                ingredientsList: response.ingredients
            })
        })
    }

    render() {
        const {selectedIngredient, quantity, measure } = this.state.ingredientItem
        console.log(this.state)
        return (
            <div style={{paddingTop: '50px'}}>
                <form onSubmit={this.submitFormHandler}>
                    <label>Ingredient</label>
                    <input type="text" name="ingredient" onChange={this.searchHandler} value={selectedIngredient}/>
                    {this.renderSuggestions()}
                    <label>Quantity</label>
                    <input type="number" name="quantity" onChange={this.changeHandler} value={quantity}/>
                    <label>Measures</label>
                    <select onChange={this.changeHandler} name="measure" value={measure}>
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
                        // console.log(item)
                        return (
                            <li key={item._id}>
                                {item.quantity} {item.measure} x {item.name} <span><button onClick={() => this.deleteIngredient(item._id)}>Remove</button></span>
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