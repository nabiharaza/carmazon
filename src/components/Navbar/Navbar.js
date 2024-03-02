import React from 'react';
import './Navbar.css';
import logo from '../../images/cartoad.png'; // Adjust the import path accordingly

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="/" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/about" className="nav-link">About</a>
                </li>
                <li className="nav-item">
                    <a href="/contact" className="nav-link">Contact</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;