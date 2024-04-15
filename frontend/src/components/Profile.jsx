import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { FaEdit } from 'react-icons/fa'; 

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const inputRefs = useRef({});


  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    gender: user?.gender || '',
    password: '********' 
  });
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    address: false,
    gender: false
  });

  if (!user) {
    navigate('/login');
  }

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setTimeout(() => {
      inputRefs.current[field]?.focus();
    }, 100);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Using token:', token);  // Check what token is being used

    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };
    try {
        const { data } = await axios.put('http://capstone-group6-ats-backend.vercel.app/api/users/update', formData, config);
        setUser(data); // Update user context with new user data
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Failed to update profile:', error.response);
        alert('Failed to update profile: ' + error.message);
    }
};



  return (
    <div className="profile-form-container bg-white shadow w-full max-w-sm p-6 rounded-md">
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Personal Information</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => {
          if (key === 'password') return null; // Do not create editable fields for password
          return (
            <div className="form-group" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <div className="input-group">
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  name={key}
                  ref={el => inputRefs.current[key] = el}
                  value={formData[key]}
                  onChange={handleChange}
                  disabled={!editMode[key]}
                />
                {key !== 'password' && (
                  <button type="button" onClick={() => handleEdit(key)} className="edit-icon">
                    <FaEdit />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="text"
            value={formData.password}
            disabled={true}
          />
        </div>
        <button type="submit" className=" btn-primary flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
