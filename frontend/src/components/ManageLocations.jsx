import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Pagination from './Pagination'; // Ensure Pagination component is correctly imported

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsPerPage] = useState(5); // Define how many locations you want per page

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const userInfo = localStorage.getItem('user');
    const user = userInfo ? JSON.parse(userInfo) : null;
    const companyID = user?.company_id;

    const params = {};
    if (companyID) {
      params.company_id = companyID;
    }

    try {
      const response = await axios.get("http://localhost:5001/api/Location", { params });

      console.log('response=',response);
      if (response.status === 200) {
        setLocations(response.data);
      } else {
        console.error("Failed to fetch locations:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  // Get current locations
  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold mb-4">Manage Locations</h1>
        <div className="w-4/5">
          {/* Add Location button */}
          <div className="flex justify-end">
            <Link to="/AddLocationForm">
              <button className="addlocation bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
                Add Location
              </button>
            </Link>
          </div>
          {/* Locations table */}
          <table className="w-full text-left rounded-lg overflow-hidden bg-white">
            <thead className="primary-blue-bg text-white">
              <tr>
                <th>Location</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLocations.map(location => (
                <tr key={location._id}>
                  <td>{location.location_name}</td>
                  <td>{location.address}</td>
                  <td>
                    <div className="flex flex-col space-y-2">
                      <button className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none">
                        View Location
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
              itemsPerPage={locationsPerPage}
              totalItems={locations.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="content">
  //     <div className="flex flex-col items-center my-4">
  //       <h1 className="text-2xl font-bold mb-4">Manage Locations</h1>
  //       <div className="w-4/5">
  //         <table className="w-full text-left rounded-lg overflow-hidden bg-white">
  //           <thead className="primary-blue-bg text-white">
  //             <tr>
  //               <th>Location</th>
  //               <th>Address</th>
  //               <th>Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {currentLocations.map(location => (
  //               <tr key={location._id}>
  //                 <td>{location.location_name}</td>
  //                 <td>{location.address}</td>
  //                 <td>
  //                   <div className="flex flex-col space-y-2">
  //                     <button
  //                       className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
  //                     >
  //                       View Location
  //                     </button>
  //                     <button
  //                       className="bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
  //                     >
  //                       Delete
  //                     </button>
  //                   </div>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //         <div className="mt-4">
  //         <Pagination
  //           itemsPerPage={locationsPerPage}
  //           totalItems={locations.length}
  //           paginate={paginate}
  //           currentPage={currentPage}
  //         />
  //         </div>
  //         <div className="centerlocation">
  //           <button className="addlocation mt-4">
  //             <Link to="/AddLocationForm">Add Location</Link>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ManageLocations;



// // ManageLocations.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";

// const ManageLocations = () => {
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//         try {
//           const response = await axios.get("http://localhost:5001/api/Location");
//           console.log("Response:", response);
//             const data = response.data;
//             console.log("Fetched locations:", data); // Log the fetched data
//             setLocations(data);
        
//         } catch (error) {
//           console.error("Failed to fetch locations:", error);
//         }
//       };

//     fetchLocations();
//   }, []);

//   return (
//     <div className="content">
//     <div className="flex flex-col items-center my-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Locations</h1>
//       <div className="w-4/5">
//         <table className="w-full text-left rounded-lg overflow-hidden bg-white">
//           <thead className="primary-blue-bg text-white">
//             <tr>
//               <th>Location</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {locations.map(location => (
//               <tr key={location._id}>
//                 <td>{location.location_name}</td>
//                 <td>{location.address}</td>
//                 <td>
//                     <div className="flex flex-col space-y-2">
//                       <button
//                         className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//                       >
//                         View Location
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
//         <div className="centerlocation">
//           <button className="addlocation mt-4">
//             <Link to="/AddLocationForm">Add Location</Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
    
//   );

// };

// export default ManageLocations;
