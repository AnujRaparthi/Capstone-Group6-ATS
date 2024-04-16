import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import MainContent from "./components/MainContent.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserProvider } from "./components/UserContext";
import HeaderWrapper from "./components/HeaderWrapper";
import Hrportal from "./components/Hrportal";
import HrHeader from "./components/HrHeader";
import JobDescription from "./components/JobDescription";
import JobApplicationForm from './components/JobApplicationForm';
import ApplicationSuccess from './components/ApplicationSuccess';
import Profile from './components/Profile';
import ManageJobs from "./components/ManageJobs";
import JobApplicationsStatusPage from "./components/JobApplicationsStatusPage";
/* import ViewJobApplications from './components/ViewJobApplications'; */
import ViewApplicants from "./components/ViewApplicants";
import CommunicationForm from './components/CommunicationForm.jsx';
import ManageLocations from "./components/ManageLocations";
import AddLocationForm from './components/AddLocationForm';
import ManageJobFrom from './components/ManageJobForm';
import ManageDepartments from "./components/ManageDepartments";
import AddDepartmentForm from "./components/AddDepartmentForm";
import ViewJobApplications from './components/ViewJobApplications';
import JobApplication from './components/JobApplication';
import HrBanner from "./components/HrBanner";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './components/Home'; // Adjust the import path as needed
import RecruiterSignup from './components/RecruiterSignup';

const stripePromise = loadStripe("pk_test_51P3jtODTqZXkpm4pEf3Qz9QeOewSYUpfwC4vCgRXhMSc20qH6cEaobmYarHSYX11z9cckK55CRHYvks7tmSZQgHM00OvqAsnlp");



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
    setSearchTerm(""); // Clear the search term
    setSubmittedSearch(""); // Also clear the submitted search to reset the results
  };

  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Elements stripe={stripePromise}>
            <Routes>
            <Route path="/home" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><Home /><Footer /></>} />
            </Routes>
          </Elements>
          <Routes>
            <Route path='/HrBanner' element={<HrBanner/>}/>
            <Route
              path="/hrportal"
              element={
                <>
                  <HrHeader />
                  <HrBanner/>
                  <Hrportal />
                  <Footer />
                </>
              }
            />
            <Route
              path="/ManageJobs"
              element={
                <>
                  <HrHeader />
                  <ManageJobs />
                  <Footer />
                </>
              }
            />

            <Route
              path="/ViewJobApplications"
              element={
                <>
                  <HrHeader />
                  <ViewJobApplications />
                  <Footer />
                </>
              }
            />

            <Route
              path="/jobapplication/:applicationId"
              element={
                <>
                  <HrHeader />
                  <JobApplication />
                  <Footer />
                </>
              }
            />


            <Route path='/ManageJobForm' element={<><HrHeader/><ManageJobFrom /></>} />

        

            <Route path="/ManageLocations" element={<><HrHeader/><ManageLocations/><Footer/></>}/>
            <Route path='/ManageDepartments' element={<><HrHeader/><ManageDepartments/><Footer/></>}/>
            <Route path="/AddLocationForm" element={<><HrHeader/><AddLocationForm/></>}/>
            <Route path="/AddDepartmentForm" element={<><HrHeader/><AddDepartmentForm/></>}/>


            <Route path="/status" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><JobApplicationsStatusPage /><Footer /></>} />
            <Route path="/email" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><CommunicationForm /><Footer /></>} />

            {/* header for login and signup */}
            <Route path="/login" element={<>
              <HeaderWrapper
              /><Login /><Footer /></>} />
            <Route path="/signup" element={<>
              <HeaderWrapper
              /><Signup /><Footer /></>} />

            <Route path="/company-signup" element={<>
              <HeaderWrapper
              /><RecruiterSignup /><Footer /></>} /> 

            <Route path="/job/:jobId" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><JobDescription /><Footer /></>} />

            <Route path="/application-success" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><ApplicationSuccess /></>} />

            <Route path="/profile" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><Profile /><Footer /></>} />

            <Route path="/apply-now/:jobId" element={<>
              <HeaderWrapper
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClearSearch={handleClearSearch}
              /><JobApplicationForm /><Footer /></>} />

            <Route path="/ViewApplicants" element={<><HrHeader /> <ViewApplicants /><Footer /></>} />

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
