import { combineReducers } from 'redux';
import posts from './posts';

const appStore = combineReducers({
  posts,
});

export default appStore;