import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AuthService from '../../services/authService'
import './NavBar.css'
import Logo from '../../logo.png'

export default class NavBar extends Component {

    state = {
        sidebar: false
    }

    service = new AuthService()

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

    showSideBar = () => {
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    render() {
        if(this.props.isLoggedIn) {
            return (
                <>
                    <div className="navbar">
                    <Link to="#" className="menu-bars" onClick={this.showSideBar}>
                        <div>
                            <div className="bars"></div>
                            <div className="bars"></div>
                            <div className="bars"></div>
                            <div className="bars"></div>
                        </div>
                    </Link>
                        <Link to="/" className="logo"><img src={Logo} alt="logo"></img></Link>
                    </div>
                    <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items'>
                            <li className='navbar-toggle'>
                            <Link to="#" className="menu-bars" onClick={this.showSideBar}>
                                <div className="close-btn">X</div>
                            </Link>
                            </li>
                            <li><Link to='/' className="nav-text">Home</Link></li> 
                            <li><Link to='/find-recipe/' className="nav-text">Find a recipe</Link></li>
                            <li><Link to='/my-recipes/' className="nav-text">My recipes</Link></li>
                            <li><Link to='/profile' className="nav-text">My Profile</Link></li>
                            {/* <li><Link to='/about' className="nav-text">About</Link></li> */}
                            {/* <li><a href='mailto: kenouly.lovan@gmail.com' className="nav-text">Contact</a></li> */}
                            <li><Link to='/logout' className="nav-text" onClick={this.logout}>Logout</Link></li>
                        </ul>
                    </nav>
                </>
            )
        }
        return (
            <>
                <div className="navbar">
                <Link to="#" className="menu-bars" onClick={this.showSideBar}>
                    <div>
                        <div className="bars"></div>
                        <div className="bars"></div>
                        <div className="bars"></div>
                        <div className="bars"></div>
                    </div>
                </Link>
                    <Link to="/" className="logo"><img src={Logo} alt="logo"></img></Link>
                </div>
                <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle'>
                        <Link to="#" className="menu-bars" onClick={this.showSideBar}>
                            <div className='close-btn'>X</div>
                        </Link>
                        </li>
                        <li><Link to='/' className="nav-text">Home</Link></li>
                        {/* <li><Link to='/about' className="nav-text">About</Link></li> */}
                        <li><Link to='/signup' className="nav-text">Signup</Link></li>
                       <li><Link to='/login' className="nav-text">Login</Link></li>
                       {/* <li><a href='mailto: kenouly.lovan@gmail.com' className="nav-text">Contact</a></li> */}
                    </ul>
                </nav>
            </>
            )
    }
}
   