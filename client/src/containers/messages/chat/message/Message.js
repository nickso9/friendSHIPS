import React, { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: this.props.messages || []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.messages !== prevProps.messages) {
            this.setState({
                messages: this.props.messages
            })
        }
    }

    render() {
        console.log(this.props.messages)
        return (
            <div>
            {this.state.messages.map((e, index) => {
                return (
                    <div key={index}>{e.message}</div>
                )
            })}
            </div>
        )
    }


}


export default Message