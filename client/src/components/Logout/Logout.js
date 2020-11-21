import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../../services/authService'

export default class Logout extends Component {

    render() {
        return (
            <div>
                <p>User is logged out.</p>
                <p>Please
                    <Link to='/login'>login</Link>
                </p>
            </div>
        )
    }
}
