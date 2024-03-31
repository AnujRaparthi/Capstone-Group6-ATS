import React, { useState } from 'react';
import axios from 'axios';

const AddLocationForm = () => {
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Submitting form...');
      const response = await axios.post('http://localhost:5001/api/Location', {
        location_name: locationName,
        address: address,
      });
      console.log('Location added:', response.data);
      // Reset form fields
      setLocationName('');
      setAddress('');
    } catch (error) {
      console.error('Failed to add location:', error);
      console.log('Error response:', error.response.data);
    }
  };

  return (
    <div className="form-group">
      <h1 className="MJ">Add Location</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="locationName">Location Name:</label>
        <input
          type="text"
          id="locationName"
          name="locationName"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit" id="post">Submit</button>
      </form>
    </div>
  );
};

export default AddLocationForm;
