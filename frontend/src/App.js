import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import MainContent from './components/MainContent.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import { UserProvider } from './components/UserContext';
import HeaderWrapper from './components/HeaderWrapper';
import Hrportal from "./components/Hrportal";
import HrHeader from "./components/HrHeader";
import JobDescription from './components/JobDescription';
import ManageJobs from "./components/ManageJobs";

const App = () => {
  const [filters, setFilters] = useState({
    location: "",
    department: "",
    experience: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSubmittedSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm(''); // Clear the search term
    setSubmittedSearch(''); // Also clear the submitted search to reset the results
  };

  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Routes>
            <Route
              path="/hrportal"
              element={
                <>
                  < HrHeader />
                  <Hrportal />
                  <Footer />
                </>
              }
            />
            <Route path="/ManageJobs" element={
                <>
                  < HrHeader />
                  <ManageJobs />
                  <Footer />
                </>
              } />
            {/* header for login and signup */}
            <Route path="/login" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><Login /><Footer /></>} />
            <Route path="/signup" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><Signup /><Footer /></>} />
            <Route path="/job/:id" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><JobDescription /><Footer /></>} />



            <Route
              path="/"
              element={
                <>
                  <HeaderWrapper
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                    onClearSearch={handleClearSearch}
                  />
                  <div className="content">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <FilterSection
                          filters={filters}
                          onFilterChange={setFilters}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <MainContent
                          filters={filters}
                          searchTerm={submittedSearch}
                        />
                      </div>
                    </div>
                  </div>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
