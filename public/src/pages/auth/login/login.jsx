import { connect } from 'react-redux';
import { updateUser } from '../../../redux/actions';
import Login from './login.component';

const mapStateToProps = (state, props) => ({
  profile: state.user,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;