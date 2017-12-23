import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser, updateMain } from '../../../redux/actions/index';
import routes from '../route.rights';

class InterceptorComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getSelf().then(r => {
      localStorage.user = r;
      this.props.updateUser(r.result);
      //debugger;
      this.props.updateMain({ userReceived: true });
      // if(_.isEmpty(this.props.user) || routes[nextProps.location.pathname] > (this.props.user.user_group || 0)) {
      //   debugger;
      // }
    }).catch(e => console.info(e));
  }
  
  componentWillReceiveProps(nextProps) {
    // if(_.isEmpty(this.props.user) || routes[nextProps.location.pathname] > (this.props.user.user_group || 0)) {
    //   debugger;
    //   history.go(-1);
    // }
  }

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
})

const Interceptor = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(InterceptorComponent));

export default Interceptor;