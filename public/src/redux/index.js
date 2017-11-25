import { combineReducers } from 'redux';
import user from './reducers/user';

const reducer = combineReducers({
  user,
});

export default reducer;