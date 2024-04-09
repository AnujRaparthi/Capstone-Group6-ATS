import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobApplication = () => {
    const { applicationId } = useParams();

    console.log('applicationId=',applicationId);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        preferredLocation: '',
        totalWorkExperience: '',
        highestEducationalQualification: '',
        resume: null,
    });

    useEffect(() => {
        const fetchApplication = async () => {
            try {

                console.log('Inside applicationId=',applicationId);
                const response = await axios.get(`http://localhost:5001/api/job-application/${applicationId}`);

                console.log(response.data);
                if (response.data) {
                    setFormData({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        preferredLocation: response.data.preferredLocation,
                        totalWorkExperience: response.data.totalWorkExperience,
                        highestEducationalQualification: response.data.highestEducationalQualification,
                        // Assuming you can fetch the path to the resume if it's stored on the server
                        resume: response.data.resumePath,
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

        // ... handle form submission
    };

    return (
        
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
    );
};

export default JobApplication;
