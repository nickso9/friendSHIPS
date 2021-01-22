import React, { Component } from 'react'
import shipLogo from '../../images/smallshiplogo.png'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { goLogin, goLogout, goRegister, goMessage } from '../../actions/pageActions'
import { logout } from '../../actions/userActions'
import { logoutMessage } from '../../actions/messageActions'

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
                            this.props.logoutMessage()
                        }}
                    >Logout</button>
                </div> 
            )
        }




        return (
                <div style={navbarWrapper}>
                    <div style={navbarBrandWrapper}>
                        <div 
                            onClick={()=> {
                                this.props.goLogout()
                            }}
                            style={navbarBrand}>
                            <div style={brandWrapper}>
                            <span style={brandText}>FriendSHIPS</span>
                            </div>
                        </div>  
                    </div>
                
                    <div style={inputWrapper}>
                        {navbarSettings}
                    </div>
                </div>
    
        )
    }
}   


Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    goMessage: PropTypes.func.isRequired,
    goLogin: PropTypes.func.isRequired,
    goRegister: PropTypes.func.isRequired,
    goLogout: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    logoutMessage: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { goLogin, goLogout, goMessage, goRegister, logout, logoutMessage })(Navbar);


const navbarWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '125px',
    width: '100%',
    fontSize: '16px',
    backgroundColor: '#0067a5',
    borderBottom: '2px solid white'
}

const navbarBrandWrapper = {
    marginLeft: '5px', 
    marginTop: '-10px',
}

const brandWrapper = {
    width: '300px',
    marginLeft: '20px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${shipLogo})`,
    height: '100px',
    display: 'flex',
    alignItems: 'end'
}

const navbarBrand = {
    textDecoration: 'none',
    color: '#ff4500',
    // paddingRight: '10px'
}

const brandText = {
    fontSize: '25px',
    alignSelf: 'flex-end',
    marginLeft: '5px',
    fontWeight: '900',
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
    padding: '15px',
    outline: 'none',
    marginRight: '5px'
}

const navbarWelcome = {
    display: 'inline'
}

