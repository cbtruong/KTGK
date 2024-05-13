// AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null);
  const [jobs, setJobs] = useState([]);

  const contextValues = {
    userLogin,
    setUserLogin,
    jobs,
    setJobs,
  };

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};

export default AppContext;
