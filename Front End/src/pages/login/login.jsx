import './css/LoginPage.css'; 
import burgerImage from './images/burger-background.png'; 
import NavigationBar from '../../components/navigation';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('userSession', email, { expires: 7 });

        console.log(email);
   
        navigate('/order'); 
      } else {
        console.log('Login failed:', data.message);
  
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <>
      <NavigationBar/>
      <div className="sign-up-page">
        <div className="sign-up-content">
          <div className="sign-up-image">
            <img src={burgerImage} alt="Burger" />
          </div>
          <div className="sign-up-form">
            <h1>Let's connect</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            
              <div className="form-group">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <button type="submit" className="sign-up-button">Login</button>
            
            </form>
            <div className="register-redirect">
              New member? <Link to="/signup" className="register-link">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default LoginPage;
