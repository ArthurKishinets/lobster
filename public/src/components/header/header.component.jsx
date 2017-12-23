import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (_.isEmpty(this.props.user)) {
      return (
        <ul>
          <li><Link to="/auth">auth</Link></li>
        </ul>
      );
    }

    return (
      <header>
        <ul>
          <li><Link to="/profile">profile</Link></li>
          <li><Link to="/">main</Link></li>
        </ul>
      </header>
    );
  }

}

export default HeaderComponent;