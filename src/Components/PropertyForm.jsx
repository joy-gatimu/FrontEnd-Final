import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PropertyForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [error, setError] = useState(null);
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('/properties/');
                setProperties(response.data);
            } catch (err) {
                setError('Failed to load properties');
            }
        };
        fetchProperties();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const propertyData = {
            name,
            description,
            price_per_night: Number(price),
            owner_id: Number(ownerId),
        };

        try {
            const response = await axios.post('/properties/', propertyData);
            if (response.status === 201) {
                alert('Property added successfully!');
                setName('');
                setDescription('');
                setPrice('');
                setOwnerId('');
                setError(null);
                const newProperties = await axios.get('/properties/');
                setProperties(newProperties.data);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Property creation failed. Please try again.');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url("https://hospitable.com/wp-content/uploads/2022/01/Airbnb-pictures.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Property Form (Normal Position) */}
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '40px',
                    borderRadius: '10px',
                    maxWidth: '600px',
                    width: '100%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    marginBottom: '40px',
                    border: '1px solid #ddd',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>Add Property</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Property Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ ...inputStyle, height: '100px' }}
                    />
                    <input
                        type="number"
                        placeholder="Price per Night"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        placeholder="Owner ID"
                        value={ownerId}
                        onChange={(e) => setOwnerId(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <button type="submit" style={buttonStyle}>Submit</button>
                </form>
            </div>

            {/* Section to display existing properties */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    flexWrap: 'wrap',
                    width: '100%',
                    maxWidth: '1200px',
                    justifyContent: 'center',
                }}
            >
                <div style={{ flex: 1, width: '100%', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Arial, sans-serif' }}>Existing Properties</h2>
                    {properties.length > 0 ? (
                        <div>
                            {properties.map((property) => (
                                <div
                                    key={property.id}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '20px',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        marginBottom: '15px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    {/* Property Image */}
                                    <div style={{ flex: '1 1 40%', height: '200px', overflow: 'hidden' }}>
                                        <img
                                            src={property.image_url || "https://hospitable.com/wp-content/uploads/2022/01/Airbnb-photos-shoot-in-the-corner.jpg"}  // Use the image URL from the property data
                                            alt={property.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                            }}
                                        />
                                    </div>

                                    {/* Property Details */}
                                    <div style={{ flex: '1 1 60%' }}>
                                        <h3>{property.name}</h3>
                                        <p>{property.description}</p>
                                        <p><strong>Price per Night:</strong> ${property.price_per_night}</p>
                                        <p><strong>Owner ID:</strong> {property.owner_id}</p>
                                        <button onClick={() => navigate("/BookingPage")}>Book Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No properties available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
};

const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    marginTop: '15px',
};

export default PropertyForm;
