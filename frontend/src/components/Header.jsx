import React,{ useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'; 
import logo from '../images/logo_new.png';
import '../App.css';
import { useUser } from './UserContext'; 


const Header = ({ onSearchSubmit, onSearchChange, searchTerm, onClearSearch, showSearchBar}) => {
  const { user, logout } = useUser(); 
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <img className="h-16 w-auto" src={logo} alt="Career Hunt logo" />
        </Link>
        <div className="flex items-center space-x-10">
        <Link to="#" className="text-base font-medium text-black hover:text-gray-900">All Jobs</Link>
        {user ? (
            <>
              <nav className="hidden md:flex space-x-10">
                <Link to="/status" className="text-base font-medium text-black hover:text-gray-900">My Job Applications</Link>
              </nav>
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center text-base font-medium text-black hover:text-gray-900">
                  {user.name} 
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <button onClick={handleLogout} className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="text-base font-medium text-black hover:text-gray-900">
              Login
            </Link>
          )}
        </div>
      </div>

      {showSearchBar && (
      <div className="banner-search">
        <form onSubmit={handleSubmit} className="banner-search">
          <div className="search-bar">
            <input type="search" name="search" placeholder="Search jobs by keyword..." autoComplete="on" onChange={onSearchChange} value={searchTerm} />
            <button type="submit" className="search-button">
              Search
            </button>
            {searchTerm && (
              <button onClick={onClearSearch} className="clear-button">
                X
              </button>
            )}
          </div>
        </form>
        
      </div>
      )}
    </header>
  );
};

export default Header;
