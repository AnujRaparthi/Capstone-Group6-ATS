import React from 'react';
import logo from '../images/logo_new.png';
import hiringManager from '../images/hiring_manager.jpg';
import jobSeeker from '../images/jobseeker.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div className="relative h-[400px] overflow-hidden">
        <Slider {...sliderSettings}>
          <div className="flex justify-center items-center h-full">
            <img src={hiringManager} alt="Slide 1" className="max-h-full max-w-full" />
          </div>
          <div className="flex justify-center items-center h-full">
            <img src={jobSeeker} alt="Slide 3" className="max-h-full max-w-full" />
          </div>
        </Slider>
      </div>
      <div className="px-4 py-5 my-5 text-center">
        <img className="block mx-auto mb-4" src={logo} alt="logo" width="100" height="57" />
        <h1 className="text-5xl font-bold">Welcome to Our ATS Application</h1>
        <div className="mx-auto lg:w-1/2">
          <p className="lead">Welcome to our HR panel, the hub for streamlined talent management! Here, HR professionals gain access to powerful tools and resources designed to simplify recruitment, optimize employee engagement, and foster organizational growth.</p>
        </div>
      </div>

      <div className="py-5">
        <div className="flex justify-center">
          <div className="text-center">
            <h3 className="mb-3">Pricing to Make Your Work Effective</h3>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-4">
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
              <h5 className="text-lg font-medium mt-3 mb-2">Advanced Features</h5>
              <p className="text-sm text-gray-700">Access our advanced features for seamless talent management and recruitment processes.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
              <h5 className="text-lg font-medium mt-3 mb-2">Tailored Solutions</h5>
              <p className="text-sm text-gray-700">Tailor our platform to your organization's needs for effective talent management.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
              <h5 className="text-lg font-medium mt-3 mb-2">User-friendly Interface</h5>
              <p className="text-sm text-gray-700">Our user-friendly interface makes talent management and recruitment a breeze.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
              <h5 className="text-lg font-medium mt-3 mb-2">Efficient Workflows</h5>
              <p className="text-sm text-gray-700">Streamline your workflows with our efficient talent management solutions.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="border rounded text-center p-4 bg-white">
            <h5>Master Plan</h5>
            <sup>$</sup><span className="text-5xl">89</span>
            <h6 className="font-light">MONTHLY</h6>
            <p className="mt-4">The Master license allows you to customize, store and even host your website using your platform</p>
            <ul className="list-unstyled mt-3 mb-4 text-center">
              <li>Automated Screening</li>
              <li>Efficient Candidate Tracking</li>
              <li>Seamless Integration</li>
            </ul>
            <a href="/company-signup" className="block p-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white no-underline">SUBSCRIBE NOW</a>
          </div>
        </div>
      </div>
      <style>
        {`
        .card {
          transition: transform 0.3s ease-in-out;
        }
        .card:hover {
          background-color: #d1e9ff;
        }
        .card p {
          font-size: 16px;
          color: #8d97ad;
        }
        `}
      </style>
    </div>
  );
};

export default Home;
