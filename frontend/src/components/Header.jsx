import React from 'react';
import logo from '../images/logo_new.png';
import '../App.css';

const Header = ({ onSearchSubmit, onSearchChange, searchTerm, onClearSearch }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <img className="h-16 w-auto" src={logo} alt="Career Hunt logo" />
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-10">
            <a href="#" class="text-base font-medium text-black hover:text-gray-900">All Jobs</a>
            <a href="#" class="text-base font-medium text-black hover:text-gray-900">My Job Applications</a>
          </nav>
        </div>
      </div>
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
    </header>
  );
};

export default Header;