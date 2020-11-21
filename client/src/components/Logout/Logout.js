import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../../services/authService'

export default class Logout extends Component {

    // logout = () => {
    //     this.service.logout()
    //     .then(response => {
    //         console.log(response)
    //         this.props.getTheUser(null)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }
    service = new AuthService()

    // componentDidMount() {
    //     this.service.logout()
    // }

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
