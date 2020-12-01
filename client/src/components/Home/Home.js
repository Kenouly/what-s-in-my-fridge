import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService';
import './Home.css';

export default class Home extends Component {

    service = new AuthService()

    createRequest = () => {
        this.service.createRequest()
        .then(response =>{
            console.log(response)
        })
        .catch(err => {
            console.error(err)
        })
    }

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
                    <Link to='/find-recipe' onClick={this.createRequest}>Find a recipe</Link>
            </div>
        )
    }
}
