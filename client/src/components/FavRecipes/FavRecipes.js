import React, { Component } from 'react';
import {Link} from  'react-router-dom';
import './FavRecipes.css';

export default class FavRecipes extends Component {

    state = {
        user: this.props.user
    }

    // removeFavRecipe = (e) => {
    //     this.setState(prevState => ({
    //         favRecipes: prevState.favRecipes.filter(recipe => recipe !== e.target.value)
    //     }))
    // }

    render() {
        console.log(this.state)
        return (
            <div className="favourite-recipes">
                <h1>Your favourite recipes</h1>
                {/* <div className="favourites-list">
                {this.state.favRecipes.map((recipe) => {
                    if(this.state.favRecipes.length === 0) {
                        return (
                            <div>
                                <p>You don't have favourite recipes yet. Please <span><button><Link to="/find-recipe">find a recipe</Link></button></span></p> 
                            </div>
                        )
                    }
                    return (
                        <div key={recipe.id}>
                            <img src={recipe.image} alt={recipe.title}></img>
                            <h2>{recipe.title}</h2>
                            <button onClick={() => window.open(recipe.sourceUrl, "_blank")}>Read more</button>
                            <button on Click={() => this.removeFavRecipes(recipe)}>Remove</button>
                        </div>
                    )
                })}
                </div> */}
            </div>
        )
    }
}
