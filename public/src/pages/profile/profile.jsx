import { connect } from 'react-redux';
import { updateUser, updateProfile } from '../../redux/actions';
import Profile from './profile.component';

const mapStateToProps = (state, props) => ({
  user: state.user,
  main: state.main,
  profile: state.profile
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
    dispatch(updateProfile(user));
  },
  updateProfile: (data) => {
    dispatch(updateProfile(data));
  }
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default ProfileContainer;