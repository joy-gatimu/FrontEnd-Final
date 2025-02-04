import { Link } from 'react-router-dom';
import backgroundImage from '../assets/welcome_page.webp'; // Correct the path if needed

const WelcomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '10px',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>WELCOME TO BUENOS NOCHES</h1>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}> Air-Bnb App!</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '40px' }}>An open market airbnb app.</p>

      <div>
        <Link to="/signup">
          <button
            style={{
              backgroundColor: '#007BFF',
              color: 'white',
              padding: '15px 30px',
              margin: '10px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        </Link>

        <Link to="/signin">
          <button
            style={{
              backgroundColor: '#28A745',
              color: 'white',
              padding: '15px 30px',
              margin: '10px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#1e7e34')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#28A745')}
            aria-label="Sign In"
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;