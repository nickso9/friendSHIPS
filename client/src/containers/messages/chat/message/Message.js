import React, { Component } from 'react';

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: this.props.messages || [],
            user: this.props.switch
        }
    }

    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.user !== this.props.switch) {
            this.setState({
                messages: this.props.messages,
                user: this.props.switch
            })

        }
    }

    render() {
        return (
            <div>
            {this.props.messages && this.props.messages.map((e, index) => {
                
                return (
                    <div key={index}>{e.message}</div>
                )
            })}
            </div>
        )
    }


}


export default Message