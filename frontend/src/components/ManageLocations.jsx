// ManageLocations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/Location");
          console.log("Response:", response);
            const data = response.data;
            console.log("Fetched locations:", data); // Log the fetched data
            setLocations(data);
        
        } catch (error) {
          console.error("Failed to fetch locations:", error);
        }
      };

    fetchLocations();
  }, []);

  return (
    <div>
      <h1 class="MJ">Manage Locations</h1>
      <table class="location-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location._id}>
              <td>{location.location_name}</td>
              <td>{location.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div calss="centerlocation">
      <button class="addlocation"><Link to="/AddLocationForm">Add Location</Link></button>
      </div>
    </div>
    
  );

};

export default ManageLocations;
