import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Pagination from './Pagination'; // Ensure Pagination component is correctly imported

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentsPerPage] = useState(5); // Define how many departments you want per page

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const userInfo = localStorage.getItem('user');
    const user = userInfo ? JSON.parse(userInfo) : null;
    const companyID = user?.company_id;

    const params = {};
    if (companyID) {
      params.company_id = companyID;
    }

    try {
      const response = await axios.get("http://localhost:5001/api/Department", { params });

      if (response.status === 200) {
        setDepartments(response.data);
      } else {
        console.error("Failed to fetch departments:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  // Get current departments
  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold mb-4">Manage Departments</h1>
        <div className="w-4/5">
          {/* Add Department button */}
          <div className="flex justify-end">
            <Link to="/AddDepartmentForm">
              <button className="addlocation bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
                Add Department
              </button>
            </Link>
          </div>
          {/* Departments table */}
          <table className="w-full text-left rounded-lg overflow-hidden bg-white">
            <thead className="primary-blue-bg text-white">
              <tr>
                <th>Name</th>
                <th class = "dbut">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDepartments.map(department => (
                <tr key={department._id}>
                  <td>{department.name}</td>
                  <td>
                    <div className="flex flex-col space-y-2">
                      <button className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none">
                        View Department
                      </button>
                      <button className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="mt-4">
            <Pagination
              itemsPerPage={departmentsPerPage}
              totalItems={departments.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDepartments;


// // ManageDepartments.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";

// const ManageDepartments = () => {
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//         try {
//           const response = await axios.get("http://localhost:5001/api/Department");
//           console.log("Response:", response);
//             const data = response.data;
//             console.log("Fetched departments:", data); 
//             setDepartments(data);
        
//         } catch (error) {
//           console.error("Failed to fetch departments:", error);
//         }
//       };

//     fetchDepartments();
//   }, []);

//   return (
//     <div className="content">
//   <div className="flex flex-col items-center my-4">
//     <h1 className="text-2xl font-bold mb-4">Manage Departments</h1>
//     <div className="w-4/5">
//       <table className="w-full text-left rounded-lg overflow-hidden bg-white">
//         <thead className="primary-blue-bg text-white">
//           <tr>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departments.map(department => (
//             <tr key={department._id}>
//               <td>{department.name}</td>
//               <td class = "dbut">
//                     <div className="flex flex-col space-y-2">
//                       <button
//                         className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                       >
//                         View Department
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
//       <div className="centerdepartment">
//         <button className="addlocation mt-4">
//           <Link to="/AddDepartmentForm">Create Department</Link>
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
//   );
// };

// export default ManageDepartments;
