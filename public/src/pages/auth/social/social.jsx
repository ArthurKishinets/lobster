import React from 'react';
import './social.scss';

class Socials extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div>
      <a href="/api/auth/facebook">Facebook </a>
      <a href="#">twitter</a>
      <a href="#">Google+ </a>
    </div>
  }
}

export default Socials;