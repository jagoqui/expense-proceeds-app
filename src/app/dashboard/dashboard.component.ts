import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../aap.reducer';
import { Subject } from 'rxjs';
import { ItemService } from '../items/services/item.service';
import { takeUntil } from 'rxjs/operators';
import { setItems } from '../items/redux/items.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();

  constructor(private storeSvc: Store<AppState>, private expenseProceedSvc: ItemService) {}

  ngOnInit(): void {
    this.storeSvc
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ user }) => {
        if (user) {
          this.expenseProceedSvc
            .initExpenseProceedsListener(user.uid)
            .pipe(takeUntil(this.destroy$))
            .subscribe((items) => {
              this.storeSvc.dispatch(setItems({ items }));
            });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
