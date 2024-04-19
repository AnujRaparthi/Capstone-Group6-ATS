import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
      jobTitle: '',
      jobDescription: '',
      jobLocation: '',
      jobType: '',
      noOfPositions: '',
      state: '',
      targetHiringDate: '',
      compensationType: '',
      compensationRangeFrom: '',
      compensationRangeTo: '',
      experience: '',
      company_id: '',
      department: ''
    });
    const [locations, setLocations] = useState([]);
    const [departments, setDepartments] = useState([]);
  
    useEffect(() => {
      fetchLocations();
      fetchDepartments();
      if (jobId) {
        fetchJobDetails(jobId);
      }
    }, [jobId]);
  
    const fetchLocations = async () => {
      const userInfo = localStorage.getItem('user');
      const user = userInfo ? JSON.parse(userInfo) : null;
      const companyID = user?.company_id;
  
      try {
        const response = await axios.get("http://localhost:5001/api/Location", { params: { company_id: companyID } });
        if (response.status === 200) {
          setLocations(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    const fetchDepartments = async () => {
      const userInfo = localStorage.getItem('user');
      const user = userInfo ? JSON.parse(userInfo) : null;
      const companyID = user?.company_id;
  
      const params = {};
      if (companyID) {
        params.company_id = companyID;
      }
  
      try {
        const response = await axios.get("http://localhost:5001/api/Department", { params });
  
        if (response.status === 200) {
          setDepartments(response.data);
        } else {
          console.error("Failed to fetch departments:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };
  
    const fetchJobDetails = async (jobId) => {
      try {
        const response = await axios.get(`http://localhost:5001/api/jobs/${jobId}`);
        if (response.status === 200) {
          const job = response.data;
          setJobData({
            jobTitle: job.job_title,
            jobDescription: job.job_description,
            jobLocation: job.location_id,
            jobType: job.job_type,
            noOfPositions: job.no_of_positions.toString(),
            state: job.state,
            targetHiringDate: job.target_hiring_date.substring(0, 10),
            compensationType: job.compensation_type,
            compensationRangeFrom: job.compensation_range_from.toString(),
            compensationRangeTo: job.compensation_range_to.toString(),
            experience: job.experience,
            company_id: job.company_id,
            department: job.department_id
          });
        }
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setJobData(prevData => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formattedData = {
        job_title: jobData.jobTitle,
        job_description: jobData.jobDescription,
        location_id: jobData.jobLocation,
        job_type: jobData.jobType,
        no_of_positions: parseInt(jobData.noOfPositions),
        state: jobData.state,
        target_hiring_date: jobData.targetHiringDate,
        compensation_type: jobData.compensationType,
        compensation_range_from: parseFloat(jobData.compensationRangeFrom),
        compensation_range_to: parseFloat(jobData.compensationRangeTo),
        experience: jobData.experience,
        company_id: jobData.company_id,
        department_id: jobData.department_id
      };
      try {
        const response = await axios.put(`http://localhost:5001/api/update-job/${jobId}`, formattedData);
        if (response.status === 200) {
          alert('Job updated successfully!');
          navigate('/ManageJobs');
        }
      } catch (error) {
        console.error('Error updating job:', error);
        alert('Failed to update job.');
      }
    };

    const experienceRanges = [
      "0-1 Years",
      "1-3 Years",
      "3-5 Years",
      "5+ Years"
    ];

  return (
    <div className="form-container">
      <h1 className="MJ">Update Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description:</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={jobData.jobDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobLocation">Job Location:</label>
          <select
            id="jobLocation"
            name="jobLocation"
            value={jobData.jobLocation}
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.location_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={jobData.department}
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="jobType">Job Type:</label>
          <select
            id="jobType"
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience Needed:</label>
          <select
            id="experience"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select experience range</option>
            {experienceRanges.map((range, index) => (
              <option key={index} value={range}>{range}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="noOfPositions">Number of Positions:</label>
          <input
            type="number"
            id="noOfPositions"
            name="noOfPositions"
            value={jobData.noOfPositions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Publish State:</label>
          <select
            id="state"
            name="state"
            value={jobData.state}
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
            <option value="">Select job state</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="targetHiringDate">Target Hiring Date:</label>
          <input
            type="date"
            id="targetHiringDate"
            name="targetHiringDate"
            value={jobData.targetHiringDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="compensationType">Compensation Type:</label>
          <select
            id="compensationType"
            name="compensationType"
            value={jobData.compensationType}
            onChange={handleChange}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select compensation type</option>
            <option value="Hourly">Hourly</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="compensationRangeFrom">Compensation Range From:</label>
          <input
            type="number"
            id="compensationRangeFrom"
            name="compensationRangeFrom"
            value={jobData.compensationRangeFrom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="compensationRangeTo">Compensation Range To:</label>
          <input
            type="number"
            id="compensationRangeTo"
            name="compensationRangeTo"
            value={jobData.compensationRangeTo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;

