import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';  // Make sure to import the Pagination component
import { useUser } from './UserContext';

const ViewApplicants = () => {
  const { user } = useUser();
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(5);  // Set the number of applicants per page

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    const userInfo = localStorage.getItem('user');
    const user = userInfo ? JSON.parse(userInfo) : null;
    const companyID = user?.company_id;

    const params = {};
    if (companyID) {
      params.company_id = companyID;
    }

    try {
      const response = await axios.get("https://capstone-group6-ats-backend.vercel.app/api/users", { params });
      if (response.status === 200) {
        setApplicants(response.data);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const toggleActiveStatus = async (userId, isActive) => {
    try {
      await axios.patch(`https://capstone-group6-ats-backend.vercel.app/api/users/toggle-active/${userId}`, { active: !isActive });
      fetchApplicants();  // Refresh the list after toggling
    } catch (error) {
      console.error('Error updating user active status:', error);
    }
  };

  // Calculate the current applicants to display
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = applicants.slice(indexOfFirstApplicant, indexOfLastApplicant);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const formatUserType = userType => {
    return userType.charAt(0).toUpperCase() + userType.slice(1);
  };

  return (
    <div className="content">
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
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
              {currentApplicants.map((applicant, index) => (
                <tr key={index}>
                  <td>{applicant.name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.address}</td>
                  <td>{formatUserType(applicant.gender)}</td>
                  <td>{formatUserType(applicant.userType)}</td>
                  <td>
                    <div className="flex flex-col space-y-2">

                      {/* Conditional rendering based on user role */}
                      {user && user.role === 'admin' && (

                        <>
                          <button
                            className={`${applicant.active ? "primary-blue-bg" : "bg-green-600"} text-white text-sm px-4 py-2 rounded-md focus:outline-none`}
                            onClick={() => toggleActiveStatus(applicant._id, applicant.active)}
                          >
                            {applicant.active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none">
                            Delete
                          </button>
                        </>

                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Pagination
              itemsPerPage={applicantsPerPage}
              totalItems={applicants.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicants;



// import React from 'react';
// /* import './ViewApplicants.css'; */

// const ViewApplicants = () => {
//   const applicantData = [
//     {
//         name: 'Rahul',
//         email: 'rahul@gmail.com',
//         address: 'Waterloo, Ontario',
//         gender: 'Male',
//         user_type: 'Applicant',
//       },
//       {
//         name: 'Goutham Kumar',
//         email: 'goutham@gmail.com',
//         address: 'Waterloo, Ontario',
//         gender: 'Male',
//         user_type: 'Recruiter',
//       },
//       {
//         name: 'Abhishek',
//         email: 'abhishek@gmail.com',
//         address: 'Milton, Ontario',
//         gender: 'Male',
//         user_type: 'Applicant',
//       },
//       {
//         name: 'Likhitha',
//         email: 'likhitha@gmail.com',
//         address: 'Waterloo, Ontario',
//         gender: 'Female',
//         user_type: 'Recruiter',
//       },
//   ];

//   return (
//     <div className="content">
//   <div className="flex flex-col items-center my-4">
//     <h1 className="text-2xl font-bold mb-4">View Users</h1>
//     <div className="w-4/5">
//       <table className="w-full text-left rounded-lg overflow-hidden bg-white">
//         <thead className="primary-blue-bg text-white">
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Gender</th>
//             <th>User Type</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {applicantData.map((applicant, index) => (
//             <tr key={index}>
//               <td>{applicant.name}</td>
//               <td>{applicant.email}</td>
//               <td>{applicant.address}</td>
//               <td>{applicant.gender}</td>
//               <td>{applicant.user_type}</td>
//               <td>
//                     <div className="flex flex-col space-y-2">
//                       <button
//                         className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                       >
//                         View User
//                       </button>
//                       <button
//                     className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                   >
//                     Delete
//                   </button>
//                     </div>
//                     </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
//   );
// };

// export default ViewApplicants;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ViewApplicants = () => {
//   const [applicants, setApplicants] = useState([]);

//   useEffect(() => {
//     fetchApplicants();
//   }, []);

//   const fetchApplicants = async () => {
//     // Retrieve company_id from localStorage, if relevant
//     const userInfo = localStorage.getItem('user');
//     const user = userInfo ? JSON.parse(userInfo) : null;
//     const companyID = user?.company_id;

//     const params = {};
//     if (companyID) {
//       params.company_id = companyID;
//     }

//     try {
//       const response = await axios.get("https://capstone-group6-ats-backend.vercel.app/api/users", { params });
//       if (response.status === 200) {
//         setApplicants(response.data);
//       } else {
//         console.error("Failed to fetch applicants:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Failed to fetch applicants:", error);
//     }
//   };

//   const formatUserType = userType => {
//     return userType.charAt(0).toUpperCase() + userType.slice(1);
//   };

//   return (
//     <div className="content">
//       <div className="flex flex-col items-center my-4">
//         <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
//         <div className="w-4/5">
//           <table className="w-full text-left rounded-lg overflow-hidden bg-white">
//             <thead className="primary-blue-bg text-white">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Address</th>
//                 <th>Gender</th>
//                 <th>User Type</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applicants.map((applicant, index) => (
//                 <tr key={index}>
//                   <td>{applicant.name}</td>
//                   <td>{applicant.email}</td>
//                   <td>{applicant.address}</td>
//                   <td>{applicant.gender}</td>
//                   <td>{formatUserType(applicant.userType)}</td>
//                   <td>
//                     <div className="flex flex-col space-y-2">
//                       <button
//                         className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                       >
//                         View User
//                       </button>
//                       <button
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

// export default ViewApplicants;
