import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo_new.png';
import { useUser } from './UserContext';

const Header = ({ onSearchSubmit, onSearchChange, searchTerm, onClearSearch, showSearchBar }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsDropdownOpen(false); // Close dropdown after navigation
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.user-menu')) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <img className="h-16 w-auto" src={logo} alt="Career Hunt logo" />
        </Link>
        <div className="flex items-center space-x-10">
          <Link to="/" className="text-base font-medium text-black hover:text-gray-900">All Jobs</Link>
          {user && (
            <>
              <Link to="/status" className="text-base font-medium text-black hover:text-gray-900">My Job Applications</Link>
              <div className="relative user-menu">
                <button onClick={toggleDropdown} className="flex items-center text-base font-medium text-black hover:text-gray-900">
                  {user.name}
                </button>
                {isDropdownOpen && (
                  <div className="absolute text-center right-0 mt-2 px-2 py-2 w-20 bg-white rounded-md shadow-xl z-20">
                    <Link to="/profile" onClick={() => handleNavigate('/profile')} >Profile</Link>
                    <button onClick={handleLogout} >Logout</button>
                  </div>
                )}
              </div>
            </>
          )}
          {!user && (
            <Link to="/login" className="text-base font-medium text-black hover:text-gray-900">Login</Link>
          )}
        </div>
      </div>

      {showSearchBar && (
        <div className="banner-search">
          <form onSubmit={onSearchSubmit} className="banner-search">
            <div className="search-bar">
              <input type="search" name="search" placeholder="Search jobs by keyword..." autoComplete="on" onChange={onSearchChange} value={searchTerm} />
              <button type="submit" className="search-button">Search</button>
              {searchTerm && (
                <button onClick={onClearSearch} className="clear-button">X</button>
              )}
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
