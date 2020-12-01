import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

export default class Home extends Component {

    render() {
        if(!this.props.isLoggedIn) {
            return (
            <div className="home">
                <h1>What's in my fridge?</h1>
            </div>
            )
        }
        return (
            <div className="home">
                    <h1>Welcome {this.props.user.username}</h1>
                    <Link to='/find-recipes'>Find a recipe</Link>
            </div>
        )
    }
}
