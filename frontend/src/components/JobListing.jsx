import JobIcon from './JobIcon';

const JobListing = ({ title, experience, location, department, postedTime, description }) => (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
      <div className="px-4 py-4 sm:px-6">
        <div className="text-md leading-5 font-bold text-black truncate">{title}</div>
        <div className="job-icons py-2">
          <JobIcon icon="fas fa-briefcase" text={experience} />
          <JobIcon icon="fas fa-map-marker-alt" text={location} />
          <JobIcon icon="fas fa-building" text={department} />
          <JobIcon icon="far fa-clock" text={postedTime} />
        </div>
      </div>
      <div className="px-4 pb-4 sm:px-6">
        <p className="text-sm leading-5 text-gray-700">{description}</p>
      </div>
    </div>
  );

  export default JobListing;