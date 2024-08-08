import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../slices/authSlice';
import './auth.css';
import logo from '../assets/fashionvista_logo.jpg'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);


  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((user) => {
        console.log('Login successful, navigating to home:', user);
        navigate('/home', { state: user });
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
      })
      .catch((err) => {
        console.error('Login failed:', err);
        setFailedAttempts((prev) => prev + 1);
      });
  };

  useEffect(() => {
    if (failedAttempts > 3) {
      navigate('/forget-password');
    }
  }, [failedAttempts, navigate]);

  return (
    <div className='loginbody'>
    <div className="auth-container">
      <header>
        <img src={logo} alt="Fashion Vista Logo" className="logo-image" />
        <h1>FASHION VISTA</h1>
      </header>
      <div className="login-box">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
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
          <div>
          <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button className="lg-button" type="submit">Login</button>
          <div className="extra-links">
            <a href="/forget-password">Forgot Password?</a>
            <a href="/user/signup">No Account? Register</a>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
