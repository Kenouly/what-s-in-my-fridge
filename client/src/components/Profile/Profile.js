import React, { Component } from 'react'
import AuthService from '../../services/authService';
import './Profile.css';
import Button from '../Button/Button';

export default class Profile extends Component {

    state = {
        username: this.props.user.username,
        email: this.props.user.email,
        cookingLevel: this.props.user.cookingLevel,
        isInEditMode: false,
        isInUploadMode: false
    }

    service = new AuthService()

    showEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

        showUploadMode = () => {
        this.setState({
            isInUploadMode: !this.state.isInUploadMode
        })
    }

    changeHandler = e => {
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    submitHandler = e => {
        e.preventDefault()
        this.service.edit(this.props.user._id, this.state.cookingLevel)
        .then((user) => {
            console.log(user)
            this.setState({
                cookingLevel: this.state.cookingLevel,
                isInEditMode: false
         })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('picture', e.target.files[0]);
    this.service.imageUpload(uploadData);
  }

    render() {
        console.log(this.state.cookingLevel)
        console.log(this.props.user.imageUrl)

        return (
            <div className="profile">
                <h1>Your information</h1>
                <div className="profile-details">
                    <div className="profile-picture">
                        <img
                                src={this.props.user.imageUrl}
                                alt=""
                                onClick={this.showUploadMode}
                        />
                        <Button type="secondary" onClick={this.showUploadMode}>Change picture</Button>
                    {this.state.isInUploadMode &&
                        <div className="form-popup">
                            <form>
                                <input
                                    type="file"
                                    name="profilePicture"
                                    onChange={(e) => this.handleFileUpload(e)}
                                />
                                <Button type="tertiary">Save</Button>
                            </form>
                        </div>
                    }
                    </div>
                    <div className="profile-info">
                        <h4>Username</h4>
                        <p>{this.state.username}</p>
                        <h4>Email</h4>
                        <p>{this.state.email}</p>
                        <h4>Cooking Level</h4>
                        <p>{this.state.cookingLevel}<span><Button type="secondary" onClick={this.showEditMode}>Edit</Button></span></p>
                        {this.state.isInEditMode &&
                            <div>
                                <select name="cookingLevel" defaultValue={this.state.cookingLevel} onChange={this.changeHandler}>
                                    <option value='Beginner'>Beginner</option>
                                    <option value='Amateur Chef'>Amateur Chef</option>
                                    <option value='UltraPro Chef'>UltraPro Chef</option>
                                </select>
                                <Button type="tertiary" onClick={this.showEditMode}>X</Button>
                                <Button type="tertiary" onClick={this.submitHandler}>OK</Button>
                            </div>
                        }
                        <h4>Your Favourite Recipes</h4>
                        <Button type="tertiary" to="/my-recipes">View</Button>
                        </div>
                        </div>
                </div>
            )
    }
}
