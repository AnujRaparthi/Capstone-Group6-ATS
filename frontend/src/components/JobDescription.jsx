import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobIcon from './JobIcon';

const JobDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const jobDetails = {
    id,
    title: "Data Analyst",
    type: "Full-time",
    experience: "1-3 years",
    location: "Waterloo, Ontario",
    department: "IT",
    postedTime: "Posted 18 mins ago",
    description: "Responsible for collecting, cleaning, and analyzing data, creating insightful reports and visualizations, utilizing tools like SQL, Python, and Tableau, while collaborating with cross-functional teams to provide data-driven recommendations for decision-making. Bachelor’s degree in a relevant field, proficiency in data analysis tools, strong problem-solving skills, and effective communication are essential.",
    responsibilities: [
      'Data Collection and Cleaning: Gather and clean raw data from various sources to ensure accuracy and completeness.',
      'Implement data cleaning and transformation processes to prepare datasets for analysis.',

    ],
    requirements: [
      "Bachelor's degree in a relevant field (e.g., Statistics, Mathematics, Computer Science).",
      'Experience with data analysis tools and languages (e.g., SQL, Python, R).',
      'Strong proficiency in visualization tools (Tableau, Power BI, etc.).',

    ],
  };

  const handleApplyNow = () => {
    console.log("Apply now clicked");
  };

  return (
    <>
      <div className="mt-5 ml-10">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-5 mb-5 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="md:grid md:grid-cols-3">
          <div className="md:col-span-2">

            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{jobDetails.title}</h2>
            </div>

            <div className="job-icons px-4 py-3">
              <JobIcon icon="fas fa-briefcase" text={jobDetails.experience} />
              <JobIcon icon="fas fa-map-marker-alt" text={jobDetails.location} />
              <JobIcon icon="fas fa-building" text={jobDetails.department} />
              <JobIcon icon="far fa-clock" text={jobDetails.postedTime} />
            </div>

            <div className="px-4 py-5 sm:px-6">
              <p className="text-gray-700 mb-4">{jobDetails.description}</p>
              <h3 className="text-m font-bold leading-7 text-gray-900 sm:truncate">Responsibilities:</h3>
              <ul className="list-disc ml-5 mb-4">
                {jobDetails.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
              <h3 className="text-m font-bold leading-7 text-gray-900 sm:truncate">Requirements:</h3>
              <ul className="list-disc ml-5 mb-4">
                {jobDetails.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-1 p-6">
            <button onClick={handleApplyNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
              Apply now
            </button>

            <div className="overflow-x-auto">
              <h3 className="font-bold text-lg mb-3">Details</h3>

              <table className="table-fixed w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600 font-medium">Job ID</td>
                    <td className="py-2 text-gray-900">{jobDetails.id}</td>
                  </tr>
                  <tr className="bg-gray-100 border-b">
                    <td className="py-2 text-gray-600 font-medium">Type</td>
                    <td className="py-2 text-gray-900">{jobDetails.type}</td>
                  </tr><tr className="border-b">
                    <td className="py-2 text-gray-600 font-medium">Location</td>
                    <td className="py-2 text-gray-900">{jobDetails.location}</td>
                  </tr>
                  <tr className="bg-gray-100 border-b">
                    <td className="py-2 text-gray-600 font-medium">Department</td>
                    <td className="py-2 text-gray-900">{jobDetails.department}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600 font-medium">Experience</td>
                    <td className="py-2 text-gray-900">{jobDetails.experience}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="py-2 text-gray-600 font-medium">Posted</td>
                    <td className="py-2 text-gray-900">{jobDetails.postedTime}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
