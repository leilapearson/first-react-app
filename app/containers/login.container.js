'use strict';

//React library
import React from 'react';
import { connect } from 'react-redux';

//Custom components
import LoginForm from '../components/loginform.component';

class Login extends React.Component {

  constructor(props) {
     super(props);
    
     // Local state
     this.state = {
        server: '',
        user: '',
        password: '',
        loading: false,
        error: null
     };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }


  handleLoginSubmit(server, user, password) {
    // Set the application state
    this.setState({server, user, password});
    console.log(`${this.state.server} ${this.state.user} ${this.state.password}`)
  }

  // only show the login form if not already authenticated...

   render () {
     const {authenticated} = this.props;
     const {server, user, password} = this.state;
        return (
          <div className="login-area">
            if (!authenticated) {
              <LoginForm onLoginSubmit={this.handleLoginSubmit} /> 
            }
          </div>
        );
   }
}

LoginForm.propTypes = {
  authenticated: propTypes.bool
}

LoginForm.defaultProps = {
  authenticated: false
}

const mapStateToProps = state => {
  
}

const mapDispatchToProps = dispatch => 
{
  
}

export default Login = connect(
  mapStateToProps,
  mapDispatchToProps
)

