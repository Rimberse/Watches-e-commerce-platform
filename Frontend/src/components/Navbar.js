import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = ({ user }) => {

    return (
        <nav className='Navbar'>
            <div className='Navbar-logo'>LuxWatch</div>
            <div className='Navbar-user'>
                <img src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" alt="User" className='Navbar-user-image'></img>
                <h2 className='Navbar-user-name'>{ user }</h2>
            </div>
            <ul className='Navbar-links'>
                <li className='Navbar-link'>
                    <Link to="/">Home</Link>
                </li>
                <li className='Navbar-link'>
                    <Link to="/LoginUser">Login/Signup</Link>
                </li>
                <li className='Navbar-link'>
                    <Link to="/Logout">Logout</Link>
                </li>
                <li className='Navbar-link'>
                    <Link to="/Shop">Shop</Link>
                </li>
                <li className='Navbar-link'>
                    <Link to="/Transaction-history">Transaction History</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;