import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserProvider } from './context/userContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App(): JSX.Element {
  return (
    <UserProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </Switch>
    </UserProvider>
  );
}

export default App;
