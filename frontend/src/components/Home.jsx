import React from 'react';
import CheckoutForm from './CheckoutForm'; // Make sure the path is correct based on your file structure

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our ATS Application</h1>
      <p>Feature 1: Automated Screening</p>
      <p>Feature 2: Efficient Candidate Tracking</p>
      <p>Feature 3: Seamless Integration</p>
      <h2>Pricing: $99/month</h2>
      <CheckoutForm />
    </div>
  );
};

export default Home;
