import React from 'react';
import fetch from 'isomorphic-fetch';

import './login.scss';

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.signup();
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
    console.log(this.state);
  }

  login(e, data) {
    e.preventDefault();
    const dataToSend = {
      email: e.target.email.value,
      email: e.target.password.value
    };

    
  }

  async signup() {
    console.time('a');
    let resp = await fetch('/api/users');
    resp = await resp.text();
    console.timeEnd('a');
    console.log('resp ', resp);
    //return resp;
  }

  render() {
    return (
      <div>
        <h1>Login form here</h1>
        <form onSubmit={this.login}>
          <input type="email" name="email"
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