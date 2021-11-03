import React, { useEffect, useState } from 'react';
import { element } from 'prop-types';
import { api } from '../services/api';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  const fetchApi = async () => {
    try {
      const request = await api.get('api/users/decode/user', { headers: { Authorization: token.token } });
      setUser(request.data);
    } catch (_e) {
      console.log('Deu ruim!');
    }
  };

  useEffect(() => {
    fetchApi();
  }, [token]);

  return (
    <UserContext.Provider value={ { setToken, token, user } } >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: element,
}; 