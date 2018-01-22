import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser, updateMain, updateProfile } from '../../redux/actions/index';
import Location from '../location/location';
// import routes from '../route.rights';

class InterceptorComponent extends React.Component {
  async componentWillMount() {
    try {
      let user = await this.getSelf();
      localStorage.user = user;
      this.props.updateProfile(user.result);
      this.props.updateUser(user.result);
      this.props.updateMain({ userReceived: true });
    } catch (e) {
      console.error(e);
    }
  }

  getSelf() {
    return fetch('/api/self', { credentials: 'include' }).then(r => r.json());
  }

  render() {
    console.log('InterceptorComponent ', this.props.user, !_.isEmpty(this.props.user));
    return <div>
      {this.props.children}
      {!_.isEmpty(this.props.user) && <Location />}
    </div>;
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user
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
  }
})

const Interceptor = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(InterceptorComponent));

export default Interceptor;
