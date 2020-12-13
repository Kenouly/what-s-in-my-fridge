import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Logout.css'
export default class Logout extends Component {

    render() {
        return (
            <div className="logout">
                <p>User is logged out.</p>
                <p>Please
                    <button><Link to='/login'  className="button-text">login</Link></button>
                </p>
            </div>
        )
    }
}
