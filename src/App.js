import React, { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Signup';
import Login from './components/Login';
import Restaurantes from './components/Restaurantes';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Restaurantes} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
