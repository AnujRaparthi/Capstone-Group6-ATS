import React, { useState } from "react";
import axios from "axios";

const AddDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form...");
      const response = await axios.post("http://capstone-group6-ats-backend.vercel.app/api/Department", {
        name: departmentName,
      });
      console.log("Department added:", response.data);
      // Reset form field
      setDepartmentName("");
      // Show success message
      setMessage("Department added successfully!");
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to add department:", error);
      console.log("Error response:", error.response.data);
      // Show error message
      setMessage("Failed to add department. Please try again.");
      // Clear message after 10 seconds
      setTimeout(() => setMessage(""), 10000);
    }
  };

  return (
    <div className="form-container">
      <h1 className="MJ">Create Department</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="departmentName">Department Name:</label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </div>
        <button type="submit" id='post'>Submit</button>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
