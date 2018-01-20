import React from 'react';

class LocationComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      locationSent: false
    };
  }

  componentWillReceiveProps (nextProps) {
    if (_.isEmpty(nextProps.user) || nextProps.user.location.length || this.state.locationSent || !navigator.geolocation) {
      return false;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      nextProps.user.location = `${position.coords.longitude}:${position.coords.latitude}`;
      let formData = new FormData();
      formData.append(`location`, nextProps.user.location);
      this.locationSent = true;
      this.setState({ locationSent: true });
      fetch('/api/self', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
    });
  }

  render () {
    return null;
  }
}

export default LocationComponent;
