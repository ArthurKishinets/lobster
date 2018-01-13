import React from 'react';
import { Redirect } from 'react-router'
import TextField from 'material-ui/TextField';

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
      <div className="login-form">
        <h1>Login form here</h1>
        <form onSubmit={this.login} autoComplete="off">
        <input style={{display:'none'}}/>
        <input type="password" style={{display:'none'}}/>

          <TextField
            className="text-field"
            name="email"
            label="Email"
            type="text"
            margin="normal"
            onChange={this.handleChange.bind(this, 'email')}
            value={this.state.email}
          />

          <TextField
            className="text-field"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            onChange={this.handleChange.bind(this, 'password')}
            value={this.state.password}
          />
          
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;