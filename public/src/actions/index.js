export const addPost = (text) => ({
  type: 'ADD_POST',
  id: Date.now + Math.random(),
  text,
});

export const updatePost = (text, id) => ({
  type: 'ADD_POST',
  id,
  text,
});