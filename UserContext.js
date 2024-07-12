import React, { createContext, useState } from 'react';

// Create a context object
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    user: null,
    email: null
  });

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;