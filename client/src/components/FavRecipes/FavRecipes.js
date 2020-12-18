import React, {Component} from 'react';
import IngredientsService from '../../services/ingredientsService';
import {Link} from 'react-router-dom';
import './FavRecipes.css';

export default class FavRecipes extends Component {

    state = {
        favRecipes: []
    }

    service = new IngredientsService()

    componentDidMount() {
        this.service.populateFavRecipes(this.props.user._id)
        .then(response => {
            console.log('favRecipes', response)
            this.setState({
                favRecipes: response
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    removeFavRecipe = (recipeId) => {
        this.service.removeFavRecipe(recipeId)
            .then(response=> {
                console.log('updatedFavRecipes', response)
                this.setState({
                    favRecipes: response
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.state)
        const { favRecipes } = this.state;

        return (
            <article className="favourite-recipes">
                <h1>Your favourite recipes</h1>
                    <section className="favourites-list">
                        {favRecipes.length <= 0 ? (
                            <div>
                                <p>You don't have favourite recipes yet.</p>
                                <button><Link to="/find-recipe">Find a recipe</Link></button>
                            </div>
                        ):(
                            favRecipes[0].recipes.map(recipeItem => {
                                if(recipeItem.length === 0) {
                                    return (
                                        <div>
                                            <p>You don't have favourite recipes yet.</p>
                                            <button><Link to="/find-recipe">Find a recipe</Link></button>
                                        </div>
                                    )
                                }
                                    return (
                                        <article className="one-favourite" key={recipeItem._id}>
                                            <img
                                                src={recipeItem.recipe.image}
                                                alt={recipeItem.recipe.title}
                                                title={recipeItem.recipe.title} 
                                            />
                                            <h4>{recipeItem.recipe.title}</h4>
                                            <button onClick={() => window.open(recipeItem.recipe.sourceUrl, "_blank")}>Read more</button>
                                            <button onClick={() => this.removeFavRecipe(recipeItem._id)}>Remove</button>
                                            <button><a style={{textDecoration: "none", color: "white"}} href={`mailto:?subject=Check out this awesome recipe!&body=${recipeItem.sourceUrl}`}>Share</a></button>
                                        </article>
                                    )
                                })
                            )
                        }
        
                        {/* {favRecipes.length <= 0 ? (
                            <div>
                                <p>You don't have favourite recipes yet.</p>
                                <button><Link to="/find-recipe">Find a recipe</Link></button>
                            </div>
                        ):(
                            favRecipes[0].recipes.map(recipeItem => (
                                <article className="one-favourite" key={recipeItem._id}>
                                    <img
                                        src={recipeItem.recipe.image}
                                        alt={recipeItem.recipe.title}
                                        title={recipeItem.recipe.title} 
                                    />
                                    <h4>{recipeItem.recipe.title}</h4>
                                    <button onClick={() => window.open(recipeItem.recipe.sourceUrl, "_blank")}>Read more</button>
                                    <button onClick={() => this.removeFavRecipe(recipeItem._id)}>Remove</button>
                                </article>
                            ))
                        )} */}
                    </section>
            </article>
        )
    }
}
