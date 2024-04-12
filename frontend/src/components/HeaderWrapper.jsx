import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const HeaderWrapper = ({ searchTerm, onSearchChange, onSearchSubmit, onClearSearch }) => {
  const location = useLocation();
  //console.log("Current path:", location.pathname); 
  const pathsToExclude = ['/login', '/signup', '/job/', '/apply-now/', '/application-success','/status', '/email','/profile'];
  const showSearchBar = !pathsToExclude.some(path => location.pathname.startsWith(path));
  
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

