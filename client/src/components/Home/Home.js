import React, { Component } from 'react';
import AuthService from '../../services/authService';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Button from '../Button/Button';
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

    homeText = () => {
        return (
            <div>
                <h1>No idea what to make for lunch/dinner ?</h1>
                <h3>Check what is in your fridge and let us help you.</h3>
            </div>
        )
    }

    render() {
        if(!this.props.isLoggedIn) {
            return (
            <div className="home">
                {this.homeText()}
                <div className="home-button">
                    <Button type="secondary" onClick={this.showSignupForm}>Signup</Button>
                    {this.state.signupFormIsShown && (
                        <div className="popup">
                            <Signup></Signup>
                            <Button type="primary" onClick={this.showSignupForm}>Close</Button>
                        </div>
                    )}
                    <Button type="secondary" onClick={this.showLoginForm}>Login</Button>
                    {this.state.loginFormIsShown && (
                        <div className="popup">
                            <Login getTheUser={this.props.getTheUser}/>
                            <Button type="primary" onClick={this.showLoginForm}>Close</Button>
                        </div>
                    )}
                </div>
            </div>
            )
        }
        return (
            <div className="home">
                    {this.homeText()}
                    <Button to='/find-recipe' type="secondary">Find a recipe</Button>
            </div>
        )
    }
}
