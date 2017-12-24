import userActions from './user';
import updateProfileAction from './profile';

export const updateUser = userActions.updateUser;
export const updateMain = (data) => ({
  type: 'UPDATE_MAIN',
  data,
});
export const updateProfile = updateProfileAction;