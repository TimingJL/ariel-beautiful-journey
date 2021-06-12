import update from 'immutability-helper';
import { handleActions } from 'redux-actions';
import { SET_USER } from '../types/user';

const initialState = {
  user: null,
};

export default handleActions({
  [SET_USER](state, { payload: { user } }) {
    return update(state, {
      user: { $set: user },
    });
  },
}, initialState);
