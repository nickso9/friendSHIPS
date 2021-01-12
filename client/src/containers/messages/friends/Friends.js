import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addFriend, searchFriend, clearFriendError, removeFriend, loadFriend } from '../../../actions/messageActions';


class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            friendsList: this.props.auth.user.friendsList
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillUnmount() {
        this.props.loadFriend('', '')
    }

    componentDidUpdate(prevProps) {
        if (prevProps.friend.friendsList !== this.props.friend.friendsList) {
            this.setState({
                ...this.state,
                friendsList: this.props.friend.friendsList
            })
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({username: ''})
        this.props.clearFriendError()
        this.props.searchFriend(this.state.username)
    }

    render() {
        
        return (
            
            <div style={friendsWrapper}>
                <div style={innerWrapper}>
                    <form style={friendsInput} onSubmit={this.onSubmit}>
                        <input 
                            style={searchInput} 
                            type='text' 
                            value={this.state.username}
                            onChange={(e) => {
                                this.setState({username: e.target.value})
                            }}    
                        />
                        <button style={searchButton} type="submit">Search</button>
                    </form>
                    <div style={searchWrapper}>
                            { this.props.friend.msg  ? 
                                (
                                    <div style={errorMessage}>{this.props.friend.msg}</div>
                                ):
                                this.props.friend.user ?
                                (
                                    <div style={addFriendWrapper}>
                                        <div style={friendInfo}>
                                           {this.props.friend.user}
                                        </div>
                                        <div 
                                            style={friendsInfoButton}
                                            onClick={() => {
                                                const { id } = this.props.auth.user
                                                this.props.addFriend(this.props.friend.id, id)
                                            }}
                                            >
                                            <button>Add Friend</button>
                                        </div>
                                    </div> 
                                ) :
                                ''
                            } 
                    </div>
                    <div style={friendsListWrapper}>
                        {this.state.friendsList.map((friend, index) => {
                            return (
                                <div key={index}>
                                    <input hidden id={friend._id} />
                                    <span
                                        onClick={e => {
                                            this.props.loadFriend(e.target.parentNode.firstChild.id, e.target.innerHTML)
                                        }}
                                    >{friend.username}</span>
                                    <button 
                                        onClick={e => {
                                            const { id } = this.props.auth.user
                                            this.props.removeFriend(e.target.parentNode.firstChild.id, id)
                                        }}>remove</button>
                                </div>
                            )
                        })}

                    </div>

                </div>
            </div>
        )
    }

}

Friends.propTypes = {
    searchFriend: PropTypes.func.isRequired,
    addFriend: PropTypes.func.isRequired,
    clearFriendError: PropTypes.func.isRequired,
    removeFriend: PropTypes.func.isRequired,
    loadFriend: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend
});



export default connect(mapStateToProps, { 
    searchFriend, 
    addFriend, 
    clearFriendError, 
    removeFriend, 
    loadFriend
})(Friends)

const friendsWrapper = {
    border: '1px solid black',
    height: '500px',
    width: '600px',
    margin: 'auto',
}

const innerWrapper = {
    display: 'block'
}


const friendsInput = {
    width: '100%',
    padding: '0px'
}

const searchInput = {
    width: '80%'
}

const errorMessage = {
    color: 'red'
}

const searchButton = {
    width: '18%'
}

const searchWrapper = {
    width: '100%',
    height: '50px',
    backgroundColor: 'yellow'
}

const addFriendWrapper = {
    width: '90%',
    margin: 'auto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}

const friendInfo = {
    width: '80%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}

const friendsInfoButton = {
    width: '20%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}

const friendsListWrapper = {
    width: '100%',
    height: '100%',
    backgroundColor: 'pink'
}