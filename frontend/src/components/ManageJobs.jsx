import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://capstone-group6-ats-backend.vercel.app/api/jobs");
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error("Failed to fetch jobs:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="content">
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>
      <div className="w-4/5">
        <table className="w-full text-left rounded-lg overflow-hidden bg-white">
          <thead className="primary-blue-bg text-white">
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Positions</th>
              <th>State</th>
              <th>Target Hiring Date</th>
              <th>Compensation Type</th>
              <th>Range From</th>
              <th>Range To</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.job_title}</td>
                <td>{job.job_type}</td>
                <td>{job.no_of_positions}</td>
                <td>{job.state}</td>
                <td>{new Date(job.target_hiring_date).toLocaleDateString()}</td>
                <td>{job.compensation_type}</td>
                <td>{job.compensation_range_from}</td>
                <td>{job.compensation_range_to}</td>
                <td>{job.experience}</td>
                <td>
                    <div className="flex flex-col space-y-2">
                      <button
                        className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
                      >
                        View Job
                      </button>
                      <button
                    className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
                  >
                    Delete
                  </button>
                    </div>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="addlocation mt-4">
          <Link to="/ManageJobForm">Create Job</Link>
        </button>
      </div>
    </div>
    </div>
  );
};

export default ManageJobs;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const ManageJobs = () => {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch("http://capstone-group6-ats-backend.vercel.app/api/jobs");
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Fetched jobs:", data); // Log the fetched data
//           setJobs(data);
//         } else {
//           console.error("Failed to fetch jobs:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch jobs:", error);
//       }
//     };

//     console.log("Fetching jobs..."); // Log when fetching starts
//     fetchJobs();

//     return () => {
//       console.log("Cleanup"); // Log cleanup if needed
//     };
//   }, []);

//   return (
//     <div>
//       <h1 className="MJ">Manage Jobs</h1>
//       <table className="job-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Type</th>
//             <th>Positions</th>
//             <th>State</th>
//             <th>Target Hiring Date</th>
//             <th>Compensation Type</th>
//             <th>Compensation Range From</th>
//             <th>Compensation Range To</th>
//             <th>Experience</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map(job => (
//             <tr key={job._id}>
//               <td>{job.job_title}</td>
//               <td>{job.job_type}</td>
//               <td>{job.no_of_positions}</td>
//               <td>{job.state}</td>
//               <td>{job.target_hiring_date}</td>
//               <td>{job.compensation_type}</td>
//               <td>{job.compensation_range_from}</td>
//               <td>{job.compensation_range_to}</td>
//               <td>{job.experience}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button class="addlocation">
//         <Link to="/ManageJobForm">Create Job</Link>
//       </button>
//     </div>
//   );
// };

// export default ManageJobs;
