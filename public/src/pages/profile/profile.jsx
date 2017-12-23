import { connect } from 'react-redux';
import { userActions, updateUser } from '../../redux/actions';
import Profile from './profile.component';

const mapStateToProps = (state, props) => ({
  user: state.user,
  main: state.main,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
  },
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default ProfileContainer;