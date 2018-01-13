import Login from './login/login';
import SignUp from './signup/signup';
import Socials from './social/social';
import React from 'react';
import Button from 'material-ui/Button';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormVisible: true,
    };
    this.changeForm = this.changeForm.bind(this);
  }

  changeForm() {
    return this.setState({loginFormVisible: !this.state.loginFormVisible});
  }

  render() {
    return (
      <div>
        {this.state.loginFormVisible ? <Login></Login> : <SignUp></SignUp>}
        <Socials></Socials>
        <div>
          {this.state.loginFormVisible ? 'Don`t have an account yet?`' : 'Already have an account?'}
        </div>
        <Button onClick={this.changeForm} raised color="primary">
          {this.state.loginFormVisible ? 'Sign up' : 'Login'}
        </Button>
      </div>
    );  
  }
}

export default Auth;