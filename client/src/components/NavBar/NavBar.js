import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../../services/authService'
import './NavBar.css'

export default class NavBar extends Component {

    service = new AuthService()

    logout = () => {
        this.service.logout()
        .then(response =>{
            console.log(response)
            this.props.getTheUser(null)
        })
        .catch(err => {
            console.error(err)
        })
    }

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
        if(this.props.isLoggedIn) {
            return (
                <div className="navBar">
                    <ul className="nav">
                        <li><Link to='/' className="navLink">Home</Link></li>
                        <li><Link to='/find-recipe/' className="navLink" onClick={this.createRequest}>Find a recipe</Link></li>
                        <li><Link to='/my-recipes/' className="navLink">My recipes</Link></li>
                        <li><Link to='/profile' className="navLink">My Profile</Link></li>
                        <li><Link to='/about' className="navLink">About</Link></li>
                        <li><Link to='/logout' className="navLink" onClick={this.logout}>Logout</Link></li>
                    </ul>
                </div>
            )
        }
        return (
            <div className="navBar">
                    <ul className="nav">
                        <li><Link to='/' className="navLink">Home</Link></li>
                        <li><Link to='/about' className="navLink">About</Link></li>
                        <li><Link to='/signup' className="navLink">Signup</Link></li>
                        <li><Link to='/login' className="navLink">Login</Link></li>
                    </ul>
            </div>
        )
    }
}