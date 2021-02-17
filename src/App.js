import React, { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import RestaurantsView from './components/Restaurants/RestaurantsView';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={RestaurantsView} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;