import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/userActions'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            msg: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          if (error.id === 'REGISTER_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }
    }


    onSubmit(e) {
        e.preventDefault()

        const { email, password, username, confirmPassword } = this.state;

        const newUser = {
            email,
            password,
            username,
            confirmPassword
        };

        this.props.register(newUser);
    }

    render() {
        return (
            <form style={registerWrapper} onSubmit={this.onSubmit}>
                <h1>Register User</h1>

                <div style={inputWrapper}>
                    <label htmlFor="email">Email:</label>
                    <input
                        style={inputClass}
                        value={this.state.email}
                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                    />
                </div>

                <div style={inputWrapper}>
                    <label htmlFor="username">Username:</label>
                    <input
                        style={inputClass}
                        value={this.state.username}
                        onChange={(e) => { this.setState({ username: e.target.value }) }}
                    />
                </div>

                <div style={inputWrapper}>
                    <label htmlFor="password">Password:</label>
                    <input
                        style={inputClass}
                        type="password"
                        autoComplete="false"
                        value={this.state.password}
                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                    />
                </div>

                <div style={inputWrapper}>
                    <label htmlFor='confirmpassword'>Confirm password:</label>
                    <input
                        style={inputClass}
                        type="password"
                        autoComplete="false"
                        value={this.state.confirmPassword}
                        onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }}
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
                >Register</button>
                <div style={errorWrapper}>
                    {this.state.msg}
                </div>
            </form>
        )
    }
}


Register.propTypes = {
    register: PropTypes.func.isRequired,
    
}

const mapStateToProps = state => ({
    error: state.error
  });


export default connect(mapStateToProps, { register })(Register);

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

const errorWrapper = {
    height: '40px',
    color: 'red',
    fontSize: '12px',
    width: '90%'
}