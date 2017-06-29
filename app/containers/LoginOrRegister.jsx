import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import * as userActions from '../actions/users'
import styles from '../css/components/login.css'

const cx = classNames.bind(styles)

class LoginOrRegister extends Component {
  render() {
    const { user } = this.props
    return (
      <div className={cx({ waiting: user.get('isWaiting') })}>
        <CircularProgress size={80} thickness={5} className={cx('loading')} alt="loading" />
        <div>
          <a href="/auth/twitter"><RaisedButton label="Login with Twitter" primary /></a>
        </div>
      </div>
    )
  }
}

LoginOrRegister.propTypes = {
  user: ImmutablePropTypes.map,
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
const mapStateToProps = state => ({
  user: state.get('user'),
})

const mapDispatchToProps = () => ({
  toggleLoginMode: userActions.toggleLoginMode,
})

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister)
