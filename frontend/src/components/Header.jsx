import React from 'react';
import logo from '../images/logo_new.png';
import '../App.css';

const Header = () => (
  <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <img className="h-16 w-auto" src={logo}  alt="Career Hunt logo" />
      <div className="flex items-center">
                <nav className="hidden md:flex space-x-10">
                    <a href="#" class="text-base font-medium text-black hover:text-gray-900">All Jobs</a>
                    <a href="#" class="text-base font-medium text-black hover:text-gray-900">My Job Applications</a>
                </nav>
      </div>
    </div>
    <div className="banner-search">
      <div className="search-bar">
        <input type="search" name="search" placeholder="Search jobs by keyword..." autoComplete="off" />
      </div>
    </div>
  </header>
);

export default Header;