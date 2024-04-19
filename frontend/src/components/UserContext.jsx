import React, { createContext, useContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async() => {
      const token = localStorage.getItem('token');
      const userInfo = localStorage.getItem('user');
      if (token && userInfo) {
        try {
          setUser(JSON.parse(userInfo));
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    };

    validateToken();
  }, []);

  // const login = async (userData, token) => {
    
  //   if (typeof userData === 'string' && userData === 'admin@gmail.com' && token === 'admin-token') {
  //     const adminUser = { email: userData, role: 'admin' };
  //     localStorage.setItem('user', JSON.stringify(adminUser));
  //     localStorage.setItem('token', token);
  //     setUser(adminUser);
  //     navigate('/hrportal');
  //   } else {
      
  //     localStorage.setItem('user', JSON.stringify(userData));
  //     localStorage.setItem('token', token);
  //     setUser(userData);
  //     navigateBasedOnUserType(userData);
  //   }
  // };

  const login = async (userData, token) => {

    console.log('typeof userData=',typeof userData);
    console.log('userData=',userData);
    console.log('token=',token);

    if (token === 'admin-token') {
      const adminUser = { 
        email: userData.email, 
        role: 'admin',
        name: 'Admin' // Set a name for the admin
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('token', token);
      setUser(adminUser);
      navigate('/hrportal');
    } else {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
      navigateBasedOnUserType(userData);
    }
  };
  

  const navigateBasedOnUserType = (user) => {
    if (user.userType === 'applicant') {
      navigate('/');
    } else if (user.userType === 'recruiter') {
      navigate('/hrportal');
    } else {
      navigate('/login', { state: { error: 'Unauthorized access or unrecognized user type' }});
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
