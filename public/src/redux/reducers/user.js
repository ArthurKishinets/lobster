import _ from 'lodash';

const user = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_USER':
      return _.merge({}, state, action.user);
    case 'DELETE_USER':
      return {};
    default:
      return state;
  }
};

export default user;