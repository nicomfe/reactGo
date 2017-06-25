import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import * as userActions from '../actions/users'
import styles from '../css/components/navigation.css'

const cx = classNames.bind(styles)

const Navigation = ({ user, logOut }) => {
  if (!user) return null
  return (
    <nav className={cx('navigation')} role="navigation">
      <Link
        to="/"
        className={cx('item', 'logo')}
        activeClassName={cx('active')}
      >Ninja Ocean</Link>
      { user.get('authenticated') ? (
        <Link
          onClick={logOut}
          className={cx('item')} to="/"
        >Logout</Link>
      ) : (
        <Link className={cx('item')} to="/login">Log in</Link>
      )}
      <Link className={cx('item')} to="/dashboard">Dashboard</Link>
      <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
    </nav>
  )
}

Navigation.propTypes = {
  user: ImmutablePropTypes.map,
  logOut: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.get('user'),
})

export default connect(mapStateToProps, { logOut: userActions.logOut })(Navigation)
