import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = ({ user }) => {
  if (!user) return null
  return <div>Welecome {user.getIn(['json', 'profile', 'name'])}</div>
}

Dashboard.propTypes = {
  user: ImmutablePropTypes.map,
}

const mapStateToProps = state => ({
  user: state.get('user'),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
