import React, { useState } from 'react';
import logo from "../images/logo_new.png";
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';

const HrHeader = () => {
  const { user, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/Hrportal">
          <img className="h-16 w-auto" src={logo} alt="Career Hunt logo" />
        </Link>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-10">
            <a href="/ViewJobApplications" class="text-base font-medium text-black hover:text-gray-900">View Job Applications</a>

            <Link to="/ViewApplicants" class="text-base font-medium text-black hover:text-gray-900">View Users</Link>
            <Link to="/ManageJobs" class="text-base font-medium text-black hover:text-gray-900">Manage Jobs</Link>
            <Link to="/ManageLocations" class="text-base font-medium text-black hover:text-gray-900">Manage Locations</Link>
            <Link to="/ManageDepartments" class="text-base font-medium text-black hover:text-gray-900">Manage Departments</Link>

          </nav>

          {user && (
            <div className="relative user-menu">
              <button onClick={toggleDropdown} className="flex items-center text-base font-medium text-black hover:text-gray-900 ml-4">
                {user.name}
              </button>
              {isDropdownOpen && (
                <div className="absolute text-center right-0 mt-2 px-2 py-2 w-20 bg-white rounded-md shadow-xl z-20">
                  <Link to="/recprofile" onClick={() => handleNavigate('/recprofile')} >Profile</Link>
                  <button onClick={handleLogout} >Logout</button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </header>
  );
};

export default HrHeader;