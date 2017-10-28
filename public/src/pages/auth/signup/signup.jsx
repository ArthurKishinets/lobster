import React from 'react';

import './signup.scss';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      nickname: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async signUp(e, data) {
    e.preventDefault();
    let res = await fetch('/api/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res = await res.json();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1>Signup form here</h1>
        <form onSubmit={this.signUp}>
          <input type="text" name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <br></br><br></br>
          <input type="text" name="nickname"
            onChange={this.handleChange}
            value={this.state.nickname}
          />
          <br></br><br></br>
          <input type="password" name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <br></br><br></br>
          <button>Signup</button>
        </form>
      </div>
    );
  }
}

export default SignUp;