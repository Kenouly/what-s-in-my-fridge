import React, { Component } from 'react'

export default class FavRecipes extends Component {

    state = {
        favRecipes : this.props.favRecipes
    }

    // componentDidMount(recipeId) {
    //     this.service.getRrecipeDetails(recipeId)
    //         .then((response) => {
    //              console.log(response)
    //         })
    //         .catch((err) => {
    //         console.log(err)
    //         })
    // }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Your Favourite Recipes</h1>
                {/* {this.state.favRecipes.map(recipe => {
                    return (
                        <div key={recipe.id}>
                            {recipe.title}
                            <button>Read more</button>
                        </div>
                    )
                })} */}
            </div>
        )
    }
}
