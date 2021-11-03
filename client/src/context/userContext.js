import React, { useState } from 'react';
import { element } from 'prop-types';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={ { setToken, token } } >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: element,
}; 