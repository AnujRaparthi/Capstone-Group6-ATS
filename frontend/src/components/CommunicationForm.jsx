import React, { useState } from 'react';
import axios from 'axios';

const CommunicationForm = ({ applicantEmail, jobDetails }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment.trim()) return;

    const emailContent = `
    <html>
    <body>
      <p><strong>Job Title:</strong> ${jobDetails.jobTitle}</p>
      <p><strong>Company:</strong> ${jobDetails.company}</p>
      <p><strong>Location:</strong> ${jobDetails.location}</p>
      <p><strong>Notification:</strong> ${comment}</p>
    </body>
    </html>
  `;

    try {
      const response = await axios.post('http://localhost:5001/api/send-email', {
                email: 'anujraparthi.inry@gmail.com',
                content: emailContent
            });
      alert('Message sent!');
      setComment('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="content">
      <div className="max-w-7xl mx-auto py-6 sm:px-6">
        <h1 className="text-2xl font-bold mb-6">Message new hire</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className="shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Write your message here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Post Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// const CommunicationForm = ({ applicantEmail }) => {
//   const [comment, setComment] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!comment.trim()) return;

//     try {
//       const response = await axios.post('http://localhost:5001/api/send-email', { email: 'anuj.raparthi@gmail.com', comment });
//       //const response = await axios.post('/api/send-email', { email: applicantEmail, comment });
//       alert('Message sent!');
//       setComment('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//       alert('Failed to send message.');
//     }
//   };

//   return (
//     <div className="content">
//     <div className="max-w-7xl mx-auto py-6 sm:px-6">
//       <h1 className="text-2xl font-bold mb-6">Message new hire</h1>
//       <form onSubmit={handleSubmit}>
//       <div>
//         <textarea
//           id="comment"
//           name="comment"
//           rows={4}
//           className="shadow-sm mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
//           placeholder="Write your message here..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           required
//         ></textarea>
//       </div>
//       <button
//         type="submit"
//         className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Post Message
//       </button>
//     </form>
//     </div>
//     </div>
//   );
// };


// export default CommunicationForm;
