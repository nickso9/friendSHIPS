import React, { Component } from 'react'

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addFriend } from '../../../actions/friendActions';
import { searchFriend } from '../../../actions/friendActions';
import { clearFriendError } from '../../../actions/friendActions'

class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }

        this.onSubmit = this.onSubmit.bind(this)
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
                                        <div style={friendsInfoButton}>
                                            <button>Add Friend</button>
                                        </div>
                                    </div> 
                                ) :
                                ''
                            } 
                    </div>
                    <div style={friendsListWrapper}>
                        friends list

                    </div>

                </div>
            </div>
        )
    }

}

Friends.propTypes = {
    searchFriend: PropTypes.func.isRequired,
    addFriend: PropTypes.func.isRequired,
    clearFriendError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    friend: state.friend
});



export default connect(mapStateToProps, { searchFriend, addFriend, clearFriendError })(Friends)

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