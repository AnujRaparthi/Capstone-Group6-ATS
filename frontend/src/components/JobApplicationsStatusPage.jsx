import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobApplicationCard from './JobApplicationCard';

const JobApplicationsStatusPage = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const userInfo = localStorage.getItem('user');
      const user = userInfo ? JSON.parse(userInfo) : null;

      if (user && user._id) {
        try {
          const response = await axios.get(`http://localhost:5001/api/my-job-applications?applicant_id=${user._id}`);

          console.log('response=',response);
          const mappedData = response.data.map(app => ({
            ...app,
            appliedDate: new Date(parseInt(app._id.substring(0, 8), 16) * 1000)
          }));
          setApplications(mappedData);
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      }
      setIsLoading(false);
    };

    fetchApplications();
  }, []);

  if (isLoading) {
    return <div>Loading applications...</div>;
  }

  if (!applications.length) {
    return <div className="content max-w-7xl mx-auto py-6 sm:px-6">
      <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>
      <p>No applications found.</p>
    </div>;
  }

  return (
    <div className="content max-w-7xl mx-auto py-6 sm:px-6">
      <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>
      {applications.map(application => (
        <JobApplicationCard key={application._id} application={{
          jobTitle: application.job_id.job_title,
          location: application.job_id.location_id.location_name,
          appliedDate: application.appliedDate.toDateString(),
          currentStage: application.current_stage,
          status: application.status
        }} />
      ))}
    </div>
  );
};

export default JobApplicationsStatusPage;




// import React from 'react';
// import JobApplicationCard from './JobApplicationCard';


// const mockApplications = [
//   {
//     id: 1,
//     jobTitle: 'Data Analyst',
//     location: 'Waterloo, Ontario',
//     appliedDate: 'April 16, 2024',
//     applicationNumber: 'APP10003',
//     currentStage: 1, // Assuming 1-based index for stages
//     status: 'Pending'
//   },
//   {
//     id: 2,
//     jobTitle: 'Software Developer',
//     location: 'Milton, Ontario',
//     appliedDate: 'April 16, 2024',
//     applicationNumber: 'APP10002',
//     currentStage: 3,
//     status: 'On Hold'
//   },
//   {
//     id: 3,
//     jobTitle: 'Senior Software Developer',
//     location: 'Milton, Ontario',
//     appliedDate: 'April 16, 2024',
//     applicationNumber: 'APP10001',
//     currentStage: 3,
//     status: 'Rejected'
//   }
// ];

// const JobApplicationsStatusPage = () => {
    
//   return (
//     <div className="content">
//     <div className="max-w-7xl mx-auto py-6 sm:px-6">
//       <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>
//       {mockApplications.map(application => (
//         <JobApplicationCard key={application.id} application={application} />
//       ))}
//     </div>
//     </div>
//   );
// };

// export default JobApplicationsStatusPage;
