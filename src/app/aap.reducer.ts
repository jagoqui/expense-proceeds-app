import { UIState, uiReducer } from './shared/redux/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/redux/auth.reducer';

export interface AppState {
  ui: UIState;
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = { ui: uiReducer, auth: authReducer };
