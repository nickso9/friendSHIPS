import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { friendListUpdater } from '../../../actions/userActions'
import { setUserId, addFriend, searchFriend, clearFriendError, removeFriend, loadFriend, addPending, removePending, newOfflineFriend, unloadFriend, removeNewMessage } from '../../../actions/messageActions';


class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            friendsList: this.props.auth.user.friendsList,
            requestedfriend: this.props.auth.user.requestedfriend,
            onlineFriends: this.props.friend.friendsOnline,
            unreadMessages: []
        }

        this.onSubmit = this.onSubmit.bind(this)

    }

    componentDidMount() {
        this.props.setUserId(this.props.auth.user.id)
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
        this.setState({ ...this.state, username: '' })
    }



    render() {

        
        console.log(this.props.friend.friendsOnline)

        return (
           
            <div style={this.props.messages && this.props.messages.id ? friendsWrapper : nonFriendsWrapper}>
                <div style={welcomeName}>Welcome {this.props.auth.user.username.slice(0, 1).toUpperCase() + this.props.auth.user.username.slice(1).toLowerCase()} !</div>
                <div style={innerWrapper}>
                    <form style={friendsInput} onSubmit={this.onSubmit}>
                        <input
                            style={searchInput}
                            type='text'
                            placeholder='Search...'
                            value={this.state.username}
                            onChange={(e) => {
                                this.setState({ ...this.state, username: e.target.value })
                            }}
                        />
                        <button style={searchButton} type="submit"><span className='glyphicon glyphicon-search'></span></button>
                    </form>
                    <div style={searchWrapper}>
                        {this.props.friend.msg ?

                            (
                                <div style={closeButtonWrapper}>
                                    <button
                                        style={closeButton}
                                        onClick={(e) => {
                                            this.props.clearFriendError()

                                            this.setState({ ...this.state, username: '' })
                                        }}
                                    >x
                                        </button>
                                    <div style={this.props.friend.msg === 'Friendship requested.' ? successMessage : errorMessage}>{this.props.friend.msg}</div>
                                </div>
                            ) :
                            this.props.friend.user ?
                                (
                                    <div style={addFriendWrapper}>
                                        <div style={friendInfo}>
                                            {this.props.friend.user}
                                        </div>
                                        <div>
                                            <button
                                                style={friendsInfoButton}
                                                onClick={() => {
                                                    const friendId = this.props.friend.id
                                                    const { id, username, image } = this.props.auth.user
                                                    this.props.addPending(this.props.friend.id, id, username, image)
                                                    setTimeout(() => {
                                                        this.props.onGrabId(friendId)
                                                    }, 500)

                                                }}
                                            ><span className='glyphicon glyphicon-plus'></span></button>
                                        </div>
                                    </div>
                                ) :
                                ''
                        }
                    </div>
                    {this.state.requestedfriend.length > 0 ? (
                        <div style={pendingListWrapper}>
                            <p style={pendingTitle}>Friend requests</p>
                            {this.state.requestedfriend.map((pendingfriend, index) => {
                                return (
                                    <div key={index} style={friendCard}>
                                        <div 
                                            style={friendImgAndName}
                                            onClick={()=> {
                                                this.props.unloadFriend()
                                            }}    
                                        >
                                            <img src={pendingfriend.image} alt='' />
                                            <span style={friendName}>{pendingfriend.username.slice(0,1).toUpperCase() + pendingfriend.username.slice(1).toLowerCase()}</span>
                                        </div>
                                        <div style={friendButtons}>
                                            <button
                                                style={noSign}
                                                onClick={() => {
                                                    const { id } = this.props.auth.user
                                                    this.props.removePending(pendingfriend.id, id)
                                                    setTimeout(() => {
                                                        this.props.friendListUpdater(id)
                                                    }, 500)
                                                }}><span style={noSign} className="glyphicon glyphicon-remove"></span></button>
                                            <button
                                                style={okSign}
                                                onClick={(e) => {
                                                    const { id } = this.props.auth.user
                                                    this.props.addFriend(pendingfriend.id, id)
                                                    setTimeout(() => {
                                                        this.props.friendListUpdater(id)
                                                        this.props.onGrabId(pendingfriend.id)
                                                        this.props.onAddFriend(pendingfriend.id, id)
                                                    }, 500)

                                                }}><span style={okSign} className="glyphicon glyphicon-ok"></span></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (

                            ''
                        )
                    }
                    <div style={friendsListWrapper}>
                        <span style={friendsListTitleOnline}>Online</span>
                        {this.state.friendsList && this.state.friendsList.map((friend, index) => {
               
                            let messageCheck = false
                            if (this.props.unreadMessages && this.props.unreadMessages.length > 0) {
                                messageCheck = this.props.unreadMessages.some(e => e === friend._id)
                            }
                            
                            if (this.state.onlineFriends.indexOf(friend._id) !== -1) {
                                return (
                                    <div key={index} style={currentOnlineFriendCard}>
                                        <div 
                                            style={friendImgAndName}
                                            onClick={e => {
                                                this.props.loadFriend(friend._id, friend.username, friend.image)
                                                this.props.removeNewMessage(friend._id)
                                            }}
                                        >
                                            <img src={friend.image} alt=''/>
                                            <span style={friendNameOnline}>{friend.username.slice(0,1).toUpperCase() + friend.username.slice(1).toLowerCase()}</span>
                                            <span style={newMessageCheck} className={messageCheck ? 'glyphicon glyphicon-envelope' : ''}></span>
                                        </div>
                                        <button
                                            style={friendRemoveBtn} 
                                            onClick={e => {
                                                const friendId = friend._id
                                                const { id } = this.props.auth.user
                                                this.props.removeFriend(friendId, id)
                                                setTimeout(() => {
                                                    this.props.onGrabId(friendId)
                                                    this.props.onRemoveFriend(friendId, id)
                                                    this.props.newOfflineFriend(friendId)
                                                }, 500)
                                            }}><span style={friendRemoveBtn} className='glyphicon glyphicon-remove'></span></button>
                                    </div>
                                )
                            } else {
                                return ''
                            }
                        })}
                        <br />
                        <span style={friendsListTitleOffline}>Offline</span>
                        {this.state.friendsList && this.state.friendsList.map((friend, index) => {
                            if (this.state.onlineFriends.indexOf(friend._id) === -1) {
                                return (
                                    <div key={index} style={currentFriendCard}>
                                        <div 
                                            style={friendImgAndName}
                                            onClick={()=> {
                                                this.props.unloadFriend()
                                            }}
                                        >
                                            <span
                                                style={friendName}
                                            >{friend.username.slice(0,1).toUpperCase() + friend.username.slice(1).toLowerCase()}</span>
                                        </div>
                                        <div style={friendListButtons}>
                                            <button
                                                style={friendRemoveBtn}
                                                onClick={e => {
                                                    const friendId = friend._id
                                                    const { id } = this.props.auth.user
                                                    this.props.removeFriend(friendId, id)
                                                    
                                                    setTimeout(() => {
                                                        this.props.onGrabId(friendId)
                                                        this.props.onRemoveFriend(friendId, id)
                                                        this.props.newOfflineFriend(friendId)
                                                    }, 500)
                                                }}><span style={friendRemoveBtn} className='glyphicon glyphicon-remove'></span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return ''
                            }
                        })}
                    </div>
                    
                </div>
                <div style={closeIcon}>
                    <span 
                        onClick={()=> {
                            this.props.loadFriend('', '')
                        }}
                        className='glyphicon glyphicon-eye-close'>
                        
                    </span>
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
    newOfflineFriend: PropTypes.func.isRequired,
    unloadFriend: PropTypes.func.isRequired,
    messages: PropTypes.object,
    totalMessages: PropTypes.array,
    removeNewMessage: PropTypes.func.isRequired,
    unreadMessages: PropTypes.array,
    setUserId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend,
    friendsOnline: state.friend,
    messages: state.friend.messageWith,
    totalMessages: state.friend.messages,
    unreadMessages: state.friend.newMessages
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
    newOfflineFriend, 
    unloadFriend,
    removeNewMessage,
    setUserId
})(Friends)

const friendsWrapper = {
    position: 'relative',
    padding: '5px',
    height: '600px',
    width: '300px',
    margin: 'auto',
    borderLeft: '1px solid black'
}

const nonFriendsWrapper = {
    position: 'relative',
    padding: '5px',
    height: '600px',
    width: '300px',
    margin: 'auto',
}

const innerWrapper = {
    display: 'block'
}

const welcomeName = {
    textAlign: 'center'
}

const friendsInput = {
    width: '100%',
    padding: '15px 5px',
}

const searchInput = {
    width: '80%',
    border: '1px solid grey',
    borderRadius: '25px',
    padding: '5px 5px 5px 16px'
}

const closeButtonWrapper = {
    marginTop: '7px',
    textAlign: 'right',
    backgroundColor: '#f8f8f8',
}

const closeButton = {
    backgroundColor: '#f8f8f8',
    border: 'none',
    color: 'black',
}

const errorMessage = {
    color: 'red',
    textAlign: 'center',
    fontSize: '12px',
    padding: '0px 3px 5px 3px',
    letterSpacing: '0px'
}

const successMessage = {
    color: 'green',
    textAlign: 'center',
    fontSize: '12px',
    padding: '0px 3px 5px 3px',
    letterSpacing: '0px'
}

const searchButton = {
    width: '18%',
    backgroundColor: 'white',
    border: 'none',
}


const searchWrapper = {
    backgroundColor: 'white'
}

const addFriendWrapper = {
    width: '90%',
    margin: 'auto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0 15px 0',
    borderBottom: '1px solid black'
}

const friendInfo = {
    width: '80%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}

const friendsInfoButton = {
    backgroundColor: 'white',
    border: 'none',
    fontSize: '10px',
    color: 'green'

}

const friendsListWrapper = {
    width: '100%',
    height: '100%',
}

const pendingListWrapper = {
    padding: '5px',
    width: '100%',
    height: '100%',
    borderBottom: '1px black solid'
}

const pendingTitle = {
    paddingBottom: '1px'
}

const friendCard = {
    padding: '5px',
    marginBottom: '3px',
    border: '1px solid blue',
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'space-between'
}

const currentFriendCard = {
    padding: '5px',
    marginBottom: '3px',
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'space-between',
    fontSize: '10px'
}

const currentOnlineFriendCard = {
    padding: '5px',
    marginTop: '-1px',
    // marginBottom: '0',
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'space-between',
    border: '1px solid green'
}

const friendImgAndName = {
    display: 'flex',
    alignItems: 'start',
}

const friendName = {
    marginLeft: '5px',
}


const friendNameOnline = {
    marginLeft: '5px',
    color: 'green'
}

const newMessageCheck = {
    width: '25px',
    marginLeft: '10px',
    height: '25px',
    color: '#a17f1a'
}

const friendButtons = {
    display: 'flex',
    alignItems: 'end'
}

const friendListButtons = {
    display: 'flex',
    alignItems: 'start'
}

const okSign = {
    color: 'green',
    border: 'none',
    backgroundColor: 'white'
}

const noSign = {
    color: 'red',
    border: 'none',
    backgroundColor: 'white'
}

const friendsListTitleOnline = {
    backgroundColor: 'white',
    display: 'block',
    width: '100%',
    padding: '5px 0',
    textAlign: 'center',
    borderBottom: '1px solid green',
    color: 'green'
}

const friendsListTitleOffline = {
    backgroundColor: 'white',
    display: 'block',
    width: '100%',
    marginBottom: '5px',
    padding: '5px 0',
    textAlign: 'center',
    borderBottom: '1px solid grey',
    fontSize: '10px'
}

const friendRemoveBtn = {
    backgroundColor: 'white',
    border: 'none',
    color: 'red'
}

const closeIcon = {
    color: '#0067a5',
    position: 'absolute',
    bottom: '1%',
    left: '48%'
}