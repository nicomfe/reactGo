import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Avatar from '../components/Avatar'
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = ({ user }) => {
  return <div><Avatar image={user.json.profile.picture} /></div>
}

Dashboard.propTypes = {
  user: PropTypes.object,
}
const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(Dashboard)
