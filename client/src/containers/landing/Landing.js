import React, { Component } from 'react'
import picture1 from '../../images/MiL5KjLia.png'
import picture2 from '../../images/MTLkzKxzc.png'

class Landing extends Component {

    render() {
        
        //


        return (
            <div style={landingWrapper}>
                <div style={imageOneWrapper}>
                    <img src={picture1}/>
                    <div>
                        
                    </div>
                </div>
                <div style={imageTwoWrapper}>
                    <div>

                    </div>
                    <img src={picture2}/>
                </div>

            </div>
        )
    }
}


export default Landing

const landingWrapper = {
    // backgroundColor: '#0067a5',
    height: '100%',
    width: '700px',
    margin: '50px auto',
    padding: '35px',
    backgroundColor: 'white',
}

const imageOneWrapper = {

}

const imageTwoWrapper = {
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: '0'
}