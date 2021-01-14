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
            socket: null
        }

        this.onGrabId = this.onGrabId.bind(this)
        this.onPassId = this.onPassId.bind(this)
    }

    onGrabId(id) {
        console.log('on grab id')
        this.onPassId(socket, id)
    }

    
    onPassId(io, id) {
        console.log(id)
        socket = io
        socket.emit('action', id)
    }
    

    render() {
    
        return (
            <div>
                <div>Message</div>
                <div style={messageWrapper}>
                    <Chat onPassId={this.onPassId}/>
                    <Friends onGrabId={this.onGrabId}/>
                </div>
            </div>
        )
    }
}


Messages.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ 
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Messages)

const messageWrapper = {
    margin: 'auto',
    display: 'flex'

}