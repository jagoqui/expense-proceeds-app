import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/aap.reducer';
import { Store } from '@ngrx/store';
import { Item } from '../../../shared/models/expense-proceeds.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ItemService } from '../../services/item.service';
import SweetAlert from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private destroy$ = new Subject<any>();

  constructor(private storeSvc: Store<AppState>, private itemSvc: ItemService) {}

  onDelete(uid?: string) {
    if (!uid) {
      return;
    }
    if (confirm('Está seguro?')) {
      this.itemSvc
        .deleteItem(uid)
        .then((_) => SweetAlert.fire('Eliminado', 'El item fue eliminado correctamente', 'success'))
        .catch((error) => SweetAlert.fire('Eliminado', error.message, 'error'));
    }
  }

  ngOnInit(): void {
    this.storeSvc
      .select('items')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ items }) => (this.items = [...items]));
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
