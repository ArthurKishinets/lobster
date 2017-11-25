import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { userActions, updateUser } from '../../redux/actions';
import HeaderComponent from './header.component';

const mapStateToProps = (state, props) => ({
  user: state.user,
  nickname: state.user.nickname,
});

const mapDispatchToProps = (dispatch, props) => ({
  updateUser: (user) => {
    dispatch(updateUser(user));
  },
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);

export default withRouter(Header);