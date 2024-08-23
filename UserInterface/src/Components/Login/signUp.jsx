import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../slices/authSlice';
import './auth.css';
import logo from '../assets/fashionvista_logo.jpg'

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
    if (!validatePassword(password)) {
      return alert('Password must be at least 8 characters long and include one uppercase letter, one digit, and one special character (@, #, $)');
    }
    try {
      await dispatch(signupUser({ email, password, firstName, lastName, role: 'USER'})).unwrap();
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/user/login');
      }, 1500);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className='loginbody'>
    <div className="auth-container">
      <header>
      <img src={logo} alt="Fashion Vista Logo" className="logo-image" />
      <h1>FASHION VISTA</h1>
      </header>
      <div className="signup-box">
        <h2>Signup</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="First Name*"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name*"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address*"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password*"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password*"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="User Role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          /> */}
          <button className="lg-button" type="submit">Signup</button>
          <div className="extra-links">
            <a href="/user/login">Already have an account? Login</a>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
