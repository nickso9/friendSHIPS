import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { friendListUpdater } from '../../../actions/userActions'
import { addFriend, searchFriend, clearFriendError, removeFriend, loadFriend, addPending, removePending, newOfflineFriend } from '../../../actions/messageActions';


class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            friendsList: this.props.auth.user.friendsList,
            requestedfriend: this.props.auth.user.requestedfriend,
            onlineFriends: this.props.friend.friendsOnline
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
        if (prevProps.auth.user !== this.props.auth.user) {
            this.setState({
                ...this.state,
                friendsList: this.props.auth.user.friendsList,
                requestedfriend: this.props.auth.user.requestedfriend
            })
        }

        if (prevProps.friend.friendsOnline !== this.props.friend.friendsOnline) {
         
            this.setState({
                ...this.state,
                onlineFriends: this.props.friend.friendsOnline
            })
        }
    }


    onSubmit(e) {
        e.preventDefault()
        this.props.clearFriendError()
        this.props.searchFriend(this.state.username)
        this.setState({username: ''})
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
                                    <div style={this.props.friend.msg === 'Friendship requested.' ? successMessage : errorMessage}>{this.props.friend.msg}</div>
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
                                                const friendId = this.props.friend.id
                                                const { id, username, image } = this.props.auth.user
                                                this.props.addPending(this.props.friend.id, id, username, image)
                                                setTimeout(() => {
                                                    this.props.onGrabId(friendId)                                                    
                                                }, 500) 

                                            }}
                                            >
                                            <button>Add Friend</button>
                                        </div>
                                    </div> 
                                ) :
                                ''
                            } 
                    </div>
                    <div style={pendingListWrapper}>
                        <span>Friend requests:</span>
                        {this.state.requestedfriend && this.state.requestedfriend.map((pendingfriend, index) => {
                            return (
                                <div key={index}>
                                    <img src={pendingfriend.image} alt=''/>
                                    <span>{pendingfriend.username}</span>
                                    <button onClick={()=> {
                                        const { id } = this.props.auth.user
                                        this.props.removePending(pendingfriend.id, id)
                                        setTimeout(() => {
                                            this.props.friendListUpdater(id)
                                        }, 500) 
                                    }}>Decline</button>
                                    <button onClick={(e)=> {
                                        const { id } = this.props.auth.user   
                                        this.props.addFriend(pendingfriend.id, id)  
                                        setTimeout(() => {
                                            this.props.friendListUpdater(id)
                                            this.props.onGrabId(pendingfriend.id)
                                            this.props.onAddFriend(pendingfriend.id, id)
                                        }, 500) 
                                    }}>Accept</button>
                                </div>
                            )
                        })}
                    </div>
                    <div style={friendsListWrapper}>
                        <span style={friendsListTitle}>Online</span>
                        {this.state.friendsList && this.state.friendsList.map((friend, index) => {
                            if (this.state.onlineFriends.indexOf(friend._id) !== -1 ) {
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
                                            const friendId = e.target.parentNode.firstChild.id
                                            const { id } = this.props.auth.user
                                            this.props.removeFriend(friendId, id)
                                            setTimeout(() => {
                                                this.props.onGrabId(friendId)
                                                this.props.onRemoveFriend(friendId, id)
                                                this.props.newOfflineFriend(friendId)
                                            }, 500) 
                                        }}>remove</button>
                                </div>
                            )
                            } else {
                                return ''
                            }
                        })}
                        <br />
                        <span style={friendsListTitle}>Offline</span>
                        {this.state.friendsList && this.state.friendsList.map((friend, index) => {
                            if (this.state.onlineFriends.indexOf(friend._id) === -1 ) {
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
                                            const friendId = e.target.parentNode.firstChild.id
                                            const { id } = this.props.auth.user
                                            this.props.removeFriend(friendId, id)
                                            setTimeout(() => {
                                                this.props.onGrabId(friendId)
                                                this.props.onRemoveFriend(friendId, id)
                                                this.props.newOfflineFriend(friendId)
                                            }, 500) 
                                        }}>remove</button>
                                </div>
                            )
                            } else {
                                return ''
                            }
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
    loadFriend: PropTypes.func.isRequired,
    addPending: PropTypes.func.isRequired,
    friendListUpdater: PropTypes.func.isRequired,
    removePending: PropTypes.func.isRequired,
    newOfflineFriend: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend,
    friendsOnline: state.friend
});



export default connect(mapStateToProps, { 
    searchFriend, 
    addFriend, 
    clearFriendError, 
    removeFriend, 
    loadFriend, 
    addPending,
    friendListUpdater,
    removePending,
    newOfflineFriend
})(Friends)

const friendsWrapper = {
    border: '1px solid black',
    height: '500px',
    width: '300px',
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

const successMessage = {
    color: 'green'
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

const pendingListWrapper = {
    width: '100%',
    height: '100%',
    backgroundColor: 'teal'
}

const friendsListTitle = {
    backgroundColor: 'white',
    display: 'block',
    width: '100%',
    marginBottom: '5px',
    padding: '5px 0',
    textAlign: 'center'

}