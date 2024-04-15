import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Pagination from './Pagination';
import axios from 'axios';

const MainContent = ({ filters, searchTerm }) => {
  const [jobListings, setJobListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const response = await axios.get('http://localhost:5001/api/jobs');
        //https://capstone-group6-ats-backend.vercel.app/
        const response = await axios.get('https://capstone-group6-ats-backend.vercel.app/api/jobs');
        console.log('Response=',response);
        setJobListings(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);


  // Function to filter job listings based on filters and search term
  const getFilteredJobListings = () => {
    return jobListings
      .filter(listing => {
        return (
          (!filters.location || listing.location === filters.location) &&
          (!filters.department || listing.department === filters.department) &&
          (!filters.experience || listing.experience === filters.experience)
        );
      })
      .filter(listing => {
        if (searchTerm === '') return true;
        return (
          listing.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.job_description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  };

  // Calculate pagination details
  const filteredJobListings = getFilteredJobListings();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobListings.slice(indexOfFirstItem, indexOfLastItem);

  // Update page number
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
            location="Milton, Ontario"
            department="IT"
            postedTime="10 mins ago"
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



// import React, { useState } from 'react';
// import JobListing from './JobListing';
// import Pagination from './Pagination';
// import axios from 'axios';

// // Assume this is the static data you might have for job listings
// const jobListingsData = [
//   {
//     id: 1,
//     title: "Data Analyst",
//     experience: "1-3 years",
//     location: "Milton, Ontario",
//     department: "IT",
//     postedTime: "Posted 10 mins ago",
//     description: "Responsible for collecting, cleaning, and analyzing data, creating insightful reports and visualizations, utilizing tools like SQL, Python, and Tableau, while collaborating with cross-functional teams to provide data-driven recommendations for decision-making. Bachelor’s degree in a relevant field, proficiency in data analysis tools, strong problem-solving skills, and effective communication are essential."
//   },
//   {
//     id: 2,
//     title: "Senior Data Analyst",
//     experience: "4-7 years",
//     location: "Waterloo, Ontario",
//     department: "IT",
//     postedTime: "Posted 20 mins ago",
//     description: "Responsible for collecting, cleaning, and analyzing data, creating insightful reports and visualizations, utilizing tools like SQL, Python, and Tableau, while collaborating with cross-functional teams to provide data-driven recommendations for decision-making. Bachelor’s degree in a relevant field, proficiency in data analysis tools, strong problem-solving skills, and effective communication are essential."
//   },
//   {
//     id: 3,
//     title: "Sales Representative",
//     experience: "1-3 years",
//     location: "Milton, Ontario",
//     department: "Sales",
//     postedTime: "Posted 45 mins ago",
//     description: "Seek out new clients and develop clientele by networking to find new customers and generate lists of prospective clients."
//   },
//   {
//     id: 4,
//     title: "Marketing Coordinator",
//     experience: "1-3 years",
//     location: "Waterloo, Ontario",
//     department: "Marketing",
//     postedTime: "Posted 1 day ago",
//     description: "Assist in the development and implementation of the company's brand strategy, as well as manage all marketing campaigns and marketing strategy."
//   },
//   {
//     id: 5,
//     title: "Account Manager",
//     experience: "4-7 years",
//     location: "Milton, Ontario",
//     department: "Sales",
//     postedTime: "Posted 3 days ago",
//     description: "Manage a portfolio of accounts to achieve long-term success, develop positive relationships with clients, and act as the point of contact for all client account management matters."
//   },
//   {
//     id: 6,
//     title: "Digital Marketing Specialist",
//     experience: "4-7 years",
//     location: "Waterloo, Ontario",
//     department: "Marketing",
//     postedTime: "Posted 1 week ago",
//     description: "Plan, execute, and optimize online marketing efforts for the company's products and services, including SEO/SEM, email marketing campaigns, and display advertising campaigns."
//   },
//   {
//     id: 7,
//     title: "Sales Manager",
//     experience: "4-7 years",
//     location: "Milton, Ontario",
//     department: "Sales",
//     postedTime: "Posted 2 weeks ago",
//     description: "Achieve growth and hit sales targets by successfully managing the sales team, design and implement a strategic business plan that expands the company’s customer base and ensures its strong presence."
//   }

// ];

// const MainContent = ({ filters, searchTerm }) => {

//   const [jobListings, setJobListings] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // You can adjust the number of items per page

//   // First, filter jobListingsData based on the filters prop
//   const filteredJobListings = jobListingsData.filter(listing => {
//     // Filter by search term if it is provided
//     return searchTerm.length === 0 || listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       listing.description.toLowerCase().includes(searchTerm.toLowerCase());
//   }).filter(listing => {
//     return (
//       (!filters.location || listing.location === filters.location) &&
//       (!filters.department || listing.department === filters.department) &&
//       (!filters.experience || listing.experience === filters.experience)
//     );
//   });

//   // Then calculate the indexes for slicing the filtered array
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredJobListings.slice(indexOfFirstItem, indexOfLastItem);

//   // Update page number
//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <main className="col-span-2">
//       {currentItems.length > 0 ? (
//         currentItems.map((listing) => (
//           <JobListing
//             key={listing.id}
//             title={listing.title}
//             experience={listing.experience}
//             location={listing.location}
//             department={listing.department}
//             postedTime={listing.postedTime}
//             description={listing.description}
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

