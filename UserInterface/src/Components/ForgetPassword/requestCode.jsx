import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './requestCode.css';

const RequestCode = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/user/forget-password', { email });
      setMessage('Confirmation code sent to your email!');
      localStorage.setItem('resetEmail', email); 
      setTimeout(() => {
        setMessage('');
        navigate('/validatecode');
      }, 500);
    } catch (error) {
      setMessage('Error sending confirmation code.');
    }
  };

  return (
    <div className='forget-body'>
    <div className='req-container'>
      <h2>Forgot Password</h2>
      <p className='forget-p'>Enter your registered email to get the verification code:</p>
      <form onSubmit={handleRequestCode}>
        <input
          type="email"
          placeholder="Email Address*"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="req-button" type="submit">Request Code</button>
        <p className='forget-p'>{message}</p>
      </form>
    </div>
    </div>
  );
};

export default RequestCode;
