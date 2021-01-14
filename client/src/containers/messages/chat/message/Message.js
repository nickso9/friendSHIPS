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
        if (this.state.user !== this.props.switch.username) {
            this.setState({
                messages: this.props.messages,
                user: this.props.switch.username
            })

        }
    }

    render() {
        return (
            <div>
            {this.props.messages && this.props.messages.map((e, index) => {
                if (e.from === this.props.switch.id) {
                    return (
                        <div key={index}>
                            {this.state.user.slice(0,1).toUpperCase()
                             + this.state.user.slice(1).toLowerCase()}: {e.message}
                        </div>
                    )
                } 
                
                return (
                    <div key={index}>Me: {e.message}</div>
                )
            })}
            </div>
        )
    }


}


export default Message