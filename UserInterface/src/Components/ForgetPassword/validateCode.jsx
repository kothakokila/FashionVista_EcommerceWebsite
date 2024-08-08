import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Login/auth.css';

const ValidateCode = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setMessage('Email not found. Please request the code again.');
    }
  }, []);

  const handleValidateCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/validate-confirmation-code', null, {
        params: { email, code }
      });

      if (typeof response.data === 'string') {
        setMessage(response.data);
        setIsValid(true);
      } else if (response.data.token) {
        setMessage('Confirmation code validated successfully.');
        setIsValid(true);
        localStorage.setItem('resetToken', response.data.token);
      } else {
        setMessage('Unexpected response format.');
      }

    } catch (error) {
      setMessage('Invalid confirmation code.');
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (isValid) {
      navigate('/reset-password');
    }
  }, [isValid, navigate]);

  return (
    <div className='forget-body'>
    <div className='req-container'>
      <h2>Validate Confirmation Code</h2>
      <p className='forget-p'> Enter confirmation code sent to your registered email submitted:</p>
      <form onSubmit={handleValidateCode}>
        <input
          type="text"
          placeholder="Confirmation Code*"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="req-button" type="submit">Submit</button>
        <p className='forget-p'>{message}</p>
        {/* {isValid && <a href="/user/reset-password">Reset Password</a>} */}
      </form>
    </div>
    </div>
  );
};

export default ValidateCode;
