import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <li><Link to="/auth">auth</Link></li>
        {!_.isEmpty(this.props.user) && <li><Link to="/profile">profile</Link></li>}
        <li><Link to="/">main</Link></li>
      </header>
    );
  }

}

export default HeaderComponent;