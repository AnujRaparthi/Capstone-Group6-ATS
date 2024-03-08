import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/validateToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data); 
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.removeItem('token'); 
        }
      }
    };
    validateToken();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); 
    //navigate('/login'); 
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
