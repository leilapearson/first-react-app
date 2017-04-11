'use strict';

import { connect } from 'react-redux';
import { login } from '../actions/index';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state) => {
  return {
    authenticated: state.credentials.authenticated,
    loginError: state.credentials.apiError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginSubmit: (server, user, password) => {
      dispatch(login(server, user, password))
    }
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)


export default Login

