import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_BACKENDURL,
      withCredentials: true,
    });
    this.service = service;
  }

    signup = (username, email, password, cookingLevel) => {
        return this.service.post('/auth/signup', {username, email, password, cookingLevel})
        .then((response) => response.data)
    }

    login = (email, password) => {
        return this.service.post('/auth/login', {email, password})
        .then((response) => response.data)
    }

    logout = () => {
        return this.service.get('/auth/logout')
        .then((response) => response.data)
    }

    loggedin = () => {
        return this.service.get('/auth/loggedin')
        .then((response) => response.data)
    }

    edit = (userId, cookingLevel) => {
      return this.service.post(`/auth/${userId}/edit`, {cookingLevel})
      .then((response) => response.data)
    }

    imageUpload = (image) => {
      return this.service.post('/auth/profile-picture', image)
      .then(response => response.data)
    } 

}

export default AuthService