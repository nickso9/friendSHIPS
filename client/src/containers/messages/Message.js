import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Chat from './chat/Chat';
import Friends from './friends/Friends'



class Messages extends Component {
    
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