import { connect } from 'react-redux';
// import { updateUser } from '../../../redux/actions';
import Main from './main.component';
import { updateGame } from '../../redux/actions';

const mapStateToProps = (state, props) => ({
  user: state.user,
  main: state.main,
  game: state.game
});

const mapDispatchToProps = (dispatch, props) => ({
/*   updateUser: (user) => {
    dispatch(updateUser(user));
  }, */
  updateGame(data) {
    dispatch(updateGame(data));
  }
});

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainContainer;
