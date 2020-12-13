import React, { Component } from 'react'

export default class FavRecipes extends Component {

    state = {
        favRecipes : this.props.favRecipes
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Recipes</h1>
            </div>
        )
    }
}
