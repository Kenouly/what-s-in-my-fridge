import React, { Component } from 'react'
import AuthService from '../../services/authService';
import './Profile.css';

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
        console.log(this.props.user.cookingLevel)
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
                        <p><button onClick={this.showUploadMode}>Change picture</button></p>
                    {this.state.isInUploadMode &&
                        <div className="form-popup">
                            <form>
                                <input
                                    type="file"
                                    name="profilePicture"
                                    onChange={(e) => this.handleFileUpload(e)}
                                />
                                <button>Save</button>
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
                        <p>{this.state.cookingLevel}<span><button onClick={this.showEditMode}>Edit</button></span></p>
                        {this.state.isInEditMode &&
                            <div>
                                <select name="cookingLevel" defaultValue={this.state.cookingLevel} onChange={this.changeHandler}>
                                    <option value='Beginner'>Beginner</option>
                                    <option value='Amateur Chef'>Amateur Chef</option>
                                    <option value='UltraPro Chef'>UltraPro Chef</option>
                                </select>
                                <button onClick={this.showEditMode}>X</button>
                                <button onClick={this.submitHandler}>OK</button>
                            </div>
                        }
                        </div>
                        </div>
                </div>
            )
    }
}
