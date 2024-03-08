import React from "react";
import logo from "../images/logo_new.png";
import "../App.css";

const HrHeader = () => (
    <header className="bg-white shadow">
    <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <img className="h-16 w-auto" src={logo} alt="Career Hunt logo" />
      <div className="flex items-center">
        <nav className="hidden md:flex space-x-10">
          <a href="#" class="text-base font-medium text-black hover:text-gray-900">View Job Applications</a>
          <a href="#" class="text-base font-medium text-black hover:text-gray-900">View Applicants</a>
          <a href="#" class="text-base font-medium text-black hover:text-gray-900">Manage Jobs</a>
          <a href="#" class="text-base font-medium text-black hover:text-gray-900">Manage Locations</a>
          <a href="#" class="text-base font-medium text-black hover:text-gray-900">Manage Departments</a>
        </nav>
      </div>
    </div>
    <div className="HrBanner"></div>
  </header>
);

export default HrHeader;
