const updateUser = (user) => ({
  type: 'UPDATE_USER',
  user,
});

const deleteUser = () => ({ type: 'DELETE_USER' });

const userActions = {
  updateUser,
  deleteUser,
};

export default userActions;