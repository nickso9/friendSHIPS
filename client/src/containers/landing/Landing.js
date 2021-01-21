import React, { Component } from 'react'
import picture1 from '../../images/MiL5KjLia.png'
import picture2 from '../../images/MTLkzKxzc.png'
import picture3 from '../../images/ship-clipart-15.png'

class Landing extends Component {

    render() {
        
        return (
            <div style={landingWrapper}>
                <div style={imageOneWrapper}>
                    <img src={picture1} alt='chat cartoon'/>
                    <div style={imageOneChat}>
                        <span>Aren't you happy you joined friendSHIPS?</span>
                    </div>
                </div>
                <div style={imageTwoWrapper}>
                    <div style={imageTwoChat}>
                        <span>I sure am, I can easily chat with my friends!</span>
                    </div>
                    <img src={picture2} alt='chat cartoon'/>
                </div>
                <div style={imageThreeWrapper}>
                    <img src={picture3} alt='chat cartoon'/>
                    <div style={imageThreeChat}>
                        <span>You can chat too! Click here to create an account!</span>
                    </div>
                </div>

            </div>
        )
    }
}


export default Landing

const landingWrapper = {
    backgroundColor: '#0067a5',
    height: '100%',
    width: '800px',
    margin: '50px auto',
    color: 'white',
    fontSize: '18px'
}

const imageOneWrapper = {
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
}