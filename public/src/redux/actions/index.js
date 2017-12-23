import userActions from './user';

export const updateUser = userActions.updateUser;
export const updateMain = (data) => ({
  type: 'UPDATE_MAIN',
  data,
});