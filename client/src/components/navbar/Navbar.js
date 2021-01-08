import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LogoutUser } from '../../actions/userActions'

class Navbar extends Component {



    
    

    render() {

        const { isAuthenticated, user } = this.props.auth;

        let navbarSettings;

        if (!isAuthenticated) {
            navbarSettings = (
    
                    <div >    
                        <div style={inputWrapper}>
                        
                            <NavLink to='/register' style={navbarBrand}>
                                <button style={inputStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.textDecoration = 'underline'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.textDecoration = 'none'
                                    }}
                                >Register</button>
                            </NavLink> 
                        </div>

                        <div style={inputWrapper}>
                    
                            <NavLink to='/login' style={navbarBrand}>
                                <button style={inputStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.textDecoration = 'underline'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.textDecoration = 'none'
                                    }}
                                >Login</button>
                            </NavLink> 

                        </div>

                    </div>
               
            )
        } else {

            navbarSettings = (
                <span style={navbarBrand}>
                    <button 
                        style={inputStyle}
                        onMouseEnter={(e) => {
                            e.target.style.textDecoration = 'underline'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.textDecoration = 'none'
                        }}
                        onClick={() => {
                            this.props.LogoutUser()
                            this.setState({
                                ...this.state,
                                user: undefined
                            })

                        }}
                    >Logout</button>
                </span> 
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
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(Navbar);


const navbarWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100px',
    boxShadow: '0 2px 3px #ccc',
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
    display: 'block',
    marginTop: '3px',
    backgroundColor: 'white',
    border: '0',
    boxShadow:  '2px 3px 2px #ccc',
    padding: '10px',
    outline: 'none'
}

