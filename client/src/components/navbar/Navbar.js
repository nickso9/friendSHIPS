import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }


    componentDidUpdate(previousProps, previousState) {
        if (previousProps.user !== this.props.user) {
            this.setState({user: this.props.user})
        }
    }

    

    render() {

        let navbarSettings;

        if (!this.state.user) {
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
                <NavLink to='/logout' style={navbarBrand}>
                    <button 
                        style={inputStyle}
                        onMouseEnter={(e) => {
                            e.target.style.textDecoration = 'underline'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.textDecoration = 'none'
                        }}
                    >Logout</button>
                </NavLink> 
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

Navbar.propTypes = {
    user: PropTypes.object
}


const mapStateToProps = state => ({
    user: state.user.user
});


export default connect(mapStateToProps, null)(Navbar);