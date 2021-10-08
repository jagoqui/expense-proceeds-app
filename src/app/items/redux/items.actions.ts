import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/shared/models/expense-proceeds.model';

export const setItems = createAction('[ExpenseProceeds] Set Items', props<{ items: Item[] }>());
export const unsetItems = createAction('[ExpenseProceeds] Unset Items');
