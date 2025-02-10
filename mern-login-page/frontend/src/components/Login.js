import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import './Login.css'; // Optional: Add styling here

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(false);

    if (!email || !password) {
      setError(true);
      setMessage('All fields are required!');
      return;
    }

    try {
      await API.post('/login', { email, password });
      setMessage('Login successful!');
      // Redirect or perform actions on successful login
    } catch (err) {
      setError(true);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && (
        <p className={error ? 'error-message' : 'success-message'}>{message}</p>
      )}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{' '}
        <button className="link-button" onClick={() => navigate('/register')}>
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
