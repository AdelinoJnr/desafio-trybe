import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default App;
