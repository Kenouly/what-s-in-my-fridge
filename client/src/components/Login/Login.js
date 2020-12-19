import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '../Button/Button';
import AuthService from '../../services/authService'
import './Login.css'

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        redirect: false
    }

    service = new AuthService()

    changeHandler = e => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    submitFormHandler = e => {
        e.preventDefault()
        this.service.login(this.state.email, this.state.password)
        .then(user => {
            // console.log(user, this.props)
            this.props.getTheUser(user)
            this.setState({
                redirect: true
            })
        })
        .catch(err => {
            // console.log(err)
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return (
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={this.submitFormHandler}>
                    <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler}></input>
                    <br></br>
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}></input>
                    <br></br>
                    <Button type="tertiary">Login</Button>
                </form>
                {this.state.errorMessage}
            </div>
        )
    }
}
