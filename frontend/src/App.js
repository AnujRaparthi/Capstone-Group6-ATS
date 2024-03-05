import React, { useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import MainContent from './components/MainContent.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';

const App = () => {
  const [filters, setFilters] = useState({
    location: '',
    department: '',
    experience: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <Header onSearchChange={handleSearchChange} />
      <div className="content">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <FilterSection filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="md:col-span-3">
          <MainContent filters={filters} searchTerm={searchTerm}/>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;