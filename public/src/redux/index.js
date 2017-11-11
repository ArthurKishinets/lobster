import { combineReducers } from 'redux';
import posts from './reducers/posts';
import user from './reducers/user';

const reducer = combineReducers({
  posts,
  user,
});

export default reducer;