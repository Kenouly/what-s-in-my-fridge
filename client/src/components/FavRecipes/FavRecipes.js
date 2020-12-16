import React, { Component } from 'react';
import {Link} from  'react-router-dom';
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

    // removeFavRecipe = (e) => {
    //     this.setState(prevState => ({
    //         favRecipes: prevState.favRecipes.filter(recipe => recipe !== e.target.value)
    //     }))
    // }

    render() {
        console.log(this.state.favRecipes)
        return (
            <div className="favourite-recipes">
                <h1>Your favourite recipes</h1>
                    <div className="favourites-list">
                        {this.state.favRecipes.map((recipe, index) => {
                            if(this.state.favRecipes.length === 0) {
                                return (
                                    <div>
                                        <p>You don't have favourite recipes yet. Please <span><button><Link to="/find-recipe">find a recipe</Link></button></span></p>
                                    </div>
                                )
                            }
                            return (
                                <div key={index}>
                                    {recipe.recipe.map((details , index) => {
                                        return (
                                            <div className="one-favourite" key={index}>
                                                <img src={details.image} alt={details.title}></img>
                                                <h4>{details.title}</h4>
                                                <button onClick={() => window.open(details.sourceUrl, "_blank")}>Read more</button>
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
