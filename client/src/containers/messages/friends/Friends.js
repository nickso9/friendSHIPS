import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { friendListUpdater } from '../../../actions/userActions'
import { addFriend, searchFriend, clearFriendError, removeFriend, loadFriend, addPending } from '../../../actions/messageActions';


class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            friendsList: this.props.auth.user.friendsList,
            requestedfriend: this.props.auth.user.requestedfriend
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
                                                const { id, username, image } = this.props.auth.user
                                                this.props.addPending(this.props.friend.id, id, username, image)
                        
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
                                        console.log('decline')
                                    }}>Decline</button>
                                    <button onClick={async (e)=> {
                                        const { id } = this.props.auth.user                             
                                        // await this.props.addFriend(pendingfriend.id, id)
                                        // e.target.parentNode.remove()
                                        this.props.onGrabId(pendingfriend.id)
                                    }}>Accept</button>
                                </div>
                            )
                        })}
                    </div>
                    <div style={friendsListWrapper}>
                        <span>Friends</span>
                        {this.state.friendsList && this.state.friendsList.map((friend, index) => {
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
    loadFriend: PropTypes.func.isRequired,
    addPending: PropTypes.func.isRequired,
    friendListUpdater: PropTypes.func.isRequired
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
    loadFriend, 
    addPending,
    friendListUpdater
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