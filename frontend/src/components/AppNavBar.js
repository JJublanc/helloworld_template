import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './AppNavBar.css';
import './LoginForm.css';

function NavBar({handleLoginClick}) {
    const handleClick = () => {
        handleLoginClick();
    };
    const location = useLocation();
    const currentPage = location.pathname;
    return (
        <div>
            <div className="navbar">
                <ul>
                    <img src='picture.png'
                         alt='logo'
                         height='3%'
                         width='3%'
                    className="nav-logo"/>
                    <li><a className={currentPage === '/home' ? 'active' : ''}
                           href='/home'>Home</a></li>
                    <li><a className={currentPage === '/main' ? 'active' : ''}
                           href='/main'>Main</a></li>
                </ul>
            </div>
            <div>
                <span onClick={handleClick} className="loginicon">
                  LogIn
                </span>
            </div>
        </div>
    )
        ;
}

export default NavBar;