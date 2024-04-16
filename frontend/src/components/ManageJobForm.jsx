import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ManageJobForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [noOfPositions, setNoOfPositions] = useState("");
  const [state, setState] = useState("");
  const [targetHiringDate, setTargetHiringDate] = useState("");
  const [compensationType, setCompensationType] = useState("");
  const [compensationRangeFrom, setCompensationRangeFrom] = useState("");
  const [compensationRangeTo, setCompensationRangeTo] = useState("");
  const [experience, setExperience] = useState('');
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      const userInfo = localStorage.getItem('user');
      const user = userInfo ? JSON.parse(userInfo) : null;
      const companyID = user?.company_id;

      const params = {};
      if (companyID) {
        params.company_id = companyID;
      }

      try {
        const response = await axios.get("http://localhost:5001/api/Location", { params });
        if (response.status === 200) {
          setLocations(response.data);
        } else {
          console.error("Failed to fetch locations:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInfo = localStorage.getItem('user');
    const user = JSON.parse(userInfo);
    const companyID = user?.company_id || "";

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
      experience: experience,
      location_id: jobLocation,
      company_id: companyID
    };

    try {
      console.log('jobData=',jobData);
      const response = await axios.post("http://localhost:5001/api/create-job", jobData);
      console.log('response=',response);
      if (response.status === 201) {
        console.log("Job posted successfully!");
        navigate('/ManageJobs');
      } else {
        console.error("Error posting job:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="MJ">Create Job</h1>
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
          <select
            id="jobLocation"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
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
          <label htmlFor="jobType">Job Type:</label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
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
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
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
            value={targetHiringDate}
            onChange={(e) => setTargetHiringDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="compensationType">Compensation Type:</label>
          <select
            id="compensationType"
            value={compensationType}
            onChange={(e) => setCompensationType(e.target.value)}
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
          <label htmlFor="compensationRangeFrom">
            Compensation Range From:
          </label>
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
        <div className="form-group">
          <label htmlFor="experience">Experience Needed (in years):</label>
          <input
            type="text"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="post">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default ManageJobForm;


// import React, { useState, useEffect } from "react";

// const ManageJobForm = () => {
//   const [jobTitle, setJobTitle] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [jobLocation, setJobLocation] = useState("");
//   const [jobType, setJobType] = useState("");
//   const [noOfPositions, setNoOfPositions] = useState("");
//   const [state, setState] = useState("");
//   const [targetHiringDate, setTargetHiringDate] = useState("");
//   const [compensationType, setCompensationType] = useState("");
//   const [compensationRangeFrom, setCompensationRangeFrom] = useState("");
//   const [compensationRangeTo, setCompensationRangeTo] = useState("");
//   const [experience, setExperience] = useState('');
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/jobs");
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Fetched jobs:", data); // Log the fetched data
//           setJobs(data);
//         } else {
//           console.error("Failed to fetch jobs:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch jobs:", error);
//       }
//     };
  
//     console.log("Fetching jobs..."); // Log when fetching starts
//     fetchJobs();
  
//     return () => {
//       console.log("Cleanup"); // Log cleanup if needed
//     };
//   }, []);


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const jobData = {
//       job_title: jobTitle,
//       job_type: jobType,
//       no_of_positions: noOfPositions,
//       state: state,
//       target_hiring_date: targetHiringDate,
//       compensation_type: compensationType,
//       compensation_range_from: compensationRangeFrom,
//       compensation_range_to: compensationRangeTo,
//       job_description: jobDescription,
//       experience: experience, 
//     };
//     try {
//       const response = await fetch("http://localhost:5001/api/jobs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(jobData),
//       });

//       if (response.ok) {
//         console.log("Job posted successfully!");
//         /*  // Reset form fields after successful submission
//       setJobTitle('');
//       setJobDescription('');
//       setJobLocation('');
//       setJobType('');
//       setNoOfPositions('');
//       setState('');
//       setTargetHiringDate('');
//       setCompensationType('');
//       setCompensationRangeFrom('');
//       setCompensationRangeTo(''); */
//       } else {
//         console.error("Error posting job:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error posting job:", error);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h1 class="MJ">Create Job</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="jobTitle">Job Title:</label>
//           <input
//             type="text"
//             id="jobTitle"
//             value={jobTitle}
//             onChange={(e) => setJobTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="jobDescription">Job Description:</label>
//           <textarea
//             id="jobDescription"
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="jobLocation">Job Location:</label>
//           <input
//             type="text"
//             id="jobLocation"
//             value={jobLocation}
//             onChange={(e) => setJobLocation(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="jobType">Job Type:</label>
//           <input
//             type="text"
//             id="jobType"
//             value={jobType}
//             onChange={(e) => setJobType(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="noOfPositions">Number of Positions:</label>
//           <input
//             type="number"
//             id="noOfPositions"
//             value={noOfPositions}
//             onChange={(e) => setNoOfPositions(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="state">State:</label>
//           <input
//             type="text"
//             id="state"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="targetHiringDate">Target Hiring Date:</label>
//           <input
//             type="date"
//             id="targetHiringDate"
//             value={targetHiringDate}
//             onChange={(e) => setTargetHiringDate(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="compensationType">Compensation Type:</label>
//           <input
//             type="text"
//             id="compensationType"
//             value={compensationType}
//             onChange={(e) => setCompensationType(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="compensationRangeFrom">
//             Compensation Range From:
//           </label>
//           <input
//             type="number"
//             id="compensationRangeFrom"
//             value={compensationRangeFrom}
//             onChange={(e) => setCompensationRangeFrom(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="compensationRangeTo">Compensation Range To:</label>
//           <input
//             type="number"
//             id="compensationRangeTo"
//             value={compensationRangeTo}
//             onChange={(e) => setCompensationRangeTo(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="experience">Experience:</label>
//           <input
//             type="text"
//             id="experience"
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" id="post">
//           Post Job
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ManageJobForm;
