import _ from 'lodash';

const profile = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_PROFILE_FORM':
      return _.merge({}, state, action.data);
    default:
      return state;
  }
};

export default profile;