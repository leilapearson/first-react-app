'use strict';

import React from 'react';

const LoginForm = ({onLoginSubmit = f => f}) => {
   let _server, _user, _password
   const submit = event => {
      evemt.preventDefault()
      onLoginSubmit(_server.value, _user.value, _password.value)
   }
 
   return(
      <div className="row">
         <div className="col-sm-4"></div>
         <div className="col-sm-4">
            <form onSubmit={submit}>
                  <div className="form-group">
                     <label htmlFor="server">Stash server:</label>
                     <input ref={input => _server = input} 
                            type="url" 
                            id="server" 
                            placeholder="https://git.mydomain.com" 
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
    )
}

LoginForm.propTypes = {
   onLoginSubmit: React.PropTypes.func
}

LoginForm.defaultProps = {
   onLoginSubmit: f => f
}

export default LoginForm