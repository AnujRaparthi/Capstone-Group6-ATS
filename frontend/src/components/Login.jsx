import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import { useUser } from './UserContext'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://capstone-group6-ats-backend.vercel.app/api/login', { email, password });
      console.log({ email, password });  
      const { user, token } = response.data;
      login(user, token);
      console.log(response.data); 

      if (user && user.userType === 'applicant') {
        navigate('/');
      } else if (user && user.userType === 'recruiter') {
        navigate('/hrportal');
      } else {
      
        console.error('Unexpected user type:', user.userType);
        setError('Unauthorized access.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          setError('Invalid email address or password.');
        } else if (status === 404) {
          setError('User not found. Please check your email address.');
        } else {
          setError('An error occurred.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className='bg-white shadow w-full max-w-sm p-6 rounded-md'>
          <div className="sm:mx-auto sm:w-full">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" required
                    className="appearance-none block w-full rounded-md border-0 py-1  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" required
                    className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div>

              <button
                type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/signup" className="font-semibold leading-6 text-blue-600 hover:text-blue-600">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
