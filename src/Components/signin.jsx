import { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/second_page.webp'; // Correct the path if needed
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {

      setError('Please enter a valid email address.');
      return;
    }

    const userData = { email, password };

    try {
      const response = await axios.post('/users/login/', userData);

      if (response.status === 200) {
        //alert('Sign-in successful!');
        navigate('/property');
      }
    } catch (err) {
      console.error('Error during sign-in:', err);
      setError('Sign-in failed. Please check your credentials and try again.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Sign In</h2>

        <div style={{ marginBottom: '20px' }}>
          <input
            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ccc' }}
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ccc' }}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: 'white',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;