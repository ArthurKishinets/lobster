import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../../../redux/actions/index';
import routes from '../route.rights';

window.addEventListener('hashchange', (e) => {
  console.log('onhashchange ');
});

class InterceptorComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount Interceptor ');
    this.getSelf().then(r => {
      localStorage.user = r;
      this.props.updateUser(r.result);
      console.log('r.result ', r.result);
    }).catch(e => console.info(e));
  }
  
  componentWillReceiveProps(nextProps) {
    if(routes[nextProps.location.pathname] > (this.props.user.user_group || 0)) {
      console.log('back ');
      history.go(-1);
    }
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
})

const Interceptor = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(InterceptorComponent));

export default Interceptor;