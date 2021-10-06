import { User } from '../../shared/models/user.model';
import { Action, createReducer, on } from '@ngrx/store';
import { setUser, unsetUser } from './auth.actions';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = { user: null };

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(unsetUser, (state) => ({ ...state, user: null }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
