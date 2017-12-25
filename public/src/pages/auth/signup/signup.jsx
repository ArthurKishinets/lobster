import { connect } from 'react-redux';
import { updateUser, updateProfile } from '../../../redux/actions';
import SignUpComponent from './signup.component';

const mapStateToProps = (state, props) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
    dispatch(updateProfile(user));
  },
});

const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpComponent);

export default SignUp;