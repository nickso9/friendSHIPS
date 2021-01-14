import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { goLogin } from '../../actions/pageActions'
import { goLogout } from '../../actions/pageActions'
import { goRegister } from '../../actions/pageActions'
import { goMessage } from '../../actions/pageActions'
import { logout } from '../../actions/userActions'

class Navbar extends Component {




    render() {

        const { isAuthenticated, user } = this.props.auth;



        let navbarSettings;

        if (!isAuthenticated) {
            navbarSettings = (
    
                    <div >    
                        <div style={inputWrapper}>
                        
                            <span style={navbarBrand}>
                                <button style={inputStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.textDecoration = 'underline'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.textDecoration = 'none'
                                    }}
                                    onClick={() => {
                                        this.props.goRegister()
                                    }}
                                >Register</button>
                            </span> 
                        </div>

                        <div style={inputWrapper}>
                    
                            <span style={navbarBrand}>
                                <button style={inputStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.textDecoration = 'underline'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.textDecoration = 'none'
                                    }}
                                    onClick={() => {
                                        this.props.goLogin()
                                    }}
                                >Login</button>
                            </span> 

                        </div>

                    </div>
               
            )
        } else {
            navbarSettings = (
                <div style={navbarBrand}>
                    <span style={navbarWelcome}>Welcome {user.username}!!</span>
                    <button 
                        style={inputStyle}
                        onMouseEnter={(e) => {
                            e.target.style.textDecoration = 'underline'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.textDecoration = 'none'
                        }}
                        onClick={() => {
                            this.props.logout()
                            this.props.goLogout()
                        }}
                    >Logout</button>
                </div> 
            )
        }




        return (
            <React.Fragment>
                <div style={navbarWrapper}>
                    <div style={navbarBrandWrapper}>
                        <NavLink to='/' style={navbarBrand}>
                            <h1>Message/Query</h1>
                        </NavLink>  
                    </div>
                
                    <div style={inputWrapper}>
                        {navbarSettings}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}   


Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    goMessage: PropTypes.func.isRequired,
    goLogin: PropTypes.func.isRequired,
    goRegister: PropTypes.func.isRequired,
    goLogout: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { goLogin, goLogout, goMessage, goRegister, logout })(Navbar);


const navbarWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100px',
    width: '100%',
    fontSize: '16px',
}

const navbarBrandWrapper = {
    marginLeft: '5px', 
    marginTop: '-10px' 
}

const navbarBrand = {
    textDecoration: 'none',
    color: 'black'
}

const inputWrapper = {
    display: 'inline-block',
    margin: '0 5px',
}

const inputStyle = {
    fontSize: '16px',
    display: 'inline-block',
    marginTop: '3px',
    backgroundColor: 'white',
    border: '0',
    boxShadow:  '2px 3px 2px #ccc',
    padding: '10px',
    outline: 'none'
}

const navbarWelcome = {
    display: 'inline'
}

