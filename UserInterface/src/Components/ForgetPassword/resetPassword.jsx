import React, { useState } from 'react';
import axios from 'axios';
import './requestCode.css';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate= useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setMessage({ text: 'Passwords do not match.', type: 'error' });
        return;
    }
    if (!validatePassword(password)) {
        return alert('Password must be at least 8 characters long and include one uppercase letter, one digit, and one special character (@, #, $)');
      }
    try {
      const token = localStorage.getItem('resetToken');
      await axios.post('http://localhost:8080/user/reset-password', {
        password: password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage({ text: 'Password has been reset successfully.', type: 'success' });
      setTimeout(() => {
        setMessage({ text: '', type: '' });
        navigate('/user/login');
      }, 1000);
    } catch (error) {
        setMessage({ text: 'Error resetting password.', type: 'error' });
    }
  };

  return (
    <div className='forget-body'>
      <div className='req-container'>
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Email Address*"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password*"
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
          <button className="req-button" type="submit">Reset Password</button>
          {message.text && (
            <p className={message.type === 'error' ? 'error-message' : 'success-message'}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
