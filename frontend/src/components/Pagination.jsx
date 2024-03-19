import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {

  // console.log(itemsPerPage,totalItems,paginate,currentPage);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-2">
        {pageNumbers.map(number => (
          <li key={number} className="list-none">
            <button 
              onClick={() => paginate(number)}
              className={`px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
