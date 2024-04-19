import React from 'react';

const stages = [
  'Initial Screening',
  'Technical / Functional Interview',
  'HR Interview',
  'Offer'
];

const JobApplicationCard = ({ application }) => {
  const { jobTitle, location, appliedDate, currentStage, status } = application;

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-green-600';
      case 'On Hold':
        return 'bg-yellow-400';
      case 'Rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const stageColorClass = (stageIndex, currentStage, status) => {
    if (stageIndex + 1 < currentStage) {
      return 'primary-blue-bg'; // Past stages are blue
    } else if (stageIndex + 1 === currentStage) {
      return getStatusClass(status); // Current stage color depends on the status
    } else {
      return 'bg-gray-300'; // Future stages are gray
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-md mb-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">{jobTitle}</h3>
          <p className="text-sm text-gray-600">{location}</p>
          <p className="text-sm text-gray-600">Applied: {appliedDate}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Stage - {stages[currentStage - 1]}</p>
          <p className={`text-sm font-semibold`}>Status - {status}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <div key={index} className="text-center">
              <p className="text-xs uppercase mb-3">{stage}</p>
              <div className={`w-6 h-6 mx-auto rounded-full ${stageColorClass(index, currentStage, status)}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationCard;


// import React from 'react';

// const stages = [
//   'Initial Screening',
//   'Technical / Functional Interview',
//   'HR Interview',
//   'Offer'
// ];

// const JobApplicationCard = ({ application }) => {
//   const { jobTitle, location, appliedDate, applicationNumber, currentStage, status } = application;

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'Pending':
//         return 'bg-green-600';
//       case 'On Hold':
//         return 'bg-yellow-400';
//       case 'Rejected':
//         return 'bg-red-500';
//       default:
//         return 'bg-gray-300';
//     }
//   };

//   // Assign the correct status color class to each stage circle
//   const stageColorClass = (stageIndex, currentStage, status) => {
//     if (stageIndex + 1 < currentStage) {
//       return 'primary-blue-bg'; // Past stages are blue
//     } else if (stageIndex + 1 === currentStage) {
//       return getStatusClass(status); // Current stage color depends on the status
//     } else {
//       return 'bg-gray-300'; // Future stages are gray
//     }
//   };

//   return (
//     <div className="bg-white shadow sm:rounded-md mb-4 p-4">
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h3 className="text-lg font-bold">{jobTitle}</h3>
//           <p className="text-sm text-gray-600">{location}</p>
//           <p className="text-sm text-gray-600">Applied: {appliedDate}</p>
//           <p className="text-sm text-gray-600">Application Number: {applicationNumber}</p>
//         </div>
//         <div>
//           <p className="text-sm font-semibold">Stage - {stages[currentStage - 1]}</p>
//           <p className={`text-sm font-semibold`}>Status - {status}</p>
//         </div>
//       </div>
//       <div className="border-t border-gray-200 pt-4">
//         <div className="grid grid-cols-4 gap-4">
//           {stages.map((stage, index) => (
//             <div key={index} className="text-center">
//               <p className="text-xs uppercase mb-3">{stage}</p>
//               <div className={`w-6 h-6 mx-auto rounded-full ${stageColorClass(index, currentStage, status)}`}></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobApplicationCard;
