import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/userActions'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            image: '',
            username: '',
            password: '',
            confirmPassword: '',
            msg: '',
            images: [
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610513028/octopus_monster_za68wc.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610513022/Tanuki_racoon_dog_capv1e.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610513018/funny_whale_lhavyq.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610513013/snail_4_f5qoth.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610513009/horse_cartoon_zebra_auqucb.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610513004/Donkey_cartoon_tfb8wu.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610513000/Bull_cartoon_04_vsz0be.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610512995/flying_saucer_2_nvkhns.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610514779/cartoon_leopard_j8khyt.png',
                'https://res.cloudinary.com/dv1oijudu/image/upload/v1610514784/dog_tongue_hanging_out_quvkxv.png'
            ]
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

        const { email, password, username, confirmPassword, image } = this.state;

        const newUser = {
            email,
            password,
            username,
            confirmPassword,
            image
        };

        this.props.register(newUser);
    }

    render() {
        return (
            <form style={registerWrapper} onSubmit={this.onSubmit}>
                <h1>Register User</h1>

                <div style={inputWrapper}>
                    {this.state.images.map((image, index) => {
                        return (
                            <div style={innerImageWrappers} key={index} >
                                <img src={image} alt={index}/>
                                <input type='radio' name='uno' value={image} onChange={(e) => {
                                    console.log(e.target.value)
                                    this.setState({
                                        ...this.state,
                                        image: e.target.value
                                    })
                                }}/>
                            </div>
                        )
                    })}
                </div>

                <div style={inputWrapper}>
                    <label>Email:</label>
                    <input
                        style={inputClass}
                        value={this.state.email}
                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                    />
                </div>

                <div style={inputWrapper}>
                    <label>Username:</label>
                    <input
                        style={inputClass}
                        value={this.state.username}
                        onChange={(e) => { this.setState({ username: e.target.value }) }}
                    />
                </div>

                <div style={inputWrapper}>
                    <label>Password:</label>
                    <input
                        style={inputClass}
                        type="password"
                        autoComplete="false"
                        value={this.state.password}
                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                    />
                </div>

                <div style={inputWrapper}>
                    <label>Confirm password:</label>
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
    boxShadow: '2px 2px 2px 3px #ccc',
    margin: '50px auto',
    padding: '35px'
}

const inputWrapper = {
    width: '90%',
    margin: 'auto'
}

const innerImageWrappers = {
    display: 'inline-flex',
    margin: '8px'
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
    marginLeft: 'auto',
    marginRight: '0'
}

const errorWrapper = {
    height: '40px',
    color: 'red',
    fontSize: '12px',
    width: '90%'
}