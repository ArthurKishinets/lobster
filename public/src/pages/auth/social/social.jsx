import React from 'react';
import './social.scss';

class Socials extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div>
      <a href="/api/auth/facebook">Facebook </a>
      <a href="/api/auth/twitter">twitter</a>
      <a href="/api/auth/google">Google+ </a>
    </div>
  }
}

export default Socials;