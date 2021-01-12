import React, { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: this.props.messages || [],
            user: this.props.switch.username
        }
    }

    

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.user && !this.props.switch.username) return
        console.log('message did update')
        console.log('this.props.switch ' + this.props.switch.username)
        console.log('this.state.user ' + this.state.user)
        // same friends //
        if (this.props.messages !== prevProps.messages && this.props.switch.username === this.state.user) {
            console.log('same friend')
            this.setState({
                ...this.state,
                messages: this.props.messages
            })
        }

    }

    render() {
        console.log(this.props.messages)
        return (
            <div>
            {this.state.messages && this.state.messages.map((e, index) => {
                return (
                    <div key={index}>{e.message}</div>
                )
            })}
            </div>
        )
    }


}


export default Message