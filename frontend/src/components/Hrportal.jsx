import React from "react";
import { Link } from "react-router-dom";

const Hrportal = () => {
  return (
    <div className="content mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 p-4 text-center">HR Dashboard</h1>
      {/* <div className="flex justify-center space-x-4 my-4">
        <Link to="/ManageJobs" className="btn">
          Manage Jobs
        </Link>
        <Link to="/ViewJobApplications" className="btn">
          View Job Applications
        </Link>
        <Link to="/ViewApplicants" className="btn">
          Manage Users
        </Link>
        <Link to="/ManageLocations" className="btn">
          Manage Locations
        </Link>
        <Link to="/ManageDepartments" className="btn">
          Manage Departments
        </Link>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="card">
          <h2 className="text-lg font-bold">Total Jobs</h2>
          <p className="card-value">8</p>
        </div>
        <div className="card">
          <h2 className="text-lg font-bold">Total Applications</h2>
          <p className="card-value">100</p>
        </div>
        <div className="card">
          <h2 className="text-lg font-bold">Total Applicants</h2>
          <p className="card-value">50</p>
        </div>
      </div>

      <div className="pending-actions bg-gray-200 p-4 mt-6 rounded-lg">
        <h2 className="text-lg font-bold mb-3">Pending Actions</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Review new applications for Software Developer position</li>
          <li>Schedule interviews for shortlisted candidates</li>
          <li>Update job descriptions based on recent feedback</li>
        </ul>
      </div>
    </div>
  );
};

export default Hrportal;



// import React from "react";
// import { Link } from "react-router-dom";

// const Hrportal = () => {
//   return (

//       <div className="content mx-auto px-4">
//         <h1 className="text-xl font-semibold text-gray-700 p-4 text-center">HR Dashboard</h1>
//         <div className="flex justify-center space-x-4 my-4">
//           <Link to="/ManageJobs" className="btn">
//             Manage Jobs
//           </Link>
//           <Link to="/ViewJobApplications" className="btn">
//             View Job Applications
//           </Link>
//           <Link to="/ViewApplicants" className="btn">
//             Manage Users
//           </Link>
//           <Link to="/ManageLocations" className="btn">
//             Manage Locations
//           </Link>
//           <Link to="/ManageDepartments" className="btn">
//             Manage Departments
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
//           <div className="card">
//             <h2 className="card-title">Total Jobs</h2>
//             <p className="card-value">8</p>
//           </div>
//           <div className="card">
//             <h2 className="card-title">Total Applications</h2>
//             <p className="card-value">100</p>
//           </div>
//           <div className="card">
//             <h2 className="card-title">Total Applicants</h2>
//             <p className="card-value">50</p>
//           </div>
//         </div>
//       </div>

//   );
// };

// export default Hrportal;



// import React, { useState } from "react";
// import ManageJobs from "./ManageJobs";
// import { Link } from "react-router-dom";

// const Hrportal = () => {
//   const [showManageJobs] = useState(false);

//   /* const handleManageJobsClick = () => {
//     setShowManageJobs(true);
//   }; */

//   return (
//     <main>
//       <div className="container">
//         <div className="nav-buttons">
//           <Link to="/ManageJobs" className="nav-button">
//             Manage Jobs
//           </Link>
//           <button className="nav-button">View Job Applications</button>
//           <Link to="/ViewApplicants" className="nav-button">
//             View Applicants
//           </Link>
//           <Link to="/ManageLocations" className="nav-button">
//             Manage Locations
//           </Link>
//           <Link to="/ManageDepartments" className="nav-button">
//             Manage Departments
//           </Link>
//         </div>

//         {showManageJobs && <ManageJobs />}

//         <div className="card">
//           <h2>The Published Jobs</h2>
//           <p>5</p>
//         </div>
//         <div className="card">
//           <h2>Jobs Yet to be Published</h2>
//           <p>3</p>
//         </div>
//         <div className="card">
//           <h2>Total Applications</h2>
//           <p>100</p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Hrportal;
