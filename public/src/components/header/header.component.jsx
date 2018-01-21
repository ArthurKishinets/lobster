import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

import './header.scss';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.props.deleteUser();
    } catch (e) {
      console.error('e', e);
    }
  }

  render() {
    if (_.isEmpty(this.props.user)) return null;

    return (
      <header>
        <ul>
          <li><Link to='/profile'>profile</Link></li>
          <li><Link to='/'>main</Link></li>
        </ul>

        <Button className='logout' onClick={this.logout} raised color='primary'>
          Logout
        </Button>
      </header>
    );
  }
}

export default HeaderComponent;
