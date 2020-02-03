import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from '../Main';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute exact path='/'>
            <Main />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
