import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import './Register.css'; // Optional: Add styling here

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(false);

    const { username, email, password } = formData;
    if (!username || !email || !password) {
      setError(true);
      setMessage('All fields are required!');
      return;
    }

    try {
       await API.post('/register', { username, email, password });
      setMessage('User registered successfully!');
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      setError(true);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && (
        <p className={error ? 'error-message' : 'success-message'}>{message}</p>
      )}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <button className="link-button" onClick={() => navigate('/')}>
          Back to Login
        </button>
      </p>
    </div>
  );
};

export default Register;
