import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Pagination from './Pagination';
import axios from 'axios';

const MainContent = ({ filters, searchTerm }) => {
  console.log('filters=', filters);
  console.log('searchTerm=', searchTerm);

  const [jobListings, setJobListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://capstone-group6-ats-backend.vercel.app/api/jobs');
        console.log('Response=', response);
        setJobListings(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const getFilteredJobListings = () => {
    return jobListings
      .filter(listing => {
        const locationMatch = !filters.location || listing.location_id._id === filters.location;
        const departmentMatch = !filters.department || listing.department_id._id === filters.department;
        const experienceMatch = !filters.experience || listing.experience === filters.experience;

        return locationMatch && departmentMatch && experienceMatch;
      })
      .filter(listing => {
        const searchTermLowered = searchTerm.toLowerCase();
        const titleMatch = listing.job_title.toLowerCase().includes(searchTermLowered);
        const descriptionMatch = listing.job_description.toLowerCase().includes(searchTermLowered);
        
        return searchTerm === '' || titleMatch || descriptionMatch;
      });
  };

  const filteredJobListings = getFilteredJobListings();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobListings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <main className="col-span-2">
      {currentItems.length > 0 ? (
        currentItems.map(listing => (
          <JobListing
            key={listing._id}
            id={listing._id}
            title={listing.job_title}
            experience={listing.experience}
            location={listing.location_id.location_name}
            department={listing.department_id.name}
            postedTime="10 mins ago" // This should be calculated or formatted accordingly
            description={listing.job_description}
          />
        ))
      ) : (
        <p>No job listings found.</p>
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredJobListings.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  );
};

export default MainContent;



// import React, { useState, useEffect } from 'react';
// import JobListing from './JobListing';
// import Pagination from './Pagination';
// import axios from 'axios';

// const MainContent = ({ filters, searchTerm }) => {

// console.log('filters=',filters);
// console.log('searchTerm=',searchTerm);

//   const [jobListings, setJobListings] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         // const response = await axios.get('http://capstone-group6-ats-backend.vercel.app/api/jobs');
//         //http://localhost:5001/
//         const response = await axios.get('https://capstone-group6-ats-backend.vercel.app/api/jobs');
//         console.log('Response=',response);
//         setJobListings(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };

//     fetchJobs();
//   }, []);


//   // Function to filter job listings based on filters and search term
//   const getFilteredJobListings = () => {
//     return jobListings
//       .filter(listing => {
//         return (
//           (!filters.location || listing.location === filters.location) &&
//           (!filters.department || listing.department === filters.department) &&
//           (!filters.experience || listing.experience === filters.experience)
//         );
//       })
//       .filter(listing => {
//         if (searchTerm === '') return true;
//         return (
//           listing.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           listing.job_description.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       });
//   };

//   // Calculate pagination details
//   const filteredJobListings = getFilteredJobListings();
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredJobListings.slice(indexOfFirstItem, indexOfLastItem);

//   // Update page number
//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <main className="col-span-2">
//       {currentItems.length > 0 ? (
//         currentItems.map(listing => (
//           <JobListing
//             key={listing._id}
//             id={listing._id}
//             title={listing.job_title}
//             experience={listing.experience}
//             location="Waterloo, Ontario"
//             department="IT"
//             postedTime="10 mins ago"
//             description={listing.job_description}
//           />
//         ))
//       ) : (
//         <p>No job listings found.</p>
//       )}
//       <Pagination
//         itemsPerPage={itemsPerPage}
//         totalItems={filteredJobListings.length}
//         paginate={paginate}
//         currentPage={currentPage}
//       />
//     </main>
//   );
// };

// export default MainContent;