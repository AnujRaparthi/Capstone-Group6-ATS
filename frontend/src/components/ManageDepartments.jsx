// ManageDepartments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/Department");
          console.log("Response:", response);
            const data = response.data;
            console.log("Fetched departments:", data); // Log the fetched data
            setDepartments(data);
        
        } catch (error) {
          console.error("Failed to fetch departments:", error);
        }
      };

    fetchDepartments();
  }, []);

  return (
    <div>
      <h1 class="MJ">Manage Departments</h1>
      <table class="department-table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department._id}>
              <td>{department.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="centerdepartment">
        <button class="adddepartment"><Link to="/AddDepartmentForm">Create Department</Link></button>
      </div>
    </div>
  );
};

export default ManageDepartments;
