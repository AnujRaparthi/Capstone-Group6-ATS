import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const stageOptions = [
  'Initial Screening',
  'Technical / Functional Interview',
  'HR Interview',
  'Offer'
];

const statusOptions = [
  'Pending',
  'On Hold',
  'Rejected'
];

const ViewJobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    jobTitle: '',
    firstName: '',
    lastName: '',
    email: '',
    preferredLocation: '',
    totalWorkExperience: '',
    highestEducationalQualification: '',
    stage: '',
    status: ''
  });
  const [filteredApplications, setFilteredApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/job-applications");
      if (response.ok) {
        const jobApplications = await response.json();
        const jobsPromises = jobApplications.map(application =>
          fetch(`http://localhost:5001/api/jobs/${application.job_id}`)
            .then(response => response.json())
        );
        const jobs = await Promise.all(jobsPromises);
        const applicationsWithJobTitle = jobApplications.map((application, index) => ({
          ...application,
          jobTitle: jobs[index].job_title
        }));
        setApplications(applicationsWithJobTitle);
        setFilteredApplications(applicationsWithJobTitle);
      } else {
        console.error("Failed to fetch job applications:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch job applications:", error);
    }
  };

  const handleViewApplication = (applicationId) => {
    navigate(`/jobapplication/${applicationId}`);
  };

  const handleDeleteApplication = async (applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/delete-application/${applicationId}`);
        if (response.status === 200) {
          setFilteredApplications(prev => prev.filter(app => app._id !== applicationId));
          alert("Application deleted successfully!");
        }
      } catch (error) {
        console.error("Failed to delete the application:", error);
        alert("Failed to delete the application.");
      }
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    setFilteredApplications(applications.filter(application =>
      (!filters.jobTitle || application.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())) &&
      (!filters.firstName || application.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
      (!filters.lastName || application.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) &&
      (!filters.email || application.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.preferredLocation || application.preferredLocation.toLowerCase().includes(filters.preferredLocation.toLowerCase())) &&
      (!filters.totalWorkExperience || application.totalWorkExperience.toLowerCase().includes(filters.totalWorkExperience.toLowerCase())) &&
      (!filters.highestEducationalQualification || application.highestEducationalQualification.toLowerCase().includes(filters.highestEducationalQualification.toLowerCase())) &&
      (!filters.stage || application.stage === filters.stage) &&
      (!filters.status || application.status === filters.status)
    ));
  };

  const clearFilters = () => {
    setFilters({
      jobTitle: '',
      firstName: '',
      lastName: '',
      email: '',
      preferredLocation: '',
      totalWorkExperience: '',
      highestEducationalQualification: '',
      stage: '',
      status: ''
    });
    setFilteredApplications(applications);
  };

  return (
    <div className="content">
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
        {/* Filters */}
        <div className="filter-boxes mb-4">
          <div className="flex gap-2">
          <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={filters.jobTitle}
              onChange={handleFilterChange}
              className="p-2 border rounded bg-white shadow-inner w-36"
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={filters.firstName}
              onChange={handleFilterChange}
              className="p-2 border rounded bg-white shadow-inner w-36"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={filters.lastName}
              onChange={handleFilterChange}
              className="p-2 border rounded bg-white shadow-inner w-36"
            />
            {/* Dropdown for Stage */}
          <select
            name="stage"
            value={filters.stage}
            onChange={handleFilterChange}
            className="p-2 border rounded bg-white shadow-inner"
          >
            <option value="">All Stages</option>
            {stageOptions.map((stage, index) => (
              <option key={index} value={stage}>{stage}</option>
            ))}
          </select>

          {/* Dropdown for Status */}
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded bg-white shadow-inner"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))}
          </select>
            <button onClick={applyFilters} className="primary-blue-bg text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none">Filter</button>
            <button onClick={clearFilters} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 focus:outline-none">Clear</button>
          </div>
        </div>
        <div className="w-4/5">
          <table className="w-full text-left rounded-lg overflow-hidden bg-white">
            <thead className="primary-blue-bg text-white">
              <tr>
                <th>Job Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Preferred Location</th>
                <th>Total Work Experience</th>
                <th>Highest Educational Qualification</th>
                <th>Stage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application._id}>
                  <td>{application.jobTitle}</td>
                  <td>{application.firstName}</td>
                  <td>{application.lastName}</td>
                  <td>{application.email}</td>
                  <td>{application.preferredLocation}</td>
                  <td>{application.totalWorkExperience}</td>
                  <td>{application.highestEducationalQualification}</td>
                  <td>{application.stage}</td>
                  <td>{application.status}</td>
                  <td>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleViewApplication(application._id)}
                        className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
                      >
                        View Application
                      </button>
                      <button
                        onClick={() => handleDeleteApplication(application._id)}
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
        </div>
      </div>
    </div>
  );
};

export default ViewJobApplications;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

// const ViewJobApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [filters, setFilters] = useState({
//     jobTitle: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     preferredLocation: '',
//     totalWorkExperience: '',
//     highestEducationalQualification: '',
//     stage: '',
//     status: ''
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobApplications = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/job-applications");
//         if (response.ok) {
//           const jobApplications = await response.json();
//           const jobsPromises = jobApplications.map(application =>
//             fetch(`http://localhost:5001/api/jobs/${application.job_id}`)
//               .then(response => response.json())
//           );
//           const jobs = await Promise.all(jobsPromises);
//           const applicationsWithJobTitle = jobApplications.map((application, index) => ({
//             ...application,
//             jobTitle: jobs[index].job_title
//           }));
//           setApplications(applicationsWithJobTitle);
//         } else {
//           console.error("Failed to fetch job applications:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch job applications:", error);
//       }
//     };

//     fetchJobApplications();
//   }, []);

//   const handleViewApplication = (applicationId) => {
//     navigate(`/jobapplication/${applicationId}`);
//   };

//   const handleDeleteApplication = async (applicationId) => {
//     if (window.confirm("Are you sure you want to delete this application?")) {
//       try {
//         const response = await fetch(`http://localhost:5001/api/delete-application/${applicationId}`, { method: 'DELETE' });
//         if (response.ok) {
//           setApplications(prev => prev.filter(app => app._id !== applicationId));
//           alert("Application deleted successfully!");
//         }
//       } catch (error) {
//         console.error("Failed to delete the application:", error);
//         alert("Failed to delete the application.");
//       }
//     }
//   };

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
//   };

//   const filteredApplications = applications.filter(application =>
//     (application.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())) &&
//     (application.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
//     (application.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) &&
//     (application.email.toLowerCase().includes(filters.email.toLowerCase())) &&
//     (application.preferredLocation.toLowerCase().includes(filters.preferredLocation.toLowerCase())) &&
//     (application.totalWorkExperience.toLowerCase().includes(filters.totalWorkExperience.toLowerCase())) &&
//     (application.highestEducationalQualification.toLowerCase().includes(filters.highestEducationalQualification.toLowerCase())) &&
//     (application.stage.toLowerCase().includes(filters.stage.toLowerCase())) &&
//     (application.status.toLowerCase().includes(filters.status.toLowerCase()))
//   );

//   return (
//     <div className="content">
//       <div className="flex flex-col items-center my-4">
//         <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
//         {/* Filters */}
//         <div className="mb-4">
//           <input
//             type="text"
//             name="jobTitle"
//             placeholder="Filter by Job Title"
//             onChange={handleFilterChange}
//             className="p-1 border rounded"
//           />
//           <input
//             type="text"
//             name="firstName"
//             placeholder="Filter by First Name"
//             onChange={handleFilterChange}
//             className="p-1 border rounded"
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Filter by Last Name"
//             onChange={handleFilterChange}
//             className="p-1 border rounded"
//           />
//           {/* Add more filters as needed */}
//         </div>
//         <div className="w-4/5">
//           <table className="w-full text-left rounded-lg overflow-hidden bg-white">
//             <thead className="primary-blue-bg text-white">
//               <tr>
//                 <th>Job Title</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Preferred Location</th>
//                 <th>Total Work Experience</th>
//                 <th>Highest Educational Qualification</th>
//                 <th>Stage</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredApplications.map((application) => (
//                 <tr key={application._id}>
//                   <td>{application.jobTitle}</td>
//                   <td>{application.firstName}</td>
//                   <td>{application.lastName}</td>
//                   <td>{application.email}</td>
//                   <td>{application.preferredLocation}</td>
//                   <td>{application.totalWorkExperience}</td>
//                   <td>{application.highestEducationalQualification}</td>
//                   <td>{application.stage}</td>
//                   <td>{application.status}</td>
//                   <td>
//                     <div className="flex flex-col space-y-2">
//                       <button
//                         onClick={() => handleViewApplication(application._id)}
//                         className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                       >
//                         View Application
//                       </button>
//                       <button
//                         onClick={() => handleDeleteApplication(application._id)}
//                         className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewJobApplications;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ViewJobApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobApplications = async () => {
//       try {
//         // Fetch all job applications
//         const response = await fetch("http://localhost:5001/api/job-applications");
//         if (response.ok) {
//           const jobApplications = await response.json();
//           // Fetch the job title for each application
//           const jobsPromises = jobApplications.map(application =>
//             fetch(`http://localhost:5001/api/jobs/${application.job_id}`)
//               .then(response => response.json())
//           );
//           const jobs = await Promise.all(jobsPromises);
//           // Map job titles back to applications
//           const applicationsWithJobTitle = jobApplications.map((application, index) => ({
//             ...application,
//             jobTitle: jobs[index].job_title
//           }));
//           setApplications(applicationsWithJobTitle);
//         } else {
//           console.error("Failed to fetch job applications:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch job applications:", error);
//       }
//     };

//     fetchJobApplications();
//   }, []);

//   const handleViewApplication = (applicationId) => {
//     // Navigate to JobApplication component with the application data
//     navigate(`/jobapplication/${applicationId}`);
//   };

//   const handleDeleteApplication = async (applicationId) => {
//     if (window.confirm("Are you sure you want to delete this application?")) {
//       try {
//         // Updated endpoint to 'delete-application'
//         const response = await axios.delete(`http://localhost:5001/api/delete-application/${applicationId}`);
//         if (response.status === 200) {
//           setApplications(applications.filter(app => app._id !== applicationId));
//           alert("Application deleted successfully!");
//         }
//       } catch (error) {
//         console.error("Failed to delete the application:", error);
//         alert("Failed to delete the application.");
//       }
//     }
//   };
  

//   return (
//     <div className="content">
//       <div className="flex flex-col items-center my-4">
//         <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
//         <div className="w-4/5">
//           <table className="w-full text-left rounded-lg overflow-hidden bg-white">
//             <thead className="primary-blue-bg text-white">
//               <tr>
//                 <th>Job Title</th>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Preferred Location</th>
//                 <th>Total Work Experience</th>
//                 <th>Highest Educational Qualification</th>
//                 <th>Stage</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((application) => (
//                 <tr key={application._id}>
//                   <td>{application.jobTitle}</td>
//                   <td>{application.firstName}</td>
//                   <td>{application.lastName}</td>
//                   <td>{application.email}</td>
//                   <td>{application.preferredLocation}</td>
//                   <td>{application.totalWorkExperience}</td>
//                   <td>{application.highestEducationalQualification}</td>
//                   <td>{application.stage}</td>
//                   <td>{application.status}</td>
//                   <td>
//                     <div className="flex flex-col space-y-2">
//                       <button
//                         onClick={() => handleViewApplication(application._id)}
//                         className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                       >
//                         View Application
//                       </button>
//                       <button
//                     onClick={() => handleDeleteApplication(application._id)}
//                     className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                   >
//                     Delete
//                   </button>
//                     </div>
//                     </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewJobApplications;