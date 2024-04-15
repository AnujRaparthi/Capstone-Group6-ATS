import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    gender: '',
    userType: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let fieldErrors = {};

    // validations for fields
    if (!formData.name.trim()) {
      fieldErrors['name'] = 'Name is required';
      formIsValid = false;
    }

    if (!formData.email) {
      fieldErrors['email'] = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      fieldErrors['email'] = 'Email format is invalid';
      formIsValid = false;
    }

    if (!formData.password) {
      fieldErrors['password'] = 'Password is required';
      formIsValid = false;
    } else if (formData.password.length < 8) {
      fieldErrors['password'] = 'Password must be at least 8 characters long';
      formIsValid = false;
    } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/.test(formData.password)) {
      fieldErrors['password'] = 'Password must contain at least one alphabet, one number, and one special character';
      formIsValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      fieldErrors['confirmPassword'] = 'Passwords do not match';
      formIsValid = false;
    }

    if (!formData.address.trim()) {
      fieldErrors['address'] = 'Address is required';
      formIsValid = false;
    }

    if (!formData.gender) {
      fieldErrors['gender'] = 'Please select a gender';
      formIsValid = false;
    }

    if (!formData.userType) {
      fieldErrors['userType'] = 'Please select a user type';
      formIsValid = false;
    }

    setErrors(fieldErrors);
    return formIsValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://capstone-group6-ats-backend.vercel.app/api/signup', formData);
        navigate('/login');
      } catch (error) {
        setErrors({ ...errors, form: 'Signup failed. Please try again.' });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className='bg-white shadow mt-10 mb-10 w-full max-w-xl p-6 border border-gray-300 rounded-md'>
        <div className="sm:mx-auto sm:w-full">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="name" className="block text-sm font-medium  text-gray-900">
                Full Name
              </label>
              <input id="name" name="name" type="text" autoComplete="name" required
                className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.name} onChange={handleChange} />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>


            <div className="input-field">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required
                className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.email} onChange={handleChange} />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>


            <div className="input-field">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input id="password" name="password" type="password" autoComplete="new-password" required
                className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.password} onChange={handleChange} />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>


            <div className="input-field">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
                className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>


            <div className="input-field">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input id="address" name="address" type="text" autoComplete="address" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.address} onChange={handleChange} />
              {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="input-field">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select id="gender" name="gender" required className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.gender} onChange={handleChange} >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
            </div>

            <div className="input-field">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                Registering as
              </label>
              <select id="userType" name="userType" required
                className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.userType} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="applicant">Applicant</option>
                <option value="recruiter">Recruiter</option>
              </select>
              {errors.userType && <p className="mt-2 text-sm text-red-600">{errors.userType}</p>}
            </div>

            {errors.form && (
              <div className="mt-4 text-center text-sm text-red-600">
                {errors.form}
              </div>
            )}

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Signup;
