import React, { useState } from 'react';

const ManageJobs = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [noOfPositions, setNoOfPositions] = useState('');
  const [state, setState] = useState('');
  const [targetHiringDate, setTargetHiringDate] = useState('');
  const [compensationType, setCompensationType] = useState('');
  const [compensationRangeFrom, setCompensationRangeFrom] = useState('');
  const [compensationRangeTo, setCompensationRangeTo] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const jobData = {
      job_title: jobTitle,
      job_type: jobType,
      no_of_positions: noOfPositions,
      state: state,
      target_hiring_date: targetHiringDate,
      compensation_type: compensationType,
      compensation_range_from: compensationRangeFrom,
      compensation_range_to: compensationRangeTo,
      job_description: jobDescription,
      
    };
    try {
      const response =  fetch('/api/jobs', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData) 
      });
  
      if (response.ok) {
        console.log('Job posted successfully!');
        
      } else {
        console.error('Error posting job:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
    
  };

  return (
    <div className="form-container">
      <h1 class="MJ">Manage Jobs</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description:</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobLocation">Job Location:</label>
          <input
            type="text"
            id="jobLocation"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobType">Job Type:</label>
          <input
            type="text"
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="noOfPositions">Number of Positions:</label>
          <input
            type="number"
            id="noOfPositions"
            value={noOfPositions}
            onChange={(e) => setNoOfPositions(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetHiringDate">Target Hiring Date:</label>
          <input
            type="date" 
            id="targetHiringDate"
            value={targetHiringDate}
            onChange={(e) => setTargetHiringDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="compensationType">Compensation Type:</label>
          <input
            type="text"
            id="compensationType"
            value={compensationType}
            onChange={(e) => setCompensationType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="compensationRangeFrom">Compensation Range From:</label>
          <input
            type="number"
            id="compensationRangeFrom"
            value={compensationRangeFrom}
            onChange={(e) => setCompensationRangeFrom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="compensationRangeTo">Compensation Range To:</label>
          <input
            type="number"
            id="compensationRangeTo"
            value={compensationRangeTo}
            onChange={(e) => setCompensationRangeTo(e.target.value)}
            required
          />
        </div>
        <button type="submit" id='post'>Post Job</button>
      </form>
    </div>
  );
};

export default ManageJobs;