import React from 'react';
import CheckoutForm from './CheckoutForm';
import logo from '../images/logo_new.png';
import hiringManager from '../images/hiring_manager.jpg';
import jobPortal from '../images/job_portal.jpg';
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
          <p className="lead mb-4">Welcome to our HR panel, the hub for streamlined talent management! Here, HR professionals gain access to powerful tools and resources designed to simplify recruitment, optimize employee engagement, and foster organizational growth. </p>
        </div>
      </div>

      <div className="py-5">
        <div className="flex justify-center">
          <div className="text-center">
            <h3 className="mb-3">Pricing to make your Work Effective</h3>
            <h6 className="subtitle font-normal">We offer 100% satisfaction and Money back Guarantee</h6>
          </div>
        </div>
        <div className="flex mt-4" style={{ gap: '0' }}>
          <div className="w-full lg:w-7/12">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2" style={{ margin: '0', padding: '0' }}>
                <div className="card border-0 mb-4 shadow-sm bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
                  <h5 className="text-lg font-medium mt-3">Instant Solutions</h5>
                  <p className="mt-3">Get instant solutions with our advanced features and excellent customer service.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2" style={{ margin: '0', padding: '0' }}>
                <div className="card border-0 mb-4 shadow-sm bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
                  <h5 className="text-lg font-medium mt-3">Powerful Techniques</h5>
                  <p className="mt-3">Benefit from powerful techniques to streamline your hiring process.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2" style={{ margin: '0', padding: '0' }}>
                <div className="card border-0 mb-4 shadow-sm bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
                  <h5 className="text-lg font-medium mt-3">Targeting Market</h5>
                  <p className="mt-3">Reach your target market effectively with our advanced tools.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2" style={{ margin: '0', padding: '0' }}>
                <div className="card border-0 mb-4 shadow-sm bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105">
                  <h5 className="text-lg font-medium mt-3">100% Satisfaction</h5>
                  <p className="mt-3">Guaranteed satisfaction with our services or your money back.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/12 ml-auto flex align-center">
            <div className="border rounded text-center">
              <div className="p-4">
                <h5>Master Plan</h5>
                <sup>$</sup><span className="text-5xl">69</span>
                <h6 className="font-light">MONTHLY</h6>
                <p className="mt-4">The Master license allows you to customize, store and even host your website using your platform</p>
                <ul className="list-unstyled mt-3 mb-4 text-center">
                  <li>Automated Screening</li>
                  <li>Efficient Candidate Tracking</li>
                  <li>Seamless Integration</li>
                </ul>
              </div>
              <a href="" className="block p-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white no-underline">BUY PLAN</a>
            </div>
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
      <CheckoutForm />
    </div>
  );
};

export default Home;
