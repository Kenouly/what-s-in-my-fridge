import React, { Component } from 'react';
// import {Link} from  'react-router-dom';
import IngredientsService from '../../services/ingredientsService';
import './FavRecipes.css';

export default class FavRecipes extends Component {

    state = {
        favRecipes: this.props.user.favRecipes
    }

    service = new IngredientsService()

    componentDidMount() {
        this.service.populateFavRecipes(this.props.user._id)
        .then(updatedUser => {
            console.log({updatedUser})
            this.setState({
                favRecipes: updatedUser.favRecipes
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="favourite-recipes">
                <h1>Your favourite recipes</h1>
                    <div className="favourites-list">
                        {this.state.favRecipes.map((recipes, index) => {
                            return (
                                <div key={index}>
                                    {/* {recipes._id} */}
                                    {recipes.recipe.map((recipe , index) => {
                                        return (
                                            <div className="one-favourite" key={index}>
                                                <img src={recipe.image} alt={recipe.title}></img>
                                                <h4>{recipe.title}</h4>
                                                <button onClick={() => window.open(recipe.sourceUrl, "_blank")}>Read more</button>
                                                <button>Remove</button>
                                            </div>
                                        )
                                    } )}
                                </div>
                            )
                        })}
                    </div>
            </div>
        )
    }
}
