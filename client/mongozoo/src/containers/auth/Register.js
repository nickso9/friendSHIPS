import React, { Component } from 'react';

class Register extends Component {


    render() {
        return (
            <form style={registerWrapper}>
                <h1>Register User</h1>

                <div style={inputWrapper}>
                    <span >Email:</span>
                    <input style={inputClass}/>
                </div>

                <div style={inputWrapper}>
                    <span >Username:</span>
                    <input style={inputClass}/>
                </div>

                <div style={inputWrapper}>
                    <span >Password:</span>
                    <input 
                        style={inputClass} 
                        type="password" 
                        autoComplete="false" 
                    />
                </div>

                <div style={inputWrapper}>
                    <span >Confirm password:</span>
                    <input 
                        style={inputClass} 
                        type="password" 
                        autoComplete="false" 
                    />
                </div>

                <button 
                    style={inputButton} 
                    onMouseEnter={(e) => {
                        e.target.style.background = 'black'
                        e.target.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'white'
                        e.target.style.color = 'black'
                        
                    }}
                >Register</button>
            </form>
        )
    }
}


const registerWrapper = {
    width: '500px',
    height: '525px',
    boxShadow: '2px 2px 2px 3px #ccc',
    margin: 'auto',
    marginTop: '50px',
    padding: '35px'
}

const inputWrapper = {
    width: '90%',
    margin: 'auto'
}


const inputClass = {
    display: 'block',
    margin: '15px auto',
    width: '100%',
    fontSize: '25px'
}

const inputButton = {
    fontSize: '15px',
    display: 'block',
    marginTop: '50px',
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '10px 20px',
    outline: 'none',
    float: 'right'
}

export default Register