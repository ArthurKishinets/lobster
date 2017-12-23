import React from 'react';
import { Redirect } from 'react-router'

import './main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if ((_.isEmpty(this.props.user) || this.props.user.user_group < 1)
      && this.props.main.userReceived) {
        return <Redirect to='/auth'/>;
      }
        
    return (
      <h1>Main component</h1>
    );
  }
}

export default Main;