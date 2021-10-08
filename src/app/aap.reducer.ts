import { UIState, uiReducer } from './shared/redux/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/redux/auth.reducer';
import { ItemsState, itemsReducer } from './items/redux/itemsReducer';

export interface AppState {
  ui: UIState;
  auth: AuthState;
  items: ItemsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
  items: itemsReducer
};
