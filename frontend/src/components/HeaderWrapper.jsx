import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const HeaderWrapper = ({ searchTerm, onSearchChange, onSearchSubmit, onClearSearch }) => {
  const location = useLocation();
  //console.log("Current path:", location.pathname); 
  const showSearchBar = !['/login', '/signup'].includes(location.pathname) && !location.pathname.startsWith('/job/');

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

