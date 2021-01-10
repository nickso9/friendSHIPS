import React, { Component } from 'react'
import io from "socket.io-client";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Chat from './chat/Chat';
import Friends from './friends/Friends'

let socket;

class Messages extends Component {

    
    componentDidMount() {
        const { id } = this.props.user
        socket = io('localhost:8080')
        socket.on("connect", () => {
            socket.emit('setUserId', id)
        });

    }

    render() {
        
        return (
            <div>
                <div>Message</div>
                <div style={messageWrapper}>
                    <Chat />
                    <Friends />
                </div>
            </div>
        )
    }
}


Messages.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ 
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Messages)

const messageWrapper = {
    margin: 'auto',
    display: 'flex'

}