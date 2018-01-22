const gameReducer = (state = {
  partners: []
}, action) => {
  switch (action.type) {
    case 'UPDATE_GAME':
      return _.merge({}, action.data);
    default:
      return state;
  }
};

export default gameReducer;
