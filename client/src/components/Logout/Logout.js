import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Logout.css'
export default class Logout extends Component {

    render() {
        return (
            <div className="logout">
                <p>You are logged out.</p>
                <p>Please
                    <button><Link to='/login' style={{textDecoration: "none", color: "white"}}>login</Link> </button>
                    to find more recipes.
                </p>
            </div>
        )
    }
}
