import { combineReducers } from 'redux';
import user from './reducers/user';
import main from './reducers/main';

const reducer = combineReducers({
  user,
  main,
});

export default reducer;