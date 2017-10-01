const posts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
        }
      ];
    case 'UPDATE_POST':
      return state.map((post, i) => post.id === action.id ? 
        { id: action.id, text: action.text } : post);
  }
};

export default posts;