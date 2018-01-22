import { initialStore } from '../initial.store';

const updateMain = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_MAIN':
      return _.merge({}, state, action.data);
    case 'DELETE_USER':
      return _.merge({}, initialStore.main, { loggedOut: true });
    default:
      return state;
  }
};

export default updateMain;
