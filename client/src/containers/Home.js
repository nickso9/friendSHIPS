import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from './auth/Login';
import Register from './auth/Register';
import Landing from './landing/Landing';
import Messages from './messages/Message'


class Home extends Component {
    

    render() {
        
        const { isAuthenticated } = this.props.auth;
        let currentView;

        if (isAuthenticated) {
            currentView = <Messages />
        } else {
            switch(this.props.page) {
                case 'landing':  
                    currentView = <Landing />
                    break;
                case 'login': 
                    currentView = <Login />
                    break;
                case 'register': 
                    currentView = <Register />
                    break;
                default:       
            }
        }


        return (
            <>
            {currentView}
            </>
        )
    }
}


Home.propTypes = {
    page: PropTypes.string.isRequired
}


const mapStateToProps = state => ({
    page: state.page.status,
    auth: state.auth
});


export default connect(mapStateToProps, null)(Home);
