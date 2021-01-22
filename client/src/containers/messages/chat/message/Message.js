import React, { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.switch.username,
            image: this.props.switch.image
        }
    }

    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.user !== this.props.switch.username) {
            this.setState({
                user: this.props.switch.username
            })

        }
    }
 

    render() {
        
        return (
            <div style={messageWrapper}>
            {this.props.messages && this.props.messages.map((e, index) => {
                if (e.from === this.props.switch.id) {
                    return (
                        
                        <div key={index} style={messageBox}>
                            <div style={imageWrapper}>
                                <img src={this.state.image} style={messageBoxImage} alt=''/>
                            </div> 
                            <div style={messageBoxText}>
                                <div style={messageYou}>{e.message}</div>
                                <div style={timeStampYou}>{e.timeOfMessage}</div>
                            </div>
                        </div>
                        
                    )
                } 
                
                return (
                    <div key={index} style={messageMeBox}>
                        <div style={messageMeBoxText}>
                            <div style={messageMe}>{e.message}</div>
                            <div style={timeStampMe}>{e.timeOfMessage}</div>
                        </div>
                    </div>
                )
            })}
            </div>
        )
    }


}


export default Message

const messageWrapper = {
    display: 'flex',
    flexWrap: 'wrap'
}

const messageBox = {
    maxWidth: '300px',
    display: 'flex',
    padding: '5px',
    alignItems: 'start',
    flexBasis: '100%',
    margin: '0 10px'
}

const messageBoxText = {
    maxWidth: '100%',
    wordWrap: 'break-word',
    marginLeft: '10px',
    padding: '3px 10px'
}

const messageMeBox = {
    display: 'flex',
    maxWidth: '300px',
    marginRight: '0',
    marginLeft: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    flexBasis: '100%',
    justifyContent: 'end'
}

const messageYou = {
    backgroundColor: '#bcd4e6',
    padding: '10px'
}

const messageMeBoxText = {
    marginRight: '10px',
    marginLeft: 'auto',
    maxWidth: '100%',
    wordWrap: 'break-word',
    padding: '3px 10px',
    overflow: 'hidden'
}

const messageMe = {
    backgroundColor: '#F0F0F0',
    padding: '10px'
}

const imageWrapper = {
    padding: '5px'
}

const messageBoxImage = {
    height: '25px',
    width: '25px'
}

const timeStampMe = {
    fontSize: '8px',
    marginTop: '3px',
    textAlign: 'right'
}

const timeStampYou = {
    fontSize: '8px',
    marginTop: '3px'
}
