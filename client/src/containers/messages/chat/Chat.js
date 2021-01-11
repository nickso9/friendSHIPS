import React, { Component } from 'react'
import io from "socket.io-client";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { saveMessages } from '../../../actions/messageActions'
let socket;

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.messages.id || '',
            username: this.props.messages.username || '',
            inputText: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

  
    componentDidMount() {
        const { id } = this.props.user
        socket = io('localhost:8080')
        socket.on("connect", () => {
            socket.emit('setUserId', id)

            socket.on('sendPrivateMessage', (from, message) => {
    
                this.props.saveMessages(from, id, message)

            })
        });
    }

   
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.messages !== this.props.messages) {
            this.setState(this.props.messages)
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const { id } = this.props.user
        const message = this.state.inputText
        const friendId = this.state.id
  
        socket.emit('message', friendId, message);

        this.props.saveMessages(id, friendId, message)
        
    }

    render() {
        console.log(this.props.message)
        return (
            <form style={chatWrapper} onSubmit={this.onSubmit}>
                <div style={messageBanner}>Message {this.state.username}:</div>
                <div style={messageWrapper} id="message"></div>
                <input 
                    style={inputStyle} 
                    type='text' 
                    value={this.inputText} 
                    onChange={(e) => {
                        this.setState({
                            ...this.state,
                            inputText: e.target.value
                        })
                    }}/> 
                <button type="submit">Send</button>   
            </form>
        )
    }
}

Chat.propTypes = {
    messages: PropTypes.object.isRequired,
    saveMessages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ 
    messages: state.friend.messageWith,
    message: state.friend.messages,
    user: state.auth.user
})


export default connect(mapStateToProps, { saveMessages })(Chat)


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

const messageBanner = {
    height: '25px',
    width: '100%',
    backgroundColor: 'orange'
}

