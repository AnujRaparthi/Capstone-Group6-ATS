import React from 'react';
/* import './ViewApplicants.css'; */

const ViewApplicants = () => {
  const jobData = [
    {
        jobTitle: 'Software Engineer',
        noOfApplicants: 15,
        location: 'Waterloo, Ontario',
        department: 'IT',
        experience: '4-7 years',
        status: 'Open',
      },
      {
        jobTitle: 'Marketing Manager',
        noOfApplicants: 8,
        location: 'Milton, Ontario',
        department: 'Marketing',
        experience: '1-3 years',
        status: 'In Review',
      },
      {
        jobTitle: 'UI/UX Designer',
        noOfApplicants: 12,
        location: 'Toronto, Ontario',
        department: 'Design',
        experience: '2-5 years',
        status: 'Closed' 
      },
      {
        jobTitle: 'Data Analyst',
        noOfApplicants: 22,
        location: 'Vancouver, British Columbia',
        department: 'Analytics',
        experience: '3-6 years',
        status: 'Open',
      },
      {
        jobTitle: 'Sales Representative',
        noOfApplicants: 10,
        location: 'Montreal, Quebec',
        department: 'Sales',
        experience: '1-3 years',
        status: 'Open'
      },  
      {
        jobTitle: 'Full Stack Web Developer',
        noOfApplicants: 18,
        location: 'Calgary, Alberta',
        department: 'Engineering',
        experience: '2-4 years',
        status: 'In Review'
      }  
  ];

  return (
    <div className="content">
  <div className="flex flex-col items-center my-4">
    <h1 className="text-2xl font-bold mb-4">View Applicants</h1>
    <div className="w-4/5">
      <table className="w-full text-left rounded-lg overflow-hidden bg-white">
        <thead className="primary-blue-bg text-white">
          <tr>
            <th>Job Title</th>
            <th>No. of Applicants</th>
            <th>Location</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map((job, index) => (
            <tr key={index}>
              <td>{job.jobTitle}</td>
              <td>{job.noOfApplicants}</td>
              <td>{job.location}</td>
              <td>{job.department}</td>
              <td>{job.experience}</td>
              <td>{job.status}</td>
              <td><button className="btn btn-primary">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default ViewApplicants;
