import React from 'react';
import JobIcon from './JobIcon';
import { Link } from 'react-router-dom'; 

const JobListing = ({ id,title, experience, location, department, postedTime, description }) => (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
      <div className="px-4 py-4 sm:px-6">
      <div className="flex justify-between items-center">
          <div className="text-md leading-5 font-bold text-black truncate">{title}</div>
          <Link to={`/job/${id}`} className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" style={{ backgroundColor: '#067DCD' }}>
            View Full Job
          </Link>
        </div>
        <div className="job-icons py-2">
          <JobIcon icon="fas fa-briefcase" text={experience} />
          <JobIcon icon="fas fa-map-marker-alt" text={location} />
          <JobIcon icon="fas fa-building" text={department} />
          <JobIcon icon="far fa-clock" text={postedTime} />
        </div>
      </div>
      <div className="px-4 pb-4 sm:px-6">
        <p className="text-sm leading-5 text-gray-700">{description}</p>
      </div>
    </div>
  );

  export default JobListing;