import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import JobIcon from './JobIcon';
import { useUser } from './UserContext'; // Adjust according to your structure

const JobDescription = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user ? user._id : null;
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJobAndCheckApplication = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://capstone-group6-ats-backend.vercel.app/api/jobs/${jobId}`);
        setJob(response.data);
        if (userId) {
          const checkResponse = await axios.get(`/api/applications/check-application/${jobId}/${userId}`);
          setHasApplied(checkResponse.data.hasApplied);
        }
      } catch (error) {
        console.error("Failed to fetch job or check application status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobAndCheckApplication();
  }, [jobId, userId]);

  if (isLoading) {
    return <div>Loading job details...</div>;
  }

  if (!job) {
    return <div>No job details found or error fetching job details.</div>;
  }

  const handleApplyNow = async () => {
    try {
      const response = await axios.get(`http://capstone-group6-ats-backend.vercel.app/api/applications/check-application/${jobId}/${userId}`);
      if (response.data.hasApplied) {
        alert('You have already applied for this job.');
      } else {
        navigate(`/apply-now/${jobId}`);
      }
    } catch (error) {
      console.error('Error checking application status:', error);
    }
  };

  // const postedDate = new Date(job.posted_at);
  // const currentDate = new Date();
  // const daysSincePosted = Math.round((currentDate - postedDate) / (1000 * 60 * 60 * 24));
  // const postedText = daysSincePosted < 7 ? "Posted recently" : `${daysSincePosted} days ago`;

  return (
    <div className="content">
      <div className="mt-5 ml-10">
        <button onClick={() => navigate('/')} className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all jobs
        </button>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-5 mb-5 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="md:grid md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{job.job_title}</h2>
            </div>
            <div className="job-icons px-4 py-3">
              <JobIcon icon="fas fa-briefcase" text={job.experience ?? 'Not specified'} />
              <JobIcon icon="fas fa-map-marker-alt" text="Milton,ON" />
              <JobIcon icon="fas fa-building" text="IT" />
              <JobIcon icon="far fa-clock" text="Posted recently" />
            </div>
            <div className="px-4 py-3">
              <p className="text-gray-700 mb-4">{job.job_description}</p>
            </div>


            <div className="px-4 py-5 sm:px-6">
              <p className="text-gray-700 mb-4">{job.description}</p>
              {/* <h3 className="text-m font leading-7 text-gray-900 sm:truncate">Responsibilities: proficiency in data analysis tools, strong problem-solving skills, and effective communication are essential.</h3>
              <ul className="list-disc ml-5 mb-4">
                {job.responsibilities?.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
              <h3 className="text-lg font leading-7 text-gray-900 sm:truncate">Requirements: SQL, Data Science,Satistics</h3>
              <ul className="list-disc ml-5 mb-4">
                {job.requirements?.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul> */}
            </div>
          </div>

          <div className="md:col-span-1 p-6">
            {!userId ? (
              <button onClick={() => navigate('/login')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Log in to Apply
              </button>
            ) : hasApplied ? (
              <div>You have already applied for this job.</div>
            ) : (
              <button onClick={handleApplyNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Apply now
              </button>
            )}



            <div className="overflow-x-auto">
              <h3 className="font-bold text-lg mb-3"></h3>
              <table className="table-fixed w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600 font-medium">Type</td>
                    <td className="py-2 text-gray-900">Full-Time</td>
                  </tr>
                  <tr className="bg-gray-100 border-b">
                    <td className="py-2 text-gray-600 font-medium">Location</td>
                    <td className="py-2 text-gray-900">Milton</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600 font-medium">Department</td>
                    <td className="py-2 text-gray-900">IT</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="py-2 text-gray-600 font-medium">Experience</td>
                    <td className="py-2 text-gray-900">{job.experience}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
