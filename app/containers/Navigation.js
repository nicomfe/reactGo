import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import AppBar from 'material-ui/AppBar'

import * as userActions from '../actions/users'
import Avatar from '../components/Avatar'
import styles from '../css/components/navigation.css'

const cx = classNames.bind(styles)

const Navigation = ({ user, logOut }) => {
  if (!user) return null

  const getLinks = () => {
    return (
      <div className={cx('displayFlex')}>
        <Link className={cx('item')} activeClassName={cx('active')} to="/dashboard">Dashboard</Link>
        <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
        { user.get('authenticated') ? (
          <Link
            onClick={logOut}
            className={cx('item')} to="/"
          >Logout</Link>
        ) : (
          <Link className={cx('item')} to="/login">Log in</Link>
        )}

        {user.get('authenticated') ? (<Avatar image={user.getIn(['json', 'profile', 'picture'])} />) : null}
      </div>
    )
  }

  return (
    <AppBar
      title="React Boilerplate"
      iconElementRight={getLinks()}
      className={cx('menuBar')}
    />
  )
}

Navigation.propTypes = {
  user: ImmutablePropTypes.map,
  logOut: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.get('user'),
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(userActions.logOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
