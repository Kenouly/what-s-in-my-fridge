import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {

    render() {
        if(this.props.isLoggedIn) {
            return (
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/profile'>My Profile</Link>
                    <Link to='/logout'>Logout</Link>
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