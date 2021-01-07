import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/navbar/Navbar';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Home from './containers/home/Home'

import store from './store';


class App extends Component {
  state = {
      token: undefined,
      user: undefined
    }
  
  
 

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Navbar />
            <Switch>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route path='/' component={Home}/>
            </Switch>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
