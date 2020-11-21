import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from '../../services/authService';

export default class EditProfile extends Component {

    state = {
        username: this.props.user.username,
        email: this.props.user.email,
        cookingLevel: this.props.user.cookingLevel,
        redirect: false
    }

    service = new AuthService()

    submitFormHandler = e => {
        e.preventDefault()
        this.service.edit(this.state.username, this.state.cookingLevel)
        .then(response => {
            console.log(response)
            this.setState({
                username: this.state.username,
                cookingLevel: this.state.cookingLevel,
                redirect: true
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    changeHandler = e => {
        const {name, value} = e.target
            this.setState({
                [name] : value
            })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/profile"></Redirect>
        }
        console.log(this.state)
        return (
            <div>
                <h1>Edit your information</h1>
                <form onSubmit={this.submitFormHandler}>
                    <label>Username</label>
                    <input type='text' name='username' value={this.state.username} onChange={this.changeHandler} /><br></br>
                    <label>Email</label>
                    <input type='text' name='email' value={this.state.email} onChange={this.changeHandler}/><br></br>
                    <label>Cooking Level</label>
                    <select onChange={this.changeHandler} name="cookingLevel" value={this.state.cookingLevel}>
                        <option>Select your cooking level</option>
                        <option value='Beginner'>Beginner</option>
                        <option value='Amateur Chef'>Amateur Chef</option>
                        <option value='UltraPro Chef'>UltraPro Chef</option>
                    </select><br></br>
                    <button>Edit</button>
                </form>
            </div>
            
        )
    }
}
