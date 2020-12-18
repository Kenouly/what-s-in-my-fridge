import React, { Component } from 'react'
import Button from '../Button/Button';
import './Logout.css'
export default class Logout extends Component {

    render() {
        return (
            <div className="logout">
                <p>You are logged out.</p>
                <p>Please
                    <Button type="secondary" to='/login'>login</Button>
                    to find more recipes.
                </p>
            </div>
        )
    }
}
