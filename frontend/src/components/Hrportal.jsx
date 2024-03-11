import React, { useState } from "react";
import ManageJobs from "./ManageJobs"; // Assuming your ManageJobs component is in a file named ManageJobs.jsx

const Hrportal = () => {
  const [showManageJobs, setShowManageJobs] = useState(false);

  const handleManageJobsClick = () => {
    setShowManageJobs(true);
  };

  return (
    <main>
      <div className="container">
        <div className="nav-buttons">
          <button className="nav-button" onClick={handleManageJobsClick}>
            Manage Jobs
          </button>
          <button className="nav-button">View Job Applications</button>
          <button className="nav-button">View Applicants</button>
          <button className="nav-button">Manage Locations</button>
          <button className="nav-button">Manage Departments</button>
        </div>

        {showManageJobs && <ManageJobs />}

        <div className="card">
          <h2>The Published Jobs</h2>
          <p>5</p>
        </div>
        <div className="card">
          <h2>Jobs Yet to be Published</h2>
          <p>3</p>
        </div>
        <div className="card">
          <h2>Total Applications</h2>
          <p>100</p>
        </div>
      </div>
    </main>
  );
};

export default Hrportal;
