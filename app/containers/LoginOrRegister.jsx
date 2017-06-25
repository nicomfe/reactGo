import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import * as userActions from '../actions/users'
import styles from '../css/components/login.css'
import hourGlassSvg from '../images/hourglass.svg'

const cx = classNames.bind(styles)

class LoginOrRegister extends Component {
  constructor(props) {
    super(props)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnSubmit(event) {
    event.preventDefault()

    const { manualLogin, signUp, user } = this.props
    const email = ReactDOM.findDOMNode(this.refs.email).value
    const password = ReactDOM.findDOMNode(this.refs.password).value

    if (user.get('isLogin')) {
      manualLogin({ email, password })
    } else {
      signUp({ email, password })
    }
  }

  renderHeader() {
    const { user, toggleLoginMode } = this.props
    if (user.get('isLogin')) {
      return (
        <div className={cx('header')}>
          <h1 className={cx('heading')}>Login with Email</h1>
          <div className={cx('alternative')}>
            Not what you want?
            <a className={cx('alternative-link')} onClick={toggleLoginMode}>Register an Account</a>
          </div>
        </div>
      )
    }

    return (
      <div className={cx('header')}>
        <h1 className={cx('heading')}>Register with Email</h1>
        <div className={cx('alternative')}>
          Already have an account?
          <a className={cx('alternative-link')} onClick={toggleLoginMode}>Login</a>
        </div>
      </div>
    )
  }

  render() {
    const { user } = this.props

    return (
      <div
        className={cx('login', {
          waiting: user.get('isWaiting'),
        })}
      >
        <div className={cx('container')}>
          { this.renderHeader() }
          <img className={cx('loading')} alt="loading" src={hourGlassSvg} />
          <div className={cx('email-container')}>
            <form onSubmit={this.handleOnSubmit}>
              <input
                className={cx('input')}
                type="email"
                ref="email"
                placeholder="email"
              />
              <input
                className={cx('input')}
                type="password"
                ref="password"
                placeholder="password"
              />
              <div className={cx('hint')}>
                <div>Hint</div>
                <div>email: example@ninja.com password: ninja</div>
              </div>
              <p className={cx('message', { 'message-show': user.get('message') && user.get('message').count() > 0 })}>
                {user.get('message')}
              </p>
              <input
                className={cx('button')}
                type="submit"
                value={user.get('isLogin') ? 'Login' : 'Register'}
              />
            </form>
          </div>
          <div className={cx('google-container')}>
            <h1 className={cx('heading')}>Google Login Demo</h1>
            <a className={cx('button')} href="/auth/google">Login with Google</a>
          </div>
          <div className={cx('google-container')}>
            <h1 className={cx('heading')}>Twitter Login Demo</h1>
            <a className={cx('button')} href="/auth/twitter">Login with Twitter</a>
          </div>
        </div>
      </div>
    )
  }
}

LoginOrRegister.propTypes = {
  user: ImmutablePropTypes.map,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired,
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
const mapStateToProps = state => ({
  user: state.get('user'),
})

const mapDispatchToProps = () => ({
  manualLogin: userActions.manualLogin,
  signup: userActions.signUp,
  toggleLoginMode: userActions.toggleLoginMode,
})

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister)
