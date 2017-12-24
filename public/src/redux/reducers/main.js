import _ from 'lodash';

const updateMain = (state = {}, action) => {
  //if (_.isEmpty(action.data)) return state;
  switch (action.type) {
    case 'UPDATE_MAIN':
      return _.assign({}, state, action.data);
    default:
      return state;
  }
};

export default updateMain;