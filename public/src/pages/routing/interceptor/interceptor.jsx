import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../redux/actions/index';

class InterceptorComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount Interceptor ');
    this.getSelf().then(r => {
      localStorage.user = r;
      this.props.updateUser(r.result);
    }).catch(e => console.info(e));
  }

  getSelf() {
    return fetch('/api/self', { credentials: 'include' }).then(r => r.json());
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}

const Interceptor = connect(
  () => ({}),
  (dispatch) => ({
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  }),
)(InterceptorComponent);

export default Interceptor;