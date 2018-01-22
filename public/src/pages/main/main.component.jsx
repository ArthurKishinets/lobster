import React from 'react'
import { Redirect } from 'react-router'
import Plate from './card/card.component'

import './main.scss'

class Main extends React.Component {
  async componentWillMount () {
    try {
      let res = await fetch('/api/getPartners', {
        credentials: 'include'
      });
      res = await res.json();
      this.partners = res.partners;
      this.props.updateGame({ partners: this.partners });
    } catch (e) {
      console.error(e);
    }
  }

  render () {
    if ((_.isEmpty(this.props.user) && this.props.main.userReceived) || this.props.main.loggedOut) {
      return <Redirect to='/auth' />
    }

    if (!_.isEmpty(this.props.user) && this.props.main.userReceived && (!this.props.user.location || !this.props.user.location.length)) {
      return <div className='main-allow-location'>To play the game you should allow application to get your location</div>;
    }

    return (
      <div>
        <Plate candidates='this.partners' />
      </div>
    )
  }
}

export default Main
