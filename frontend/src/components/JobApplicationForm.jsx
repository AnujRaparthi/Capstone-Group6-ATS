import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobIcon from './JobIcon';
import { useUser } from './UserContext';
import axios from 'axios';

const JobApplicationForm = () => {
    const { jobId } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();

    console.log('jobId=',jobId);

    const [jobDetails, setJobDetails] = useState({
        jobTitle: '',
        experience: '',
        location: '',
        company_id: '',
        company: '',
        postedTime: '',
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        totalWorkExperience: '',
        highestEducationalQualification: '',
        resume: null,
    });
    // const [submissionMessage, setSubmissionMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first file
        setFormData((prevFormData) => ({
            ...prevFormData,
            resume: file,
        }));
    };

    useEffect(() => {
        if (!user) {
            alert('You must be logged in to apply for a job.');
            navigate('/login');
            return;
        }

        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/jobdetail/${jobId}`);
                if (response.status === 200) {

                    console.log('response.data=',response.data);
                    const { job_title, experience, location_id, company_id, department_id } = response.data;
                    setJobDetails({
                        jobTitle: job_title,
                        experience,
                        location : location_id.location_name,
                        company_id: company_id._id,
                        company: company_id.name,
                        department: department_id.name,
                        postedTime: `Posted on ${new Date(parseInt(response.data._id.substring(0, 8), 16) * 1000).toDateString()}`
                    });
                } else {
                    console.log('Failed to fetch job details');
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [user, navigate,jobId]);


    // Adjust the handleSubmit function inside JobApplicationForm
    const fileInputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submissionFormData = new FormData();
        // Append text fields
        submissionFormData.append('firstName', formData.firstName);
        submissionFormData.append('lastName', formData.lastName);
        submissionFormData.append('email', formData.email);
        submissionFormData.append('phone', formData.phone);
        submissionFormData.append('jobId', jobId); // Assuming jobId is a variable holding the job's ID
        console.log("Appending jobId: ", jobId);
        submissionFormData.append('userId', user._id);
        console.log("Appending userId: ", user._id);
        submissionFormData.append('totalWorkExperience', formData.totalWorkExperience);
        submissionFormData.append('highestEducationalQualification', formData.highestEducationalQualification);
        submissionFormData.append('company_id', jobDetails.company_id);

        if (fileInputRef.current && fileInputRef.current.files[0]) {
            submissionFormData.append('resume', fileInputRef.current.files[0]);
            console.log("Appending file to FormData:", fileInputRef.current.files[0]);
        } else {
            console.error("No file selected for appending to FormData.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5001/api/applications', submissionFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Submission successful:', response.data);
            navigate('/application-success');
        } catch (error) {
            console.error('Failed to submit application:', error.response ? error.response.data : error);
        }
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
            <div className="flex items-center justify-center min-h-screen">

                <div className='bg-white shadow mt-10 mb-10 w-full max-w-xl p-6 border border-gray-300 rounded-md'>

                    <div className="text-center mb-4">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    {jobDetails.jobTitle}
                        </h2>
                        <div className="job-icons flex justify-center space-x-4 py-2">
                            {/* <JobIcon icon="fas fa-briefcase" text={jobDetails.experience} />
                            <JobIcon icon="fas fa-map-marker-alt" text="Waterloo, Ontario" />
                            <JobIcon icon="fas fa-building" text="IT" />
                            <JobIcon icon="far fa-clock" text="Posted 10 mins ago" /> */}

                            <JobIcon icon="fas fa-building" text={jobDetails.company} />
                            <JobIcon icon="fas fa-map-marker-alt" text={jobDetails.location} />
                            <JobIcon icon="fas fa-briefcase" text={jobDetails.experience} />
                            <JobIcon icon="fas fa-sitemap" text={jobDetails.department} />
                            <JobIcon icon="far fa-clock" text={jobDetails.postedTime} />
                        </div>
                    </div>

                    <div className="sm:mx-auto sm:w-full">
                        <h4 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Job Application
                        </h4>

                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="input-field">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                                    First Name
                                </label>
                                <input id="firstName" name="firstName" type="text" required
                                    className="appearance-none block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.firstName} onChange={handleChange} />
                            </div>

                            <div className="input-field">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                                    Last Name
                                </label>
                                <input id="lastName" name="lastName" type="text" required
                                    className="appearance-none block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.lastName} onChange={handleChange} />
                            </div>

                            <div className="input-field">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email Address
                                </label>
                                <input id="email" name="email" type="email" required
                                    className="appearance-none block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.email} onChange={handleChange} />
                            </div>

                            <div className="input-field">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                                    Phone Number
                                </label>
                                <input id="phone" name="phone" type="text" required
                                    className="appearance-none block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.phone} onChange={handleChange} />
                            </div>

                            <div className="input-field">
                                <label htmlFor="totalWorkExperience" className="block text-sm font-medium text-gray-900">
                                    Total Work Experience
                                </label>
                                <select id="totalWorkExperience" name="totalWorkExperience" required onChange={handleChange} value={formData.totalWorkExperience} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Select Total Work Experience</option>
                                    <option value="0-1">0-1 Years</option>
                                    <option value="1-3">1-3 Years</option>
                                    <option value="3-5">3-5 Years</option>
                                    <option value="5+">5+ Years</option>
                                </select>
                            </div>

                            <div className="input-field">
                                <label htmlFor="highestEducationalQualification" className="block text-sm font-medium text-gray-900">
                                    Highest Educational Qualification
                                </label>
                                <select id="highestEducationalQualification" name="highestEducationalQualification" required onChange={handleChange} value={formData.highestEducationalQualification} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Select Highest Educational Qualification</option>
                                    <option value="High School">High School</option>
                                    <option value="Bachelor's">Bachelor's Degree</option>
                                    <option value="Master's">Master's Degree</option>
                                    <option value="Ph.D.">Ph.D.</option>
                                </select>
                            </div>

                            <div className="input-field">
                                <label htmlFor="resume" className="block text-sm font-medium text-gray-900">
                                    Resume
                                </label>
                                <input id="resume" ref={fileInputRef} name="resume" type="file" required
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    onChange={handleFileChange} />
                            </div>

                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobApplicationForm;
