// HeaderWrapper.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const HeaderWrapper = ({ searchTerm, onSearchChange, onSearchSubmit, onClearSearch })=> {
  const location = useLocation();
  const showSearchBar = location.pathname !== '/login' && location.pathname !== '/signup';

  
  return (
    <Header 
        showSearchBar={showSearchBar}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        onClearSearch={onClearSearch}
    />
);
};

export default HeaderWrapper;
