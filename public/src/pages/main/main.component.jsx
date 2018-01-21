import React from 'react'
import { Redirect } from 'react-router'
import Plate from './card/card.component'

import './main.scss'

class Main extends React.Component {
  async componentWillMount () {
    let res = await fetch('/api/getPartners', {credentials: 'include'})
    this.partners = await res.json()
  }

  render () {
    if ((_.isEmpty(this.props.user) && this.props.main.userReceived) || this.props.main.loggedOut) {
      return <Redirect to='/auth' />
    }

    return (
      <div>
        <h1>main</h1>
        <Plate candidates='this.partners' />
      </div>
    )
  }
}

export default Main
