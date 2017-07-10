import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import * as messagesActions from '../actions/messages'
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = ({ user, dispatchGetAllMessages }) => {
  if (!user) return null
  dispatchGetAllMessages()
  return <div>Welecome {user.getIn(['json', 'profile', 'name'])}</div>
}

Dashboard.propTypes = {
  user: ImmutablePropTypes.map,
  dispatchGetAllMessages: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.get('user'),
})

const mapDispatchToProps = dispatch => ({
  dispatchGetAllMessages: () => dispatch(messagesActions.getAll()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
