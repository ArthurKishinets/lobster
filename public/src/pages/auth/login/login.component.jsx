import React from 'react';
import { Redirect } from 'react-router'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import './login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  async login(e, data) {
    e.preventDefault();
    const body = {
      email: document.forms['login'].email.value,
      password: document.forms['login'].password.value
    };
    let res = await fetch('/api/signin', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res = await res.json();
    if (!_.isEmpty(res.result)) {
      this.props.updateUser(res.result);
      this.props.updateProfile(res.result);
      this.props.updateMain({ loggedOut: false, userReceived: true });
    }
  }

  render() {
    if (this.props.main.userReceived && !_.isEmpty(this.props.profile))
      return <Redirect to='/profile' />;

    return (
      <div className='login-form'>
        <h1>Login form here</h1>
        <form name='login' autoComplete='off'>
          <input style={{display: 'none'}} />
          <input type='password' style={{display: 'none'}} />

          <TextField
            autoFocus
            className='text-field'
            name='email'
            label='Email'
            type='text'
            margin='normal'
          />

          <TextField
            className='text-field'
            name='password'
            label='Password'
            type='password'
            margin='normal'
          />

          <Button onClick={this.login} raised color='primary'>
            Login
          </Button>
        </form>
      </div>
    )
  }
}

export default Login;
