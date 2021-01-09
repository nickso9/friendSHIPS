import React, { Component } from 'react'



class Chat extends Component {

    render() {
        
        return (
            <div style={chatWrapper}>
                <div style={messageWrapper} id="message"></div>
                <input style={inputStyle} htmlFor='messages' type='text' /> 
                <button>Send</button>   
            </div>
        )
    }
}


const chatWrapper = {
    border: '1px solid black',
    height: '500px',
    width: '600px',
    margin: 'auto',
}

const messageWrapper = {
    height: '90%',
    border: '1px solid red'
}

const inputStyle = {
    display: 'inline-block',
    width: '90%',
    fontSize: '16px',
    margin: 'auto'
}

export default Chat