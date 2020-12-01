import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Logout extends Component {

    render() {
        return (
            <div style={{paddingTop: "50px"}}>
                <p>User is logged out.</p>
                <p>Please
                    <Link to='/login'>login</Link>
                </p>
            </div>
        )
    }
}
