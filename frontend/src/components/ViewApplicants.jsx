import React from 'react';
/* import './ViewApplicants.css'; */

const ViewApplicants = () => {
  const applicantData = [
    {
        name: 'Rahul',
        email: 'rahul@gmail.com',
        address: 'Waterloo, Ontario',
        gender: 'Male',
        user_type: 'Applicant',
      },
      {
        name: 'Goutham Kumar',
        email: 'goutham@gmail.com',
        address: 'Waterloo, Ontario',
        gender: 'Male',
        user_type: 'Recruiter',
      },
      {
        name: 'Abhishek',
        email: 'abhishek@gmail.com',
        address: 'Milton, Ontario',
        gender: 'Male',
        user_type: 'Applicant',
      },
      {
        name: 'Likhitha',
        email: 'likhitha@gmail.com',
        address: 'Waterloo, Ontario',
        gender: 'Female',
        user_type: 'Recruiter',
      },
  ];

  return (
    <div className="content">
  <div className="flex flex-col items-center my-4">
    <h1 className="text-2xl font-bold mb-4">View Users</h1>
    <div className="w-4/5">
      <table className="w-full text-left rounded-lg overflow-hidden bg-white">
        <thead className="primary-blue-bg text-white">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Gender</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicantData.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.address}</td>
              <td>{applicant.gender}</td>
              <td>{applicant.user_type}</td>
              <td>
                    <div className="flex flex-col space-y-2">
                      <button
                        className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
                      >
                        View User
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
    </div>
  </div>
</div>
  );
};

export default ViewApplicants;
