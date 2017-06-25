import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import Avatar from '../components/Avatar'
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = ({ user }) => {
  if (!user) return null
  return <div><Avatar image={user.getIn(['json', 'profile', 'picture'])} /></div>
}

Dashboard.propTypes = {
  user: ImmutablePropTypes.map,
}

const mapStateToProps = state => ({
  user: state.get('user'),
})

export default connect(mapStateToProps)(Dashboard)
