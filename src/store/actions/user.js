import { createAction } from 'redux-actions';

import {
  SET_USER,
} from '../types/user';

export const setUser = createAction(SET_USER);
