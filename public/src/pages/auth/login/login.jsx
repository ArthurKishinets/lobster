import { connect } from 'react-redux';
import { updateUser, updateProfile, updateMain } from '../../../redux/actions';
import Login from './login.component';

const mapStateToProps = (state, props) => ({
  user: state.user,
  main: state.main,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
  },
  updateProfile: (data) => {
    dispatch(updateProfile(data));
  },
  updateMain: (data) => {
    dispatch(updateMain(data));
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;