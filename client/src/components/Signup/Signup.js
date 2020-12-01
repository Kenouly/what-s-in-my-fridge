import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import AuthService from '../../services/authService'
import './Signup.css'

export default class Signup extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        cookingLevel: '',
        errorMessage: '',
        redirect: false
    }

    service = new AuthService()

    submitFormHandler = e => {
        e.preventDefault()
        this.service.signup(this.state.username, this.state.email, this.state.password, this.state.cookingLevel)
        .then(response => {
            console.log(response)
            this.setState({
                username: '',
                email: '',
                password: '',
                cookingLevel: '',
                redirect: true
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    changeHandler = e => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    render() {
        console.log(this.state)
        if(this.state.redirect) {
            return <Redirect to='/login'></Redirect>
        }
        return (
            <div className="signup-form">
                <h1>Sign-up</h1>
                <form onSubmit={this.submitFormHandler}>
                    <label>Username</label>
                    <input type='text' name='username' value={this.state.username} onChange={this.changeHandler} /><br></br>
                    <label>Email</label>
                    <input type='text' name='email' value={this.state.email} onChange={this.changeHandler}/><br></br>
                    <label>Password</label>
                    <input type='password' name='password' value={this.state.password} onChange={this.changeHandler}/><br></br>
                    <label>Cooking Level</label>
                    <select onChange={this.changeHandler} name="cookingLevel" value={this.state.cookingLevel}>
                        <option>Select your cooking level</option>
                        <option value='Beginner'>Beginner</option>
                        <option value='Amateur Chef'>Amateur Chef</option>
                        <option value='UltraPro Chef'>UltraPro Chef</option>
                    </select><br></br>
                    <button>Signup</button>
                    <p>Already have an account?
                        <Link to='/login'>Login</Link>
                    </p>
                </form>
                {this.state.errorMessage}
            </div>
        )
    }
}
