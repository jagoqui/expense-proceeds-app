import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import SweetAlert from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../../aap.reducer';
import { isLoading, stopLoading } from 'src/app/shared/redux/ui.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading: boolean = false;
  private destroy$ = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private storeSvc: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.storeSvc.dispatch(isLoading());
      const { email, password } = this.loginForm.value;
      this.authSvc
        .login(email, password)
        .then((_) => {
          this.storeSvc.dispatch(stopLoading());
          this.router.navigate(['']).then();
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
      .select('ui')
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ isLoading }) => (this.loading = isLoading));
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
