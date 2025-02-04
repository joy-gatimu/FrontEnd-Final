import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookedPropertyDisplay = () => {
  const [booking, setBooking] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);  // State for modal visibility
  const { bookingId } = useParams();

  useEffect(() => {
    console.log('Booking ID from URL:', bookingId);  // Verify if bookingId is correctly passed
  
    if (bookingId) {
      setLoading(true);
      // Fetch booking details
      axios
        .get(`/bookings/${bookingId}`)
        .then((response) => {
          console.log('Booking Data:', response.data);
          setBooking(response.data);
          // Fetch the associated property
          return axios.get(`/properties/${response.data.property_id}`);
        })
        .then((propertyResponse) => {
          console.log('Property Data:', propertyResponse.data);
          setProperty(propertyResponse.data);
        })
        .catch((error) => {
          console.error('Error fetching booking or property:', error);
        })
        .finally(() => setLoading(false)); // Set loading to false once the request is finished
    }
  }, [bookingId]);
  

  if (loading) {
    return <p>Loading booking details...</p>;
  }

  if (!booking || !property) {
    return <p>Unable to find booking or property details. Please try again later.</p>;
  }

  const closeModal = () => {
    setModalVisible(false);  // Close the modal
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Booking Details</h2>
      <button onClick={() => setModalVisible(true)} style={styles.button}>View Booked Property</button>

      {modalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={closeModal} style={styles.closeButton}>X</button>
            <h3 style={styles.propertyTitle}>{property.name}</h3>
            <img
              src={property.image_url || 'https://media.istockphoto.com/id/2175973039/photo/modern-luxury-house-with-spacious-driveway-and-garden.jpg?s=2048x2048&w=is&k=20&c=yiOsqq9xoe4nTYAedqAjMXAvDT27aeEjOtj1XW9Ahx4='}
              alt={property.name}
              style={styles.propertyImage}
            />
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Price per Night:</strong> ${property.price_per_night}</p>
            <p><strong>Check-in Date:</strong> {booking.check_in}</p>
            <p><strong>Check-out Date:</strong> {booking.check_out}</p>
            <p><strong>Total Price:</strong> ${booking.total_price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '1.8rem',
  },
  propertyTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  propertyImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '1.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

export default BookedPropertyDisplay;
