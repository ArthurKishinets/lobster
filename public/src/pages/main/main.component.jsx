import React from 'react';
import { Redirect } from 'react-router';
import Plate from './card/card.component';

import './main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    let res = await fetch('/api/getPartners', {credentials: 'include'});
    let partners = await res.json();
    console.log('partners ', partners);
  }
 
  render() {
    if ((_.isEmpty(this.props.user) || this.props.user.user_group < 1)
      && this.props.main.userReceived) {
        return <Redirect to='/auth'/>;
    }

    return (
      
      <div>
        <h1>main</h1>
        <Plate/>
      </div>

    );
  }
}

export default Main;