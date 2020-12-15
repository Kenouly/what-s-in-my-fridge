import React, {Component, Suspense, lazy} from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import ingredientsFromJson from './ingredients.json';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Logout from './components/Logout/Logout';
import FavRecipes from './components/FavRecipes/FavRecipes';
import AuthService from './services/authService';

const Ingredients = lazy(() => import('./components/Ingredients/Ingredients.js'))
export default class App extends Component {

  state = {
    loggedInUser: null,
    createdContainer: null,
    ingredients: ingredientsFromJson,
    recipe: null,
    favRecipes: [],
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

    return (
    <Suspense fallback={<div className="loading-page"><h1>The page is loading.</h1></div>}>
      <div className='App'>
        <NavBar isLoggedIn={!!this.state.loggedInUser} getTheUser={this.getTheUser}/>
        {/* !! shortcut to force as boolean */}
        <h1>env {process.env.REACT_APP_BACKENDURL}</h1>
        <Switch>
          <Route exact path='/' render={() => <Home isLoggedIn={!!this.state.loggedInUser} user={this.state.loggedInUser}/>} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' render={() => <Login getTheUser={this.getTheUser}/>}/>
          <Route path='/logout' component={Logout}/>
          {this.state.loggedInUser && 
          <Route path='/profile' render={() => <Profile user={this.state.loggedInUser}/>} />
          }
          {this.state.loggedInUser &&
          <Route path='/find-recipe' render={() => <Ingredients ingredients={this.state.ingredients} container={this.state.createdContainer} recipe={this.state.recipe} favRecipes={this.state.favRecipes}/>} />
          }
          {this.state.loggedInUser &&
          <Route path='/my-recipes' render={() => <FavRecipes favRecipes={this.state.favRecipes}/>} />
        }
        </Switch>
      </div>
  </Suspense>
    )
  }

}