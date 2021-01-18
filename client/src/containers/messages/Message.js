import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Chat from './chat/Chat';
import Friends from './friends/Friends'


let socket;
class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.onGrabId = this.onGrabId.bind(this)
        this.onPassId = this.onPassId.bind(this)
        this.onAddFriend = this.onAddFriend.bind(this)
        this.onRemoveFriend = this.onRemoveFriend.bind(this)
    }

    onPassId(io, id) {
        socket = io
        socket.emit('action', id)
    }
    
    onGrabId(id) {
        this.onPassId(socket, id)
    }

    onAddFriend(id, to) {
        socket.emit('onlineNow', id, to)
    }
    
    onRemoveFriend(id, to) {
        socket.emit('removeFriend', id, to)
    }

    render() {
        console.log(this.props.messages)
        return (
            <div style={messageOuterWrapper}>
                
                <div style={this.props.messages.id ? messageWrapper : noneMessageWrapper}>
                    <Chat onPassId={this.onPassId} />
                    <Friends onGrabId={this.onGrabId} onAddFriend={this.onAddFriend} onRemoveFriend={this.onRemoveFriend}/>
                </div>
            </div>
        )
    }
}


Messages.propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.object,
}

const mapStateToProps = state => ({ 
    messages: state.friend.messageWith,
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Messages)

const messageWrapper = {
    margin: 'auto',
    display: 'flex',
    width: '700px',
    backgroundColor: 'white',
    borderRadius: '2%'
}

const noneMessageWrapper = {
    margin: 'auto',
    display: 'flex',
    width: '300px',
    backgroundColor: 'white',
    borderRadius: '2%'
}

const messageOuterWrapper = {
    paddingTop: '25px',
    backgroundColor: '#0067a5',
    height: '100vh',
}