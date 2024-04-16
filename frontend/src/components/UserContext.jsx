import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const UserContext = createContext();

export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const validateToken = async () => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     try {
    //       const response = await axios.get('http://localhost:5001/api/validate-token', {
    //         headers: { Authorization: `Bearer ${token}` },
    //       });
    //       setUser(response.data.user);
    //     } catch (error) {
    //       console.error('Token validation error:', error);
    //       localStorage.removeItem('token');
    //       setUser(null);
    //     }
    //   }
    // };

    const validateToken = async () => {
      const token = localStorage.getItem('token');
      const userInfo = localStorage.getItem('user');
      if (token && userInfo) {
        try {
          // You could optionally verify the token is still valid with the server here
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

  const login = (user, token) => {

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setUser(user);

  };

  const logout = () => {
    localStorage.removeItem('user'); // Remove user data
    localStorage.removeItem('token'); // Remove token data
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
