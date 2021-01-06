import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Navbar from './components/navbar/Navbar';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Home from './containers/home/Home'


function App() {
  return (
    <React.Fragment>
      <Navbar />
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route path='/' component={Home}/>
        </Switch>


    </React.Fragment>
  );
}

export default App;
