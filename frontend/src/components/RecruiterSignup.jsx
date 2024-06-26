import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Stripe public key - replace with your own
const stripePromise = loadStripe('pk_test_51P3jtODTqZXkpm4pEf3Qz9QeOewSYUpfwC4vCgRXhMSc20qH6cEaobmYarHSYX11z9cckK55CRHYvks7tmSZQgHM00OvqAsnlp');

const RecruiterSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    gender: '',
    companyName: '',
    companyAddress: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let fieldErrors = {};

    if (!formData.name.trim()) fieldErrors['name'] = 'Name is required';
    if (!formData.email) fieldErrors['email'] = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) fieldErrors['email'] = 'Email format is invalid';
    if (!formData.password) fieldErrors['password'] = 'Password is required';
    else if (formData.password.length < 8) fieldErrors['password'] = 'Password must be at least 8 characters';
    else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/.test(formData.password)) fieldErrors['password'] = 'Password must contain letters, numbers, and special characters';
    if (formData.password !== formData.confirmPassword) fieldErrors['confirmPassword'] = 'Passwords do not match';
    if (!formData.address.trim()) fieldErrors['address'] = 'Address is required';
    if (!formData.gender) fieldErrors['gender'] = 'Gender is required';
    if (!formData.companyName.trim()) fieldErrors['companyName'] = 'Company name is required';
    if (!formData.companyAddress.trim()) fieldErrors['companyAddress'] = 'Company address is required';

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const stripe = await stripePromise;
      try {
        const { data } = await axios.post('https://capstone-group6-ats-backend.vercel.app/create-checkout-session', {
          priceId: 'price_1P7KyxDTqZXkpm4p3p2M6VSl',
          userData: formData // sending user data to backend
        });
        const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
        if (result.error) {
          alert(`Payment failed: ${result.error.message}`);
          navigate('/payment-failed');
        } // success handled by the backend redirecting to the success URL
      } catch (error) {
        console.error('Error during registration or payment:', error);
        navigate('/payment-failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className='bg-white shadow mt-10 mb-10 w-full max-w-xl p-6 border border-gray-300 rounded-md'>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Company Registration</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Company Details */}
          <div>
            <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Company Details</h3>
            <div className="input-field">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input id="companyName" name="companyName" type="text" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.companyName} onChange={handleChange} />
              {errors.companyName && <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Company Address</label>
              <input id="companyAddress" name="companyAddress" type="text" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.companyAddress} onChange={handleChange} />
              {errors.companyAddress && <p className="mt-2 text-sm text-red-600">{errors.companyAddress}</p>}
            </div>
          </div>
          {/* Recruiter Details */}
          <div>
            <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Recruiter Details</h3>
            <div className="input-field">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">Full Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input id="address" name="address" type="text" autoComplete="address" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.address} onChange={handleChange} />
              {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select id="gender" name="gender" required className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formData.gender} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
            </div>
          </div>

          {errors.form && (
            <div className="text-sm text-red-600">{errors.form}</div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterSignup;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';

// // Stripe public key - replace with your own
// const stripePromise = loadStripe('pk_test_51P3jtODTqZXkpm4pEf3Qz9QeOewSYUpfwC4vCgRXhMSc20qH6cEaobmYarHSYX11z9cckK55CRHYvks7tmSZQgHM00OvqAsnlp');

// const RecruiterSignup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     address: '',
//     gender: '',
//     companyName: '',
//     companyAddress: ''
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const validateForm = () => {
//     let formIsValid = true;
//     let fieldErrors = {};

//     if (!formData.name.trim()) fieldErrors['name'] = 'Name is required';
//     if (!formData.email) fieldErrors['email'] = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) fieldErrors['email'] = 'Email format is invalid';
//     if (!formData.password) fieldErrors['password'] = 'Password is required';
//     else if (formData.password.length < 8) fieldErrors['password'] = 'Password must be at least 8 characters';
//     else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/.test(formData.password)) fieldErrors['password'] = 'Password must contain letters, numbers, and special characters';
//     if (formData.password !== formData.confirmPassword) fieldErrors['confirmPassword'] = 'Passwords do not match';
//     if (!formData.address.trim()) fieldErrors['address'] = 'Address is required';
//     if (!formData.gender) fieldErrors['gender'] = 'Gender is required';
//     if (!formData.companyName.trim()) fieldErrors['companyName'] = 'Company name is required';
//     if (!formData.companyAddress.trim()) fieldErrors['companyAddress'] = 'Company address is required';

//     setErrors(fieldErrors);
//     return Object.keys(fieldErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const stripe = await stripePromise;
//       try {
//         const { data } = await axios.post('https://capstone-group6-ats-backend.vercel.app/create-checkout-session', {
//           priceId: 'price_1P7KyxDTqZXkpm4p3p2M6VSl'
//         });
//         const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
//         if (result.error) {
//           alert(`Payment failed: ${result.error.message}`);
//           navigate('/payment-failed');
//         } else {
//           // Handle successful payment here
//           const companyResponse = await axios.post('https://capstone-group6-ats-backend.vercel.app/api/register-company', {
//             name: formData.companyName,
//             address: formData.companyAddress
//           });

//           if (companyResponse.status === 201) {
//             const recruiterData = {
//               name: formData.name,
//               email: formData.email,
//               password: formData.password,
//               address: formData.address,
//               gender: formData.gender,
//               userType: 'recruiter',
//               company_id: companyResponse.data._id
//             };

//             const userResponse = await axios.post('https://capstone-group6-ats-backend.vercel.app/api/signup', recruiterData);
//             if (userResponse.status === 201) navigate('/login');
//             else throw new Error('Could not create recruiter');
//           } else {
//             throw new Error('Could not create company');
//           }
//         }
//       } catch (error) {
//         console.error('Error during registration or payment:', error);
//         navigate('/payment-failed');
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className='bg-white shadow mt-10 mb-10 w-full max-w-xl p-6 border border-gray-300 rounded-md'>
//         <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Company Registration</h2>
//         <form className="space-y-6" onSubmit={handleSubmit}>

// <div>
//   <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Company Details</h3>
//   <div className="input-field">
//   <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
//     Company Name
//   </label>
//   <input
//     id="companyName"
//     name="companyName"
//     type="text"
//     required
//     className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//     value={formData.companyName}
//     onChange={handleChange}
//   />
//   {errors.companyName && <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>}
// </div>

// <div className="input-field">
//   <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">
//     Company Address
//   </label>
//   <input
//     id="companyAddress"
//     name="companyAddress"
//     type="text"
//     required
//     className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//     value={formData.companyAddress}
//     onChange={handleChange}
//   />
//   {errors.companyAddress && <p className="mt-2 text-sm text-red-600">{errors.companyAddress}</p>}
// </div>
//   </div>

//   <div>
//   <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Recruiter Details</h3>

//   <div className="input-field">
//     <label htmlFor="name" className="block text-sm font-medium  text-gray-900">
//       Full Name
//     </label>
//     <input id="name" name="name" type="text" autoComplete="name" required
//       className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       value={formData.name} onChange={handleChange} />
//     {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
//   </div>


//   <div className="input-field">
//     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//       Email address
//     </label>
//     <input id="email" name="email" type="email" autoComplete="email" required
//       className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       value={formData.email} onChange={handleChange} />
//     {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//   </div>


//   <div className="input-field">
//     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//       Password
//     </label>
//     <input id="password" name="password" type="password" autoComplete="new-password" required
//       className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       value={formData.password} onChange={handleChange} />
//     {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//   </div>


//   <div className="input-field">
//     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//       Confirm Password
//     </label>
//     <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
//       className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       value={formData.confirmPassword} onChange={handleChange} />
//     {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
//   </div>


//   <div className="input-field">
//     <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//       Address
//     </label>
//     <input id="address" name="address" type="text" autoComplete="address" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       value={formData.address} onChange={handleChange} />
//     {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
//   </div>

//   <div className="input-field">
//     <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
//       Gender
//     </label>
//     <select id="gender" name="gender" required className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       value={formData.gender} onChange={handleChange} >
//       <option value="">Select...</option>
//       <option value="male">Male</option>
//       <option value="female">Female</option>
//       <option value="other">Other</option>
//     </select>
//     {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
//   </div>
//   </div>




// {errors.form && (
//   <div className="text-sm text-red-600">{errors.form}</div>
// )}

// <button
//   type="submit"
//   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
// >
//   Register Company
// </button>
// </form>
//       </div>
//     </div>
//   );
// };

// export default RecruiterSignup;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51P3jtODTqZXkpm4pEf3Qz9QeOewSYUpfwC4vCgRXhMSc20qH6cEaobmYarHSYX11z9cckK55CRHYvks7tmSZQgHM00OvqAsnlp'); // Use your Stripe public key

// const RecruiterSignup = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         address: '',
//         gender: '',
//         companyName: '',
//         companyAddress: ''
//     });
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 const stripe = await stripePromise;
//                 // Assume you have a priceId from your products setup in Stripe
//                 const { data: { sessionId } } = await axios.post('https://capstone-group6-ats-backend.vercel.app/create-checkout-session', { priceId: 'price_1P7KyxDTqZXkpm4p3p2M6VSl' });
//                 const { error } = await stripe.redirectToCheckout({
//                     sessionId
//                 });
//                 if (error) {
//                     console.log('Stripe error:', error.message);
//                     navigate('/payment-failed');
//                 }
//             } catch (error) {
//                 console.error('Error during registration/payment:', error);
//                 navigate('/payment-failed');
//             }
//         }
//     };

//     // Your existing handleChange and other methods...

//     return (
//         <div className="flex items-center justify-center min-h-screen">
//             {/* Your existing form setup */}
//         </div>
//     );
// };

// export default RecruiterSignup;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const RecruiterSignup = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     address: '',
//     gender: '',
//     companyName: '',
//     companyAddress: ''
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const validateForm = () => {
//     let formIsValid = true;
//     let fieldErrors = {};

//     if (!formData.name.trim()) {
//         fieldErrors['name'] = 'Name is required';
//         formIsValid = false;
//       }
  
//       if (!formData.email) {
//         fieldErrors['email'] = 'Email is required';
//         formIsValid = false;
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         fieldErrors['email'] = 'Email format is invalid';
//         formIsValid = false;
//       }
  
//       if (!formData.password) {
//         fieldErrors['password'] = 'Password is required';
//         formIsValid = false;
//       } else if (formData.password.length < 8) {
//         fieldErrors['password'] = 'Password must be at least 8 characters long';
//         formIsValid = false;
//       } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/.test(formData.password)) {
//         fieldErrors['password'] = 'Password must contain at least one alphabet, one number, and one special character';
//         formIsValid = false;
//       }
  
//       if (formData.password !== formData.confirmPassword) {
//         fieldErrors['confirmPassword'] = 'Passwords do not match';
//         formIsValid = false;
//       }
  
//       if (!formData.address.trim()) {
//         fieldErrors['address'] = 'Address is required';
//         formIsValid = false;
//       }
  
//       if (!formData.gender) {
//         fieldErrors['gender'] = 'Please select a gender';
//         formIsValid = false;
//       }
  
//       if (!formData.companyName.trim()) {
//         fieldErrors['companyName'] = 'Company name is required';
//         formIsValid = false;
//       }

//       if (!formData.companyAddress.trim()) {
//         fieldErrors['companyAddress'] = 'Company address is required';
//         formIsValid = false;
//       }

//     setErrors(fieldErrors);
//     return formIsValid;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//         try {
//             // First, create the company

//             console.log('Inside Register compnay=',formData);
//             const companyResponse = await axios.post('https://capstone-group6-ats-backend.vercel.app/api/register-company', {
//               name: formData.companyName,
//               address: formData.companyAddress
//             });
      
//             if (companyResponse.status === 201) {
//               // Now create the recruiter with the company id
//               const companyData = companyResponse.data;
//               const recruiterData = {
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password,
//                 address: formData.address,
//                 gender: formData.gender,
//                 userType: 'recruiter',
//                 company_id: companyData._id // assuming the response body has the id as '_id'
//               };
      
//               const userResponse = await axios.post('https://capstone-group6-ats-backend.vercel.app/api/signup', recruiterData);
      
//               if (userResponse.status === 201) {
//                 navigate('/login');
//               } else {
//                 throw new Error('Could not create recruiter');
//               }
//             } else {
//               throw new Error('Could not create company');
//             }
//           } catch (error) {
//             setErrors({ ...errors, form: error.message || 'Signup failed. Please try again.' });
//           }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className='bg-white shadow mt-10 mb-10 w-full max-w-xl p-6 border border-gray-300 rounded-md'>
//         <div className="sm:mx-auto sm:w-full">
//           <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
//             Company Registration
//           </h2>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <form className="space-y-6" onSubmit={handleSubmit}>

//           <div>
//             <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Company Details</h3>
//             <div className="input-field">
//             <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
//               Company Name
//             </label>
//             <input
//               id="companyName"
//               name="companyName"
//               type="text"
//               required
//               className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               value={formData.companyName}
//               onChange={handleChange}
//             />
//             {errors.companyName && <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>}
//           </div>

//           <div className="input-field">
//             <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">
//               Company Address
//             </label>
//             <input
//               id="companyAddress"
//               name="companyAddress"
//               type="text"
//               required
//               className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               value={formData.companyAddress}
//               onChange={handleChange}
//             />
//             {errors.companyAddress && <p className="mt-2 text-sm text-red-600">{errors.companyAddress}</p>}
//           </div>
//             </div>

//             <div>
//             <h3 className="text-lg leading-6 font-bold text-gray-900 mb-4">Recruiter Details</h3>

//             <div className="input-field">
//               <label htmlFor="name" className="block text-sm font-medium  text-gray-900">
//                 Full Name
//               </label>
//               <input id="name" name="name" type="text" autoComplete="name" required
//                 className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={formData.name} onChange={handleChange} />
//               {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
//             </div>


//             <div className="input-field">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <input id="email" name="email" type="email" autoComplete="email" required
//                 className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={formData.email} onChange={handleChange} />
//               {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
//             </div>


//             <div className="input-field">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input id="password" name="password" type="password" autoComplete="new-password" required
//                 className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={formData.password} onChange={handleChange} />
//               {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
//             </div>


//             <div className="input-field">
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required
//                 className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={formData.confirmPassword} onChange={handleChange} />
//               {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
//             </div>


//             <div className="input-field">
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <input id="address" name="address" type="text" autoComplete="address" required className="appearance-none block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={formData.address} onChange={handleChange} />
//               {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
//             </div>

//             <div className="input-field">
//               <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <select id="gender" name="gender" required className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 value={formData.gender} onChange={handleChange} >
//                 <option value="">Select...</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//               {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
//             </div>
//             </div>

          


//           {errors.form && (
//             <div className="text-sm text-red-600">{errors.form}</div>
//           )}

//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Register Company
//           </button>
//         </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterSignup;