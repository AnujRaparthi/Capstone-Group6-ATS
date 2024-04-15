import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobIcon from './JobIcon';
import { useUser } from './UserContext';
import axios from 'axios';


const JobApplication = () => {
    const { applicationId } = useParams();

    console.log('applicationId=', applicationId);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        preferredLocation: '',
        totalWorkExperience: '',
        highestEducationalQualification: '',
        resumeFile: null,
        stage: '',
        status: '',
    });

    useEffect(() => {
        const fetchApplication = async () => {
            try {

                console.log('Inside applicationId=', applicationId);
                const response = await fetch(`https://capstone-group6-ats-backend.vercel.app/api/job-application/${applicationId}`);
                const data = await response.json();
                console.log('data=', data);
                if (response.ok) {
                    setFormData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        preferredLocation: data.preferredLocation,
                        totalWorkExperience: data.totalWorkExperience,
                        highestEducationalQualification: data.highestEducationalQualification,
                        resumeFile: data.resume_file,
                        stage: data.stage,
                        status: data.status
                    });
                }
            } catch (error) {
                console.error('Failed to fetch application:', error);
            }
        };

        fetchApplication();
    }, [applicationId]);

    // ... rest of your component

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        // ... handle file change
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create an object with the updated data
        const updateData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            preferredLocation: formData.preferredLocation,
            totalWorkExperience: formData.totalWorkExperience,
            highestEducationalQualification: formData.highestEducationalQualification,
            stage: formData.stage,
            status: formData.status,
        };

        try {
            // Send PUT request to the server to update the job application
            const response = await axios.put(`https://capstone-group6-ats-backend.vercel.app/api/update-application/${applicationId}`, updateData);

            // Handle the response from the server
            if (response.status === 200) {
                alert('Application updated successfully!');
                // Redirect or perform additional actions
            }
        } catch (error) {
            console.error('Failed to update application:', error);
            alert('Failed to update application.');
        }
    };

    const downloadResume = () => {
        if (formData.resumeFile) {
            // Convert the array data into a Blob
            const byteArray = new Uint8Array(formData.resumeFile.data.data);
            const blob = new Blob([byteArray], { type: formData.resumeFile.contentType });

            // Create a link and trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = formData.resumeFile.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen">

            <div className='bg-white shadow mt-10 mb-10 w-full max-w-xl p-6 border border-gray-300 rounded-md'>

                <div className="text-center mb-4">
                    <p className="font-medium text-lg">Data Analyst</p>
                    <div className="job-icons flex justify-center space-x-4 py-2">
                        <JobIcon icon="fas fa-briefcase" text="1 - 3 years" />
                        <JobIcon icon="fas fa-map-marker-alt" text="Waterloo, Ontario" />
                        <JobIcon icon="fas fa-building" text="IT" />
                        <JobIcon icon="far fa-clock" text="Posted 10 mins ago" />
                    </div>
                </div>

                <div className="sm:mx-auto sm:w-full">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Job Application
                    </h2>

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
                            <label htmlFor="preferredLocation" className="block text-sm font-medium text-gray-900">
                                Preferred Location
                            </label>
                            <select id="preferredLocation" name="preferredLocation" required onChange={handleChange} value={formData.preferredLocation} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select Preferred Location</option>
                                <option value="Remote">Remote</option>
                                <option value="New York">New York</option>
                                <option value="San Francisco">San Francisco</option>
                                <option value="Austin">Austin</option>
                            </select>
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
                            <label htmlFor="stage" className="block text-sm font-medium text-gray-900">
                                Stage
                            </label>
                            <select id="stage" name="stage" required onChange={handleChange} value={formData.stage} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="Initial Screening">Initial Screening</option>
                                <option value="Technical / Functional Interview">Technical / Functional Interview</option>
                                <option value="HR Interview">HR Interview</option>
                                <option value="Offer">Offer</option>
                            </select>
                        </div>

                        <div className="input-field">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-900">
                                Status
                            </label>
                            <select id="status" name="status" required onChange={handleChange} value={formData.status} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="Pending">Pending</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="input-field">
                            <label htmlFor="resume" className="block text-sm font-medium text-gray-900">
                                Resume
                            </label>
                            {formData.resumeFile && (
                                <a onClick={downloadResume} className="text-blue-500 cursor-pointer">
                                    {formData.resumeFile.fileName} (click to download)
                                </a>
                            )}
                        </div>

                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Update Application
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApplication;
