import React from 'react';
/* import './ViewApplicants.css'; */

const ViewApplicants = () => {
  const jobData = [
    {
        jobTitle: 'Software Engineer',
        company: 'Acme Corp',
        noOfApplicants: 15,
        location: 'Waterloo, Ontario',
        department: 'IT',
        experience: '4-7 years',
        status: 'Open',
      },
      {
        jobTitle: 'Marketing Manager',
        company: 'Best Widgets Inc.',
        noOfApplicants: 8,
        location: 'Milton, Ontario',
        department: 'Marketing',
        experience: '1-3 years',
        status: 'In Review',
      },
      {
        jobTitle: 'UI/UX Designer',
        company: 'Creative Labs',
        noOfApplicants: 12,
        location: 'Toronto, Ontario',
        department: 'Design',
        experience: '2-5 years',
        status: 'Closed' 
      },
      {
        jobTitle: 'Data Analyst',
        company: 'Insights Corporation',
        noOfApplicants: 22,
        location: 'Vancouver, British Columbia',
        department: 'Analytics',
        experience: '3-6 years',
        status: 'Open',
      },
      {
        jobTitle: 'Sales Representative',
        company: 'Acme Solutions',
        noOfApplicants: 10,
        location: 'Montreal, Quebec',
        department: 'Sales',
        experience: '1-3 years',
        status: 'Open'
      },  
      {
        jobTitle: 'Full Stack Web Developer',
        company: 'TechStart',
        noOfApplicants: 18,
        location: 'Calgary, Alberta',
        department: 'Engineering',
        experience: '2-4 years',
        status: 'In Review'
      }  
  ];

  return (
    <div className="container"> 
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
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
              <td>{job.company}</td>
              <td>{job.noOfApplicants}</td>
              <td>{job.location}</td>
              <td>{job.department}</td>
              <td>{job.experience}</td>
              <td>{job.status}</td>
              <td><button class="edit">Edit</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplicants;
