import React from "react";

const JobIcon = ({ icon, text }) => (
  <div className="flex items-center mr-2"> {/* Adjusted right margin */}
    <i className={`${icon} text-gray-400`}></i>
    <span className="ml-1">{text}</span> {/* Adjusted left margin */}
  </div>
);

export default JobIcon;
