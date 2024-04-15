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
    <div className="content">
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl font-bold mb-4">Manage Locations</h1>
      <div className="w-4/5">
        <table className="w-full text-left rounded-lg overflow-hidden bg-white">
          <thead className="primary-blue-bg text-white">
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
        <div className="centerlocation">
          <button className="addlocation mt-4">
            <Link to="/AddLocationForm">Add Location</Link>
          </button>
        </div>
      </div>
    </div>
  </div>
    
  );

};

export default ManageLocations;
