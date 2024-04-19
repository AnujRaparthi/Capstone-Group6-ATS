// FilterSection.jsx
import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import axios from 'axios';

const FilterSection = ({ filters, onFilterChange }) => {
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get("http://localhost:5001/api/Location");
        setLocations([...new Set(locationsResponse.data.map(location => location.location_name))]);

        const departmentsResponse = await axios.get("http://localhost:5001/api/Department");
        setDepartments([...new Set(departmentsResponse.data.map(dept => dept.name))]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filterName, value) => {
    onFilterChange({
      ...filters,
      [filterName]: value
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      location: '',
      department: '',
      experience: ''
    });
  };

  return (
    <aside className="col-span-1">
      <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
        <div className="flex justify-between">
          <h3 className="text-lg leading-6 font-bold text-gray-900">Filters</h3>
          <button onClick={handleClearFilters} className="primary-blue-bg text-white text-sm px-4 py-2 rounded-md focus:outline-none">
            Clear filters
          </button>
        </div>
        <Filter
          label="Location"
          options={locations}
          value={filters.location}
          onFilterChange={(value) => handleFilterChange('location', value)}
        />
        <Filter
          label="Department"
          options={departments}
          value={filters.department}
          onFilterChange={(value) => handleFilterChange('department', value)}
        />
        <Filter
          label="Experience"
          options={[
            '0-1 Years',
            '1-3 Years',
            '3-5 Years',
            '5+ Years'
          ]}
          value={filters.experience}
          onFilterChange={(value) => handleFilterChange('experience', value)}
        />
      </div>
    </aside>
  );
};

export default FilterSection;


// import React, { useState, useEffect } from 'react';
// import Filter from './Filter';
// import axios from 'axios';

// const FilterSection = ({ filters, onFilterChange }) => {
//   const [locations, setLocations] = useState([]);
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/Location");
//         setLocations([...new Set(response.data.map(l => ({ value: l.location_name, label: l.location_name })))]);
//       } catch (error) {
//         console.error("Error fetching locations:", error);
//       }
//     };

//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/Department");
//         setDepartments([...new Set(response.data.map(d => ({ value: d.name, label: d.name })))]);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };

//     fetchLocations();
//     fetchDepartments();
//   }, []);

//   const handleFilterChange = (filterName, value) => {
//     onFilterChange({
//       ...filters,
//       [filterName]: value
//     });
//   };

//   const handleClearFilters = () => {
//     onFilterChange({
//       location: '',
//       department: '',
//       experience: ''
//     });
//   };

//   return (
//     <aside className="col-span-1">
//       <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
//         <div className="flex justify-between">
//           <h3 className="text-lg leading-6 font-bold text-gray-900">Filters</h3>
//           <button onClick={handleClearFilters} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none">
//             Clear filters
//           </button>
//         </div>
//         <Filter
//           label="Location"
//           options={locations}
//           value={filters.location}
//           onFilterChange={(value) => handleFilterChange('location', value)}
//         />
//         <Filter
//           label="Department"
//           options={departments}
//           value={filters.department}
//           onFilterChange={(value) => handleFilterChange('department', value)}
//         />
//         <Filter
//           label="Experience"
//           options={[
//           { value: '0-1 Years', label: '0-1 Years' },
//           { value: '1-3 Years', label: '1-3 Years' },
//           { value: '3-5 Years', label: '3-5 Years' },
//           { value: '5+ Years', label: '5+ Years' }
//           ]}
//           value={filters.experience}
//           onFilterChange={(value) => handleFilterChange('experience', value)}
//           />
//           </div>
//           </aside>
//           );
//           };
          
//           export default FilterSection;


// import React from 'react';
// import Filter from './Filter';

// const FilterSection = ({ filters, onFilterChange }) => {
//   const handleFilterChange = (filterName, value) => {
//     // Update the filters state in the parent App component

//     console.log(filterName,value);
//     console.log('Filter obj',{
//       ...filters,
//       [filterName]: value
//     });
    
//     onFilterChange({
//       ...filters,
//       [filterName]: value
//     });
    
//   };

//   const handleClearFilters = () => {
//     onFilterChange({
//       location: '',
//       department: '',
//       experience: ''
//     });
//   };

//   return (
//     <aside className="col-span-1">
//       <div className="bg-white shadow overflow-hidden sm:rounded-md p-4">
//         <div className="flex justify-between">
//           <h3 className="text-lg leading-6 font-bold text-gray-900">Filters</h3>
//           <button onClick={handleClearFilters} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
//   style={{ backgroundColor: '#067DCD' }}>
//             Clear filters
//           </button>
//         </div>
//         <Filter 
//           label="Location" 
//           options={['Waterloo, Ontario','Milton, Ontario']} 
//           value={filters.location}
//           onFilterChange={(value) => handleFilterChange('location', value)}
//         />
//         <Filter 
//           label="Department" 
//           options={['IT', 'Marketing','Sales']} 
//           value={filters.department}
//           onFilterChange={(value) => handleFilterChange('department', value)} 
//         />
//         <Filter 
//           label="Experience" 
//           options={['1-3 years', '4-7 years']} 
//           value={filters.experience}
//           onFilterChange={(value) => handleFilterChange('experience', value)}
//         />
//       </div>
//     </aside>
//   );
// };

// export default FilterSection;
