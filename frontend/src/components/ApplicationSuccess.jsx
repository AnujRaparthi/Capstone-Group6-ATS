import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">
      <h2>You have  succesfully applied for this job</h2>
      <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all jobs
        </button>
    </div>
    
  );
};

export default ApplicationSuccess;