import { connect } from 'react-redux';
//import { updateUser } from '../../../redux/actions';
import Main from './main.component';

const mapStateToProps = (state, props) => ({
  user: state.user,
  main: state.main,
});

const mapDispatchToProps = (dispatch, props) => ({
  // updateUser: (user) => {
  //   dispatch(updateUser(user));
  // },
});

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default MainContainer;