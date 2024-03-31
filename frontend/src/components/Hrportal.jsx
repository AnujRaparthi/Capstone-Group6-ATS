import React, { useState } from "react";
import ManageJobs from "./ManageJobs";
import { Link } from "react-router-dom";

const Hrportal = () => {
  const [showManageJobs] = useState(false);

  /* const handleManageJobsClick = () => {
    setShowManageJobs(true);
  }; */

  return (
    <main>
      <div className="container">
        <div className="nav-buttons">
          <Link to="/ManageJobs" className="nav-button">
            Manage Jobs
          </Link>
          <button className="nav-button">View Job Applications</button>
          <Link to="/ViewApplicants" className="nav-button">
            View Applicants
          </Link>
          <Link to="/ManageLocations" className="nav-button">
            Manage Locations
          </Link>
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
