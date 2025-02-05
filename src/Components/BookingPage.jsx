import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null); // For storing booked property details
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/properties/')
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  const handlePropertyChange = (e) => {
    const propertyId = e.target.value;
    const property = properties.find((prop) => prop.id === parseInt(propertyId));
    setSelectedProperty(property);
    calculateTotalPrice(property, checkInDate, checkOutDate);
  };

  const handleDateChange = (e, dateType) => {
    const date = e.target.value;
    if (dateType === 'checkIn') setCheckInDate(date);
    if (dateType === 'checkOut') setCheckOutDate(date);
    if (selectedProperty) {
      calculateTotalPrice(selectedProperty, dateType === 'checkIn' ? date : checkInDate, dateType === 'checkOut' ? date : checkOutDate);
    }
  };

  const calculateTotalPrice = (property, checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const daysDifference = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
      if (daysDifference > 0) {
        setTotalPrice(daysDifference * property.price_per_night);
      } else {
        setTotalPrice(0);
        alert('Check-out date must be after the check-in date.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProperty || !checkInDate || !checkOutDate) {
      alert('Please fill in all the fields');
      return;
    }
  
    const newBooking = {
      user_id: user?.id || 1,
      property_id: selectedProperty.id,
      check_in: checkInDate,
      check_out: checkOutDate,
      total_price: totalPrice,
    };
    axios.post('/bookings/', newBooking)
      .then((response) => {
        console.log('Booking Response:', response.data);  
        alert('Booking successful!');
        setBookingDetails(response.data);  // Store the booking details
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
        alert('Failed to create booking.');
      });
  };
  
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Book a Property</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="property" style={styles.label}>Select Property:</label>
            <select
              id="property"
              name="property"
              onChange={handlePropertyChange}
              required
              style={styles.selectInput}
            >
              <option value="">-- Select a Property --</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name} - ${property.price_per_night} per night
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="checkIn" style={styles.label}>Check-in Date:</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={checkInDate}
              onChange={(e) => handleDateChange(e, 'checkIn')}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="checkOut" style={styles.label}>Check-out Date:</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={checkOutDate}
              onChange={(e) => handleDateChange(e, 'checkOut')}
              required
              style={styles.input}
            />
          </div>

          {selectedProperty && totalPrice > 0 && (
            <div style={styles.totalPriceContainer}>
              <h4>Total Price: ${totalPrice}</h4>
            </div>
          )}

          <button type="submit" style={styles.button}>
            Book Now
          </button>
        </form>
      </div>

      {/* Display Booked Property Below the Form */}
      {bookingDetails && (
        <div style={styles.bookingDetailsContainer}>
          <h2 style={styles.heading}>Booked Property Details</h2>
          <div>
            <h3>{bookingDetails.property_name}</h3>
            <p><strong>Check-in Date:</strong> {bookingDetails.check_in}</p>
            <p><strong>Check-out Date:</strong> {bookingDetails.check_out}</p>
            <p><strong>Total Price:</strong> ${bookingDetails.total_price}</p>
            <p><strong>Property Name:</strong> {bookingDetails.property_name}</p>
            <img
              src={bookingDetails.property_image || 'https://via.placeholder.com/150'}
              alt={bookingDetails.property_name}
              style={styles.propertyImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(https://saterdesign.com/cdn/shop/articles/bicYNooDCfCQAbvnQ8Xf0FjmW5nfKtOX1669132421_1000x.jpg?v=1669242585)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    padding: '30px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adds background color to ensure readability
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '100px', // Centers the form vertically in the page
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '8px',
    display: 'block',
  },
  selectInput: {
    padding: '10px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  },
  totalPriceContainer: {
    marginTop: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007bff',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  bookingDetailsContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  propertyImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
    marginTop: '20px',
  },
};

export default BookingPage;
