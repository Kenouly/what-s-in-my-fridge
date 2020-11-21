import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {

    render() {
        if(!this.props.isLoggedIn) {
            return (
            <div>
                <h2>What's in my fridge?</h2>
                <p>Description</p>
                <Link to='/signup'>Signup</Link>
                <Link to='/login'>Login</Link>
            </div>
            )
        }
        return (
            <div>
                    <p>Welcome {this.props.user.username}</p>
                    <p>Description</p>
                    <button>Start</button>
            </div>
        )
    }
}
