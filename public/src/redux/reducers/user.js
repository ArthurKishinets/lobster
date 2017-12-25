import _ from 'lodash';

const user = (state = {}, action) => {
  if (!action.user) return state;
  switch(action.type) {
    case 'UPDATE_USER':
      return _.merge({}, state, action.user);
    default:
      return state;
  }
};

export default user;