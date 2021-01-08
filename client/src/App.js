import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/navbar/Navbar';
import Home from './containers/Home'


import { loadUser } from './actions/userActions';
import store from './store';


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }


  render() {

    return (
      <Provider store={store}>
        <React.Fragment>
          <Navbar />  
              <Route path='/' component={Home}/>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
