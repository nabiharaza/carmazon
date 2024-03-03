import React from 'react';
import './Header.css';
// import logo from '../../assets/images/cartoad.png';
function Header() {
    return (
        <nav className="navbar">
            <div className="logo">
                {/* <img src={logo} alt="Logo"/> */}
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

export default Header;