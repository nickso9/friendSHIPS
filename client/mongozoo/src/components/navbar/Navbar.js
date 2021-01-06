import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {





    render() {
        return (

            <div style={navbarWrapper}>
                <div style={navbarBrandWrapper}>
                    <NavLink to='/' style={navbarBrand}>
                        <h1>Message/Query</h1>
                    </NavLink>
                    
                </div>
                
                <div >    
                    <div style={inputWrapper}>
                     
                        <button style={inputStyle}
                            onMouseEnter={(e) => {
                                e.target.style.textDecoration = 'underline'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = 'none'
                            }}
                        >Register</button>
                    </div>

                    <div style={inputWrapper}>
                  
                        <button style={inputStyle}
                            onMouseEnter={(e) => {
                                e.target.style.textDecoration = 'underline'
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = 'none'
                            }}
                        >Login</button>
                    </div>

                </div>
            </div>

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
    fontSize: '24px',
    display: 'block',
    marginTop: '3px',
    backgroundColor: 'white',
    border: '0',
    boxShadow:  '2px 3px 2px #ccc',
    padding: '10px',
    outline: 'none'
}

export default Navbar