import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobIcon from './JobIcon';
import { Link } from 'react-router-dom';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map((job, index) => (
        <div key={index} className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-md leading-5 font-bold text-black truncate">{job.job_title}</div>
              <Link to={`/job/${job._id}`} className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{ backgroundColor: '#067DCD' }}>
                View Full Job
              </Link>
            </div>
            <div className="job-icons py-2">
              <JobIcon icon="fas fa-briefcase" text={job.experience ?? 'Not specified'} />
              <JobIcon icon="fas fa-map-marker-alt" text="Milton,ON"/>
              <JobIcon icon="fas fa-building" text="IT" />
              <JobIcon icon="far fa-clock" text="Recently posted" />
            </div>
          </div>
          <div className="px-4 pb-4 sm:px-6">
            <p className="text-sm leading-5 text-gray-700">{job.job_description.substring(0, 150)}...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListing;
