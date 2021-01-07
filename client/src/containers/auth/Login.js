import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/userActions'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }
    

    onSubmit(e) {
        e.preventDefault()
        this.props.loginUser(this.state)   
    }


    render() {
        return (
            <form style={loginWrapper} onSubmit={this.onSubmit}>
                <h1>Login</h1>

                <div style={inputWrapper}>
                    <span >Email:</span>
                    <input 
                        style={inputClass}
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </div>

               
                <div style={inputWrapper}>
                    <span >Password:</span>
                    <input 
                        style={inputClass} 
                        type="password" 
                        autoComplete="false" 
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
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
                    type="submit"
                >Login</button>
            </form>
        )
    }
}


const loginWrapper = {
    width: '500px',
    height: '350px',
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
    marginTop: '25px',
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '10px 20px',
    outline: 'none',
    float: 'right'
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default connect(null, { loginUser })(Login)