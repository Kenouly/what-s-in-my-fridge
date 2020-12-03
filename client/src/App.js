import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Logout from './components/Logout/Logout';
import AuthService from './services/authService';
import Ingredients from './components/Ingredients/Ingredients';

export default class App extends Component {

  state = {
    loggedInUser: null,
  }

service = new AuthService()

  componentDidMount() {
    this.service.loggedin()
    .then((response) => {
      console.log(response)
      if(!!response._id){
        this.setState({
          loggedInUser: response
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  getTheUser = user => {
    console.log(user)
    this.setState({
      loggedInUser: user
    })
  }

  render() {
    console.log(this.state)

    // if(this.state.ingredients && this.state.ingredients.length < 1){
    //   return <h1>loading</h1>
    // }

    return (
      <div className='App'>
        <NavBar isLoggedIn={!!this.state.loggedInUser} getTheUser={this.getTheUser}/>
        {/* !! shortcut to force as boolean */}
        <Switch>
          <Route exact path='/' render={() => <Home isLoggedIn={!!this.state.loggedInUser} user={this.state.loggedInUser}/>} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' render={() => <Login getTheUser={this.getTheUser}/>}/>
          <Route path='/logout' component={Logout}/>
          {this.state.loggedInUser && 
          <Route path='/profile' render={() => <Profile user={this.state.loggedInUser}/>} />
          }
          {this.state.loggedInUser &&
          <Route path='/find-recipe' component={Ingredients} />
          }
        </Switch>
      </div>
    )
  }

}