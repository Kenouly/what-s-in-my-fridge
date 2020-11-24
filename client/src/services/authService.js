import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000",
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

    edit = (userId, username, cookingLevel) => {
      console.log('hello')
      return this.service.post(`/auth/${userId}/edit`, {username, cookingLevel})
      .then((response) => response.data)
    }

}

export default AuthService