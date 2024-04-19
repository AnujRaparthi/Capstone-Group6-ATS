import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Pagination from './Pagination';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const userInfo = localStorage.getItem('user');
    const user = userInfo ? JSON.parse(userInfo) : null;
    const companyID = user?.company_id;

    const params = {};
    if (companyID) {
      params.company_id = companyID;
    }

    try {
      const response = await axios.get("http://localhost:5001/api/jobs", { params });
      if (response.status === 200) {
        setJobs(response.data);
      } else {
        console.error("Failed to fetch jobs:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const handleViewJob = (jobId) => {
    navigate(`/update-job/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/delete-job/${jobId}`);
        if (response.status === 200) {
          const updatedJobs = jobs.filter(job => job._id !== jobId);
          setJobs(updatedJobs);
          alert("Job deleted successfully!");
        }
      } catch (error) {
        console.error("Failed to delete the job:", error);
        alert("Failed to delete the job.");
      }
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>
        <div className="w-4/5">
          <div className="flex justify-end">
            <Link to="/ManageJobForm">
              <button className="addlocation bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
                Post New Job
              </button>
            </Link>
          </div>
          <table className="w-full text-left rounded-lg overflow-hidden bg-white">
            <thead className="primary-blue-bg text-white">
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Department</th>
                <th>Experience</th>
                <th>No. of Positions</th>
                <th>Publish State</th>
                <th>Target Hiring Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map(job => (
                <tr key={job._id}>
                  <td>{job.job_title}</td>
                  <td>{job.job_type}</td>
                  <td>{job.location_id.location_name}</td>
                  <td>{job.department_id.name}</td>
                  <td>{job.experience}</td>
                  <td>{job.no_of_positions}</td>
                  <td>{job.state}</td>
                  <td>{new Date(job.target_hiring_date).toLocaleDateString()}</td>
                  <td>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleViewJob(job._id)}
                        className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
                      >
                        View Job
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
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
          <div className="mt-4">
            <Pagination
              itemsPerPage={jobsPerPage}
              totalItems={jobs.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import Pagination from './Pagination';

// const ManageJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [jobsPerPage] = useState(5);

//   // useEffect(() => {
//   //   const fetchJobs = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:5001/api/jobs");
//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         setJobs(data);
//   //       } else {
//   //         console.error("Failed to fetch jobs:", response.statusText);
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to fetch jobs:", error);
//   //     }
//   //   };

//   //   fetchJobs();
//   // }, []);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     // Retrieve company_id from localStorage
//     const userInfo = localStorage.getItem('user');
//     const user = userInfo ? JSON.parse(userInfo) : null;
//     const companyID = user?.company_id;

//     const params = {};
//     if (companyID) {
//       params.company_id = companyID;
//     }

//     try {
//       const response = await axios.get("http://localhost:5001/api/jobs", { params });
//       if (response.status === 200) {
//         setJobs(response.data);
//       } else {
//         console.error("Failed to fetch jobs:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Failed to fetch jobs:", error);
//     }
//   };

//     // Get current jobs
//     const indexOfLastJob = currentPage * jobsPerPage;
//     const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//     const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  
//     // Change page
//     const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <div className="content">
//       <div className="flex flex-col items-center my-4">
//         <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>
//         <div className="w-4/5">
//           {/* Create Job button */}
//           <div className="flex justify-end">
//             <Link to="/ManageJobForm">
//               <button className="addlocation bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
//                 Post New Job
//               </button>
//             </Link>
//           </div>
//           <table className="w-full text-left rounded-lg overflow-hidden bg-white">
//             <thead className="primary-blue-bg text-white">
//             <tr>
//               <th>Title</th>
//               <th>Type</th>
//               <th>Positions</th>
//               <th>State</th>
//               <th>Target Hiring Date</th>
//               <th>Compensation Type</th>
//               <th>Range From</th>
//               <th>Range To</th>
//               <th>Experience</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentJobs.map((job) => (
//               <tr key={job._id}>
//                 <td>{job.job_title}</td>
//                 <td>{job.job_type}</td>
//                 <td>{job.no_of_positions}</td>
//                 <td>{job.state}</td>
//                 <td>{new Date(job.target_hiring_date).toLocaleDateString()}</td>
//                 <td>{job.compensation_type}</td>
//                 <td>{job.compensation_range_from}</td>
//                 <td>{job.compensation_range_to}</td>
//                 <td>{job.experience}</td>
//                 <td>
//                     <div className="flex flex-col space-y-2">
//                       <button
//                         className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                       >
//                         View Job
//                       </button>
//                       <button
//                     className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                   >
//                     Delete
//                   </button>
//                     </div>
//                     </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="mt-4">
//             <Pagination
//               itemsPerPage={jobsPerPage}
//               totalItems={jobs.length}
//               paginate={paginate}
//               currentPage={currentPage}
//             />
//           </div>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default ManageJobs;



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
