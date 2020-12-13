import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService';
import './Home.css';

export default class Home extends Component {

    service = new AuthService()

    render() {
        if(!this.props.isLoggedIn) {
            return (
            <div className="home">
                <h1>No idea what to make for lunch/dinner?</h1>
                <p>Check what is in your fridge and we can help you.</p>
                <button><Link to='/signup' className="button-text">Signup</Link></button>
                <button><Link to='/login' className="button-text">Login</Link></button>
            </div>
            )
        }
        return (
            <div className="home">
                    <h1>Welcome {this.props.user.username}</h1>
                    <h3>No idea what to make for lunch/dinner?</h3>
                    <button><Link to='/find-recipe/' className="button-text">Find a recipe</Link></button>
            </div>
        )
    }
}
