import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../../services/authService'

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

    render() {
        if(this.props.isLoggedIn) {
            return (
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/profile'>My Profile</Link>
                    <Link to='/logout' onClick={this.logout}>Logout</Link>
                </nav>
            )
        }
        return (
            <nav>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link>
            </nav>
        )
    }
}