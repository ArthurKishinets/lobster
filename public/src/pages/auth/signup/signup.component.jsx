import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router';

import './signup.scss';

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  async signUp(e, data) {
    e.preventDefault();
    const body = {
      email: document.forms['signup'].email.value,
      nickname: document.forms['signup'].nickname.value,
      password: document.forms['signup'].password.value
    };
    let res = await fetch('/api/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res = await res.json();
    this.props.updateUser(res.result);
    this.props.updateMain({ loggedOut: false, userReceived: true });
  }

  render() {
    if (this.props.main.userReceived && !_.isEmpty(this.props.user))
      return <Redirect to='/profile' />;
    return (
      <div className='signup'>
        <h1>Signup form here</h1>
        <form name='signup'>

          <TextField
            className='text-field'
            name='email'
            label='Email'
            type='text'
            margin='normal'
          />

          <TextField
            className='text-field'
            name='nickname'
            label='Nickname'
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

          <Button onClick={this.signUp} raised color='primary'>
            Signup
          </Button>
        </form>
      </div>
    );
  }
}

export default SignUpComponent;
