import React from 'react';
import {Link} from 'react-router-dom';
import './Button.style.css';

const Button = ({type='primary', to, onClick, children}) => {
    const classes = `btn btn-${type} ${to ? 'btn-link' : ' '}`
    const TagElement = to ? Link : 'button'
    return (
        <TagElement to={to} className={classes} onClick={onClick}>{children}</TagElement>
    )
};

export default Button