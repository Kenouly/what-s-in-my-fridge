import React, {Component} from 'react';
import IngredientsService from '../../services/ingredientsService';
import './FavRecipes.css';
import Button from '../Button/Button';

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

    emptyFavText = () => {
        return (
            <div>
                <p>You don't have favourite recipes yet.</p>
                <Button to='/find-recipe' type="secondary">Find a recipe</Button>
            </div>
        )
    }

    render() {
        console.log(this.state)
        const { favRecipes } = this.state;

        return (
            <article className="favourite-recipes">
                <h1>Your favourite recipes</h1>
                    <section className="favourites-list">
                    
                        {/* {favRecipes.length <= 0 && this.emptyFavText()} */}

                        {favRecipes[0]?.recipes.length > 0 ? favRecipes[0].recipes.map(recipeItem => (
                            <article className="one-favourite" key={recipeItem._id}>
                                <img
                                    src={recipeItem.recipe.image}
                                    alt={recipeItem.recipe.title}
                                    title={recipeItem.recipe.title} 
                                />
                                <h4>{recipeItem.recipe.title}</h4>
                                <Button type="senary" onClick={() => window.open(recipeItem.recipe.sourceUrl, "_blank")}>Read more</Button>
                                <Button type="senary" onClick={() => this.removeFavRecipe(recipeItem._id)}>Remove</Button>
                                <Button type="senary"><a href={`mailto:?subject=Check out this awesome recipe!&body=${recipeItem.sourceUrl}`}>Share</a></Button>
                            </article>
                        )) : this.emptyFavText()}
                    </section>
            </article>
        )
    }
}
