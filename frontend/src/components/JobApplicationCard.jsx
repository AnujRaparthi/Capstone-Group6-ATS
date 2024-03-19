//Working Code
import React from 'react';

const stages = [
  'Initial Screening',
  'Technical / Functional Interview',
  'HR Interview',
  'Offer'
];

const JobApplicationCard = ({ application }) => {
  const { jobTitle, location, appliedDate, applicationNumber, currentStage, status } = application;

  console.log('currentStage=',currentStage);

  return (
    <div className="bg-white shadow sm:rounded-md mb-6 p-4">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">{jobTitle}</h3>
          <p className="text-sm text-gray-600">{location}</p>
          <p className="text-sm text-gray-600">Applied: {appliedDate}</p>
          <p className="text-sm text-gray-600">Application Number: {applicationNumber}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Stage - {stages[currentStage - 1]}</p>
          <p className="text-sm font-semibold">Status - {status}</p>
          {/* <p className={`text-sm font-semibold ${status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>Status - {status}</p> */}
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <div key={index} className={`text-center ${currentStage === index+1 ? 'text-green-600' : currentStage > index ? 'primary-blue-text' : 'text-gray-400'}`}>
              <p className="text-xs uppercase mb-3">{stage}</p>
              <div className={`w-6 h-6 mx-auto rounded-full ${currentStage === index+1 ? 'bg-green-600' : currentStage > index ? 'primary-blue-bg' : 'bg-gray-300'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationCard;

// import React from 'react';

// const JobApplicationCard = ({ application }) => {
//   const { jobTitle, location, appliedDate, applicationNumber, currentStage, status } = application;
//   const stages = [
//     'Initial Screening',
//     'Technical / Functional Interview',
//     'HR Interview',
//     'Offer'
//   ];

//   const stageClasses = (index) => {
//     let baseClasses = "w-6 h-6 mx-auto rounded-full";
//     if (index < currentStage) return `${baseClasses} bg-blue-500`;
//     if (index === currentStage) return `${baseClasses} bg-green-500`;
//     return `${baseClasses} bg-gray-300`;
//   };

//   const stageTextClasses = (index) => {
//     let baseClasses = "text-xs uppercase";
//     if (index <= currentStage) return `${baseClasses} text-blue-600`;
//     return `${baseClasses} text-gray-400`;
//   };

//   const statusClasses = status === 'Pending' ? 'text-yellow-500' : 'text-green-500';

//   return (
//     <div className="bg-white shadow sm:rounded-md mb-4 p-4">
//       <div className="mb-4">
//         <h3 className="text-lg font-bold">{jobTitle}</h3>
//         <p className="text-sm text-gray-600">{location}</p>
//         <p className="text-sm text-gray-600">Applied: {appliedDate}</p>
//         <p className="text-sm text-gray-600">Application Number - {applicationNumber}</p>
//         <div className="mt-4">
//           <div className="grid grid-cols-4 gap-4">
//             {stages.map((stage, index) => (
//               <div key={stage} className={`text-center ${stageTextClasses(index)}`}>
//                 <div className={stageClasses(index)}></div>
//                 <p className="text-sm">{stage}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between items-center mt-4 pt-4 border-t">
//         <p className={`text-sm font-semibold ${statusClasses}`}>Status - {status}</p>
//         <p className="text-sm font-semibold text-right">
//           Stage - {stages[currentStage - 1]}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default JobApplicationCard;
