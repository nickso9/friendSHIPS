import React, { Component } from 'react'
import io from "socket.io-client";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
let socket;

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.messages.id || '',
            username: this.props.messages.username || '',
            messages: this.props.messages.messages || [],
            inputText: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillUnmount() {
        console.log('unmounted')
        this.setState({})
        console.log(this.state)
    }

    componentDidMount() {
        const { id } = this.props.user
        socket = io('localhost:8080')
        socket.on("connect", () => {
            socket.emit('setUserId', id)
        });
        console.log(id)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.messages !== this.props.messages) {
            this.setState(this.props.messages)
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const message = this.state.inputText
        const friendId = this.state.id
        console.log('friendid: '+ friendId + ' ' + message)
        socket.emit('message', friendId, message);
    }

    render() {
       console.log(this.state)
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
    messages: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ 
    messages: state.friend.messageWith,
    user: state.auth.user
})


export default connect(mapStateToProps, null)(Chat)


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

