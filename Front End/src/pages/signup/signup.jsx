import React, { useState } from 'react';
import './css/SignUpPage.css'; 
import burgerImage from './images/burger-background.png'; 
import NavigationBar from '../../components/navigation';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ message: '', success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus({ message: "Passwords don't match.", success: false });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status==200) {
        console.log("response")

        setStatus({ message: 'User registered successfully', success: true });
      } else {
        setStatus({ message: data.message || 'An error occurred during registration.', success: false });
      }
    } catch (error) {
      console.log(error)

      setStatus({ message: 'An error occurred during registration.', success: false });
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="sign-up-page">
        <div className="sign-up-content">
          <div className="sign-up-form">
            <h1>Let's get started</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <button type="submit" className="sign-up-button">Sign up</button>
            </form>
            {status.message && (
              <p className={`signup-message ${status.success ? 'success' : 'error'}`}>
                {status.message}
              </p>
            )}
            <div className="login-redirect">
              Already have an account? <Link to="/login" className="login-link">Log in</Link>
            </div>
          </div>
          <div className="sign-up-image">
            <img src={burgerImage} alt="Burger" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
