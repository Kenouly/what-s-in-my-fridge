import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Profile extends Component {

    render() {
        console.log(this.props)
        const {_id, username, email, cookingLevel} = this.props.user
        return (
            <div>
                <div>
                    <h2>Your information</h2>
                    <p>Username: {username} </p>
                    <p>Email: {email}</p>
                    <p>Cooking Level: {cookingLevel}</p>
                    <Link to={`/${_id}/edit`}>Edit</Link>
                </div>
                <div>
                    <h2>Your fridge</h2>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
                <div>
                    <h2>Your recipes</h2>
                    <button>View</button>
                    <button>Delete</button>
                </div>

            </div>
        )
    }
}
