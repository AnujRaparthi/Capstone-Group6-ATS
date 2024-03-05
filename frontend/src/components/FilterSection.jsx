import React from 'react';
import Filter from './Filter';

const FilterSection = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filterName, value) => {
    // Update the filters state in the parent App component

    console.log(filterName,value);
    onFilterChange({
      ...filters,
      [filterName]: value
    });
    console.log(filters);
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
          <button onClick={handleClearFilters} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none"
  style={{ backgroundColor: '#067DCD' }}>
            Clear filters
          </button>
        </div>
        <Filter 
          label="Location" 
          options={['Waterloo, Ontario','Milton, Ontario']} 
          value={filters.location}
          onFilterChange={(value) => handleFilterChange('location', value)}
        />
        <Filter 
          label="Department" 
          options={['IT', 'Marketing','Sales']} 
          value={filters.department}
          onFilterChange={(value) => handleFilterChange('department', value)} 
        />
        <Filter 
          label="Experience" 
          options={['1-3 years', '4-7 years']} 
          value={filters.experience}
          onFilterChange={(value) => handleFilterChange('experience', value)}
        />
      </div>
    </aside>
  );
};

export default FilterSection;
