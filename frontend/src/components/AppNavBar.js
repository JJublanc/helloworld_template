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
                         height='4%'
                         width='4%'
                         className="nav-logo"/>
                    <li><a className={currentPage === '/home' ? 'active' : ''}
                           href='/home'>Home</a></li>
                    <li><a className={currentPage === '/main' ? 'active' : ''}
                           href='/main'>Main</a></li>
                    <li><a className={currentPage === '/blog' ? 'active' : ''}
                           href='/blog'>Blog</a></li>
                </ul>
            </div>
            <div>
                <span onClick={handleClick} className="loginicon">
                  <img src="login.png"
                       height='80%'
                       width='80%'
                       alt="Log In"/>
                </span>
            </div>
        </div>
    )
        ;
}

export default NavBar;