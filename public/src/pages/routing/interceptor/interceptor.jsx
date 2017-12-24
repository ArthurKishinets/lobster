import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser, updateMain, updateProfile } from '../../../redux/actions/index';
import routes from '../route.rights';

class InterceptorComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getSelf().then(r => {
      localStorage.user = r;
      this.props.updateUser(r.result);
      this.props.updateProfile(r.result);
      this.props.updateMain({ userReceived: true });
    }).catch(e => console.info(e));
  }
  
/*   componentWillReceiveProps(nextProps) {
  } */

  getSelf() {
    return fetch('/api/self', { credentials: 'include' }).then(r => r.json());
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
  },
  updateMain: (data) => {
    dispatch(updateMain(data));
  },
  updateProfile: (data) => {
    dispatch(updateProfile(data));
  },
})

const Interceptor = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(InterceptorComponent));

export default Interceptor;