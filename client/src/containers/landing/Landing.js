import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { goRegister } from '../../actions/pageActions'

import picture1 from '../../images/MiL5KjLia.png'
import picture2 from '../../images/MTLkzKxzc.png'
import picture3 from '../../images/ship-clipart-15.png'

class Landing extends Component {

    render() {
        
        return (
            <div style={landingWrapper}>
                <div style={brandWrapper}>
                <span style={brandTitle}>FriendSHIPS!!</span>
                <span style={brandTitleSmall}>A new way to chat.</span>
                </div>
                <div style={imageOneWrapper}>
                    <img src={picture1} alt='chat cartoon'/>
                    <div style={imageOneChat}>
                        <span>Aren't you happy you joined friendSHIPS?</span>
                    </div>
                </div>
                <div style={imageTwoWrapper}>
                    <div style={imageTwoChat}>
                        <span>I sure am, I can easily chat with all of my friends!</span>
                    </div>
                    <img src={picture2} alt='chat cartoon'/>
                </div>
                <div style={imageThreeWrapper}>
                    <img src={picture3} alt='chat cartoon'/>
                    <div style={imageThreeChat}>
                        <span>Hey you! You can chat too. Click 
                            <span
                                style={registerLink}
                                onMouseEnter={(e)=> {
                                    e.target.style.color = 'white'
                                }}
                                onMouseLeave={(e)=> {
                                    e.target.style.color = '#ff4500'
                                }}
                                onClick={()=> {
                                    this.props.goRegister()
                                }}
                            > HERE
                            </span> to create an account!</span>
                    </div>
                </div>

            </div>
        )
    }
}

Landing.propTypes = {
    goRegister: PropTypes.func.isRequired
}


export default connect(null, { goRegister })(Landing);



const landingWrapper = {
    backgroundColor: '#0067a5',
    height: '100%',
    width: '800px',
    margin: '0 auto',
    color: 'white',
    fontSize: '18px'
}

const brandWrapper = {
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center'
}

const brandTitle = {
    color: '#ff4500',
    fontSize: '58px',
    alignSelf: 'center',
    display: 'block'
}

const brandTitleSmall = {
    alignSelf: 'flex-end'
}

const imageOneWrapper = {
    marginTop: '25px',
    display: 'flex'
}

const imageOneChat = {
    width: '450px',
    height: '80px',
    padding: '15px',
    borderRadius: '30px',
    border: '1px solid white',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
}

const imageTwoWrapper = {
    marginTop: '70px',
    display: 'flex',
    justifyContent: 'flex-end',
}

const imageTwoChat = {
    width: '450px',
    height: '80px',
    padding: '15px',
    borderRadius: '30px',
    border: '1px solid white',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const imageThreeWrapper = {
    display: 'flex'
}

const imageThreeChat = {
    width: '480px',
    height: '100px',
    padding: '15px',
    borderRadius: '30px',
    border: '1px solid white',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-25px'
}

const registerLink = {
    color: '#ff4500'
}