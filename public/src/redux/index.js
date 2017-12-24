import { combineReducers } from 'redux';
import user from './reducers/user';
import main from './reducers/main';
import profile from './reducers/profile';

const reducer = combineReducers({
  user,
  main,
  profile,
});

export default reducer;