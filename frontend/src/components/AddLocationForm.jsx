import React, { useState } from "react";
import axios from "axios";

const AddLocationForm = () => {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const userInfo = localStorage.getItem('user');
  const user = userInfo ? JSON.parse(userInfo) : null;
  const companyID = user?.company_id;

  console.log('companyID=',companyID);

  const params = {};
  if (companyID) {
    params.company_id = companyID;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form...");
      const response = await axios.post("http://localhost:5001/api/Location", {
        location_name: locationName,
        address: address,
        company_id: companyID
      });
      console.log("Location added:", response.data);
      // Reset form fields
      setLocationName("");
      setAddress("");
      // Show success message
      setMessage("Location added successfully!");
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to add location:", error);
      console.log("Error response:", error.response.data);
      // Show error message
      setMessage("Failed to add location. Please try again.");
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="form-container">
      <h1 className="MJ">Add Location</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="locationName">Location Name:</label>
          <input
            type="text"
            id="locationName"
            name="locationName"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit" id="post">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLocationForm;
