import userActions from './user';
import updateProfileAction from './profile';

export const updateUser = userActions.updateUser;
export const deleteUser = userActions.deleteUser;
export const updateMain = (data) => ({
  type: 'UPDATE_MAIN',
  data
});
export const updateProfile = updateProfileAction;
export { updateGame } from './game';
