import React, { Component } from 'react'
import io from "socket.io-client";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './message/Message'

import { friendListUpdater } from '../../../actions/userActions'
import { saveMessages, getCurrentMessages, setOnlineFriends, newOnlineFriend, newOfflineFriend } from '../../../actions/messageActions'
let socket;

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: '',
            messages: this.props.currentMessages || '',
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

            setTimeout(() => {
                socket.emit('setToFriendsOnline', id)
            },500)
            
            socket.on('onlineReciever', (newOnlineFriend) => {
                this.props.newOnlineFriend(newOnlineFriend)
            })

            socket.on('offlineReciever', (newOfflineFriend) => {
                this.props.newOfflineFriend(newOfflineFriend)
            })
            

            socket.on('sendPrivateMessage', (from, message) => {
                this.props.saveMessages(from, id, message)
                this.props.getCurrentMessages(from, id)
            })

            socket.on('pushAction', (to) => {
                this.props.friendListUpdater(to)
            })

            socket.on('userFriends', (friendsArr) => {
                this.props.setOnlineFriends(friendsArr)
            })

            this.props.onPassId(socket)
        
        });

    }

    componentWillUnmount() {
        const { id } = this.props.user
        socket.emit('setToFriendsOffline', id)
        socket.disconnect(id)
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
        this.setState({
            ...this.state,
            inputText: ''
        })
    }

    render() {
        return (
            <form style={chatWrapper} onSubmit={this.onSubmit}>
                <div style={this.props.messages.username ? messageBanner : null}>
                    {this.props.messages.username ? 
                        (
                            <div>Message {this.props.messages.username}</div>
                        )
                     : 
                        (
                            ''
                        )
                     }
                    </div>
                <div style={messageWrapper} id="message">
                    <Message messages={this.props.currentMessages} switch={this.props.messages} />
                </div>
                <div style={inputWrapper}>
                    <input
                        style={inputStyle}
                        type='text'
                        value={this.state.inputText}
                        onChange={(e) => {
                            this.setState({
                                ...this.state,
                                inputText: e.target.value
                            })
                        }} />
                    <button 
                        type="submit"
                        style={buttonStyle}
                    >Send</button>
                </div>
            </form>
        )
    }
}

Chat.propTypes = {
    messages: PropTypes.object,
    saveMessages: PropTypes.func.isRequired,
    getCurrentMessages: PropTypes.func.isRequired,
    currentMessages: PropTypes.array,
    friendListUpdater: PropTypes.func.isRequired,
    setOnlineFriends: PropTypes.func.isRequired, 
    newOnlineFriend: PropTypes.func.isRequired,
    newOfflineFriend: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    messages: state.friend.messageWith,
    currentMessages: state.friend.currentMessages,
    user: state.auth.user
})


export default connect(mapStateToProps, { saveMessages, getCurrentMessages, friendListUpdater, setOnlineFriends, newOfflineFriend, newOnlineFriend })(Chat)


const chatWrapper = {
    height: '500px',
    width: '600px',
    margin: 'auto',
}

const messageWrapper = {
    height: '90%',
}

const inputStyle = {
    display: 'inline-block',
    width: '80%',
    fontSize: '20px',
    border: '1px solid black',
    margin: 'auto'
}

const buttonStyle = {
    padding: '6px 7px',
    border: '1px solid black',
    backgroundColor: 'white'
}

const messageBanner = {
    height: '25px',
    width: '100%',
    backgroundColor: 'orange'
}

const inputWrapper = {
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    
    margin: 'auto'
}
