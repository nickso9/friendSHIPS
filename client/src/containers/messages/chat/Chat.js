import React, { Component } from 'react'
import io from "socket.io-client";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './message/Message'

import { friendListUpdater } from '../../../actions/userActions'
import { saveMessages, getCurrentMessages } from '../../../actions/messageActions'
let socket;

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            messages: this.props.currentMessages || '',
            onlineFriends: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    
    }

  
    componentDidMount() {
        const friendId = this.props.user.friendsList.map(e => e._id)
        const { id } = this.props.user
        socket = io('localhost:8080')
        socket.on("connect", () => {
            socket.emit('setUserId', id)

            socket.emit('setOnlineFriends', friendId)

            socket.on('sendPrivateMessage', (from, message) => {
                this.props.saveMessages(from, id, message)
                this.props.getCurrentMessages(from, id)
            })

            socket.on('pushAction', (to) => {
                this.props.friendListUpdater(to)
            })
            
            socket.on('userFriends', (friendsArr) => {
                console.log(friendsArr)
            })

            

            this.props.onPassId(socket)  
        });   
       
    }

   
    componentDidUpdate(prevProps) {
        if (prevProps.messages.id !== this.props.messages.id && this.props.messages.id) {
            this.props.getCurrentMessages(this.props.messages.id, this.props.user.id)
        }

        
    }

    onSubmit(e) {
        e.preventDefault()
        const { id } = this.props.user
        const message = this.state.inputText
        const friendId = this.props.messages.id
  
        socket.emit('message', friendId, message);
        this.props.saveMessages(id, friendId, message)
        this.props.getCurrentMessages(id, friendId)
    }

    render() {

        return (
            <form style={chatWrapper} onSubmit={this.onSubmit}>
                <div style={messageBanner}>Message {this.props.messages.username ? this.props.messages.username : ''}:</div>
                <div style={messageWrapper} id="message">
                    <Message messages={this.props.currentMessages} switch={this.props.messages}/>
                </div>
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
    messages: PropTypes.object,
    saveMessages: PropTypes.func.isRequired,
    getCurrentMessages: PropTypes.func.isRequired,
    currentMessages: PropTypes.array,
    friendListUpdater: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ 
    messages: state.friend.messageWith,
    currentMessages: state.friend.currentMessages,
    user: state.auth.user
})


export default connect(mapStateToProps, { saveMessages, getCurrentMessages, friendListUpdater })(Chat)


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

