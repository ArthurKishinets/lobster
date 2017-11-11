const updateUser = (user) => ({
  type: 'UPDATE_USER',
  user,
});

const userActions = {
  updateUser,
};

export default userActions;