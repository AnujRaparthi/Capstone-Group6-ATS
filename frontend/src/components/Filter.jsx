import React from 'react';

const Filter = ({ label, options, value, onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="mt-4">
      <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Any</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;


// import React from 'react';

// const Filter = ({ label, options, value, onFilterChange }) => {
//   const handleChange = (e) => {
//     onFilterChange(e.target.value);
//   };

//   return (
//     <div className="mt-4">
//       <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-700">
//         {label}
//       </label>
//       <select
//         id={label.toLowerCase()}
//         name={label.toLowerCase()}
//         value={value}
//         onChange={handleChange}
//         className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//       >
//         <option value="">Any</option>
//         {options.map(option => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Filter;


// import React from 'react';

// const Filter = ({ label, options, value, onFilterChange }) => {
//   // Correctly handle the selection change and call the parent's onFilterChange function
//   const handleChange = (e) => {
//     // Ensure label is converted to the format expected by the state (e.g., lowercase)
//     onFilterChange(e.target.value);
//   };

//   return (
//     <div className="mt-4">
//       <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-700">
//         {label}
//       </label>
//       <select
//         id={label.toLowerCase()}
//         name={label.toLowerCase()}
//         value={value}
//         onChange={handleChange}
//         className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//       >
//         <option value="">Any</option>
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Filter;
