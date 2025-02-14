import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../../services/authService';
import './NavBar.css';
import Logo from '../../logo.png';
import { IoMdMail } from 'react-icons/io';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaHeart} from 'react-icons/fa';
import Button from '../Button/Button';

export default class NavBar extends Component {

    state = {
        sidebar: false
    }

    service = new AuthService()

    logout = () => {
        this.service.logout()
        .then(response =>{
            // console.log(response)
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

    contactInfo = () => {
        return (
            <div className="contact">
                <a href='mailto: kenouly.lovan@gmail.com?subject=Information request'><IoMdMail className="contact-icon" /></a>
                <a href='tel:+33627324955'><FaWhatsapp className="contact-icon" /></a>
                <span onClick={()=> window.open('https://www.facebook.com/kenouly.lovan', "_blank")}><FaFacebook className="contact-icon" /></span>
                <span onClick={()=> window.open('https://www.instagram.com/kenouly/', "_blank")}><FaInstagram className="contact-icon" /></span>
                <span onClick={()=> window.open('https://nl.linkedin.com/in/kenouly-lo-van', "_blank")}><FaLinkedin className="contact-icon" /></span>
            </div>
        )
    }

    menuBars = () => {
        return (
            <div>
                <div className="bars"></div>
                <div className="bars"></div>
                <div className="bars"></div>
            </div>
        )
    }

    render() {
        if(this.props.isLoggedIn) {
            return (
                <>
                    <div className="navbar">
                    <Link to="#" className="menu-bars" onClick={this.showSideBar}>
                        {this.menuBars()}
                    </Link>
                        <Link to="/" className="logo"><img src={Logo} alt="logo" /></Link>
                        <div className="nav-profile">
                            <p>Welcome {this.props.user.username}</p>
                            <Link to="/my-recipes"><FaHeart className="fav-icon"/></Link>
                            <Link to="/profile"><img src={this.props.user.imageUrl} alt=""/></Link>
                        </div>
                    </div>
                    <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items'>
                            <li className='navbar-toggle'>
                            <Link to="#" className="menu-bars" onClick={this.showSideBar}>
                                <Button type="quaternary">X</Button>
                            </Link>
                            </li>
                            <li><Link to='/' className="nav-text">Home</Link></li> 
                            <li><Link to='/find-recipe/' className="nav-text">Find a recipe</Link></li>
                            <li><Link to='/my-recipes/' className="nav-text">My recipes</Link></li>
                            <li><Link to='/profile' className="nav-text">My Profile</Link></li>
                            <li><Link to='/logout' className="nav-text" onClick={this.logout}>Logout</Link></li>
                        </ul>
                        {this.contactInfo()}
                    </nav>
                </>
            )
        }
        return (
            <>
                <div className="navbar">
                <Link to="#" className="menu-bars" onClick={this.showSideBar}>
                    {this.menuBars()}
                </Link>
                    <Link to="/" className="logo"><img src={Logo} alt="logo"/></Link>
                </div>
                <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle'>
                        <Link to="#" className="menu-bars" onClick={this.showSideBar}>
                            <Button type="quaternary">X</Button>
                        </Link>
                        </li>
                        <li><Link to='/' className="nav-text">Home</Link></li>
                        <li><Link to='/signup' className="nav-text">Signup</Link></li>
                       <li><Link to='/login' className="nav-text">Login</Link></li>
                    </ul>
                    {this.contactInfo()}
                </nav>
            </>
            )
    }
}
   