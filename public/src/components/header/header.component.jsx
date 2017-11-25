import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    setTimeout(
      () => {
        this.props.updateUser({nickname: "11nickname"});
        console.log('user changed ', this.props.user);
      }, 2000
    );
  }

  componentDidMount() {
    console.log('component did mount ');
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps ', this.props.user);
  }

  componentWillUpdate() {
    console.log('componentWillUpdate ', this.props.user);
  }

  render() {
    console.log('render ', this.props.user);
    return (
      <header>
        <li><Link to="/auth">auth</Link></li>
        <li>
          {<Link to="/profile">profile</Link>}
        </li>
        <li><Link to="/">main</Link></li>
      </header>
    );
  }

}

export default HeaderComponent;