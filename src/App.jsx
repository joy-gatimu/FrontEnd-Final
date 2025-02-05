import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './Components/welcome_page';
import PropertyForm from './Components/PropertyForm'; 
import SignUp from './Components/signup';
import SignIn from './Components/signin';
import BookingPage from './Components/BookingPage';

function App() {
  return (
    <Router>
      {/* Navigation Links */}
<nav
  style={{
    position: 'sticky',
    top: 0,
    padding: '15px 20px',
    background: '#333',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  }}
>
  <Link
    to="/"
    style={{
      margin: '0 15px',
      textDecoration: 'none',
      color: '#fff',
      fontSize: '18px',
      fontWeight: '500',
      transition: 'color 0.3s',
    }}
    onMouseEnter={(e) => (e.target.style.color = '#FF6347')}
    onMouseLeave={(e) => (e.target.style.color = '#fff')}
  >
    Home
  </Link>
  <Link
    to="/signup"
    style={{
      margin: '0 15px',
      textDecoration: 'none',
      color: '#fff',
      fontSize: '18px',
      fontWeight: '500',
      transition: 'color 0.3s',
    }}
    onMouseEnter={(e) => (e.target.style.color = '#FF6347')}
    onMouseLeave={(e) => (e.target.style.color = '#fff')}
  >
    Sign Up
  </Link>
  <Link
    to="/signin"
    style={{
      margin: '0 15px',
      textDecoration: 'none',
      color: '#fff',
      fontSize: '18px',
      fontWeight: '500',
      transition: 'color 0.3s',
    }}
    onMouseEnter={(e) => (e.target.style.color = '#FF6347')}
    onMouseLeave={(e) => (e.target.style.color = '#fff')}
  >
    Sign In
  </Link>
  <Link
    to="/property"
    style={{
      margin: '0 15px',
      textDecoration: 'none',
      color: '#fff',
      fontSize: '18px',
      fontWeight: '500',
      transition: 'color 0.3s',
    }}
    onMouseEnter={(e) => (e.target.style.color = '#FF6347')}
    onMouseLeave={(e) => (e.target.style.color = '#fff')}
  >
    Property
  </Link>
  
  
  <Link
    to="/BookingPage"
    style={{
      margin: '0 15px',
      textDecoration: 'none',
      color: '#fff',
      fontSize: '18px',
      fontWeight: '500',
      transition: 'color 0.3s',
    }}
    onMouseEnter={(e) => (e.target.style.color = '#FF6347')}
    onMouseLeave={(e) => (e.target.style.color = '#fff')}
  >
    Bookings
  </Link>
 
</nav>


      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<WelcomePage />} key="welcome" />
        <Route path="/signup" element={<SignUp />} key="signup" />
        <Route path="/signin" element={<SignIn />} key="signin" />
        <Route path="/property" element={<PropertyForm />} /> 
        <Route path="/BookingPage" element={<BookingPage/>} key="BookingPage" />
        
      </Routes>
    </Router>
  );
}

export default App;