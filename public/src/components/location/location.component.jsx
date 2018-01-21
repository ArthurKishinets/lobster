import React from 'react';

class LocationComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      locationSent: false
    };
    this.locationSent = false;
  }

  componentDidMount () {
    if (_.isEmpty(this.props.user) || (this.props.user.location && this.props.user.location.length) ||
      this.state.locationSent || !navigator.geolocation) {
      return false;
    }
    this.locationSent = true;
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ locationSent: true });
      fetch('/api/self', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          location: [
            position.coords.longitude,
            position.coords.latitude
          ]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
  }

  render () {
    return null;
  }
}

export default LocationComponent;
