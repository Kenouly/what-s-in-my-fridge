import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Icon from '../../logo-icon.png';
import './Home.css';

export default class Home extends Component {

    state = {
        signupFormIsShown: false,
        loginFormIsShown: false,

    }

    service = new AuthService()

    showSignupForm = () => {
        this.setState({
            signupFormIsShown: !this.state.signupFormIsShown
        })
    }

    showLoginForm = () => {
        this.setState({
            loginFormIsShown: !this.state.loginFormIsShown
        })
    }

    render() {
        if(!this.props.isLoggedIn) {
            return (
            <div className="home">
                <div>
                    <h1>No idea what to make for lunch/dinner?</h1>
                    <h3>Check what is in your fridge and let us help you.</h3>
                </div>
                <div className="home-button">
                    <button onClick={this.showSignupForm}>Signup</button>
                    {this.state.signupFormIsShown && (
                        <div className="popup">
                            <Signup></Signup>
                            <p onClick={this.showSignupForm}>Close</p>
                        </div>
                    )}
                    <button onClick={this.showLoginForm}>Login</button>
                    {this.state.loginFormIsShown && (
                        <div className="popup">
                            <Login></Login>
                            <p onClick={this.showLoginForm}>Close</p>
                        </div>
                    )}
                </div>
            </div>
            )
        }
        return (
            <div className="home">
                    <div className="home-title">
                    <h1>No idea what to make for lunch/dinner?</h1>
                    <h3>Check what is in your fridge and let us help you.</h3>
                    </div>
                    <button><Link to='/find-recipe/' className="button-text">Find a recipe</Link></button>
            </div>
        )
    }
}
