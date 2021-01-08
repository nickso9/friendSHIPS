import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            msg: null
        }

        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    onSubmit(e) {
        e.preventDefault()

        const { email, password } = this.state;

        const user = {
            email,
            password
        };

        this.props.login(user);
    }


    render() {
        return (
            <form style={loginWrapper} onSubmit={this.onSubmit}>
                <h1>Login</h1>

                <div style={inputWrapper}>
                    <label htmlFor="email">Email:</label>
                    <input
                        style={inputClass}
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </div>


                <div style={inputWrapper}>
                    <label htmlFor="password">Password:</label>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { login, clearErrors })(Login);


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

