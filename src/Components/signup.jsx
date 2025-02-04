import { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/front page.webp'; // Adjust the path as needed
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

     const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };

        try {
            const response = await axios.post('/users/', userData,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // If using cookies/sessions
            });

            if (response.status === 201) {
              //  alert('User created successfully!');
              navigate('/property');
            }
        } catch (err) {
            // Improved error handling to catch network issues or lack of response
            const errorMessage = err.response?.data?.error || err.message || 'User creation failed. Please try again.';
            setError(errorMessage);
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
                className="w3-container w3-card-4 w3-light-grey w3-text-blue"
                style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '40px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    width: '100%',
                    maxWidth: '500px',
                }}
            >
                <h2 className="w3-center" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Sign Up</h2>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: '50px' }}>
                        <i className="w3-xxlarge fa fa-user"></i>
                    </div>
                    <div className="w3-rest">
                        <input
                            className="w3-input w3-border"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ padding: '15px', borderRadius: '10px' }}
                        />
                    </div>
                </div>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: '50px' }}>
                        <i className="w3-xxlarge fa fa-envelope-o"></i>
                    </div>
                    <div className="w3-rest">
                        <input
                            className="w3-input w3-border"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ padding: '15px', borderRadius: '10px' }}
                        />
                    </div>
                </div>

                <div className="w3-row w3-section">
                    <div className="w3-col" style={{ width: '50px' }}>
                        <i className="w3-xxlarge fa fa-lock"></i>
                    </div>
                    <div className="w3-rest">
                        <input
                            className="w3-input w3-border"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ padding: '15px', borderRadius: '10px' }}
                        />
                    </div>
                </div>

                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <button
                    type="submit"
                    className="w3-button w3-block w3-blue w3-padding-large"
                    style={{ borderRadius: '10px', fontWeight: 'bold' }}
                >
                    Sign Up
                </button>
                <Link to="/signin" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>Go to Sign In Page</Link>
            </form>
        </div>
    );
};

export default SignUp;
