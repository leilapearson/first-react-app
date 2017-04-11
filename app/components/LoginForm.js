import React from 'react';
import ApiError from './ApiError';

const LoginForm = ({ authenticated, loginError, onLoginSubmit }) => {
  let _server = "https://git.mycompany.com", _user, _password
  const submit = event => {
    event.preventDefault()
    onLoginSubmit(_server.value, _user.value, _password.value)
  }

  if (!authenticated) {
    return (
      <div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="server">Git server:</label>
                <input ref={input => _server = input}
                  type="url"
                  id="server"
                  defaultValue={_server}
                  className="form-control"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="user">User name:</label>
                <input ref={input => _user = input}
                  type="text"
                  id="user"
                  className="form-control"
                  required>
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input ref={input => _password = input}
                  type="password"
                  id="pwd"
                  className="form-control"
                  required>
                </input>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-sm-4"></div>
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <ApiError error={loginError} />
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    )
  }
  else {
    return <div></div>
  }

}

LoginForm.propTypes = {
  authenticated: React.PropTypes.bool.isRequired,
  loginError: React.PropTypes.oneOfType([React.PropTypes.oneOf([null]), React.PropTypes.object]),
  onLoginSubmit: React.PropTypes.func.isRequired
}

LoginForm.defaultProps = {
  authenticated: false,
  loginError: null,
  onLoginSubmit: f => f
}

export default LoginForm