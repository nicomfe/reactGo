import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

import * as userActions from '../actions/users'
import styles from '../css/components/login.css'
import hourGlassSvg from '../images/hourglass.svg'

const cx = classNames.bind(styles)

class LoginOrRegister extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <img className={cx('loading')} alt="loading" src={hourGlassSvg} />
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
