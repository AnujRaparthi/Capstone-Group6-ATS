import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const ViewJobApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        // Fetch all job applications
        const response = await fetch("http://localhost:5001/api/job-applications");
        if (response.ok) {
          const jobApplications = await response.json();
          // Fetch the job title for each application
          const jobsPromises = jobApplications.map(application =>
            fetch(`http://localhost:5001/api/jobs/${application.job_id}`)
              .then(response => response.json())
          );
          const jobs = await Promise.all(jobsPromises);
          // Map job titles back to applications
          const applicationsWithJobTitle = jobApplications.map((application, index) => ({
            ...application,
            jobTitle: jobs[index].job_title
          }));
          setApplications(applicationsWithJobTitle);
        } else {
          console.error("Failed to fetch job applications:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  const handleViewApplication = (applicationId) => {
    // Navigate to JobApplication component with the application data
    navigate(`/jobapplication/${applicationId}`);
  };

  return (
    <div className="content">
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
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
              {applications.map((application) => (
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
                        className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
                      >
                        View Application
                      </button>
                      <button
                        onClick={() => {/* TODO: Implement Reject functionality */}}
                        className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {/* TODO: Implement Hold functionality */}}
                        className="bg-yellow-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
                      >
                        Hold
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



//Working Code
// import React, { useState, useEffect } from "react";

// const ViewJobApplications = () => {
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const fetchJobApplications = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/job-applications");
//         if (response.ok) {
//           const data = await response.json();
//           setApplications(data);
//         } else {
//           console.error("Failed to fetch job applications:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch job applications:", error);
//       }
//     };

//     fetchJobApplications();
//   }, []);

//   return (
//     <div className="content">
//       <div className="flex flex-col items-center my-4">
//         <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
//         <div className="w-4/5">
//           <table className="w-full text-left rounded-lg overflow-hidden bg-white">
//             <thead className="primary-blue-bg text-white">
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Email</th>
//                 <th>Preferred Location</th>
//                 <th>Total Work Experience</th>
//                 <th>Highest Educational Qualification</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((application) => (
//                 <tr key={application._id}>
//                   <td>{application.firstName}</td>
//                   <td>{application.lastName}</td>
//                   <td>{application.email}</td>
//                   <td>{application.preferredLocation}</td>
//                   <td>{application.totalWorkExperience}</td>
//                   <td>{application.highestEducationalQualification}</td>
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ViewJobApplications = () => {
//     const [jobApplications, setJobApplications] = useState([]);

//     useEffect(() => {
//         const fetchApplications = async () => {
//             const result = await axios.get('/api/jobapplications'); 
//             setJobApplications(result.data);
//         };

//         fetchApplications();
//     }, []);

//     return (
//         <div> 
           
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Position</th>
//                         <th>Company</th>
//                         <th>Location</th>
//                         <th>Department</th>
//                         <th>Experience</th>
//                         {/* Add more headers as needed */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {jobApplications.map((application) => (
//                         <tr key={application._id}> 
//                             <td>{application.position}</td>
//                             <td>{application.company}</td>
//                             <td>{application.location}</td>
//                             <td>{application.department}</td>
//                             <td>{application.experience}</td>
                           
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ViewJobApplications;
