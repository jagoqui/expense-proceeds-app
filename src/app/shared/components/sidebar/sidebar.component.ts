import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import SweetAlert from 'sweetalert2';

import { AppState } from 'src/app/aap.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  userLogged: User | null | undefined;
  private destroy$ = new Subject<any>();

  constructor(private auth: AuthService, private router: Router, private storeSvc: Store<AppState>) {}

  onLogout() {
    if (confirm('Está seguro que desea cerrar sesión?')) {
      SweetAlert.fire({
        title: 'Espere por favor',
        timerProgressBar: true,
        didOpen: () => {
          SweetAlert.showLoading();
        }
      }).then();
      this.auth
        .logout()
        .then(() => {
          SweetAlert.close();
          this.router.navigate(['/login']).then();
        })
        .catch((error) => {
          SweetAlert.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
          }).then();
        });
    }
  }

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
