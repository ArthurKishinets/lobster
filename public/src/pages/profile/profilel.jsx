import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { Profile } from './profile/component';

const mapStateToProps = (state, props) => ({
  profile: state.user,
});

const mapDispatchToProps = (dispatch, props) => ({

});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default ProfileContainer;