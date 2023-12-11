import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import './Navbar.css'
const RESTRICTED_ROUTES_FOR_NAV = ["/login", "/signin", "/dashboard"];

const Navbar = () => {

    const { pathname } = useLocation(); 

    const token = localStorage.getItem("token");

    return RESTRICTED_ROUTES_FOR_NAV.includes(pathname) ? null : (
        <nav>
            <div className='logo_wp'>
                <NavLink className={({isActive}) => isActive ? "logo" : "logo"} to="/">EASY &copy;</NavLink>
            </div>
            <ul className='links'>
                <li>
                    <NavLink className={({isActive}) => isActive ? "nav__link nav__link--active" : "nav__link"} to="/login">Log In</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive}) => isActive ? "nav__link nav__link--active" : "nav__link"} to="/signin">Sign Up</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar