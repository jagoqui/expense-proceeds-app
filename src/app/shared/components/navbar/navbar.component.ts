import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../aap.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  userLogged: User | undefined | null;
  private destroy$ = new Subject<any>();

  constructor(private storeSvc: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSvc
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ user }) => (this.userLogged = user));
  }
  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
