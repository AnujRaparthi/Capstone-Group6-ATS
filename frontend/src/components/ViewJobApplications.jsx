import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewJobApplications = () => {
    const [jobApplications, setJobApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const result = await axios.get('/api/jobapplications'); 
            setJobApplications(result.data);
        };

        fetchApplications();
    }, []);

    return (
        <div> 
           
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Department</th>
                        <th>Experience</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {jobApplications.map((application) => (
                        <tr key={application._id}> 
                            <td>{application.position}</td>
                            <td>{application.company}</td>
                            <td>{application.location}</td>
                            <td>{application.department}</td>
                            <td>{application.experience}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewJobApplications;
