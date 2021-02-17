import React, { useState, useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import RestaurantsView from './components/Restaurants/RestaurantsView';
import Prueba from './components/Restaurants/Prueba';
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
          <Route path='/ordenes' component={Prueba} />
          <Route path='/ayuda' component={Prueba} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
