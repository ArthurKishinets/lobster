import { connect } from 'react-redux';
import { updateUser, updateProfile, updateMain } from '../../../redux/actions';
import SignUpComponent from './signup.component';

const mapStateToProps = (state, props) => ({
  user: state.user,
  main: state.main,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
    dispatch(updateProfile(user));
  },
  updateMain: (data) => {
    dispatch(updateMain(data));
  },
});

const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpComponent);

export default SignUp;