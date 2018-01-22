import { combineReducers } from 'redux';
import user from './reducers/user';
import main from './reducers/main';
import profile from './reducers/profile';
import game from './reducers/game';

const reducer = combineReducers({
  user,
  main,
  profile,
  game
});

export default reducer;
