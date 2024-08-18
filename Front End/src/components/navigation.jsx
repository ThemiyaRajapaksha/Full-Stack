import React from 'react';
import './css/NavigationBar.css'; 
import img from './images/logo.png';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const NavigationBar = () => {
  return (
    <nav className="navigation">
    <div className="logo">
      <img src={img} alt="Logo" className="logo-img" />
    </div>
    <ul className="nav-links">
      <li><Link to="/">HOME</Link></li>
      <li><Link to="/promotions">PROMOTIONS</Link></li>
      <li><Link to="/menu">MENU</Link></li>
      <li><Link to="/contact">CONTACTUS</Link></li>
      <li className="cart-link">
        <Link to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} /> {}
        </Link>
      </li>
    </ul>
    <div className="sign-in">
      <button onClick={() => {}}>
        <Link to="/login">Sign in</Link>
      </button>
    </div>
  </nav>
  
  );
};

export default NavigationBar;
