import { Item } from 'src/app/shared/models/expense-proceeds.model';
import { Action, createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './items.actions';

export interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: []
};

const _itemsReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items })),
  on(unsetItems, (state) => ({ ...state, items: [] }))
);

export function itemsReducer(state: ItemsState | undefined, action: Action) {
  return _itemsReducer(state, action);
}
