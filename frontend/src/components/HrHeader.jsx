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
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <img className="h-16 w-auto" src={logo} alt="Career Hunt logo" />
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-10">
            <a href="/ViewJobApplications" class="text-base font-medium text-black hover:text-gray-900">View Job Applications</a>
            
            <Link to="/ViewApplicants" class="text-base font-medium text-black hover:text-gray-900">View Applicants</Link>
            <Link to="/ManageJobs" class="text-base font-medium text-black hover:text-gray-900">Manage Jobs</Link>
            <Link to="/ManageLocations" class="text-base font-medium text-black hover:text-gray-900">Manage Locations</Link>
            <a href="#" class="text-base font-medium text-black hover:text-gray-900">Manage Departments</a>

          </nav>

          {user && (
            <div className="relative flex items-center ml-4 ">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className=" text-base font-medium text-black hover:text-gray-900">
                {user.name}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-1 w-48 bg-white rounded-md shadow-xl z-20">
                  <button onClick={handleLogout} className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Logout</button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      <div className="HrBanner"></div>
    </header>
  );
};

export default HrHeader;