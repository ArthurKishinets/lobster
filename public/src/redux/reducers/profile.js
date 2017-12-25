import _ from 'lodash';

const profile = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_PROFILE_FORM':
      return _.mergeWith({}, state, action.data, function (objValue, srcValue) {
        /* when using `merge` empty array or object do not override initial with values inside */
        if (_.isEmpty(srcValue) && (_.isArray(objValue) || _.isObject(objValue))) {
          return null;
        }
      });
    default:
      return state;
  }
};

export default profile;