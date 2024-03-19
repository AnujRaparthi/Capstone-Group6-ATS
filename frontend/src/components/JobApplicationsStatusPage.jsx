import React from 'react';
import JobApplicationCard from './JobApplicationCard';


const mockApplications = [
  {
    id: 1,
    jobTitle: 'Data Analyst',
    location: 'Waterloo, Ontario',
    appliedDate: 'March 18, 2024',
    applicationNumber: 'APP10001',
    currentStage: 2, // Assuming 1-based index for stages
    status: 'Pending'
  },
  {
    id: 2,
    jobTitle: 'Software Developer',
    location: 'Milton, Ontario',
    appliedDate: 'March 18, 2024',
    applicationNumber: 'APP10002',
    currentStage: 3,
    status: 'Pending'
  }
];

const JobApplicationsStatusPage = () => {
    
  return (
    <div className="content">
    <div className="max-w-7xl mx-auto py-6 sm:px-6">
      <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>
      {mockApplications.map(application => (
        <JobApplicationCard key={application.id} application={application} />
      ))}
    </div>
    </div>
  );
};

export default JobApplicationsStatusPage;
