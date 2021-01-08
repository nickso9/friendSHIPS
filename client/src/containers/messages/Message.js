import React, { Component } from 'react'

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Messages extends Component {

    render() {
        console.log(this.props.user)
        return (
            <div>Messages</div>
        )
    }
}


Messages.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ 
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Messages)