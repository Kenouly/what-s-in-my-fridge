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

    render() {
        if(this.props.isLoggedIn) {
            return (
                <div className="left">
                    <ul className="nav">
                        <li><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Home</Link></li>
                        <li><Link to='/find-recipes/' style={{ textDecoration: 'none', color: 'white' }}>Find a recipe</Link></li>
                        <li><Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>My Profile</Link></li>
                        <li><Link to='/about' style={{ textDecoration: 'none', color: 'white' }}>About</Link></li>
                        <li><Link to='/logout' style={{ textDecoration: 'none', color: 'white' }} onClick={this.logout}>Logout</Link></li>
                    </ul>
                </div>
            )
        }
        return (
            <div className="left">
                    <ul className="nav">
                        <li><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Home</Link></li>
                        <li><Link to='/about' style={{ textDecoration: 'none', color: 'white' }}>About</Link></li>
                        <li><Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>Signup</Link></li>
                        <li><Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login</Link></li>
                    </ul>
            </div>
        )
    }
}