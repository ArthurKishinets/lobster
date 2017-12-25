import React from 'react';
import { Redirect } from 'react-router'

import './login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    //this.signup();
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }

  async login(e, data) {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value
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
    if(!_.isEmpty(res.result)) {
      this.props.updateUser(res.result);
      this.props.updateProfile(res.result);
    }
  }

  render() {
    if (!_.isEmpty(this.props.user))
      return (<Redirect to='/profile'></Redirect>);

    return (
      <div>
        <h1>Login form here</h1>
        <form onSubmit={this.login}>
          <input type="text" name="email"
            onChange={this.handleChange.bind(this, 'email')}
            value={this.state.email}
          />
          <br></br><br></br>
          <input type="password" name="password"
            onChange={this.handleChange.bind(this, 'password')}
            value={this.state.password}
          />
          <br></br><br></br>
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;