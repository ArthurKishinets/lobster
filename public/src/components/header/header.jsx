import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { userActions, updateUser, updateProfile, deleteUser } from '../../redux/actions';
import HeaderComponent from './header.component';

const mapStateToProps = (state, props) => ({
  user: state.user,
  nickname: state.user.nickname,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
    dispatch(updateProfile(user));
  },
  deleteUser: () => dispatch(deleteUser()),
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);

export default withRouter(Header);